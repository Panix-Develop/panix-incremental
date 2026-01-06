// mapConfig.js - Map layout and tile resource distribution
// REQ-CONFIG-001: Map configuration in separate config file
// Based on Appendix B: Map Layout Example

export const mapConfig = {
  // Grid dimensions
  width: 10,
  height: 10,

  // Starting position (center of map)
  startingTile: {
    q: 5,
    r: 3
  },

  // Tile resource layout (10×10 grid)
  // Row-by-row definition using offset coordinates
  // Types: 'iron', 'silicon', 'energy', 'empty', 'start' (starting base)
  layout: [
    // Row 0
    ['empty', 'empty', 'iron', 'empty', 'empty', 'energy', 'empty', 'empty', 'silicon', 'empty'],
    // Row 1
    ['empty', 'iron', 'empty', 'empty', 'silicon', 'empty', 'energy', 'empty', 'empty', 'empty'],
    // Row 2
    ['iron', 'empty', 'empty', 'silicon', 'empty', 'empty', 'empty', 'iron', 'empty', 'energy'],
    // Row 3
    ['empty', 'empty', 'energy', 'empty', 'empty', 'start', 'empty', 'empty', 'silicon', 'empty'],
    // Row 4
    ['empty', 'silicon', 'empty', 'empty', 'iron', 'empty', 'iron', 'empty', 'empty', 'empty'],
    // Row 5
    ['energy', 'empty', 'empty', 'iron', 'empty', 'empty', 'empty', 'energy', 'empty', 'silicon'],
    // Row 6
    ['empty', 'empty', 'silicon', 'empty', 'empty', 'energy', 'empty', 'empty', 'iron', 'empty'],
    // Row 7
    ['empty', 'iron', 'empty', 'empty', 'silicon', 'empty', 'empty', 'empty', 'empty', 'energy'],
    // Row 8
    ['silicon', 'empty', 'energy', 'empty', 'empty', 'iron', 'empty', 'empty', 'empty', 'empty'],
    // Row 9
    ['empty', 'empty', 'empty', 'iron', 'empty', 'empty', 'silicon', 'empty', 'energy', 'empty']
  ]
};

// Resource counts (for reference):
// Iron: ~10 tiles
// Silicon: ~10 tiles
// Energy: ~10 tiles
// Empty: ~69 tiles
// Start: 1 tile
