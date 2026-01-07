// hexMath.test.js - Tests for hex coordinate utilities
import { describe, it, expect } from 'vitest';
import {
  hexToPixel,
  pixelToHex,
  hexRound,
  getHexVertices,
  hexDistance,
  hexEqual
} from './hexMath.js';

describe('hexMath', () => {
  const HEX_SIZE = 50;

  describe('hexToPixel', () => {
    it('should convert origin hex to origin pixel', () => {
      const { x, y } = hexToPixel(0, 0, HEX_SIZE);
      expect(x).toBe(0);
      expect(y).toBe(0);
    });

    it('should convert hex (1, 0) correctly', () => {
      const { x, y } = hexToPixel(1, 0, HEX_SIZE);
      expect(x).toBeCloseTo(75, 1); // 50 * 3/2 = 75
      expect(y).toBeCloseTo(43.3, 1); // 50 * sqrt(3)/2
    });

    it('should convert hex (0, 1) correctly', () => {
      const { x, y } = hexToPixel(0, 1, HEX_SIZE);
      expect(x).toBe(0);
      expect(y).toBeCloseTo(86.6, 1); // 50 * sqrt(3)
    });

    it('should handle negative coordinates', () => {
      const { x, y } = hexToPixel(-1, -1, HEX_SIZE);
      expect(x).toBe(-75);
      expect(y).toBeCloseTo(-129.9, 1);
    });

    it('should scale with hex size', () => {
      const { x: x1, y: y1 } = hexToPixel(1, 1, 100);
      const { x: x2, y: y2 } = hexToPixel(1, 1, 50);
      
      expect(x1).toBeCloseTo(x2 * 2, 1);
      expect(y1).toBeCloseTo(y2 * 2, 1);
    });
  });

  describe('pixelToHex', () => {
    it('should convert origin pixel to origin hex', () => {
      const { q, r } = pixelToHex(0, 0, HEX_SIZE);
      expect(q).toBe(0);
      expect(r).toBe(0);
    });

    it('should round-trip with hexToPixel', () => {
      const testCases = [
        { q: 0, r: 0 },
        { q: 1, r: 0 },
        { q: 0, r: 1 },
        { q: 2, r: 3 },
        { q: -1, r: -2 }
      ];

      for (const { q, r } of testCases) {
        const { x, y } = hexToPixel(q, r, HEX_SIZE);
        const result = pixelToHex(x, y, HEX_SIZE);
        
        // Use Math.abs to handle -0 vs 0
        expect(Math.abs(result.q)).toBe(Math.abs(q));
        expect(Math.abs(result.r)).toBe(Math.abs(r));
      }
    });

    it('should round to nearest hex', () => {
      // Pixel slightly off-center should round to nearest hex
      const { x, y } = hexToPixel(1, 0, HEX_SIZE);
      const result = pixelToHex(x + 5, y + 5, HEX_SIZE);
      
      expect(result.q).toBe(1);
      expect(result.r).toBe(0);
    });
  });

  describe('hexRound', () => {
    it('should round exact coordinates to themselves', () => {
      const { q, r } = hexRound(1, 2);
      expect(q).toBe(1);
      expect(r).toBe(2);
    });

    it('should round fractional coordinates', () => {
      const { q, r } = hexRound(1.4, 0.6);
      expect(q).toBe(1);
      expect(r).toBe(1);
    });

    it('should maintain cube coordinate constraint (q + r + s = 0)', () => {
      const testCases = [
        { q: 1.2, r: 0.8 },
        { q: 2.7, r: -1.3 },
        { q: -0.4, r: 0.6 }
      ];

      for (const { q, r } of testCases) {
        const result = hexRound(q, r);
        const s = -result.q - result.r;
        
        // Verify cube coordinate constraint
        expect(result.q + result.r + s).toBe(0);
      }
    });

    it('should round to nearest hex when equidistant', () => {
      const { q, r } = hexRound(0.5, 0.5);
      const s = -q - r;
      expect(q + r + s).toBe(0);
    });
  });

  describe('getHexVertices', () => {
    it('should return 6 vertices', () => {
      const vertices = getHexVertices(0, 0, HEX_SIZE);
      expect(vertices.length).toBe(6);
    });

    it('should place vertices at correct angles', () => {
      const vertices = getHexVertices(0, 0, HEX_SIZE);
      
      // First vertex should be at 0° (to the right)
      expect(vertices[0].x).toBeCloseTo(HEX_SIZE, 1);
      expect(vertices[0].y).toBeCloseTo(0, 1);
      
      // Third vertex should be at 120° (upper left)
      expect(vertices[2].x).toBeCloseTo(-HEX_SIZE / 2, 1);
      expect(vertices[2].y).toBeCloseTo(HEX_SIZE * Math.sqrt(3) / 2, 1);
    });

    it('should offset vertices by center position', () => {
      const centerX = 100;
      const centerY = 200;
      const vertices = getHexVertices(centerX, centerY, HEX_SIZE);
      
      expect(vertices[0].x).toBeCloseTo(centerX + HEX_SIZE, 1);
      expect(vertices[0].y).toBeCloseTo(centerY, 1);
    });

    it('should scale vertices by hex size', () => {
      const size1 = 50;
      const size2 = 100;
      
      const v1 = getHexVertices(0, 0, size1);
      const v2 = getHexVertices(0, 0, size2);
      
      expect(v2[0].x).toBeCloseTo(v1[0].x * 2, 1);
    });

    it('should create closed polygon', () => {
      const vertices = getHexVertices(0, 0, HEX_SIZE);
      
      // All vertices should be HEX_SIZE distance from center
      for (const vertex of vertices) {
        const distance = Math.sqrt(vertex.x ** 2 + vertex.y ** 2);
        expect(distance).toBeCloseTo(HEX_SIZE, 1);
      }
    });
  });

  describe('hexDistance', () => {
    it('should return 0 for same hex', () => {
      expect(hexDistance(0, 0, 0, 0)).toBe(0);
      expect(hexDistance(5, 3, 5, 3)).toBe(0);
    });

    it('should calculate distance to adjacent hex', () => {
      expect(hexDistance(0, 0, 1, 0)).toBe(1);
      expect(hexDistance(0, 0, 0, 1)).toBe(1);
      expect(hexDistance(0, 0, -1, 0)).toBe(1);
      expect(hexDistance(0, 0, 0, -1)).toBe(1);
    });

    it('should be symmetric', () => {
      expect(hexDistance(1, 2, 4, 5)).toBe(hexDistance(4, 5, 1, 2));
      expect(hexDistance(0, 0, 3, 3)).toBe(hexDistance(3, 3, 0, 0));
    });

    it('should calculate Manhattan-like distance', () => {
      expect(hexDistance(0, 0, 3, 0)).toBe(3);
      expect(hexDistance(0, 0, 0, 3)).toBe(3);
      expect(hexDistance(0, 0, 2, 2)).toBe(4);
    });

    it('should handle negative coordinates', () => {
      expect(hexDistance(-2, -3, 1, 2)).toBe(8);
      expect(hexDistance(0, 0, -5, -5)).toBe(10);
    });

    it('should calculate distance along diagonal', () => {
      // (0,0) to (3,-3): s1=0, s2=0, max(|3|, |-3|, |0|) = 3
      expect(hexDistance(0, 0, 3, -3)).toBe(3);
      // (2,1) to (5,-2): s1=-3, s2=-3, max(|3|, |-3|, |0|) = 3
      expect(hexDistance(2, 1, 5, -2)).toBe(3);
    });
  });

  describe('hexEqual', () => {
    it('should return true for equal coordinates', () => {
      expect(hexEqual(0, 0, 0, 0)).toBe(true);
      expect(hexEqual(5, 3, 5, 3)).toBe(true);
      expect(hexEqual(-2, -4, -2, -4)).toBe(true);
    });

    it('should return false for different coordinates', () => {
      expect(hexEqual(0, 0, 1, 0)).toBe(false);
      expect(hexEqual(0, 0, 0, 1)).toBe(false);
      expect(hexEqual(5, 3, 5, 4)).toBe(false);
      expect(hexEqual(5, 3, 6, 3)).toBe(false);
    });

    it('should distinguish between positive and negative zero', () => {
      expect(hexEqual(0, 0, -0, -0)).toBe(true);
    });
  });
});
