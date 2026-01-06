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
 * @param {string} structureId - Structure type identifier
 * @returns {object|null} Structure definition or null if not found
 */
export function getStructure(structureId) {
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
 * @returns {Array<object>} Array of all structure definitions
 */
export function getAllStructures() {
  return Object.values(STRUCTURES);
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
  
  return structure.buildableOn.includes(tileType);
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
