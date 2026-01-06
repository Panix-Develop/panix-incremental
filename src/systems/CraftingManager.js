// CraftingManager.js - Component crafting and inventory management
// REQ-CRAFT-004: Manage component inventory

import { recipes } from '../config/recipes.js';

export class CraftingManager {
  constructor(resourceManager) {
    this.resourceManager = resourceManager;
    
    // REQ-CRAFT-004: Track component inventory
    this.components = {
      chassis: 0,
      circuit: 0,
      powerCore: 0
    };

    // Track craft history for stats/achievements
    this.totalCrafted = {
      chassis: 0,
      circuit: 0,
      powerCore: 0
    };
  }

  /**
   * Craft a component
   * REQ-CRAFT-001: Craft components from resources
   * REQ-CRAFT-005: Deduct resources and add component
   * @param {string} componentType - 'chassis', 'circuit', or 'powerCore'
   * @returns {object} - {success: boolean, error?: string}
   */
  craftComponent(componentType) {
    // Validate component type
    if (!this.components.hasOwnProperty(componentType)) {
      return {
        success: false,
        error: `Invalid component type: ${componentType}`
      };
    }

    // Get recipe
    const recipe = recipes.components[componentType];
    if (!recipe) {
      return {
        success: false,
        error: `No recipe found for: ${componentType}`
      };
    }

    // Check if player can afford
    if (!this.resourceManager.canAfford(recipe.cost)) {
      return {
        success: false,
        error: 'Insufficient resources'
      };
    }

    // Deduct resources
    if (!this.resourceManager.spend(recipe.cost)) {
      return {
        success: false,
        error: 'Failed to deduct resources'
      };
    }

    // Add component to inventory
    this.components[componentType]++;
    this.totalCrafted[componentType]++;

    return {
      success: true
    };
  }

  /**
   * Get current component count
   * @param {string} componentType - Component name
   * @returns {number} - Current count
   */
  getComponent(componentType) {
    return this.components[componentType] || 0;
  }

  /**
   * Get all components
   * @returns {object} - All component counts
   */
  getAllComponents() {
    return { ...this.components };
  }

  /**
   * Check if player can craft a component
   * @param {string} componentType - Component name
   * @returns {boolean} - True if affordable
   */
  canCraft(componentType) {
    const recipe = recipes.components[componentType];
    if (!recipe) return false;
    return this.resourceManager.canAfford(recipe.cost);
  }

  /**
   * Consume components for drone building
   * @param {object} cost - Component costs {chassis: 1, circuit: 1, powerCore: 1}
   * @returns {boolean} - True if successful
   */
  consumeComponents(cost) {
    // Check if we have enough components
    for (const [component, amount] of Object.entries(cost)) {
      if (this.getComponent(component) < amount) {
        return false;
      }
    }

    // Deduct components
    for (const [component, amount] of Object.entries(cost)) {
      this.components[component] -= amount;
    }

    return true;
  }

  /**
   * Check if player has enough components
   * @param {object} cost - Component costs
   * @returns {boolean} - True if available
   */
  hasComponents(cost) {
    for (const [component, amount] of Object.entries(cost)) {
      if (this.getComponent(component) < amount) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get save data
   * @returns {object} - Serializable crafting data
   */
  getSaveData() {
    return {
      components: { ...this.components },
      totalCrafted: { ...this.totalCrafted }
    };
  }

  /**
   * Load from save data
   * @param {object} data - Save data
   */
  loadSaveData(data) {
    if (data.components) {
      this.components = { ...data.components };
    }
    if (data.totalCrafted) {
      this.totalCrafted = { ...data.totalCrafted };
    }
  }
}
