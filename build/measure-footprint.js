import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const dist = path.join(root, 'dist');
const floppyBytes = 80 * 2 * 18 * 512; // Standard 3.5-inch, 1.44 MB floppy.
const files = new Map();

// Measure the stored homepage package, not HTTP transfer size: include all
// image assets and all font subsets/fallbacks declared by its stylesheets.
function visit(file) {
    if (files.has(file)) return;
    const buffer = fs.readFileSync(file);
    files.set(file, buffer.length);
    const source = buffer.toString();
    const extension = path.extname(file);
    const refs = [];

    if (extension === '.html') {
        for (const tag of source.matchAll(/<(?:script|link|img)\b[^>]*>/g)) {
            const ref = tag[0].match(/\b(?:src|href)="([^"]+)"/);
            if (ref) refs.push(ref[1]);
        }
    }
    if (extension === '.css') {
        for (const ref of source.matchAll(/url\(["']?([^\s)"']+)["']?\)/g)) refs.push(ref[1]);
    }
    if (extension === '.js') {
        for (const ref of source.matchAll(/(?:from\s*|import\s*\(?)["']([^"']+)["']/g)) refs.push(ref[1]);
    }

    for (const ref of refs) {
        if (/^(?:https?:|\/\/)/.test(ref)) {
            console.warn(`External resource excluded: ${ref}`);
            continue;
        }
        if (/^(?:data:|#)/.test(ref)) continue;
        const pathname = decodeURIComponent(ref.split(/[?#]/)[0]);
        visit(pathname.startsWith('/')
            ? path.join(dist, pathname)
            : path.resolve(path.dirname(file), pathname));
    }
}

visit(path.join(dist, 'index.html'));
const homeBytes = [...files.values()].reduce((sum, bytes) => sum + bytes, 0);
const buildBytes = fs.readdirSync(dist, { recursive: true }).reduce((sum, file) => {
    const stat = fs.statSync(path.join(dist, file));
    return sum + (stat.isFile() ? stat.size : 0);
}, 0);
const metrics = {
    usedPercent: Number((homeBytes / floppyBytes * 100).toFixed(1)),
    kilobytes: Math.round(homeBytes / 1000),
};

console.table([...files].map(([file, bytes]) => ({ file: path.relative(dist, file), bytes })));
console.log(JSON.stringify({ homeBytes, buildBytes, floppyBytes, ...metrics }, null, 2));
if (process.argv.includes('--write')) {
    fs.writeFileSync(path.join(root, 'data/footprint.json'), JSON.stringify(metrics, null, 2) + '\n');
    console.log('Updated data/footprint.json. Rebuild and measure again to verify the displayed values.');
}
