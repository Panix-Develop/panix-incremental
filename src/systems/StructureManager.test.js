// StructureManager.test.js - Tests for structure building and management system
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { StructureManager } from './StructureManager.js';

describe('StructureManager', () => {
  let structureManager;
  let mockResourceManager;

  beforeEach(() => {
    // Create mock ResourceManager
    mockResourceManager = {
      getResource: vi.fn(),
      removeResource: vi.fn()
    };

    structureManager = new StructureManager(mockResourceManager);
  });

  describe('constructor', () => {
    it('should initialize with empty structures map', () => {
      expect(structureManager.structures.size).toBe(0);
    });

    it('should store resourceManager reference', () => {
      expect(structureManager.resourceManager).toBe(mockResourceManager);
    });

    it('should initialize lastUpdateTime', () => {
      expect(structureManager.lastUpdateTime).toBeDefined();
      expect(typeof structureManager.lastUpdateTime).toBe('number');
    });

    it('should allow null resourceManager', () => {
      const manager = new StructureManager(null);
      expect(manager.resourceManager).toBe(null);
    });
  });

  describe('setResourceManager', () => {
    it('should update resourceManager reference', () => {
      const newManager = { getResource: vi.fn() };
      structureManager.setResourceManager(newManager);
      expect(structureManager.resourceManager).toBe(newManager);
    });

    it('should allow setting to null', () => {
      structureManager.setResourceManager(null);
      expect(structureManager.resourceManager).toBe(null);
    });
  });

  describe('hasStructure', () => {
    it('should return false for empty tile', () => {
      expect(structureManager.hasStructure(1, 0)).toBe(false);
    });

    it('should return true for tile with structure', () => {
      structureManager.structures.set('1,0', {
        structureType: 'solarPanel',
        q: 1,
        r: 0
      });

      expect(structureManager.hasStructure(1, 0)).toBe(true);
    });

    it('should handle different coordinates', () => {
      structureManager.structures.set('5,10', { structureType: 'solarPanel' });
      
      expect(structureManager.hasStructure(5, 10)).toBe(true);
      expect(structureManager.hasStructure(5, 11)).toBe(false);
    });
  });

  describe('getStructureAt', () => {
    it('should return null for empty tile', () => {
      expect(structureManager.getStructureAt(1, 0)).toBe(null);
    });

    it('should return structure data for occupied tile', () => {
      const structure = {
        structureType: 'solarPanel',
        q: 1,
        r: 0,
        buildTime: Date.now()
      };
      structureManager.structures.set('1,0', structure);

      expect(structureManager.getStructureAt(1, 0)).toEqual(structure);
    });

    it('should handle negative coordinates', () => {
      const structure = { structureType: 'solarPanel', q: -2, r: -3 };
      structureManager.structures.set('-2,-3', structure);

      expect(structureManager.getStructureAt(-2, -3)).toEqual(structure);
    });
  });

  describe('getAllStructures', () => {
    it('should return empty array when no structures', () => {
      expect(structureManager.getAllStructures()).toEqual([]);
    });

    it('should return all structures', () => {
      structureManager.structures.set('1,0', { structureType: 'solarPanel', q: 1, r: 0 });
      structureManager.structures.set('2,0', { structureType: 'solarPanel', q: 2, r: 0 });

      const structures = structureManager.getAllStructures();
      expect(structures.length).toBe(2);
    });

    it('should return array not reference to internal map', () => {
      structureManager.structures.set('1,0', { structureType: 'solarPanel' });
      
      const structures = structureManager.getAllStructures();
      structures.push({ structureType: 'fake' });

      expect(structureManager.structures.size).toBe(1);
    });
  });

  describe('getStructureCount', () => {
    beforeEach(() => {
      structureManager.structures.set('1,0', { structureType: 'solarPanel', q: 1, r: 0 });
      structureManager.structures.set('2,0', { structureType: 'solarPanel', q: 2, r: 0 });
      structureManager.structures.set('3,0', { structureType: 'miner', q: 3, r: 0 });
    });

    it('should count structures by type', () => {
      expect(structureManager.getStructureCount('solarPanel')).toBe(2);
      expect(structureManager.getStructureCount('miner')).toBe(1);
    });

    it('should return 0 for non-existent type', () => {
      expect(structureManager.getStructureCount('nonExistent')).toBe(0);
    });

    it('should return 0 when no structures', () => {
      structureManager.structures.clear();
      expect(structureManager.getStructureCount('solarPanel')).toBe(0);
    });
  });

  describe('getTotalEnergyGeneration', () => {
    it('should return 0 when no structures', () => {
      expect(structureManager.getTotalEnergyGeneration()).toBe(0);
    });

    it('should sum energy generation from all structures', () => {
      structureManager.structures.set('1,0', {
        structureType: 'solarPanel',
        stats: { energyPerSecond: 5 }
      });
      structureManager.structures.set('2,0', {
        structureType: 'solarPanel',
        stats: { energyPerSecond: 5 }
      });

      expect(structureManager.getTotalEnergyGeneration()).toBe(10);
    });

    it('should ignore structures without energyPerSecond', () => {
      structureManager.structures.set('1,0', {
        structureType: 'solarPanel',
        stats: { energyPerSecond: 5 }
      });
      structureManager.structures.set('2,0', {
        structureType: 'miner',
        stats: {} // No energyPerSecond
      });

      expect(structureManager.getTotalEnergyGeneration()).toBe(5);
    });

    it('should handle mixed energy values', () => {
      structureManager.structures.set('1,0', {
        structureType: 'solarPanel',
        stats: { energyPerSecond: 5 }
      });
      structureManager.structures.set('2,0', {
        structureType: 'largeSolarPanel',
        stats: { energyPerSecond: 10 }
      });

      expect(structureManager.getTotalEnergyGeneration()).toBe(15);
    });
  });

  describe('canBuildStructure', () => {
    const mockTile = {
      type: 'empty',
      q: 1,
      r: 0
    };

    beforeEach(() => {
      // Mock sufficient resources by default
      mockResourceManager.getResource.mockReturnValue(1000);
    });

    it('should allow building solarPanel on empty tile', () => {
      const result = structureManager.canBuildStructure('solarPanel', 1, 0, mockTile);
      expect(result.canBuild).toBe(true);
    });

    it('should fail for unknown structure type', () => {
      const result = structureManager.canBuildStructure('unknownStructure', 1, 0, mockTile);
      expect(result.canBuild).toBe(false);
      expect(result.reason).toBe('Unknown structure type');
    });

    it('should fail if tile already has structure', () => {
      structureManager.structures.set('1,0', { structureType: 'solarPanel' });

      const result = structureManager.canBuildStructure('solarPanel', 1, 0, mockTile);
      expect(result.canBuild).toBe(false);
      expect(result.reason).toBe('Tile already has a structure');
    });

    it('should fail if insufficient resources', () => {
      mockResourceManager.getResource.mockReturnValue(0);

      const result = structureManager.canBuildStructure('solarPanel', 1, 0, mockTile);
      expect(result.canBuild).toBe(false);
      expect(result.reason).toBe('Insufficient resources');
    });

    it('should check all resource requirements', () => {
      // Solar panel costs: iron: 100, silicon: 50, energy: 0
      mockResourceManager.getResource.mockImplementation((resource) => {
        if (resource === 'iron') return 1000;
        if (resource === 'silicon') return 1000;
        return 1000;
      });

      const result = structureManager.canBuildStructure('solarPanel', 1, 0, mockTile);
      
      expect(mockResourceManager.getResource).toHaveBeenCalledWith('iron');
      expect(mockResourceManager.getResource).toHaveBeenCalledWith('silicon');
      expect(result.canBuild).toBe(true);
    });

    it('should work without resourceManager', () => {
      const manager = new StructureManager(null);
      const result = manager.canBuildStructure('solarPanel', 1, 0, mockTile);
      
      // Should succeed since no resource check is performed
      expect(result.canBuild).toBe(true);
    });
  });

  describe('buildStructure', () => {
    const mockTile = {
      type: 'empty',
      q: 1,
      r: 0
    };

    beforeEach(() => {
      mockResourceManager.getResource.mockReturnValue(1000);
      
      // Mock window.dispatchEvent for event testing
      global.window = { dispatchEvent: vi.fn() };
    });

    it('should build structure successfully', () => {
      const result = structureManager.buildStructure('solarPanel', 1, 0, mockTile);

      expect(result).toBe(true);
      expect(structureManager.hasStructure(1, 0)).toBe(true);
    });

    it('should store structure data', () => {
      structureManager.buildStructure('solarPanel', 1, 0, mockTile);

      const structure = structureManager.getStructureAt(1, 0);
      expect(structure.structureType).toBe('solarPanel');
      expect(structure.q).toBe(1);
      expect(structure.r).toBe(0);
      expect(structure.buildTime).toBeDefined();
      expect(structure.stats).toBeDefined();
    });

    it('should deduct resources', () => {
      structureManager.buildStructure('solarPanel', 1, 0, mockTile);

      expect(mockResourceManager.removeResource).toHaveBeenCalledWith('iron', 10);
      expect(mockResourceManager.removeResource).toHaveBeenCalledWith('silicon', 5);
    });

    it('should emit structureBuilt event', () => {
      structureManager.buildStructure('solarPanel', 1, 0, mockTile);

      expect(window.dispatchEvent).toHaveBeenCalled();
      const call = window.dispatchEvent.mock.calls[0][0];
      expect(call.type).toBe('structureBuilt');
      expect(call.detail).toEqual({
        structureType: 'solarPanel',
        q: 1,
        r: 0
      });
    });

    it('should fail if canBuildStructure returns false', () => {
      // Already has structure
      structureManager.structures.set('1,0', { structureType: 'existing' });

      const result = structureManager.buildStructure('solarPanel', 1, 0, mockTile);
      expect(result).toBe(false);
    });

    it('should not deduct resources on failure', () => {
      structureManager.structures.set('1,0', { structureType: 'existing' });

      structureManager.buildStructure('solarPanel', 1, 0, mockTile);

      expect(mockResourceManager.removeResource).not.toHaveBeenCalled();
    });

    it('should handle building multiple structures', () => {
      structureManager.buildStructure('solarPanel', 1, 0, mockTile);
      structureManager.buildStructure('solarPanel', 2, 0, { ...mockTile, q: 2 });

      expect(structureManager.structures.size).toBe(2);
      expect(structureManager.getStructureCount('solarPanel')).toBe(2);
    });
  });

  describe('demolishStructure', () => {
    beforeEach(() => {
      structureManager.structures.set('1,0', {
        structureType: 'solarPanel',
        q: 1,
        r: 0
      });

      global.window = { dispatchEvent: vi.fn() };
    });

    it('should demolish structure successfully', () => {
      const result = structureManager.demolishStructure(1, 0);

      expect(result).toBe(true);
      expect(structureManager.hasStructure(1, 0)).toBe(false);
    });

    it('should emit structureDemolished event', () => {
      structureManager.demolishStructure(1, 0);

      expect(window.dispatchEvent).toHaveBeenCalled();
      const call = window.dispatchEvent.mock.calls[0][0];
      expect(call.type).toBe('structureDemolished');
      expect(call.detail).toEqual({ q: 1, r: 0 });
    });

    it('should fail if no structure exists', () => {
      const result = structureManager.demolishStructure(99, 99);
      expect(result).toBe(false);
    });

    it('should not affect other structures', () => {
      structureManager.structures.set('2,0', {
        structureType: 'solarPanel',
        q: 2,
        r: 0
      });

      structureManager.demolishStructure(1, 0);

      expect(structureManager.hasStructure(2, 0)).toBe(true);
    });
  });

  describe('save', () => {
    it('should return empty structures array when no structures', () => {
      const saveData = structureManager.save();

      expect(saveData.structures).toEqual([]);
      expect(saveData.lastUpdateTime).toBeDefined();
    });

    it('should serialize all structures', () => {
      structureManager.structures.set('1,0', {
        structureType: 'solarPanel',
        q: 1,
        r: 0,
        buildTime: 12345
      });
      structureManager.structures.set('2,0', {
        structureType: 'miner',
        q: 2,
        r: 0,
        buildTime: 67890
      });

      const saveData = structureManager.save();

      expect(saveData.structures.length).toBe(2);
      expect(saveData.structures[0].key).toBe('1,0');
      expect(saveData.structures[0].structureType).toBe('solarPanel');
      expect(saveData.structures[1].key).toBe('2,0');
      expect(saveData.structures[1].structureType).toBe('miner');
    });

    it('should include lastUpdateTime', () => {
      structureManager.lastUpdateTime = 99999;

      const saveData = structureManager.save();
      expect(saveData.lastUpdateTime).toBe(99999);
    });

    it('should preserve all structure properties', () => {
      structureManager.structures.set('1,0', {
        structureType: 'solarPanel',
        q: 1,
        r: 0,
        buildTime: 12345,
        stats: { energyPerSecond: 5 }
      });

      const saveData = structureManager.save();
      const saved = saveData.structures[0];

      expect(saved.structureType).toBe('solarPanel');
      expect(saved.q).toBe(1);
      expect(saved.r).toBe(0);
      expect(saved.buildTime).toBe(12345);
      expect(saved.stats).toEqual({ energyPerSecond: 5 });
    });
  });

  describe('load', () => {
    it('should handle null data', () => {
      structureManager.load(null);
      expect(structureManager.structures.size).toBe(0);
    });

    it('should handle empty data', () => {
      structureManager.load({});
      expect(structureManager.structures.size).toBe(0);
    });

    it('should load structures from save data', () => {
      const saveData = {
        structures: [
          {
            key: '1,0',
            structureType: 'solarPanel',
            q: 1,
            r: 0,
            buildTime: 12345
          }
        ],
        lastUpdateTime: 99999
      };

      structureManager.load(saveData);

      expect(structureManager.structures.size).toBe(1);
      expect(structureManager.hasStructure(1, 0)).toBe(true);
      expect(structureManager.lastUpdateTime).toBe(99999);
    });

    it('should load multiple structures', () => {
      const saveData = {
        structures: [
          { key: '1,0', structureType: 'solarPanel', q: 1, r: 0 },
          { key: '2,0', structureType: 'miner', q: 2, r: 0 },
          { key: '3,0', structureType: 'solarPanel', q: 3, r: 0 }
        ]
      };

      structureManager.load(saveData);

      expect(structureManager.structures.size).toBe(3);
      expect(structureManager.getStructureCount('solarPanel')).toBe(2);
      expect(structureManager.getStructureCount('miner')).toBe(1);
    });

    it('should clear existing structures before loading', () => {
      structureManager.structures.set('99,99', { structureType: 'old' });

      structureManager.load({
        structures: [
          { key: '1,0', structureType: 'solarPanel', q: 1, r: 0 }
        ]
      });

      expect(structureManager.structures.size).toBe(1);
      expect(structureManager.hasStructure(99, 99)).toBe(false);
    });

    it('should preserve all structure properties', () => {
      const saveData = {
        structures: [
          {
            key: '1,0',
            structureType: 'solarPanel',
            q: 1,
            r: 0,
            buildTime: 12345,
            stats: { energyPerSecond: 5 }
          }
        ]
      };

      structureManager.load(saveData);

      const structure = structureManager.getStructureAt(1, 0);
      expect(structure.structureType).toBe('solarPanel');
      expect(structure.q).toBe(1);
      expect(structure.r).toBe(0);
      expect(structure.buildTime).toBe(12345);
      expect(structure.stats).toEqual({ energyPerSecond: 5 });
    });

    it('should default lastUpdateTime if missing', () => {
      const before = Date.now();
      
      structureManager.load({
        structures: []
      });

      expect(structureManager.lastUpdateTime).toBeGreaterThanOrEqual(before);
    });
  });

  describe('reset', () => {
    it('should clear all structures', () => {
      structureManager.structures.set('1,0', { structureType: 'solarPanel' });
      structureManager.structures.set('2,0', { structureType: 'miner' });

      structureManager.reset();

      expect(structureManager.structures.size).toBe(0);
    });

    it('should reset lastUpdateTime', () => {
      const before = Date.now();
      structureManager.lastUpdateTime = 12345;

      structureManager.reset();

      expect(structureManager.lastUpdateTime).toBeGreaterThanOrEqual(before);
    });

    it('should allow building after reset', () => {
      structureManager.structures.set('1,0', { structureType: 'existing' });
      structureManager.reset();

      expect(structureManager.hasStructure(1, 0)).toBe(false);
    });
  });
});
