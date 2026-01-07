// resources.js - Resource type definitions and configuration
// REQ-CFG-001: Resource configuration system

/**
 * Resource type definitions
 * Each resource has:
 * - id: unique identifier
 * - name: display name (i18n key)
 * - icon: emoji icon for display
 * - baseRate: base generation rate multiplier
 */
export const RESOURCES = {
  iron: {
    id: 'iron',
    name: 'resources.iron',
    icon: '🔩',
    baseRate: 1
  },
  
  silicon: {
    id: 'silicon',
    name: 'resources.silicon',
    icon: '💎',
    baseRate: 1
  },
  
  energy: {
    id: 'energy',
    name: 'resources.energy',
    icon: '⚡',
    baseRate: 0 // Not produced by tiles, only by structures
  }
};

/**
 * Get resource definition by ID
 * Checks localStorage for custom resources in dev mode
 * @param {string} resourceId - Resource type identifier
 * @returns {object|null} Resource definition or null if not found
 */
export function getResource(resourceId) {
  // Check default resources first
  if (RESOURCES[resourceId]) {
    return RESOURCES[resourceId];
  }
  
  // Check if it's a custom resource
  if (resourceId.startsWith('custom_')) {
    const customResources = localStorage.getItem('dev_resources_override');
    if (customResources) {
      try {
        const overrides = JSON.parse(customResources);
        return overrides[resourceId] || null;
      } catch (error) {
        console.warn('Failed to load custom resource:', error);
      }
    }
  }
  
  return null;
}

/**
 * Get all resources including custom ones
 * @returns {object} All resources (default + custom)
 */
export function getAllResources() {
  const allResources = { ...RESOURCES };
  
  // Add custom resources from localStorage (dev mode)
  const customResources = localStorage.getItem('dev_resources_override');
  if (customResources) {
    try {
      const overrides = JSON.parse(customResources);
      Object.assign(allResources, overrides);
    } catch (error) {
      console.warn('Failed to load custom resources:', error);
    }
  }
  
  return allResources;
}

/**
 * Get list of all resource IDs
 * @returns {string[]} Array of resource IDs
 */
export function getAllResourceIds() {
  return Object.keys(getAllResources());
}
