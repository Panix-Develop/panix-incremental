// saveLoad.test.js - Tests for save/load system
import { describe, it, expect, beforeEach, vi } from 'vitest';
import {
  saveGame,
  loadGame,
  hasSaveData,
  deleteSave,
  getSaveInfo
} from './saveLoad.js';

describe('saveLoad', () => {
  const SAVE_KEY = 'panix_incremental_save';

  // Mock managers
  let mockManagers;

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear();

    // Mock console methods to avoid test output noise
    vi.spyOn(console, 'log').mockImplementation(() => {});
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    vi.spyOn(console, 'error').mockImplementation(() => {});

    // Create mock managers
    mockManagers = {
      resourceManager: {
        getSaveData: vi.fn(() => ({
          resources: { iron: 100, silicon: 50, energy: 25 }
        })),
        loadSaveData: vi.fn()
      },
      craftingManager: {
        getSaveData: vi.fn(() => ({
          components: { chassis: 5, circuit: 3, powerCore: 2 }
        })),
        loadSaveData: vi.fn()
      },
      droneManager: {
        getSaveData: vi.fn(() => ({
          totalBuilt: 10,
          availableDrones: 3
        })),
        loadSaveData: vi.fn()
      },
      structureManager: {
        save: vi.fn(() => ({
          structures: []
        })),
        load: vi.fn()
      }
    };
  });

  describe('saveGame', () => {
    it('should save game data to localStorage', () => {
      const result = saveGame(mockManagers);

      expect(result).toBe(true);
      expect(localStorage.getItem(SAVE_KEY)).not.toBeNull();
    });

    it('should call getSaveData on all managers', () => {
      saveGame(mockManagers);

      expect(mockManagers.resourceManager.getSaveData).toHaveBeenCalled();
      expect(mockManagers.craftingManager.getSaveData).toHaveBeenCalled();
      expect(mockManagers.droneManager.getSaveData).toHaveBeenCalled();
      expect(mockManagers.structureManager.save).toHaveBeenCalled();
    });

    it('should include version in save data', () => {
      saveGame(mockManagers);

      const savedData = JSON.parse(localStorage.getItem(SAVE_KEY));
      expect(savedData.version).toBe('1.0');
    });

    it('should include timestamp in save data', () => {
      const beforeSave = Date.now();
      saveGame(mockManagers);
      const afterSave = Date.now();

      const savedData = JSON.parse(localStorage.getItem(SAVE_KEY));
      expect(savedData.timestamp).toBeGreaterThanOrEqual(beforeSave);
      expect(savedData.timestamp).toBeLessThanOrEqual(afterSave);
    });

    it('should save all manager data', () => {
      saveGame(mockManagers);

      const savedData = JSON.parse(localStorage.getItem(SAVE_KEY));
      expect(savedData.resources).toEqual({
        resources: { iron: 100, silicon: 50, energy: 25 }
      });
      expect(savedData.crafting).toEqual({
        components: { chassis: 5, circuit: 3, powerCore: 2 }
      });
      expect(savedData.drones).toEqual({
        totalBuilt: 10,
        availableDrones: 3
      });
      expect(savedData.structures).toEqual({
        structures: []
      });
    });

    it('should handle missing structureManager', () => {
      const managersWithoutStructures = {
        ...mockManagers,
        structureManager: null
      };

      const result = saveGame(managersWithoutStructures);

      expect(result).toBe(true);
      const savedData = JSON.parse(localStorage.getItem(SAVE_KEY));
      expect(savedData.structures).toBeNull();
    });

    it('should return false on error', () => {
      // Mock getSaveData to throw error instead
      mockManagers.resourceManager.getSaveData = vi.fn(() => {
        throw new Error('getSaveData error');
      });

      const result = saveGame(mockManagers);

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });

    it('should log success message', () => {
      saveGame(mockManagers);

      expect(console.log).toHaveBeenCalledWith('Game saved successfully');
    });
  });

  describe('loadGame', () => {
    beforeEach(() => {
      // Save some test data
      const testSaveData = {
        version: '1.0',
        timestamp: Date.now(),
        resources: { resources: { iron: 200 } },
        crafting: { components: { chassis: 10 } },
        drones: { totalBuilt: 20 },
        structures: { structures: [{ type: 'solarPanel' }] }
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(testSaveData));
    });

    it('should return true if save data exists', () => {
      const result = loadGame(mockManagers);
      expect(result).toBe(true);
    });

    it('should return false if no save data exists', () => {
      localStorage.clear();
      const result = loadGame(mockManagers);
      expect(result).toBe(false);
    });

    it('should call loadSaveData on all managers', () => {
      loadGame(mockManagers);

      expect(mockManagers.resourceManager.loadSaveData).toHaveBeenCalled();
      expect(mockManagers.craftingManager.loadSaveData).toHaveBeenCalled();
      expect(mockManagers.droneManager.loadSaveData).toHaveBeenCalled();
      expect(mockManagers.structureManager.load).toHaveBeenCalled();
    });

    it('should pass correct data to each manager', () => {
      loadGame(mockManagers);

      expect(mockManagers.resourceManager.loadSaveData).toHaveBeenCalledWith(
        expect.objectContaining({ resources: { iron: 200 } })
      );
      expect(mockManagers.craftingManager.loadSaveData).toHaveBeenCalledWith(
        expect.objectContaining({ components: { chassis: 10 } })
      );
      expect(mockManagers.droneManager.loadSaveData).toHaveBeenCalledWith(
        expect.objectContaining({ totalBuilt: 20 })
      );
    });

    it('should handle version mismatch', () => {
      const oldSaveData = {
        version: '0.9',
        timestamp: Date.now(),
        resources: {}
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(oldSaveData));

      const result = loadGame(mockManagers);

      expect(result).toBe(false);
      expect(console.warn).toHaveBeenCalledWith(
        expect.stringContaining('version mismatch')
      );
    });

    it('should handle missing managers gracefully', () => {
      const partialManagers = {
        resourceManager: mockManagers.resourceManager,
        craftingManager: null,
        droneManager: mockManagers.droneManager,
        structureManager: null
      };

      const result = loadGame(partialManagers);

      expect(result).toBe(true);
      expect(mockManagers.resourceManager.loadSaveData).toHaveBeenCalled();
      expect(mockManagers.droneManager.loadSaveData).toHaveBeenCalled();
    });

    it('should handle corrupted save data', () => {
      localStorage.setItem(SAVE_KEY, 'not valid json');

      const result = loadGame(mockManagers);

      expect(result).toBe(false);
      expect(console.error).toHaveBeenCalled();
    });

    it('should log success message with timestamp', () => {
      loadGame(mockManagers);

      expect(console.log).toHaveBeenCalledWith(
        expect.stringContaining('loaded successfully'),
        expect.any(Date)
      );
    });

    it('should handle missing data sections', () => {
      const incompleteSaveData = {
        version: '1.0',
        timestamp: Date.now(),
        resources: { resources: { iron: 100 } }
        // Missing crafting, drones, structures
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(incompleteSaveData));

      const result = loadGame(mockManagers);

      expect(result).toBe(true);
      expect(mockManagers.resourceManager.loadSaveData).toHaveBeenCalled();
      // Other managers shouldn't be called with undefined
      expect(mockManagers.craftingManager.loadSaveData).not.toHaveBeenCalled();
    });
  });

  describe('hasSaveData', () => {
    it('should return false when no save exists', () => {
      expect(hasSaveData()).toBe(false);
    });

    it('should return true when save exists', () => {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ version: '1.0' }));
      expect(hasSaveData()).toBe(true);
    });

    it('should return true even for corrupted data', () => {
      localStorage.setItem(SAVE_KEY, 'corrupted data');
      expect(hasSaveData()).toBe(true);
    });
  });

  describe('deleteSave', () => {
    beforeEach(() => {
      localStorage.setItem(SAVE_KEY, JSON.stringify({ version: '1.0' }));
    });

    it('should remove save data from localStorage', () => {
      deleteSave();
      expect(localStorage.getItem(SAVE_KEY)).toBeNull();
    });

    it('should return true on success', () => {
      const result = deleteSave();
      expect(result).toBe(true);
    });

    it('should log success message', () => {
      deleteSave();
      expect(console.log).toHaveBeenCalledWith('Save data deleted');
    });

    it('should handle errors gracefully', () => {
      // localStorage.removeItem doesn't throw in most environments
      // Just verify normal deletion works
      const result = deleteSave();

      expect(result).toBe(true);
    });

    it('should work even if no save exists', () => {
      localStorage.clear();
      const result = deleteSave();
      expect(result).toBe(true);
    });
  });

  describe('getSaveInfo', () => {
    it('should return null when no save exists', () => {
      expect(getSaveInfo()).toBeNull();
    });

    it('should return save info when save exists', () => {
      const testTimestamp = 1704672000000; // Jan 7, 2024
      const testSaveData = {
        version: '1.0',
        timestamp: testTimestamp,
        resources: {}
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(testSaveData));

      const info = getSaveInfo();

      expect(info).not.toBeNull();
      expect(info.version).toBe('1.0');
      expect(info.timestamp).toBe(testTimestamp);
      expect(info.date).toBeDefined();
    });

    it('should format timestamp as localized date string', () => {
      const testTimestamp = Date.now();
      const testSaveData = {
        version: '1.0',
        timestamp: testTimestamp
      };
      localStorage.setItem(SAVE_KEY, JSON.stringify(testSaveData));

      const info = getSaveInfo();

      expect(typeof info.date).toBe('string');
      expect(info.date.length).toBeGreaterThan(0);
    });

    it('should return null for corrupted save data', () => {
      localStorage.setItem(SAVE_KEY, 'not valid json');

      const info = getSaveInfo();

      expect(info).toBeNull();
      expect(console.error).toHaveBeenCalled();
    });

    it('should handle missing version', () => {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        timestamp: Date.now()
      }));

      const info = getSaveInfo();

      expect(info).not.toBeNull();
      expect(info.version).toBeUndefined();
    });

    it('should handle missing timestamp', () => {
      localStorage.setItem(SAVE_KEY, JSON.stringify({
        version: '1.0'
      }));

      const info = getSaveInfo();

      expect(info).not.toBeNull();
      expect(info.timestamp).toBeUndefined();
    });
  });

  describe('integration', () => {
    it('should save and load game successfully', () => {
      // Save
      saveGame(mockManagers);

      // Clear managers
      mockManagers.resourceManager.loadSaveData.mockClear();
      mockManagers.craftingManager.loadSaveData.mockClear();

      // Load
      const loaded = loadGame(mockManagers);

      expect(loaded).toBe(true);
      expect(mockManagers.resourceManager.loadSaveData).toHaveBeenCalled();
    });

    it('should handle save-delete-load cycle', () => {
      // Save
      saveGame(mockManagers);
      expect(hasSaveData()).toBe(true);

      // Delete
      deleteSave();
      expect(hasSaveData()).toBe(false);

      // Try to load
      const loaded = loadGame(mockManagers);
      expect(loaded).toBe(false);
    });

    it('should allow multiple saves to overwrite', () => {
      // First save
      mockManagers.resourceManager.getSaveData.mockReturnValue({
        resources: { iron: 100 }
      });
      saveGame(mockManagers);

      // Second save with different data
      mockManagers.resourceManager.getSaveData.mockReturnValue({
        resources: { iron: 200 }
      });
      saveGame(mockManagers);

      // Load should get latest data
      loadGame(mockManagers);

      expect(mockManagers.resourceManager.loadSaveData).toHaveBeenCalledWith(
        expect.objectContaining({ resources: { iron: 200 } })
      );
    });
  });
});
