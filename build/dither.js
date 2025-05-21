import fs from "fs";
import path from "path";
import { createCanvas, Image } from "canvas";
import { execFile } from "child_process";
import pngquant from "pngquant-bin";

// Our 10-shade grayscale palette
const GRAYSCALE_PALETTE = [
  [0, 0, 0, 255],        // black
  [28, 28, 28, 255],     // very dark gray
  [56, 56, 56, 255],     // dark gray
  [84, 84, 84, 255],     // medium-dark gray
  [112, 112, 112, 255],  // medium gray
  [140, 140, 140, 255],  // medium-light gray
  [168, 168, 168, 255],  // light gray
  [196, 196, 196, 255],  // bright light gray
  [224, 224, 224, 255],  // very light gray
  [255, 255, 255, 255],  // white
];

const __dirname = path.dirname(new URL(import.meta.url).pathname);
const sourceDir = path.join(__dirname, "../src/assets/src-imgs");
const destDir = path.join(__dirname, "../src/assets/imgs");

// Initial processing size (higher resolution for better dithering detail)
const initialScale = 1.1; // Process at 1.5x the final size

// Final output dimensions
const outputWidth = 360;  // final width in pixels
const outputHeight = 240; // final height in pixels

function ensureDirSync(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function isImageFile(filename) {
  return [".png", ".jpg", ".jpeg", ".gif"].includes(path.extname(filename).toLowerCase());
}

// Bayer matrix (order 8)
const bayerMatrix8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];
const bayerDivisor = 64;

function bayerDitherImageData(imgData, width, height) {
  // Convert to grayscale and apply Bayer threshold
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      // Luminance (perceptual grayscale)
      const r = imgData.data[idx];
      const g = imgData.data[idx + 1];
      const b = imgData.data[idx + 2];
      const gray = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
      // Bayer threshold - compare directly with normalized matrix
      const normalizedThreshold = Math.floor((bayerMatrix8[y % 8][x % 8] / (bayerDivisor - 1)) * 255);
      const value = gray > normalizedThreshold ? 255 : 0;
      imgData.data[idx] = value;
      imgData.data[idx + 1] = value;
      imgData.data[idx + 2] = value;
      // alpha stays the same
    }
  }
  return imgData;
}

async function processDirectory(src, dest) {
  ensureDirSync(dest);
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      await processDirectory(srcPath, destPath);
    } else if (isImageFile(entry.name)) {
      await ditherImage(srcPath, destPath.replace(/\.[^.]+$/, ".png"));
    }
  }
}

