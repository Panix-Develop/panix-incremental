// recipes.js - Crafting recipes for components and drones
// REQ-CONFIG-002: Recipe configuration in separate config file
// Based on Appendix A: Resource & Recipe Reference

// Component recipes (REQ-CRAFT-002)
export const componentRecipes = {
  chassis: {
    name: 'Drone Chassis',
    description: 'Basic frame for all drones',
    cost: {
      iron: 50,
      silicon: 0,
      energy: 0
    },
    craftTime: 0 // Instant in PoC
  },
  
  circuit: {
    name: 'Basic Circuit',
    description: 'Electronic control system',
    cost: {
      iron: 10,
      silicon: 30,
      energy: 0
    },
    craftTime: 0 // Instant in PoC
  },
  
  powerCore: {
    name: 'Power Core',
    description: 'Energy storage and distribution',
    cost: {
      iron: 0,
      silicon: 20,
      energy: 20
    },
    craftTime: 0 // Instant in PoC
  }
};

// Drone recipes (REQ-DRONE-001)
export const droneRecipes = {
  basicGatherer: {
    name: 'Basic Gathering Drone',
    description: 'Automated resource collector',
    components: {
      chassis: 1,
      circuit: 1,
      powerCore: 1
    },
    buildTime: 0, // Instant in PoC
    stats: {
      gatherRate: 0.5, // Resources per second (REQ-RES-004)
      durability: Infinity // Drones don't break in PoC
    }
  }
};

// Helper function to check if player can afford a recipe
export function canAffordRecipe(recipe, resources) {
  for (const [resource, amount] of Object.entries(recipe.cost)) {
    if (resources[resource] < amount) {
      return false;
    }
  }
  return true;
}

// Helper function to check if player has required components
export function hasComponents(recipe, components) {
  for (const [component, amount] of Object.entries(recipe.components)) {
    if (components[component] < amount) {
      return false;
    }
  }
  return true;
}

// Helper function to get component recipe
export function getComponentRecipe(componentType) {
  return componentRecipes[componentType];
}

// Helper function to get drone recipe
// Includes custom drones from localStorage in dev mode
export function getDroneRecipe(droneType) {
  // Check if it's a custom drone
  if (droneType.startsWith('custom_')) {
    const customDrones = localStorage.getItem('dev_drones_override');
    if (customDrones) {
      try {
        const overrides = JSON.parse(customDrones);
        if (overrides[droneType]) {
          return overrides[droneType];
        }
      } catch (error) {
        console.warn('Failed to load custom drone:', error);
      }
    }
    return null;
  }
  
  return droneRecipes[droneType];
}

// Helper function to get all drone recipes (including custom)
export function getAllDroneRecipes() {
  const allRecipes = { ...droneRecipes };
  
  // Add custom drones from localStorage (dev mode)
  const customDrones = localStorage.getItem('dev_drones_override');
  if (customDrones) {
    try {
      const overrides = JSON.parse(customDrones);
      // Add custom drones (those starting with 'custom_')
      Object.entries(overrides).forEach(([id, recipe]) => {
        if (id.startsWith('custom_')) {
          allRecipes[id] = recipe;
        }
      });
    } catch (error) {
      console.warn('Failed to load custom drones:', error);
    }
  }
  
  return allRecipes;
}

// Export as default object for convenience
export const recipes = {
  components: componentRecipes,
  drones: droneRecipes
};
