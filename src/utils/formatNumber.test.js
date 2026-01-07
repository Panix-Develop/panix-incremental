// formatNumber.test.js - Tests for number formatting utilities
import { describe, it, expect } from 'vitest';
import {
  formatNormal,
  formatScientific,
  formatEngineering,
  formatNumber
} from './formatNumber.js';

describe('formatNumber', () => {
  describe('formatNormal', () => {
    it('should format zero', () => {
      expect(formatNormal(0)).toBe('0');
    });

    it('should format small numbers with decimals', () => {
      expect(formatNormal(1.23)).toBe('1.23');
      expect(formatNormal(5.67)).toBe('5.67');
      expect(formatNormal(9.99)).toBe('9.99');
    });

    it('should format numbers 10-999 without decimals', () => {
      expect(formatNormal(10)).toBe('10');
      expect(formatNormal(123)).toBe('123');
      expect(formatNormal(999)).toBe('999');
    });

    it('should format thousands with K suffix', () => {
      expect(formatNormal(1000)).toBe('1.00K');
      expect(formatNormal(1234)).toBe('1.23K');
      expect(formatNormal(9999)).toBe('10.00K'); // scaled value is 9.999 which is < 10
    });

    it('should format millions with M suffix', () => {
      expect(formatNormal(1000000)).toBe('1.00M');
      expect(formatNormal(1234567)).toBe('1.23M');
      expect(formatNormal(9999999)).toBe('10.00M'); // scaled value is 9.999999 which is < 10
    });

    it('should format billions with B suffix', () => {
      expect(formatNormal(1000000000)).toBe('1.00B');
      expect(formatNormal(1234567890)).toBe('1.23B');
    });

    it('should format trillions with T suffix', () => {
      expect(formatNormal(1e12)).toBe('1.00T');
      expect(formatNormal(5.5e12)).toBe('5.50T');
    });

    it('should use higher suffixes for large numbers', () => {
      expect(formatNormal(1e15)).toBe('1.00Qa');
      expect(formatNormal(1e18)).toBe('1.00Qi');
      expect(formatNormal(1e21)).toBe('1.00Sx');
    });

    it('should use scientific notation for very large numbers', () => {
      const result = formatNormal(1e100);
      expect(result).toContain('e');
    });

    it('should handle negative numbers', () => {
      expect(formatNormal(-123)).toBe('-123');
      expect(formatNormal(-1234)).toBe('-1.23K');
      expect(formatNormal(-1000000)).toBe('-1.00M');
    });

    it('should show 2 decimals for scaled values < 10', () => {
      expect(formatNormal(1234)).toBe('1.23K');
      expect(formatNormal(5678)).toBe('5.68K');
    });

    it('should show 1 decimal for scaled values >= 10', () => {
      expect(formatNormal(12345)).toBe('12.3K');
      expect(formatNormal(99999)).toBe('100.0K'); // 99.999 -> 100.0
    });
  });

  describe('formatScientific', () => {
    it('should format zero', () => {
      expect(formatScientific(0)).toBe('0');
    });

    it('should format small numbers normally', () => {
      expect(formatScientific(1.23)).toBe('1.23');
      expect(formatScientific(123)).toBe('123');
      expect(formatScientific(999)).toBe('999');
    });

    it('should use scientific notation for numbers >= 1000', () => {
      expect(formatScientific(1000)).toBe('1.00e+3');
      expect(formatScientific(1234)).toBe('1.23e+3');
      expect(formatScientific(1234567)).toBe('1.23e+6');
    });

    it('should handle very large numbers', () => {
      expect(formatScientific(1e20)).toBe('1.00e+20');
      expect(formatScientific(5.5e50)).toBe('5.50e+50');
    });

    it('should handle negative numbers', () => {
      expect(formatScientific(-123)).toBe('-123');
      expect(formatScientific(-1234)).toBe('-1.23e+3');
      expect(formatScientific(-1000000)).toBe('-1.00e+6');
    });

    it('should show 2 decimal places', () => {
      expect(formatScientific(12345)).toBe('1.23e+4');
      expect(formatScientific(98765)).toBe('9.88e+4');
    });
  });

  describe('formatEngineering', () => {
    it('should format zero', () => {
      expect(formatEngineering(0)).toBe('0');
    });

    it('should format small numbers normally', () => {
      expect(formatEngineering(1.23)).toBe('1.23');
      expect(formatEngineering(123)).toBe('123');
      expect(formatEngineering(999)).toBe('999');
    });

    it('should use exponents divisible by 3', () => {
      expect(formatEngineering(1000)).toBe('1.00e3');
      expect(formatEngineering(1234)).toBe('1.23e3');
      expect(formatEngineering(12345)).toBe('12.3e3');
      expect(formatEngineering(123456)).toBe('123e3');
    });

    it('should adjust mantissa to keep exponent divisible by 3', () => {
      expect(formatEngineering(1e4)).toBe('10.0e3');
      expect(formatEngineering(1e5)).toBe('100e3');
      expect(formatEngineering(1e6)).toBe('1.00e6');
    });

    it('should handle millions correctly', () => {
      expect(formatEngineering(1000000)).toBe('1.00e6');
      expect(formatEngineering(5500000)).toBe('5.50e6');
    });

    it('should handle negative numbers', () => {
      expect(formatEngineering(-123)).toBe('-123');
      expect(formatEngineering(-1234)).toBe('-1.23e3');
      expect(formatEngineering(-1000000)).toBe('-1.00e6');
    });

    it('should adjust decimal places based on mantissa', () => {
      expect(formatEngineering(1234)).toBe('1.23e3');      // mantissa < 10: 2 decimals
      expect(formatEngineering(12345)).toBe('12.3e3');     // mantissa < 100: 1 decimal
      expect(formatEngineering(123456)).toBe('123e3');     // mantissa >= 100: 0 decimals
    });

    it('should handle very large numbers', () => {
      expect(formatEngineering(1e20)).toBe('100e18');
      expect(formatEngineering(1e21)).toBe('1.00e21');
    });
  });

  describe('formatNumber (main function)', () => {
    it('should default to normal format', () => {
      expect(formatNumber(1234)).toBe(formatNormal(1234));
      expect(formatNumber(1000000)).toBe(formatNormal(1000000));
    });

    it('should use normal format when specified', () => {
      expect(formatNumber(1234, 'normal')).toBe('1.23K');
      expect(formatNumber(1000000, 'normal')).toBe('1.00M');
    });

    it('should use scientific format when specified', () => {
      expect(formatNumber(1234, 'scientific')).toBe('1.23e+3');
      expect(formatNumber(1000000, 'scientific')).toBe('1.00e+6');
    });

    it('should use engineering format when specified', () => {
      expect(formatNumber(1234, 'engineering')).toBe('1.23e3');
      expect(formatNumber(1000000, 'engineering')).toBe('1.00e6');
    });

    it('should handle NaN', () => {
      expect(formatNumber(NaN)).toBe('0');
      expect(formatNumber(NaN, 'scientific')).toBe('0');
    });

    it('should handle undefined', () => {
      expect(formatNumber(undefined)).toBe('0');
    });

    it('should handle null', () => {
      expect(formatNumber(null)).toBe('0');
    });

    it('should handle non-number types', () => {
      expect(formatNumber('not a number')).toBe('0');
      expect(formatNumber({})).toBe('0');
      expect(formatNumber([])).toBe('0');
    });

    it('should handle positive infinity', () => {
      expect(formatNumber(Infinity)).toBe('∞');
      expect(formatNumber(Infinity, 'scientific')).toBe('∞');
      expect(formatNumber(Infinity, 'engineering')).toBe('∞');
    });

    it('should handle negative infinity', () => {
      expect(formatNumber(-Infinity)).toBe('-∞');
      expect(formatNumber(-Infinity, 'scientific')).toBe('-∞');
      expect(formatNumber(-Infinity, 'engineering')).toBe('-∞');
    });

    it('should handle invalid format type gracefully', () => {
      expect(formatNumber(1234, 'invalid')).toBe('1.23K'); // Defaults to normal
    });
  });

  describe('edge cases', () => {
    it('should handle very small positive numbers', () => {
      // Numbers less than 10 get toFixed(2)
      expect(formatNormal(0.01)).toBe('0.01');
      expect(formatNormal(0.001)).toBe('0.00');
    });

    it('should handle numbers near suffix boundaries', () => {
      expect(formatNormal(999)).toBe('999');
      expect(formatNormal(1000)).toBe('1.00K');
      expect(formatNormal(999999)).toBe('1000.0K'); // 999.999 rounds to 1000.0
      expect(formatNormal(1000000)).toBe('1.00M');
    });

    it('should handle rounding edge cases', () => {
      expect(formatNormal(999.5)).toBe('999');
      expect(formatNormal(999.99)).toBe('999');
    });

    it('should maintain precision for decimals', () => {
      expect(formatNormal(1.005)).toBe('1.00'); // toFixed rounds down due to floating point
      expect(formatNormal(9.995)).toBe('9.99'); // JavaScript banker's rounding
    });
  });
});
