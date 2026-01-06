// balance.js - Game balance values
// REQ-CONFIG-003: Balance values must be configurable

export const balance = {
  // Resource generation rates
  resources: {
    startingTileRate: 1.0,        // Iron/sec from starting base (REQ-RES-003)
    droneGenerationRate: 0.5,     // Resources/sec per drone (REQ-RES-004)
    startingResources: {
      iron: 0,
      silicon: 0,
      energy: 0
    }
  },

  // Drone limits
  drones: {
    maxDronesPerTile: 10,         // Maximum drones deployable per tile
    startingDrones: 0              // Player starts with 0 drones
  },

  // Map settings
  map: {
    gridSize: {
      width: 10,                   // 10×10 grid (REQ-MAP-001)
      height: 10
    },
    hexSize: 50,                   // Hex tile size in pixels (point-to-point ~50-60px)
    startingPosition: {
      q: 5,                        // Center of 10×10 grid
      r: 3
    }
  },

  // Game loop settings
  gameLoop: {
    targetFPS: 60,
    autoSaveInterval: 10000        // Auto-save every 10 seconds (REQ-STATE-002)
  }
};
