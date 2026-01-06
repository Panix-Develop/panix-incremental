// structures.js - Structure definitions and configuration
// Structures are buildings that can be placed on empty tiles

/**
 * Structure type definitions
 */
export const STRUCTURE_TYPES = {
  SOLAR_PANEL: 'solarPanel'
};

/**
 * Structure definitions
 * Each structure has:
 * - id: unique identifier
 * - name: display name (i18n key)
 * - description: detailed description (i18n key)
 * - costs: resource costs to build { resourceType: amount }
 * - stats: structure statistics
 * - buildableOn: tile types this can be built on
 * - category: for UI grouping
 */
export const STRUCTURES = {
  [STRUCTURE_TYPES.SOLAR_PANEL]: {
    id: STRUCTURE_TYPES.SOLAR_PANEL,
    name: 'structures.solarPanel.name',
    description: 'structures.solarPanel.description',
    costs: {
      iron: 10,
      silicon: 5
    },
    stats: {
      energyPerSecond: 1.0  // Energy generation rate
    },
    buildableOn: ['empty'],  // Can only build on empty tiles
    category: 'energy',
    // Visual properties (for future rendering)
    color: 0xF5A623,
    icon: '☀️'
  }
};

/**
 * Get structure definition by ID
 * Checks localStorage for custom structures in dev mode
 * @param {string} structureId - Structure type identifier
 * @returns {object|null} Structure definition or null if not found
 */
export function getStructure(structureId) {
  // Check if it's a custom structure
  if (structureId.startsWith('custom_')) {
    const customStructures = localStorage.getItem('dev_structures_override');
    if (customStructures) {
      try {
        const overrides = JSON.parse(customStructures);
        if (overrides[structureId]) {
          return { id: structureId, ...overrides[structureId] };
        }
      } catch (error) {
        console.warn('Failed to load custom structure:', error);
      }
    }
    return null;
  }
  
  return STRUCTURES[structureId] || null;
}

/**
 * Get all structures in a category
 * @param {string} category - Category name ('energy', 'production', etc.)
 * @returns {Array<object>} Array of structure definitions
 */
export function getStructuresByCategory(category) {
  return Object.values(STRUCTURES).filter(structure => structure.category === category);
}

/**
 * Get all buildable structures (for UI)
 * Includes custom structures from localStorage in dev mode
 * @returns {Array<object>} Array of all structure definitions
 */
export function getAllStructures() {
  const baseStructures = Object.values(STRUCTURES);
  
  // Add custom structures from localStorage (dev mode)
  const customStructures = localStorage.getItem('dev_structures_override');
  if (customStructures) {
    try {
      const overrides = JSON.parse(customStructures);
      // Add custom structures (those starting with 'custom_')
      Object.entries(overrides).forEach(([id, structure]) => {
        if (id.startsWith('custom_')) {
          baseStructures.push({ id, ...structure });
        }
      });
    } catch (error) {
      console.warn('Failed to load custom structures:', error);
    }
  }
  
  return baseStructures;
}

/**
 * Check if structure can be built on a tile type
 * @param {string} structureId - Structure type identifier
 * @param {string} tileType - Tile type ('empty', 'iron', etc.)
 * @returns {boolean} True if structure can be built on this tile type
 */
export function canBuildOnTileType(structureId, tileType) {
  const structure = getStructure(structureId);
  if (!structure) return false;
  
  // Default to ['empty'] if buildableOn is not defined
  const buildableOn = structure.buildableOn || ['empty'];
  return buildableOn.includes(tileType);
}

/**
 * Get total cost for building a structure
 * @param {string} structureId - Structure type identifier
 * @returns {object|null} Cost object { resourceType: amount } or null
 */
export function getStructureCost(structureId) {
  const structure = getStructure(structureId);
  return structure ? structure.costs : null;
}

/**
 * Get structure stats
 * @param {string} structureId - Structure type identifier
 * @returns {object|null} Stats object or null
 */
export function getStructureStats(structureId) {
  const structure = getStructure(structureId);
  return structure ? structure.stats : null;
}
