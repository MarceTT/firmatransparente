import { describe, it, expect } from 'vitest';
import { validateRut, formatRut, cleanRut } from './rut';

describe('validateRut', () => {
  it('validates correct RUTs', () => {
    expect(validateRut('12.345.678-5')).toBe(true);
    expect(validateRut('12345678-5')).toBe(true);
    expect(validateRut('123456785')).toBe(true);
    expect(validateRut('11.111.111-1')).toBe(true);
    expect(validateRut('22.222.222-2')).toBe(true);
  });

  it('validates RUTs with K', () => {
    // 10.000.013-K is a valid RUT with K as check digit
    expect(validateRut('10.000.013-K')).toBe(true);
    expect(validateRut('10.000.013-k')).toBe(true);
  });

  it('rejects invalid RUTs', () => {
    expect(validateRut('12.345.678-0')).toBe(false);
    expect(validateRut('12.345.678-K')).toBe(false);
    expect(validateRut('')).toBe(false);
    expect(validateRut('abc')).toBe(false);
  });
});

describe('formatRut', () => {
  it('formats RUTs correctly', () => {
    expect(formatRut('123456785')).toBe('12.345.678-5');
    expect(formatRut('12345678-5')).toBe('12.345.678-5');
    expect(formatRut('12.345.678-5')).toBe('12.345.678-5');
  });

  it('handles RUTs with K', () => {
    expect(formatRut('10000013k')).toBe('10.000.013-K');
  });
});

describe('cleanRut', () => {
  it('cleans RUTs correctly', () => {
    expect(cleanRut('12.345.678-5')).toBe('123456785');
    expect(cleanRut('10.000.013-k')).toBe('10000013K');
  });
});
