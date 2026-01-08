// recipes.js - Crafting recipes for components and drones
// REQ-CONFIG-002: Recipe configuration in separate config file
// Based on Appendix A: Resource & Recipe Reference

// Component recipes (REQ-CRAFT-002)
export const componentRecipes = {
  chassis: {
    name: 'crafting.components.chassis.name',
    description: 'crafting.components.chassis.description',
    cost: {
      iron: 50,
      silicon: 0,
      energy: 0
    },
    craftTime: 0 // Instant in PoC
  },
  
  circuit: {
    name: 'crafting.components.circuit.name',
    description: 'crafting.components.circuit.description',
    cost: {
      iron: 10,
      silicon: 30,
      energy: 0
    },
    craftTime: 0 // Instant in PoC
  },
  
  powerCore: {
    name: 'crafting.components.powerCore.name',
    description: 'crafting.components.powerCore.description',
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
    name: 'drones.types.basicGatherer.name',
    description: 'drones.types.basicGatherer.description',
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
// Includes custom drones and overrides from localStorage in dev mode
export function getDroneRecipe(droneType) {
  // First check localStorage for any overrides (custom or modified defaults)
  const dronesOverride = localStorage.getItem('dev_drones_override');
  if (dronesOverride) {
    try {
      const overrides = JSON.parse(dronesOverride);
      if (overrides[droneType]) {
        return overrides[droneType];
      }
    } catch (error) {
      console.warn('Failed to load drone override:', error);
    }
  }
  
  // Fall back to hardcoded default
  return droneRecipes[droneType] || null;
}

// Helper function to get all drone recipes (including custom and overrides)
export function getAllDroneRecipes() {
  const allRecipes = { ...droneRecipes };
  
  // Apply overrides from localStorage (both custom and modified defaults)
  const dronesOverride = localStorage.getItem('dev_drones_override');
  if (dronesOverride) {
    try {
      const overrides = JSON.parse(dronesOverride);
      // Apply all overrides (custom or modified defaults)
      Object.entries(overrides).forEach(([id, recipe]) => {
        allRecipes[id] = recipe;
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
