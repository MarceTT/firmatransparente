/**
 * Chilean Peso (CLP) formatting utilities
 * CLP has no decimal places
 */

/**
 * Formats a number as Chilean Pesos: $1.234.567
 */
export function formatCLP(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0';

  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');

  return `$${formatted}`;
}

/**
 * Parses a CLP formatted string back to number
 * "$1.234.567" -> 1234567
 */
export function parseCLP(formatted: string): number {
  if (!formatted || typeof formatted !== 'string') return 0;

  const cleaned = formatted.replace(/\$/g, '').replace(/\./g, '').trim();
  const parsed = parseInt(cleaned, 10);

  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats a number as CLP with "millones" suffix for large amounts
 * 1500000 -> "$1,5 millones"
 */
export function formatCLPCompact(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return '$0';

  if (amount >= 1_000_000) {
    const millions = amount / 1_000_000;
    const formatted = millions.toFixed(1).replace('.', ',');
    return `$${formatted} millones`;
  }

  if (amount >= 1_000) {
    const thousands = amount / 1_000;
    const formatted = thousands.toFixed(0);
    return `$${formatted} mil`;
  }

  return formatCLP(amount);
}
