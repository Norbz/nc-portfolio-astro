// CO2 computation utilities for eco footprint reports
// All computations happen at build time.

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
 * Effective lifespan = max(estimated_lifespan_days, days owned at reference date).
 * referenceDate should be the project end date — freezes the value so reports don't
 * silently change on each rebuild as time passes.
 * Safe for new devices: max(1000, 3) = 1000 → no distortion.
 */
/** Calendar days → working days (200 days/year model: 5/7 of calendar days) */
function toWorkingDays(calendarDays: number): number {
  return Math.floor(calendarDays * 5 / 7);
}

export function computeEffectiveLifespanDays(device: HardwareData, referenceDate: Date): number {
  const calendarDays = Math.max(0, Math.floor(
    (referenceDate.getTime() - new Date(device.purchaseDate).getTime()) / 86_400_000
  ));
  const workingDays = toWorkingDays(calendarDays);
  return Math.max(device.estimated_lifespan_days, workingDays);
}

/** Returns true when the device had already outlived its estimated lifespan at the reference date */
export function isUsingActualLifespan(device: HardwareData, referenceDate: Date): boolean {
  const calendarDays = Math.max(0, Math.floor(
    (referenceDate.getTime() - new Date(device.purchaseDate).getTime()) / 86_400_000
  ));
  return toWorkingDays(calendarDays) > device.estimated_lifespan_days;
}

/**
 * Daily CO2 (kg) for a hardware device, using the spreadsheet formula:
 *   embodied_co2 = lifecycle_co2 × (1 - use_phase_percent)            ← fixed manufacturing portion
 *   use_co2_per_day = (lifecycle_co2 × use_phase_percent) / manufacturer_lifespan_days
 *   co2_rectified = embodied_co2 + use_co2_per_day × effective_lifespan
 *   daily_co2 = co2_rectified / effective_lifespan
 */
export function computeDailyCO2(device: HardwareData, referenceDate: Date): number {
  const effectiveLifespan = computeEffectiveLifespanDays(device, referenceDate);
  const embodied_co2 = device.lifecycle_co2 * (1 - device.use_phase_percent);
  const use_co2_per_day_mfr =
    (device.lifecycle_co2 * device.use_phase_percent) / device.manufacturer_lifespan_days;
  const co2_rectified = embodied_co2 + use_co2_per_day_mfr * effectiveLifespan;
  return co2_rectified / effectiveLifespan;
}

/**
 * Total CO2 (kg) attributed to a project for one hardware device.
 * referenceDate = project end date (freezes the longevity reward at completion time).
 */
export function computeHardwareCO2ForProject(
  device: HardwareData,
  duration_days: number,
  referenceDate: Date
): number {
  return computeDailyCO2(device, referenceDate) * duration_days * (device.ratio ?? 1);
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
