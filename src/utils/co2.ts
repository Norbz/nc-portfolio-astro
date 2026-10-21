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
 * French grid carbon intensity (kg CO2e/kWh): ADEME Base Empreinte,
 * "Électricité 2025 - mix moyen - consommation", smoothed over 2022-2025.
 * All devices are used in France.
 */
export const FR_GRID_KG_PER_KWH = 0.0461;

/** CO2 (kg) of one working day of use: wattage × daily_hours at the French grid mix. */
export function computeUseCO2PerDay(device: HardwareData): number {
  if (!device.wattage || !device.daily_hours) return 0;
  return (device.wattage * device.daily_hours / 1000) * FR_GRID_KG_PER_KWH;
}

/** Lifecycle CO2 (kg) without the manufacturer's use phase: manufacturing, transport, end of life. */
export function computeEmbodiedCO2(device: HardwareData): number {
  return device.lifecycle_co2 * (1 - device.use_phase_percent);
}

/**
 * Daily CO2 (kg) for a hardware device.
 * The manufacturer's use phase is computed with their own grid assumption, often a
 * regional or world average, so it is removed and replaced with the device's
 * consumption at the French grid mix:
 *   daily_co2 = embodied_co2 / effective_lifespan + use_co2_per_day
 */
export function computeDailyCO2(device: HardwareData, referenceDate: Date): number {
  const effectiveLifespan = computeEffectiveLifespanDays(device, referenceDate);
  return computeEmbodiedCO2(device) / effectiveLifespan + computeUseCO2PerDay(device);
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

/** Working days in one month of service usage (200 days/year model). */
const WORKING_DAYS_PER_MONTH = 20;

/**
 * Total CO2 (g) attributed to a project for one service.
 * Monthly rates cover 20 working days, the unit of duration_days.
 */
export function computeServiceCO2ForProject(
  service: ServiceData,
  duration_days: number
): number {
  return (service.co2_per_month_g / WORKING_DAYS_PER_MONTH) * duration_days;
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
  return (service.kwh_per_month / WORKING_DAYS_PER_MONTH) * duration_days;
}

/** Round to N decimal places */
export function round(value: number, decimals = 2): number {
  return Math.round(value * 10 ** decimals) / 10 ** decimals;
}
