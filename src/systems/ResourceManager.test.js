// ResourceManager.test.js - Unit tests for ResourceManager
import { describe, it, expect, beforeEach } from 'vitest';
import { ResourceManager } from './ResourceManager.js';

describe('ResourceManager', () => {
  let resourceManager;

  beforeEach(() => {
    resourceManager = new ResourceManager();
  });

  describe('Constructor', () => {
    it('should initialize with starting resources', () => {
      expect(resourceManager.getResource('iron')).toBe(0);
      expect(resourceManager.getResource('silicon')).toBe(0);
      expect(resourceManager.getResource('energy')).toBe(0);
    });

    it('should initialize generation rates to zero', () => {
      expect(resourceManager.getGenerationRate('iron')).toBe(0);
      expect(resourceManager.getGenerationRate('silicon')).toBe(0);
      expect(resourceManager.getGenerationRate('energy')).toBe(0);
    });
  });

  describe('getResource()', () => {
    it('should return floored resource amount', () => {
      resourceManager.resources.iron = 42.7;
      expect(resourceManager.getResource('iron')).toBe(42);
    });

    it('should return 0 for unknown resource', () => {
      expect(resourceManager.getResource('unknown')).toBe(0);
    });
  });

  describe('getAllResources()', () => {
    it('should return all resource amounts', () => {
      const resources = resourceManager.getAllResources();
      expect(resources).toEqual({
        iron: 0,
        silicon: 0,
        energy: 0
      });
    });

    it('should floor all values', () => {
      resourceManager.resources.iron = 42.9;
      resourceManager.resources.silicon = 33.1;
      resourceManager.resources.energy = 15.5;
      
      const resources = resourceManager.getAllResources();
      expect(resources).toEqual({
        iron: 42,
        silicon: 33,
        energy: 15
      });
    });
  });

  describe('addResource()', () => {
    it('should add resources correctly', () => {
      resourceManager.addResource('iron', 50);
      expect(resourceManager.getResource('iron')).toBe(50);
    });

    it('should handle fractional amounts', () => {
      resourceManager.addResource('silicon', 10.5);
      expect(resourceManager.getResource('silicon')).toBe(10); // 0 + 10.5 = 10.5, floored to 10
    });

    it('should ignore unknown resource types', () => {
      const before = resourceManager.getAllResources();
      resourceManager.addResource('unknown', 100);
      const after = resourceManager.getAllResources();
      expect(after).toEqual(before);
    });
  });

  describe('removeResource()', () => {
    it('should remove resources when sufficient', () => {
      resourceManager.addResource('iron', 100); // Add some first
      const result = resourceManager.removeResource('iron', 50);
      expect(result).toBe(true);
      expect(resourceManager.getResource('iron')).toBe(50);
    });

    it('should fail when insufficient resources', () => {
      const result = resourceManager.removeResource('iron', 200);
      expect(result).toBe(false);
      expect(resourceManager.getResource('iron')).toBe(0); // Unchanged
    });

    it('should fail for unknown resource', () => {
      const result = resourceManager.removeResource('unknown', 10);
      expect(result).toBe(false);
    });
  });

  describe('canAfford()', () => {
    beforeEach(() => {
      // Add some resources for afford tests
      resourceManager.addResource('iron', 100);
      resourceManager.addResource('silicon', 50);
      resourceManager.addResource('energy', 20);
    });

    it('should return true when resources are sufficient', () => {
      const cost = { iron: 50, silicon: 25 };
      expect(resourceManager.canAfford(cost)).toBe(true);
    });

    it('should return false when resources are insufficient', () => {
      const cost = { iron: 150, silicon: 25 };
      expect(resourceManager.canAfford(cost)).toBe(false);
    });

    it('should return false when any resource is insufficient', () => {
      const cost = { iron: 50, silicon: 100 };
      expect(resourceManager.canAfford(cost)).toBe(false);
    });

    it('should return true for null cost', () => {
      expect(resourceManager.canAfford(null)).toBe(true);
    });

    it('should return true for undefined cost', () => {
      expect(resourceManager.canAfford(undefined)).toBe(true);
    });

    it('should return true for empty cost object', () => {
      expect(resourceManager.canAfford({})).toBe(true);
    });
  });

  describe('spend()', () => {
    beforeEach(() => {
      // Add some resources for spend tests
      resourceManager.addResource('iron', 100);
      resourceManager.addResource('silicon', 50);
      resourceManager.addResource('energy', 20);
    });

    it('should deduct resources when affordable', () => {
      const cost = { iron: 50, silicon: 25 };
      const result = resourceManager.spend(cost);
      
      expect(result).toBe(true);
      expect(resourceManager.getResource('iron')).toBe(50);
      expect(resourceManager.getResource('silicon')).toBe(25);
    });

    it('should not deduct when not affordable', () => {
      const cost = { iron: 150, silicon: 25 };
      const result = resourceManager.spend(cost);
      
      expect(result).toBe(false);
      expect(resourceManager.getResource('iron')).toBe(100); // Unchanged
      expect(resourceManager.getResource('silicon')).toBe(50); // Unchanged
    });

    it('should handle multiple resource types', () => {
      const cost = { iron: 30, silicon: 20, energy: 10 };
      const result = resourceManager.spend(cost);
      
      expect(result).toBe(true);
      expect(resourceManager.getResource('iron')).toBe(70);
      expect(resourceManager.getResource('silicon')).toBe(30);
      expect(resourceManager.getResource('energy')).toBe(10);
    });
  });

  describe('getGenerationRate()', () => {
    it('should return generation rate', () => {
      resourceManager.generationRates.iron = 1.5;
      expect(resourceManager.getGenerationRate('iron')).toBe(1.5);
    });

    it('should return 0 for unknown resource', () => {
      expect(resourceManager.getGenerationRate('unknown')).toBe(0);
    });
  });

  describe('update()', () => {
    it('should generate resources from starting tile', () => {
      const mockHexGrid = {
        getStartingTile: () => ({ type: 'iron', isStarting: true }),
        getAllTiles: () => []
      };

      const initialIron = resourceManager.getResource('iron');
      resourceManager.update(1000, mockHexGrid); // 1 second
      
      // Starting tile generates 1 iron/sec
      expect(resourceManager.getResource('iron')).toBe(initialIron + 1);
      expect(resourceManager.getGenerationRate('iron')).toBe(1);
    });

    it('should generate resources from deployed drones', () => {
      const mockHexGrid = {
        getStartingTile: () => null,
        getAllTiles: () => [
          { type: 'iron', drones: 2, isStarting: false },
          { type: 'silicon', drones: 1, isStarting: false }
        ]
      };

      const initialIron = resourceManager.getResource('iron');
      const initialSilicon = resourceManager.getResource('silicon');
      
      resourceManager.update(1000, mockHexGrid); // 1 second
      
      // Each drone generates 0.5 resources/sec
      expect(resourceManager.getResource('iron')).toBe(initialIron + 1); // 2 drones * 0.5
      expect(resourceManager.getResource('silicon')).toBe(initialSilicon); // 1 drone * 0.5 = 0.5, floored to 0
    });

    it('should not generate from empty tiles', () => {
      const mockHexGrid = {
        getStartingTile: () => null,
        getAllTiles: () => [
          { type: 'empty', drones: 5, isStarting: false }
        ]
      };

      const initial = resourceManager.getAllResources();
      resourceManager.update(1000, mockHexGrid);
      const after = resourceManager.getAllResources();
      
      expect(after).toEqual(initial);
    });

    it('should not generate from starting tile with drones', () => {
      const mockHexGrid = {
        getStartingTile: () => ({ type: 'iron', isStarting: true }),
        getAllTiles: () => [
          { type: 'iron', drones: 5, isStarting: true } // Starting tile
        ]
      };

      const initialIron = resourceManager.getResource('iron');
      resourceManager.update(1000, mockHexGrid);
      
      // Should only get starting tile bonus (1), not drone generation
      expect(resourceManager.getResource('iron')).toBe(initialIron + 1);
    });

    it('should generate energy from structures', () => {
      const mockHexGrid = {
        getStartingTile: () => null,
        getAllTiles: () => []
      };

      const mockStructureManager = {
        getTotalEnergyGeneration: () => 2.5
      };

      const initialEnergy = resourceManager.getResource('energy');
      resourceManager.update(1000, mockHexGrid, mockStructureManager);
      
      expect(resourceManager.getResource('energy')).toBe(initialEnergy + 2); // 2.5 floored
      expect(resourceManager.getGenerationRate('energy')).toBe(2.5);
    });

    it('should never allow negative resources', () => {
      resourceManager.resources.iron = -10;
      
      const mockHexGrid = {
        getStartingTile: () => null,
        getAllTiles: () => []
      };

      resourceManager.update(1000, mockHexGrid);
      
      expect(resourceManager.getResource('iron')).toBe(0);
    });
  });

  describe('getSaveData()', () => {
    it('should return serializable resource data', () => {
      resourceManager.resources.iron = 200;
      resourceManager.resources.silicon = 150;
      resourceManager.resources.energy = 75;

      const saveData = resourceManager.getSaveData();
      
      expect(saveData).toEqual({
        resources: {
          iron: 200,
          silicon: 150,
          energy: 75
        }
      });
    });

    it('should not include generation rates', () => {
      const saveData = resourceManager.getSaveData();
      expect(saveData.generationRates).toBeUndefined();
    });
  });

  describe('loadSaveData()', () => {
    it('should load resources from save data', () => {
      const saveData = {
        resources: {
          iron: 500,
          silicon: 300,
          energy: 100
        }
      };

      resourceManager.loadSaveData(saveData);
      
      expect(resourceManager.getResource('iron')).toBe(500);
      expect(resourceManager.getResource('silicon')).toBe(300);
      expect(resourceManager.getResource('energy')).toBe(100);
    });

    it('should handle missing resources in save data', () => {
      const initial = resourceManager.getAllResources();
      
      resourceManager.loadSaveData({});
      
      const after = resourceManager.getAllResources();
      expect(after).toEqual(initial);
    });

    it('should preserve generation rates after load', () => {
      resourceManager.generationRates.iron = 5;
      
      const saveData = {
        resources: {
          iron: 500,
          silicon: 300,
          energy: 100
        }
      };

      resourceManager.loadSaveData(saveData);
      
      // Generation rates should not be affected by load
      expect(resourceManager.getGenerationRate('iron')).toBe(5);
    });
  });
});
