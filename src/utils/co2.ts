// CO2 computation utilities for eco footprint reports
// All computations happen at build time — `new Date()` reflects the build/deploy date.

export interface HardwareData {
  purchaseDate: Date;
  ratio?: number;
  wattage?: number;
  daily_hours?: number;
  lifecycle_co2: number;
  manufacturer_lifespan_days: number;
  use_phase_percent: number;
  estimated_lifespan_days: number;
  water_per_day_l?: number;
}

export interface ServiceData {
  co2_per_month_g: number;
  kwh_per_month?: number;
}

/**
 * Effective lifespan = max(estimated_lifespan_days, actual days owned so far).
 * Rewarding: if you keep a device longer than planned, daily CO2 drops.
 * Safe: on day 3 after purchase, max(1000, 3) = 1000 → no distortion.
 */
export function computeEffectiveLifespanDays(device: HardwareData): number {
  const daysSincePurchase = Math.floor(
    (Date.now() - new Date(device.purchaseDate).getTime()) / 86_400_000
  );
  return Math.max(device.estimated_lifespan_days, daysSincePurchase);
}

/** Returns true when the device has already outlived its estimated lifespan */
export function isUsingActualLifespan(device: HardwareData): boolean {
  const daysSincePurchase = Math.floor(
    (Date.now() - new Date(device.purchaseDate).getTime()) / 86_400_000
  );
  return daysSincePurchase > device.estimated_lifespan_days;
}

/**
 * Daily CO2 (kg) for a hardware device, using the spreadsheet formula:
 *   embodied_co2 = lifecycle_co2 × (1 - use_phase_percent)            ← fixed manufacturing portion
 *   use_co2_per_day = (lifecycle_co2 × use_phase_percent) / manufacturer_lifespan_days
 *   co2_rectified = embodied_co2 + use_co2_per_day × effective_lifespan
 *   daily_co2 = co2_rectified / effective_lifespan
 */
export function computeDailyCO2(device: HardwareData): number {
  const effectiveLifespan = computeEffectiveLifespanDays(device);
  const embodied_co2 = device.lifecycle_co2 * (1 - device.use_phase_percent);
  const use_co2_per_day_mfr =
    (device.lifecycle_co2 * device.use_phase_percent) / device.manufacturer_lifespan_days;
  const co2_rectified = embodied_co2 + use_co2_per_day_mfr * effectiveLifespan;
  return co2_rectified / effectiveLifespan;
}

/**
 * Total CO2 (kg) attributed to a project for one hardware device.
 * duration_days = number of working days the device was used for this project.
 */
export function computeHardwareCO2ForProject(
  device: HardwareData,
  duration_days: number
): number {
  return computeDailyCO2(device) * duration_days * (device.ratio ?? 1);
}

/**
 * Total CO2 (g) attributed to a project for one service.
 * Uses a simple monthly rate prorated by project duration.
 */
export function computeServiceCO2ForProject(
  service: ServiceData,
  duration_days: number
): number {
  return (service.co2_per_month_g / 30) * duration_days;
}

/**
 * Total energy (kWh) attributed to a project for one hardware device.
 * wattage (W) × daily_hours (h/day) / 1000 × duration_days
 */
export function computeDeviceEnergyForProject(
  device: HardwareData,
  duration_days: number
): number {
  if (!device.wattage || !device.daily_hours) return 0;
  return (device.wattage * device.daily_hours / 1000) * duration_days * (device.ratio ?? 1);
}

/**
 * Total energy (kWh) attributed to a project for one service.
 */
export function computeServiceEnergyForProject(
  service: ServiceData,
  duration_days: number
): number {
  if (!service.kwh_per_month) return 0;
  return (service.kwh_per_month / 30) * duration_days;
}

/** Round to N decimal places */
export function round(value: number, decimals = 2): number {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}
