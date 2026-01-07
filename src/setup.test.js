// Basic setup test to verify Vitest is working
import { describe, it, expect } from 'vitest';

describe('Vitest Setup', () => {
  it('should run basic tests', () => {
    expect(true).toBe(true);
  });

  it('should perform basic math', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle objects', () => {
    const obj = { name: 'test', value: 42 };
    expect(obj).toEqual({ name: 'test', value: 42 });
  });
});
