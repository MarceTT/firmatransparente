/**
 * Chilean RUT utilities
 * RUT format: 12.345.678-9 or 12345678-9
 */

/**
 * Validates a Chilean RUT
 */
export function validateRut(rut: string): boolean {
  if (!rut || typeof rut !== 'string') return false;

  // Clean RUT: remove dots and dashes, uppercase
  const cleaned = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  if (cleaned.length < 2) return false;

  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  // Body must be numeric
  if (!/^\d+$/.test(body)) return false;

  // Calculate verification digit
  const calculatedDv = calculateDv(parseInt(body, 10));

  return dv === calculatedDv;
}

/**
 * Calculates the verification digit for a RUT body
 */
function calculateDv(rutBody: number): string {
  let sum = 0;
  let multiplier = 2;

  let current = rutBody;
  while (current > 0) {
    sum += (current % 10) * multiplier;
    current = Math.floor(current / 10);
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = 11 - (sum % 11);

  if (remainder === 11) return '0';
  if (remainder === 10) return 'K';
  return remainder.toString();
}

/**
 * Formats a RUT to standard Chilean format: 12.345.678-9
 */
export function formatRut(rut: string): string {
  if (!rut) return '';

  // Clean RUT
  const cleaned = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();

  if (cleaned.length < 2) return rut;

  const body = cleaned.slice(0, -1);
  const dv = cleaned.slice(-1);

  // Add thousand separators
  const formatted = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `${formatted}-${dv}`;
}

/**
 * Cleans a RUT removing all formatting
 */
export function cleanRut(rut: string): string {
  if (!rut) return '';
  return rut.replace(/\./g, '').replace(/-/g, '').toUpperCase();
}