function ditherImage(srcPath, destPath) {
  return new Promise((resolve, reject) => {
    fs.readFile(srcPath, (err, data) => {
      if (err) return reject(err);
      const img = new Image();
      img.onload = () => {
        try {
          // --- Resize logic ---
          // Calculate the initial processing size (higher resolution for better dithering)
          const processWidth = Math.round(outputWidth * initialScale);
          const processHeight = Math.round(outputHeight * initialScale);
          
          // Calculate aspect ratio-preserving dimensions
          let targetWidth, targetHeight;
          const imgAspect = img.width / img.height;
          const outputAspect = outputWidth / outputHeight;
          
          if (imgAspect > outputAspect) {
            // Image is wider than our target aspect ratio
            targetWidth = processWidth;
            targetHeight = Math.round(processWidth / imgAspect);
          } else {
            // Image is taller than our target aspect ratio
            targetHeight = processHeight;
            targetWidth = Math.round(processHeight * imgAspect);
          }
          
          // Draw original image to canvas at higher resolution for processing
          const canvas = createCanvas(targetWidth, targetHeight);
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, targetWidth, targetHeight);
          
          // Get original grayscale values (before dithering)
          const originalImgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
          const grayValues = new Uint8Array(targetWidth * targetHeight);
          
          // Convert to grayscale for palette mapping
          for (let y = 0; y < targetHeight; y++) {
            for (let x = 0; x < targetWidth; x++) {
              const idx = (y * targetWidth + x) * 4;
              const r = originalImgData.data[idx];
              const g = originalImgData.data[idx + 1];
              const b = originalImgData.data[idx + 2];
              // Store grayscale value for this pixel
              grayValues[y * targetWidth + x] = Math.round(0.299 * r + 0.587 * g + 0.114 * b);
            }
          }
          
          // Apply Bayer dithering to create the pattern
          let imgData = ctx.getImageData(0, 0, targetWidth, targetHeight);
          imgData = bayerDitherImageData(imgData, targetWidth, targetHeight);
          
          // Create the final output image with our 10-color palette
          const outCanvas = createCanvas(targetWidth, targetHeight);
          const outCtx = outCanvas.getContext("2d");
          const outImgData = outCtx.createImageData(targetWidth, targetHeight);
          
          // Map the dithered pattern to our grayscale palette
          for (let y = 0; y < targetHeight; y++) {
            for (let x = 0; x < targetWidth; x++) {
              const idx = (y * targetWidth + x) * 4;
              const pixel = imgData.data[idx]; // Will be either 0 or 255 from Bayer dithering
              
              // Get original gray value for this pixel
              const originalGray = grayValues[y * targetWidth + x];
              
              // Choose appropriate palette color based on original grayscale value and dither pattern
              let paletteIndex;
              
              if (pixel === 0) { // Black dot in the dither pattern
                // Use the darker half of our palette (0-4)
                paletteIndex = Math.min(4, Math.floor(originalGray * 5 / 255));
              } else { // White dot in the dither pattern
                // Use the lighter half of our palette (5-9) with more nuance
                paletteIndex = 5 + Math.min(4, Math.floor(originalGray * 5 / 255));
              }
              
              // Apply the palette color
              outImgData.data[idx] = GRAYSCALE_PALETTE[paletteIndex][0];     // R
              outImgData.data[idx + 1] = GRAYSCALE_PALETTE[paletteIndex][1]; // G
              outImgData.data[idx + 2] = GRAYSCALE_PALETTE[paletteIndex][2]; // B
              outImgData.data[idx + 3] = 255; // Alpha
            }
          }
          
          outCtx.putImageData(outImgData, 0, 0);
          
          // Now resize to the final output dimensions
          let finalWidth, finalHeight;
          
          if (imgAspect > outputAspect) {
            // Image is wider than our target aspect ratio
            finalWidth = outputWidth;
            finalHeight = Math.round(outputWidth / imgAspect);
          } else {
            // Image is taller than our target aspect ratio
            finalHeight = outputHeight;
            finalWidth = Math.round(outputHeight * imgAspect);
          }
          
          const finalCanvas = createCanvas(finalWidth, finalHeight);
          const finalCtx = finalCanvas.getContext("2d");
          
          // Use smooth interpolation for resizing to blend the dithering patterns
          finalCtx.imageSmoothingEnabled = true;
          finalCtx.imageSmoothingQuality = 'high';
          finalCtx.drawImage(outCanvas, 0, 0, finalWidth, finalHeight);
          
          // Make sure we keep our palette colors after resizing
          const finalImgData = finalCtx.getImageData(0, 0, finalWidth, finalHeight);
          
          // Requantize to our palette
          for (let i = 0; i < finalImgData.data.length; i += 4) {
            const r = finalImgData.data[i];
            const g = finalImgData.data[i + 1];
            const b = finalImgData.data[i + 2];
            
            // Find closest color in palette
            let closestIdx = 0;
            let minDistance = 255 * 3;
            
            for (let j = 0; j < GRAYSCALE_PALETTE.length; j++) {
              const pr = GRAYSCALE_PALETTE[j][0];
              const pg = GRAYSCALE_PALETTE[j][1];
              const pb = GRAYSCALE_PALETTE[j][2];
              
              const distance = Math.abs(r - pr) + Math.abs(g - pg) + Math.abs(b - pb);
              
              if (distance < minDistance) {
                minDistance = distance;
                closestIdx = j;
              }
            }
            
            // Apply the closest palette color
            finalImgData.data[i] = GRAYSCALE_PALETTE[closestIdx][0];
            finalImgData.data[i + 1] = GRAYSCALE_PALETTE[closestIdx][1];
            finalImgData.data[i + 2] = GRAYSCALE_PALETTE[closestIdx][2];
          }
          
          finalCtx.putImageData(finalImgData, 0, 0);
          
          ensureDirSync(path.dirname(destPath));
          const outStream = fs.createWriteStream(destPath);
          
          // Create an 8-bit PNG
          const pngOptions = {
            compressionLevel: 9,
            filters: canvas.PNG_FILTER_NONE,
            palette: true,
            backgroundIndex: 0,
            resolution: 72
          };
          
          // First save the canvas to a temporary file
          const tempFilePath = destPath + '.temp.png';
          const tempStream = finalCanvas.createPNGStream(pngOptions);
          const tempOutStream = fs.createWriteStream(tempFilePath);
          
          tempStream.pipe(tempOutStream);
          tempOutStream.on("finish", () => {
            // Now compress with pngquant for smaller file size
            execFile(pngquant, [
              '--force',
              '--strip',
              '--speed=1', // Slowest but best compression
              '--quality=70-95', // Allow quality reduction for better compression
              '--output', destPath,
              tempFilePath
            ], (error) => {
              // Delete the temp file regardless of success
              fs.unlink(tempFilePath, () => {
                if (error) {
                  // If pngquant fails, use the original file
                  fs.copyFile(tempFilePath, destPath, (err) => {
                    if (err) return reject(err);
                    console.log(`Processed: ${path.basename(srcPath)} → ${path.basename(destPath)} (without pngquant)`);
                    resolve();
                  });
                } else {
                  console.log(`Processed: ${path.basename(srcPath)} → ${path.basename(destPath)} (optimized)`);
                  resolve();
                }
              });
            });
          });
          tempOutStream.on("error", reject);
        } catch (e) {
          reject(e);
        }
      };
      img.onerror = reject;
      img.src = data;
    });
  });
}

console.log("Starting dithering process...");
try {
  await processDirectory(sourceDir, destDir);
  console.log("All images processed and saved to " + destDir);
} catch (e) {
  console.error("Error during dithering:", e);
}