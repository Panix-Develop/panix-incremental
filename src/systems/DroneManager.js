// DroneManager.js - Drone building and deployment management
// REQ-DRONE-005: Manage drone inventory and deployments

import { recipes } from '../config/recipes.js';

export class DroneManager {
  constructor(craftingManager, hexGrid) {
    this.craftingManager = craftingManager;
    this.hexGrid = hexGrid;
    
    // REQ-DRONE-005: Track drone inventory
    this.totalBuilt = 0;
    this.availableDrones = 0;
    
    // Track deployments: array of {q, r, droneType}
    this.deployments = [];
  }

  /**
   * Build a drone from components
   * REQ-DRONE-001: Build drones from components
   * REQ-DRONE-003: Deduct components and increment available
   * @param {string} droneType - Type of drone to build (e.g., 'basicGatherer')
   * @returns {object} - {success: boolean, error?: string}
   */
  buildDrone(droneType) {
    // Get recipe
    const recipe = recipes.drones[droneType];
    if (!recipe) {
      return {
        success: false,
        error: `Unknown drone type: ${droneType}`
      };
    }

    // Check if player has required components
    if (!this.craftingManager.hasComponents(recipe.components)) {
      return {
        success: false,
        error: 'Insufficient components'
      };
    }

    // Consume components
    if (!this.craftingManager.consumeComponents(recipe.components)) {
      return {
        success: false,
        error: 'Failed to consume components'
      };
    }

    // Add drone to inventory
    this.availableDrones++;
    this.totalBuilt++;

    return {
      success: true
    };
  }

  /**
   * Deploy a drone to a tile
   * REQ-DEPLOY-001: Deploy drones to resource tiles
   * REQ-DEPLOY-002: Update tile and inventory
   * @param {number} q - Tile q coordinate
   * @param {number} r - Tile r coordinate
   * @returns {object} - {success: boolean, error?: string}
   */
  deployDrone(q, r) {
    // Check if player has available drones
    if (this.availableDrones <= 0) {
      return {
        success: false,
        error: 'No drones available'
      };
    }

    // Get tile
    const tile = this.hexGrid.getTile(q, r);
    if (!tile) {
      return {
        success: false,
        error: 'Invalid tile'
      };
    }

    // REQ-DEPLOY-004: Cannot deploy to starting tile
    if (tile.isStarting) {
      return {
        success: false,
        error: 'Cannot deploy to starting tile'
      };
    }

    // REQ-DEPLOY-001: Cannot deploy to empty tiles
    if (tile.type === 'empty') {
      return {
        success: false,
        error: 'Cannot deploy to empty tile'
      };
    }

    // Check if tile has capacity
    if (!this.hexGrid.canDeployDrone(q, r)) {
      return {
        success: false,
        error: 'Tile at maximum capacity'
      };
    }

    // Deploy drone
    if (!this.hexGrid.addDroneToTile(q, r)) {
      return {
        success: false,
        error: 'Failed to deploy drone'
      };
    }

    // Deduct from available
    this.availableDrones--;

    // Track deployment
    this.deployments.push({
      q,
      r,
      droneType: 'basicGatherer' // Only one type in PoC
    });

    return {
      success: true
    };
  }

  /**
   * Remove a drone from a tile
   * @param {number} q - Tile q coordinate
   * @param {number} r - Tile r coordinate
   * @returns {object} - {success: boolean, error?: string}
   */
  removeDrone(q, r) {
    // Get tile
    const tile = this.hexGrid.getTile(q, r);
    if (!tile) {
      return {
        success: false,
        error: 'Invalid tile'
      };
    }

    // Check if tile has drones
    if (tile.drones <= 0) {
      return {
        success: false,
        error: 'No drones on this tile'
      };
    }

    // Remove drone from tile
    this.hexGrid.setTileDrones(q, r, tile.drones - 1);

    // Return drone to available pool
    this.availableDrones++;

    // Remove from deployments array
    const deploymentIndex = this.deployments.findIndex(
      d => d.q === q && d.r === r
    );
    if (deploymentIndex !== -1) {
      this.deployments.splice(deploymentIndex, 1);
    }

    return {
      success: true
    };
  }

  /**
   * Get number of available drones
   * REQ-DRONE-004: Display available drone count
   * @returns {number}
   */
  getAvailableDrones() {
    return this.availableDrones;
  }

  /**
   * Get total drones built
   * @returns {number}
   */
  getTotalBuilt() {
    return this.totalBuilt;
  }

  /**
   * Get all deployments
   * @returns {array}
   */
  getDeployments() {
    return [...this.deployments];
  }

  /**
   * Check if player can build a drone
   * @param {string} droneType - Drone type
   * @returns {boolean}
   */
  canBuildDrone(droneType) {
    const recipe = recipes.drones[droneType];
    if (!recipe) return false;
    return this.craftingManager.hasComponents(recipe.components);
  }

  /**
   * Get save data
   * @returns {object}
   */
  getSaveData() {
    return {
      totalBuilt: this.totalBuilt,
      availableDrones: this.availableDrones,
      deployments: [...this.deployments]
    };
  }

  /**
   * Load from save data
   * @param {object} data
   */
  loadSaveData(data) {
    if (data.totalBuilt !== undefined) {
      this.totalBuilt = data.totalBuilt;
    }
    if (data.availableDrones !== undefined) {
      this.availableDrones = data.availableDrones;
    }
    if (data.deployments) {
      this.deployments = [...data.deployments];
      
      // Restore drones to tiles
      this.deployments.forEach(deployment => {
        this.hexGrid.addDroneToTile(deployment.q, deployment.r);
      });
    }
  }
}
