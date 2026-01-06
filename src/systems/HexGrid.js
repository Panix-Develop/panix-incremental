// HexGrid.js - Hex map logic and tile data management
// REQ-MAP-002: Manage tile data structure

import { mapConfig } from '../config/mapConfig.js';
import { balance } from '../config/balance.js';

export class HexGrid {
  constructor() {
    this.tiles = new Map(); // Map of "q,r" -> tile object
    this.width = mapConfig.width;
    this.height = mapConfig.height;
    this.startingTile = mapConfig.startingTile;
    
    this.initializeTiles();
  }

  /**
   * Initialize all tiles from map config
   * REQ-MAP-001: Initialize 10×10 grid
   */
  initializeTiles() {
    const layout = mapConfig.layout;
    
    for (let row = 0; row < this.height; row++) {
      for (let col = 0; col < this.width; col++) {
        // Convert offset coordinates to axial (q, r)
        const q = col;
        const r = row - Math.floor(col / 2);
        
        // Get resource type from layout
        let resourceType = layout[row][col];
        
        // Check if this is the starting base
        const isStartingBase = (q === this.startingTile.q && r === this.startingTile.r);
        
        // Starting base generates iron
        if (isStartingBase && resourceType === 'start') {
          resourceType = 'iron';
        }
        
        // Create tile object (REQ-MAP-002)
        const tile = {
          q: q,
          r: r,
          type: resourceType,
          drones: 0,
          maxDrones: balance.drones.maxDronesPerTile,
          isStarting: isStartingBase
        };
        
        // Store in map
        this.tiles.set(this.getTileKey(q, r), tile);
      }
    }
  }

  /**
   * Get tile key for Map storage
   * @param {number} q - Q coordinate
   * @param {number} r - R coordinate
   * @returns {string} - Key string "q,r"
   */
  getTileKey(q, r) {
    return `${q},${r}`;
  }

  /**
   * Get tile at coordinates
   * @param {number} q - Q coordinate
   * @param {number} r - R coordinate
   * @returns {object|null} - Tile object or null
   */
  getTile(q, r) {
    return this.tiles.get(this.getTileKey(q, r)) || null;
  }

  /**
   * Get all tiles as array
   * @returns {Array} - Array of all tile objects
   */
  getAllTiles() {
    return Array.from(this.tiles.values());
  }

  /**
   * Update tile drone count
   * @param {number} q - Q coordinate
   * @param {number} r - R coordinate
   * @param {number} count - New drone count
   */
  setTileDrones(q, r, count) {
    const tile = this.getTile(q, r);
    if (tile) {
      tile.drones = Math.min(count, tile.maxDrones);
    }
  }

  /**
   * Increment tile drone count
   * @param {number} q - Q coordinate
   * @param {number} r - R coordinate
   * @returns {boolean} - True if successful, false if at capacity
   */
  addDroneToTile(q, r) {
    const tile = this.getTile(q, r);
    if (tile && tile.drones < tile.maxDrones) {
      tile.drones++;
      return true;
    }
    return false;
  }

  /**
   * Check if tile can accept more drones
   * @param {number} q - Q coordinate
   * @param {number} r - R coordinate
   * @returns {boolean} - True if tile has capacity
   */
  canDeployDrone(q, r) {
    const tile = this.getTile(q, r);
    return tile && 
           tile.type !== 'empty' && 
           !tile.isStarting &&
           tile.drones < tile.maxDrones;
  }

  /**
   * Get resource generation rate for a tile
   * @param {number} q - Q coordinate
   * @param {number} r - R coordinate
   * @returns {number} - Resources per second
   */
  getTileGenerationRate(q, r) {
    const tile = this.getTile(q, r);
    if (!tile) return 0;
    
    // Starting base has fixed iron generation rate
    if (tile.isStarting) {
      return balance.resources.startingTileRate;
    }
    
    // Resource tiles generate based on drone count
    if (tile.type !== 'empty') {
      return tile.drones * balance.resources.droneGenerationRate;
    }
    
    return 0;
  }

  /**
   * Get the starting tile
   * @returns {object} - Starting tile object
   */
  getStartingTile() {
    return this.getTile(this.startingTile.q, this.startingTile.r);
  }
}
