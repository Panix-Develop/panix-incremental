// ConfigManager.js - Configuration validation and management system
// REQ-CFG-007: Configuration validation

import { getAllResources } from '../config/resources.js';
import { getAllTileTypes } from '../config/tiles.js';
import { getAllStructures } from '../config/structures.js';
import { getAllDroneRecipes } from '../config/recipes.js';

/**
 * ConfigManager - Validates and manages configuration changes
 * Ensures data integrity when modifying resources, tiles, structures, and drones
 */
export class ConfigManager {
  /**
   * Create a ConfigManager instance
   */
  constructor() {
    this.resources = null;
    this.tileTypes = null;
    this.structures = null;
    this.drones = null;
  }

  /**
   * Refresh config data from sources
   */
  refresh() {
    this.resources = getAllResources();
    this.tileTypes = getAllTileTypes();
    this.structures = getAllStructures();
    this.drones = getAllDroneRecipes();
  }

  /**
   * Validate a resource definition
   * REQ-CFG-007: Validate resource configuration
   * @param {object} resourceData - Resource data to validate
   * @returns {{valid: boolean, errors: string[]}} Validation result
   */
  validateResource(resourceData) {
    const errors = [];

    // Check required fields
    if (!resourceData.id) {
      errors.push('Resource ID is required');
    }
    if (!resourceData.name) {
      errors.push('Resource name is required');
    }
    if (!resourceData.icon) {
      errors.push('Resource icon is required');
    }

    // Check ID format: alphanumeric + hyphen/underscore only
    if (resourceData.id && !/^[a-zA-Z0-9_-]+$/.test(resourceData.id)) {
      errors.push('Resource ID must contain only letters, numbers, hyphens, and underscores');
    }

    // Check ID uniqueness (refresh to get latest data)
    this.refresh();
    const existingResource = this.resources[resourceData.id];
    if (existingResource && !resourceData._isEdit) {
      errors.push(`Resource ID '${resourceData.id}' is already in use`);
    }

    // Validate baseRate is a number
    if (resourceData.baseRate !== undefined && typeof resourceData.baseRate !== 'number') {
      errors.push('Base rate must be a number');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate a tile type definition
   * REQ-CFG-007: Validate tile type configuration
   * @param {object} tileData - Tile type data to validate
   * @returns {{valid: boolean, errors: string[]}} Validation result
   */
  validateTileType(tileData) {
    const errors = [];

    // Check required fields
    if (!tileData.id) {
      errors.push('Tile type ID is required');
    }
    if (!tileData.name) {
      errors.push('Tile type name is required');
    }

    // Check ID format
    if (tileData.id && !/^[a-zA-Z0-9_-]+$/.test(tileData.id)) {
      errors.push('Tile type ID must contain only letters, numbers, hyphens, and underscores');
    }

    // Check ID uniqueness
    this.refresh();
    const existingTileType = this.tileTypes[tileData.id];
    if (existingTileType && !tileData._isEdit) {
      errors.push(`Tile type ID '${tileData.id}' is already in use`);
    }

    // Verify resourceProduced exists in resources (if specified)
    if (tileData.resourceProduced && tileData.resourceProduced !== null) {
      if (!this.resources[tileData.resourceProduced]) {
        errors.push(`Resource '${tileData.resourceProduced}' does not exist`);
      }
    }

    // Validate baseRate is a number
    if (tileData.baseRate !== undefined && typeof tileData.baseRate !== 'number') {
      errors.push('Base rate must be a number');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate a structure definition
   * REQ-CFG-007: Validate structure configuration
   * @param {object} structureData - Structure data to validate
   * @returns {{valid: boolean, errors: string[]}} Validation result
   */
  validateStructure(structureData) {
    const errors = [];

    // Check required fields
    if (!structureData.id) {
      errors.push('Structure ID is required');
    }
    if (!structureData.name) {
      errors.push('Structure name is required');
    }

    // Check ID format
    if (structureData.id && !/^[a-zA-Z0-9_-]+$/.test(structureData.id)) {
      errors.push('Structure ID must contain only letters, numbers, hyphens, and underscores');
    }

    // Check ID uniqueness
    this.refresh();
    const existingStructure = this.structures[structureData.id];
    if (existingStructure && !structureData._isEdit) {
      errors.push(`Structure ID '${structureData.id}' is already in use`);
    }

    // Verify all cost resources exist
    if (structureData.costs) {
      for (const resourceId of Object.keys(structureData.costs)) {
        if (!this.resources[resourceId]) {
          errors.push(`Cost resource '${resourceId}' does not exist`);
        }
      }
    }

    // Verify production resource exists (if structure produces something)
    if (structureData.stats) {
      // Check for energy production
      if (structureData.stats.energyPerSecond !== undefined && !this.resources['energy']) {
        errors.push('Energy resource does not exist');
      }
      // Check for other production stats
      for (const stat of Object.keys(structureData.stats)) {
        if (stat.endsWith('PerSecond') && stat !== 'energyPerSecond') {
          const resourceId = stat.replace('PerSecond', '');
          if (!this.resources[resourceId]) {
            errors.push(`Production resource '${resourceId}' does not exist`);
          }
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Validate a drone definition
   * REQ-CFG-007: Validate drone configuration
   * @param {object} droneData - Drone data to validate
   * @returns {{valid: boolean, errors: string[]}} Validation result
   */
  validateDrone(droneData) {
    const errors = [];

    // Check required fields
    if (!droneData.id) {
      errors.push('Drone ID is required');
    }
    if (!droneData.name) {
      errors.push('Drone name is required');
    }

    // Check ID format
    if (droneData.id && !/^[a-zA-Z0-9_-]+$/.test(droneData.id)) {
      errors.push('Drone ID must contain only letters, numbers, hyphens, and underscores');
    }

    // Check ID uniqueness
    this.refresh();
    const existingDrone = this.drones[droneData.id];
    if (existingDrone && !droneData._isEdit) {
      errors.push(`Drone ID '${droneData.id}' is already in use`);
    }

    // Verify all component requirements exist
    if (droneData.components) {
      const validComponents = ['chassis', 'circuit', 'powerCore'];
      for (const componentId of Object.keys(droneData.components)) {
        if (!validComponents.includes(componentId)) {
          errors.push(`Invalid component type '${componentId}'`);
        }
      }
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

  /**
   * Check dependencies for an entity
   * Returns list of entities that depend on this one
   * REQ-CFG-007: Prevent deletion if dependencies exist
   * @param {string} entityType - Type of entity ('resource', 'tileType', 'structure', 'drone')
   * @param {string} entityId - ID of entity to check
   * @returns {string[]} Array of dependency descriptions
   */
  checkDependencies(entityType, entityId) {
    const dependencies = [];
    this.refresh();

    if (entityType === 'resource') {
      // Check if any tile types produce this resource
      for (const [tileId, tile] of Object.entries(this.tileTypes)) {
        if (tile.resourceProduced === entityId) {
          dependencies.push(`Tile type '${tileId}' produces this resource`);
        }
      }

      // Check if any structures use this resource in costs
      for (const [structId, struct] of Object.entries(this.structures)) {
        if (struct.costs && struct.costs[entityId]) {
          dependencies.push(`Structure '${structId}' requires this resource`);
        }
      }
    }

    if (entityType === 'tileType') {
      // Check if any map tiles use this type (would need HexGrid reference)
      // For now, just indicate that map needs to be checked
      dependencies.push('Check if any map tiles use this type before deletion');
    }

    return dependencies;
  }
}
