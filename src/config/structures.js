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
    tier: 1,  // Structure tier (1-5+, unlimited)
    type: 'energy',  // Structure type: 'energy', 'production', 'mining', 'research', 'storage'
    // Visual properties (for future rendering)
    color: 0xF5A623,
    icon: '☀️'
  }
};

/**
 * Get structure definition by ID
 * Checks localStorage for custom structures and overrides in dev mode
 * @param {string} structureId - Structure type identifier
 * @returns {object|null} Structure definition or null if not found
 */
export function getStructure(structureId) {
  // First check localStorage for any overrides (custom or modified defaults)
  const structuresOverride = localStorage.getItem('dev_structures_override');
  if (structuresOverride) {
    try {
      const overrides = JSON.parse(structuresOverride);
      if (overrides[structureId]) {
        return { id: structureId, ...overrides[structureId] };
      }
    } catch (error) {
      console.warn('Failed to load structure override:', error);
    }
  }
  
  // Fall back to hardcoded default
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
 * Includes custom structures and overrides from localStorage in dev mode
 * @returns {Array<object>} Array of all structure definitions
 */
export function getAllStructures() {
  // Start with base structures in a map
  const structuresMap = {};
  
  // Add all hardcoded structures
  Object.entries(STRUCTURES).forEach(([id, structure]) => {
    structuresMap[id] = { id, ...structure };
  });
  
  // Apply overrides from localStorage (both custom and modified defaults)
  const structuresOverride = localStorage.getItem('dev_structures_override');
  if (structuresOverride) {
    try {
      const overrides = JSON.parse(structuresOverride);
      Object.entries(overrides).forEach(([id, structure]) => {
        // Override existing or add new custom structure
        structuresMap[id] = { id, ...structure };
      });
    } catch (error) {
      console.warn('Failed to load structure overrides:', error);
    }
  }
  
  return Object.values(structuresMap);
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
