// StructureManager.js - Manages structure building, placement, and generation
// Handles structure lifecycle: building, demolishing, energy generation

import { STRUCTURE_TYPES, getStructure, canBuildOnTileType, getStructureCost } from '../config/structures.js';
import { balance } from '../config/balance.js';

export class StructureManager {
  constructor(resourceManager = null) {
    this.resourceManager = resourceManager;
    
    // Structure placement data
    // Map of "q,r" -> { structureType, buildTime, stats }
    this.structures = new Map();
    
    // Generation tracking
    this.lastUpdateTime = Date.now();
  }
  
  /**
   * Set or update the resource manager
   * @param {ResourceManager} resourceManager - Resource manager instance
   */
  setResourceManager(resourceManager) {
    this.resourceManager = resourceManager;
  }
  
  /**
   * Check if a structure can be built at a location
   * @param {string} structureType - Structure type to build
   * @param {number} q - Hex q coordinate
   * @param {number} r - Hex r coordinate
   * @param {object} tile - Tile data from HexGrid
   * @returns {object} { canBuild: boolean, reason: string }
   */
  canBuildStructure(structureType, q, r, tile) {
    // Check if structure type exists
    const structure = getStructure(structureType);
    if (!structure) {
      return { canBuild: false, reason: 'Unknown structure type' };
    }
    
    // Check if tile already has a structure
    const key = `${q},${r}`;
    if (this.structures.has(key)) {
      return { canBuild: false, reason: 'Tile already has a structure' };
    }
    
    // Check if structure can be built on this tile type
    if (!canBuildOnTileType(structureType, tile.type)) {
      return { canBuild: false, reason: 'Cannot build on this tile type' };
    }
    
    // Check if player has enough resources
    if (this.resourceManager) {
      const costs = getStructureCost(structureType);
      if (costs) {
        for (const [resource, amount] of Object.entries(costs)) {
          if (this.resourceManager.getResource(resource) < amount) {
            return { canBuild: false, reason: 'Insufficient resources' };
          }
        }
      }
    }
    
    return { canBuild: true, reason: '' };
  }
  
  /**
   * Build a structure at a location
   * @param {string} structureType - Structure type to build
   * @param {number} q - Hex q coordinate
   * @param {number} r - Hex r coordinate
   * @param {object} tile - Tile data from HexGrid
   * @returns {boolean} True if structure was built successfully
   */
  buildStructure(structureType, q, r, tile) {
    const check = this.canBuildStructure(structureType, q, r, tile);
    if (!check.canBuild) {
      console.warn(`Cannot build structure: ${check.reason}`);
      return false;
    }
    
    const structure = getStructure(structureType);
    
    // Deduct resources
    if (this.resourceManager) {
      const costs = getStructureCost(structureType);
      for (const [resource, amount] of Object.entries(costs)) {
        this.resourceManager.removeResource(resource, amount);
      }
    }
    
    // Place structure
    const key = `${q},${r}`;
    this.structures.set(key, {
      structureType: structureType,
      q: q,
      r: r,
      buildTime: Date.now(),
      stats: { ...structure.stats }  // Copy stats
    });
    
    // Emit event for UI updates
    window.dispatchEvent(new CustomEvent('structureBuilt', {
      detail: { structureType, q, r }
    }));
    
    return true;
  }
  
  /**
   * Demolish a structure at a location
   * @param {number} q - Hex q coordinate
   * @param {number} r - Hex r coordinate
   * @returns {boolean} True if structure was demolished
   */
  demolishStructure(q, r) {
    const key = `${q},${r}`;
    const structure = this.structures.get(key);
    
    if (!structure) {
      return false;
    }
    
    // Remove structure
    this.structures.delete(key);
    
    // TODO: Optionally refund some resources
    
    // Emit event for UI updates
    window.dispatchEvent(new CustomEvent('structureDemolished', {
      detail: { q, r }
    }));
    
    return true;
  }
  
  /**
   * Get structure at a location
   * @param {number} q - Hex q coordinate
   * @param {number} r - Hex r coordinate
   * @returns {object|null} Structure data or null
   */
  getStructureAt(q, r) {
    const key = `${q},${r}`;
    return this.structures.get(key) || null;
  }
  
  /**
   * Check if a tile has a structure
   * @param {number} q - Hex q coordinate
   * @param {number} r - Hex r coordinate
   * @returns {boolean} True if tile has a structure
   */
  hasStructure(q, r) {
    const key = `${q},${r}`;
    return this.structures.has(key);
  }
  
  /**
   * Get all structures
   * @returns {Array<object>} Array of all structure data
   */
  getAllStructures() {
    return Array.from(this.structures.values());
  }
  
  /**
   * Get count of structures by type
   * @param {string} structureType - Structure type to count
   * @returns {number} Count of structures of this type
   */
  getStructureCount(structureType) {
    return this.getAllStructures().filter(s => s.structureType === structureType).length;
  }
  
  /**
   * Calculate total energy generation from all structures
   * @returns {number} Total energy per second
   */
  getTotalEnergyGeneration() {
    let total = 0;
    for (const structure of this.structures.values()) {
      if (structure.stats.energyPerSecond) {
        total += structure.stats.energyPerSecond;
      }
    }
    return total;
  }
  
  /**
   * Save structures to storage
   * @returns {object} Serialized structures data
   */
  save() {
    const structuresArray = Array.from(this.structures.entries()).map(([key, data]) => {
      return {
        key: key,
        ...data
      };
    });
    
    return {
      structures: structuresArray,
      lastUpdateTime: this.lastUpdateTime
    };
  }
  
  /**
   * Load structures from storage
   * @param {object} data - Saved structures data
   */
  load(data) {
    if (!data || !data.structures) return;
    
    // Clear existing structures
    this.structures.clear();
    
    // Load structures
    for (const structureData of data.structures) {
      const { key, ...structure } = structureData;
      this.structures.set(key, structure);
    }
    
    this.lastUpdateTime = data.lastUpdateTime || Date.now();
  }
  
  /**
   * Reset all structures (for hard reset)
   */
  reset() {
    this.structures.clear();
    this.lastUpdateTime = Date.now();
  }
}
