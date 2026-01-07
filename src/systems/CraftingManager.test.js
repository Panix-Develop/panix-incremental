// CraftingManager.test.js - Tests for component crafting system
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { CraftingManager } from './CraftingManager.js';

describe('CraftingManager', () => {
  let craftingManager;
  let mockResourceManager;

  beforeEach(() => {
    // Create mock ResourceManager
    mockResourceManager = {
      canAfford: vi.fn(),
      spend: vi.fn()
    };

    craftingManager = new CraftingManager(mockResourceManager);
  });

  describe('constructor', () => {
    it('should initialize with zero components', () => {
      expect(craftingManager.components).toEqual({
        chassis: 0,
        circuit: 0,
        powerCore: 0
      });
    });

    it('should initialize totalCrafted tracker', () => {
      expect(craftingManager.totalCrafted).toEqual({
        chassis: 0,
        circuit: 0,
        powerCore: 0
      });
    });

    it('should store resourceManager reference', () => {
      expect(craftingManager.resourceManager).toBe(mockResourceManager);
    });
  });

  describe('getComponent', () => {
    it('should return component count', () => {
      craftingManager.components.chassis = 5;
      expect(craftingManager.getComponent('chassis')).toBe(5);
    });

    it('should return 0 for unknown component', () => {
      expect(craftingManager.getComponent('unknown')).toBe(0);
    });

    it('should return 0 for uninitialized component', () => {
      expect(craftingManager.getComponent('circuit')).toBe(0);
    });
  });

  describe('getAllComponents', () => {
    it('should return all component counts', () => {
      craftingManager.components = {
        chassis: 3,
        circuit: 5,
        powerCore: 2
      };

      const result = craftingManager.getAllComponents();
      expect(result).toEqual({
        chassis: 3,
        circuit: 5,
        powerCore: 2
      });
    });

    it('should return copy not reference', () => {
      const result = craftingManager.getAllComponents();
      result.chassis = 999;
      expect(craftingManager.components.chassis).toBe(0);
    });
  });

  describe('craftComponent', () => {
    beforeEach(() => {
      // By default, mock successful resource operations
      mockResourceManager.canAfford.mockReturnValue(true);
      mockResourceManager.spend.mockReturnValue(true);
    });

    it('should craft chassis successfully', () => {
      const result = craftingManager.craftComponent('chassis');

      expect(result.success).toBe(true);
      expect(craftingManager.components.chassis).toBe(1);
      expect(craftingManager.totalCrafted.chassis).toBe(1);
    });

    it('should craft circuit successfully', () => {
      const result = craftingManager.craftComponent('circuit');

      expect(result.success).toBe(true);
      expect(craftingManager.components.circuit).toBe(1);
      expect(craftingManager.totalCrafted.circuit).toBe(1);
    });

    it('should craft powerCore successfully', () => {
      const result = craftingManager.craftComponent('powerCore');

      expect(result.success).toBe(true);
      expect(craftingManager.components.powerCore).toBe(1);
      expect(craftingManager.totalCrafted.powerCore).toBe(1);
    });

    it('should increment component count on multiple crafts', () => {
      craftingManager.craftComponent('chassis');
      craftingManager.craftComponent('chassis');
      craftingManager.craftComponent('chassis');

      expect(craftingManager.components.chassis).toBe(3);
      expect(craftingManager.totalCrafted.chassis).toBe(3);
    });

    it('should check if player can afford with correct costs', () => {
      craftingManager.craftComponent('chassis');

      expect(mockResourceManager.canAfford).toHaveBeenCalledWith({
        iron: 50,
        silicon: 0,
        energy: 0
      });
    });

    it('should spend resources with correct costs', () => {
      craftingManager.craftComponent('circuit');

      expect(mockResourceManager.spend).toHaveBeenCalledWith({
        iron: 10,
        silicon: 30,
        energy: 0
      });
    });

    it('should fail if component type is invalid', () => {
      const result = craftingManager.craftComponent('invalidComponent');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid component type: invalidComponent');
    });

    it('should fail if cannot afford', () => {
      mockResourceManager.canAfford.mockReturnValue(false);

      const result = craftingManager.craftComponent('chassis');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Insufficient resources');
      expect(craftingManager.components.chassis).toBe(0);
    });

    it('should fail if spend fails', () => {
      mockResourceManager.canAfford.mockReturnValue(true);
      mockResourceManager.spend.mockReturnValue(false);

      const result = craftingManager.craftComponent('chassis');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to deduct resources');
      expect(craftingManager.components.chassis).toBe(0);
    });

    it('should not increment totalCrafted on failure', () => {
      mockResourceManager.canAfford.mockReturnValue(false);

      craftingManager.craftComponent('chassis');

      expect(craftingManager.totalCrafted.chassis).toBe(0);
    });
  });

  describe('canCraft', () => {
    it('should return true if can afford chassis', () => {
      mockResourceManager.canAfford.mockReturnValue(true);

      expect(craftingManager.canCraft('chassis')).toBe(true);
      expect(mockResourceManager.canAfford).toHaveBeenCalledWith({
        iron: 50,
        silicon: 0,
        energy: 0
      });
    });

    it('should return false if cannot afford', () => {
      mockResourceManager.canAfford.mockReturnValue(false);

      expect(craftingManager.canCraft('circuit')).toBe(false);
    });

    it('should return false for invalid component', () => {
      expect(craftingManager.canCraft('invalidComponent')).toBe(false);
    });

    it('should check all component types correctly', () => {
      mockResourceManager.canAfford.mockReturnValue(true);

      expect(craftingManager.canCraft('chassis')).toBe(true);
      expect(craftingManager.canCraft('circuit')).toBe(true);
      expect(craftingManager.canCraft('powerCore')).toBe(true);
    });
  });

  describe('hasComponents', () => {
    beforeEach(() => {
      craftingManager.components = {
        chassis: 5,
        circuit: 3,
        powerCore: 2
      };
    });

    it('should return true if has exact components', () => {
      const result = craftingManager.hasComponents({
        chassis: 5,
        circuit: 3,
        powerCore: 2
      });

      expect(result).toBe(true);
    });

    it('should return true if has more than required', () => {
      const result = craftingManager.hasComponents({
        chassis: 1,
        circuit: 1,
        powerCore: 1
      });

      expect(result).toBe(true);
    });

    it('should return false if missing one component', () => {
      const result = craftingManager.hasComponents({
        chassis: 10,
        circuit: 3,
        powerCore: 2
      });

      expect(result).toBe(false);
    });

    it('should return false if missing multiple components', () => {
      const result = craftingManager.hasComponents({
        chassis: 10,
        circuit: 10,
        powerCore: 10
      });

      expect(result).toBe(false);
    });

    it('should return true for empty cost', () => {
      const result = craftingManager.hasComponents({});
      expect(result).toBe(true);
    });

    it('should handle partial cost checking', () => {
      expect(craftingManager.hasComponents({ chassis: 2 })).toBe(true);
      expect(craftingManager.hasComponents({ circuit: 1 })).toBe(true);
      expect(craftingManager.hasComponents({ powerCore: 3 })).toBe(false);
    });
  });

  describe('consumeComponents', () => {
    beforeEach(() => {
      craftingManager.components = {
        chassis: 5,
        circuit: 3,
        powerCore: 2
      };
    });

    it('should consume components successfully', () => {
      const result = craftingManager.consumeComponents({
        chassis: 1,
        circuit: 1,
        powerCore: 1
      });

      expect(result).toBe(true);
      expect(craftingManager.components).toEqual({
        chassis: 4,
        circuit: 2,
        powerCore: 1
      });
    });

    it('should consume all of a component type', () => {
      const result = craftingManager.consumeComponents({
        chassis: 5,
        circuit: 3,
        powerCore: 2
      });

      expect(result).toBe(true);
      expect(craftingManager.components).toEqual({
        chassis: 0,
        circuit: 0,
        powerCore: 0
      });
    });

    it('should fail if insufficient components', () => {
      const result = craftingManager.consumeComponents({
        chassis: 10,
        circuit: 1,
        powerCore: 1
      });

      expect(result).toBe(false);
      // Components should not be modified
      expect(craftingManager.components).toEqual({
        chassis: 5,
        circuit: 3,
        powerCore: 2
      });
    });

    it('should not partially consume on failure', () => {
      const result = craftingManager.consumeComponents({
        chassis: 1,
        circuit: 1,
        powerCore: 10 // Not enough
      });

      expect(result).toBe(false);
      // All components should remain unchanged
      expect(craftingManager.components.chassis).toBe(5);
      expect(craftingManager.components.circuit).toBe(3);
      expect(craftingManager.components.powerCore).toBe(2);
    });

    it('should handle empty cost', () => {
      const result = craftingManager.consumeComponents({});
      expect(result).toBe(true);
    });

    it('should consume only specified components', () => {
      const result = craftingManager.consumeComponents({
        chassis: 2
      });

      expect(result).toBe(true);
      expect(craftingManager.components.chassis).toBe(3);
      expect(craftingManager.components.circuit).toBe(3); // Unchanged
      expect(craftingManager.components.powerCore).toBe(2); // Unchanged
    });
  });

  describe('getSaveData', () => {
    it('should return serializable data', () => {
      craftingManager.components = {
        chassis: 10,
        circuit: 5,
        powerCore: 3
      };
      craftingManager.totalCrafted = {
        chassis: 20,
        circuit: 15,
        powerCore: 8
      };

      const saveData = craftingManager.getSaveData();

      expect(saveData).toEqual({
        components: {
          chassis: 10,
          circuit: 5,
          powerCore: 3
        },
        totalCrafted: {
          chassis: 20,
          circuit: 15,
          powerCore: 8
        }
      });
    });

    it('should return copy not reference', () => {
      const saveData = craftingManager.getSaveData();
      saveData.components.chassis = 999;
      
      expect(craftingManager.components.chassis).toBe(0);
    });

    it('should include totalCrafted separately from components', () => {
      craftingManager.components.chassis = 5;
      craftingManager.totalCrafted.chassis = 10;

      const saveData = craftingManager.getSaveData();

      expect(saveData.components.chassis).toBe(5);
      expect(saveData.totalCrafted.chassis).toBe(10);
    });
  });

  describe('loadSaveData', () => {
    it('should load components from save data', () => {
      craftingManager.loadSaveData({
        components: {
          chassis: 7,
          circuit: 4,
          powerCore: 2
        }
      });

      expect(craftingManager.components).toEqual({
        chassis: 7,
        circuit: 4,
        powerCore: 2
      });
    });

    it('should load totalCrafted from save data', () => {
      craftingManager.loadSaveData({
        totalCrafted: {
          chassis: 15,
          circuit: 10,
          powerCore: 5
        }
      });

      expect(craftingManager.totalCrafted).toEqual({
        chassis: 15,
        circuit: 10,
        powerCore: 5
      });
    });

    it('should load both components and totalCrafted', () => {
      craftingManager.loadSaveData({
        components: {
          chassis: 3,
          circuit: 2,
          powerCore: 1
        },
        totalCrafted: {
          chassis: 10,
          circuit: 8,
          powerCore: 5
        }
      });

      expect(craftingManager.components).toEqual({
        chassis: 3,
        circuit: 2,
        powerCore: 1
      });
      expect(craftingManager.totalCrafted).toEqual({
        chassis: 10,
        circuit: 8,
        powerCore: 5
      });
    });

    it('should handle missing components in save data', () => {
      craftingManager.components.chassis = 5;
      
      craftingManager.loadSaveData({
        totalCrafted: {
          chassis: 10,
          circuit: 5,
          powerCore: 3
        }
      });

      // Components should remain unchanged
      expect(craftingManager.components.chassis).toBe(5);
      // TotalCrafted should be updated
      expect(craftingManager.totalCrafted.chassis).toBe(10);
    });

    it('should handle missing totalCrafted in save data', () => {
      craftingManager.totalCrafted.chassis = 10;
      
      craftingManager.loadSaveData({
        components: {
          chassis: 3,
          circuit: 2,
          powerCore: 1
        }
      });

      // Components should be updated
      expect(craftingManager.components.chassis).toBe(3);
      // TotalCrafted should remain unchanged
      expect(craftingManager.totalCrafted.chassis).toBe(10);
    });

    it('should handle empty save data', () => {
      craftingManager.components.chassis = 5;
      craftingManager.totalCrafted.chassis = 10;

      craftingManager.loadSaveData({});

      // Both should remain unchanged
      expect(craftingManager.components.chassis).toBe(5);
      expect(craftingManager.totalCrafted.chassis).toBe(10);
    });
  });
});
