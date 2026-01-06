// hexMath.js - Hex coordinate conversion utilities
// Section 7.3: Hex Grid Implementation using axial coordinates (q, r)

/**
 * Convert axial hex coordinates (q, r) to pixel position
 * Uses flat-top hexagon orientation
 * @param {number} q - Column coordinate
 * @param {number} r - Row coordinate
 * @param {number} size - Hex size (point-to-point radius)
 * @returns {{x: number, y: number}} - Pixel coordinates
 */
export function hexToPixel(q, r, size) {
  const x = size * (3/2 * q);
  const y = size * (Math.sqrt(3)/2 * q + Math.sqrt(3) * r);
  return { x, y };
}

/**
 * Convert pixel coordinates to axial hex coordinates (q, r)
 * Uses flat-top hexagon orientation
 * @param {number} x - Pixel x position
 * @param {number} y - Pixel y position
 * @param {number} size - Hex size (point-to-point radius)
 * @returns {{q: number, r: number}} - Axial coordinates (rounded)
 */
export function pixelToHex(x, y, size) {
  // Convert pixel to fractional axial coordinates
  const q = (2/3 * x) / size;
  const r = (-1/3 * x + Math.sqrt(3)/3 * y) / size;
  
  // Round to nearest hex
  return hexRound(q, r);
}

/**
 * Round fractional axial coordinates to nearest hex
 * @param {number} q - Fractional q coordinate
 * @param {number} r - Fractional r coordinate
 * @returns {{q: number, r: number}} - Rounded coordinates
 */
export function hexRound(q, r) {
  // Convert to cube coordinates for rounding
  const s = -q - r;
  
  let rq = Math.round(q);
  let rr = Math.round(r);
  let rs = Math.round(s);
  
  const qDiff = Math.abs(rq - q);
  const rDiff = Math.abs(rr - r);
  const sDiff = Math.abs(rs - s);
  
  // Reset the component with largest change
  if (qDiff > rDiff && qDiff > sDiff) {
    rq = -rr - rs;
  } else if (rDiff > sDiff) {
    rr = -rq - rs;
  }
  
  return { q: rq, r: rr };
}

/**
 * Get the six vertices of a flat-top hexagon
 * @param {number} centerX - Center x position
 * @param {number} centerY - Center y position
 * @param {number} size - Hex size (point-to-point radius)
 * @returns {Array<{x: number, y: number}>} - Array of 6 vertices
 */
export function getHexVertices(centerX, centerY, size) {
  const vertices = [];
  // Flat-top hexagon has vertices at 30° intervals starting from 0°
  for (let i = 0; i < 6; i++) {
    const angleDeg = 60 * i;
    const angleRad = (Math.PI / 180) * angleDeg;
    vertices.push({
      x: centerX + size * Math.cos(angleRad),
      y: centerY + size * Math.sin(angleRad)
    });
  }
  return vertices;
}

/**
 * Calculate distance between two hexes (in hex steps)
 * @param {number} q1 - First hex q coordinate
 * @param {number} r1 - First hex r coordinate
 * @param {number} q2 - Second hex q coordinate
 * @param {number} r2 - Second hex r coordinate
 * @returns {number} - Distance in hex steps
 */
export function hexDistance(q1, r1, q2, r2) {
  // Convert to cube coordinates
  const s1 = -q1 - r1;
  const s2 = -q2 - r2;
  
  return Math.max(
    Math.abs(q1 - q2),
    Math.abs(r1 - r2),
    Math.abs(s1 - s2)
  );
}

/**
 * Check if two hex coordinates are equal
 * @param {number} q1 - First hex q coordinate
 * @param {number} r1 - First hex r coordinate
 * @param {number} q2 - Second hex q coordinate
 * @param {number} r2 - Second hex r coordinate
 * @returns {boolean} - True if coordinates match
 */
export function hexEqual(q1, r1, q2, r2) {
  return q1 === q2 && r1 === r2;
}
