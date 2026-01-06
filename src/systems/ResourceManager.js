// ResourceManager.js - Resource tracking and generation
// REQ-RES-001: Track Iron, Silicon, Energy

import { balance } from '../config/balance.js';

export class ResourceManager {
  constructor() {
    // REQ-RES-001: Track three basic resources
    this.resources = {
      iron: balance.resources.startingResources.iron,
      silicon: balance.resources.startingResources.silicon,
      energy: balance.resources.startingResources.energy
    };

    // Track generation rates for display
    this.generationRates = {
      iron: 0,
      silicon: 0,
      energy: 0
    };
  }

  /**
   * Update resource generation based on delta time
   * REQ-STATE-005: Resource generation updates every frame
   * Section 10: Resource Generation Update algorithm
   * @param {number} deltaTime - Time since last update in milliseconds
   * @param {object} hexGrid - HexGrid instance for tile data
   */
  update(deltaTime, hexGrid) {
    const deltaSeconds = deltaTime / 1000;

    // Reset generation rates
    this.generationRates = { iron: 0, silicon: 0, energy: 0 };

    // REQ-RES-003: Starting base auto-generates Iron
    const startingTile = hexGrid.getStartingTile();
    if (startingTile) {
      const rate = balance.resources.startingTileRate;
      this.resources.iron += rate * deltaSeconds;
      this.generationRates.iron += rate;
    }

    // REQ-RES-004: Deployed drones generate resources
    const tiles = hexGrid.getAllTiles();
    tiles.forEach(tile => {
      if (tile.drones > 0 && tile.type !== 'empty' && !tile.isStarting) {
        const rate = tile.drones * balance.resources.droneGenerationRate;
        this.resources[tile.type] += rate * deltaSeconds;
        this.generationRates[tile.type] += rate;
      }
    });

    // REQ-RES-005: Display resources as whole numbers
    this.resources.iron = Math.max(0, this.resources.iron);
    this.resources.silicon = Math.max(0, this.resources.silicon);
    this.resources.energy = Math.max(0, this.resources.energy);
  }

  /**
   * Get current resource amount
   * @param {string} resourceType - 'iron', 'silicon', or 'energy'
   * @returns {number} - Current amount (floored)
   */
  getResource(resourceType) {
    return Math.floor(this.resources[resourceType] || 0);
  }

  /**
   * Get all resources
   * @returns {object} - All resource amounts (floored)
   */
  getAllResources() {
    return {
      iron: this.getResource('iron'),
      silicon: this.getResource('silicon'),
      energy: this.getResource('energy')
    };
  }

  /**
   * Get resource generation rate
   * @param {string} resourceType - 'iron', 'silicon', or 'energy'
   * @returns {number} - Resources per second
   */
  getGenerationRate(resourceType) {
    return this.generationRates[resourceType] || 0;
  }

  /**
   * Check if player can afford a cost
   * @param {object} cost - Object with resource costs {iron: 50, silicon: 20, ...}
   * @returns {boolean} - True if affordable
   */
  canAfford(cost) {
    for (const [resource, amount] of Object.entries(cost)) {
      if (this.getResource(resource) < amount) {
        return false;
      }
    }
    return true;
  }

  /**
   * Deduct resources for a cost
   * @param {object} cost - Object with resource costs
   * @returns {boolean} - True if successful, false if can't afford
   */
  spend(cost) {
    if (!this.canAfford(cost)) {
      return false;
    }

    for (const [resource, amount] of Object.entries(cost)) {
      this.resources[resource] -= amount;
    }

    return true;
  }

  /**
   * Add resources (for testing or special events)
   * @param {string} resourceType - Resource to add
   * @param {number} amount - Amount to add
   */
  addResource(resourceType, amount) {
    if (this.resources.hasOwnProperty(resourceType)) {
      this.resources[resourceType] += amount;
    }
  }

  /**
   * Get save data
   * @returns {object} - Serializable resource data
   */
  getSaveData() {
    return {
      resources: { ...this.resources }
    };
  }

  /**
   * Load from save data
   * @param {object} data - Save data
   */
  loadSaveData(data) {
    if (data.resources) {
      this.resources = { ...data.resources };
    }
  }
}
