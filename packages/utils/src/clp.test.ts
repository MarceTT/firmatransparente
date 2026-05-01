import { describe, it, expect } from 'vitest';
import { formatCLP, parseCLP, formatCLPCompact } from './clp';

describe('formatCLP', () => {
  it('formats numbers as CLP', () => {
    expect(formatCLP(1000)).toBe('$1.000');
    expect(formatCLP(1234567)).toBe('$1.234.567');
    expect(formatCLP(0)).toBe('$0');
  });

  it('rounds decimals', () => {
    expect(formatCLP(1234.56)).toBe('$1.235');
  });
});

describe('parseCLP', () => {
  it('parses CLP strings to numbers', () => {
    expect(parseCLP('$1.234.567')).toBe(1234567);
    expect(parseCLP('$1.000')).toBe(1000);
    expect(parseCLP('$0')).toBe(0);
  });

  it('handles invalid input', () => {
    expect(parseCLP('')).toBe(0);
    expect(parseCLP('invalid')).toBe(0);
  });
});

describe('formatCLPCompact', () => {
  it('formats large amounts with suffix', () => {
    expect(formatCLPCompact(1500000)).toBe('$1,5 millones');
    expect(formatCLPCompact(50000)).toBe('$50 mil');
    expect(formatCLPCompact(500)).toBe('$500');
  });
});
