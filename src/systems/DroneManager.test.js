// DroneManager.test.js - Tests for drone building and deployment system
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DroneManager } from './DroneManager.js';

describe('DroneManager', () => {
  let droneManager;
  let mockCraftingManager;
  let mockHexGrid;

  beforeEach(() => {
    // Create mock CraftingManager
    mockCraftingManager = {
      hasComponents: vi.fn(),
      consumeComponents: vi.fn()
    };

    // Create mock HexGrid
    mockHexGrid = {
      getTile: vi.fn(),
      canDeployDrone: vi.fn(),
      addDroneToTile: vi.fn(),
      setTileDrones: vi.fn()
    };

    droneManager = new DroneManager(mockCraftingManager, mockHexGrid);
  });

  describe('constructor', () => {
    it('should initialize with zero drones', () => {
      expect(droneManager.totalBuilt).toBe(0);
      expect(droneManager.availableDrones).toBe(0);
    });

    it('should initialize with empty deployments', () => {
      expect(droneManager.deployments).toEqual([]);
    });

    it('should store craftingManager reference', () => {
      expect(droneManager.craftingManager).toBe(mockCraftingManager);
    });

    it('should store hexGrid reference', () => {
      expect(droneManager.hexGrid).toBe(mockHexGrid);
    });
  });

  describe('getAvailableDrones', () => {
    it('should return available drone count', () => {
      droneManager.availableDrones = 5;
      expect(droneManager.getAvailableDrones()).toBe(5);
    });

    it('should return 0 when no drones available', () => {
      expect(droneManager.getAvailableDrones()).toBe(0);
    });
  });

  describe('getTotalBuilt', () => {
    it('should return total built count', () => {
      droneManager.totalBuilt = 10;
      expect(droneManager.getTotalBuilt()).toBe(10);
    });

    it('should return 0 when no drones built', () => {
      expect(droneManager.getTotalBuilt()).toBe(0);
    });
  });

  describe('getDeployments', () => {
    it('should return all deployments', () => {
      droneManager.deployments = [
        { q: 1, r: 0, droneType: 'basicGatherer' },
        { q: 0, r: 1, droneType: 'basicGatherer' }
      ];

      const result = droneManager.getDeployments();
      expect(result).toEqual([
        { q: 1, r: 0, droneType: 'basicGatherer' },
        { q: 0, r: 1, droneType: 'basicGatherer' }
      ]);
    });

    it('should return copy not reference', () => {
      droneManager.deployments = [{ q: 1, r: 0, droneType: 'basicGatherer' }];
      
      const result = droneManager.getDeployments();
      result.push({ q: 2, r: 0, droneType: 'basicGatherer' });
      
      expect(droneManager.deployments.length).toBe(1);
    });

    it('should return empty array when no deployments', () => {
      expect(droneManager.getDeployments()).toEqual([]);
    });
  });

  describe('buildDrone', () => {
    beforeEach(() => {
      // By default, mock successful component operations
      mockCraftingManager.hasComponents.mockReturnValue(true);
      mockCraftingManager.consumeComponents.mockReturnValue(true);
    });

    it('should build basicGatherer successfully', () => {
      const result = droneManager.buildDrone('basicGatherer');

      expect(result.success).toBe(true);
      expect(droneManager.availableDrones).toBe(1);
      expect(droneManager.totalBuilt).toBe(1);
    });

    it('should increment counts on multiple builds', () => {
      droneManager.buildDrone('basicGatherer');
      droneManager.buildDrone('basicGatherer');
      droneManager.buildDrone('basicGatherer');

      expect(droneManager.availableDrones).toBe(3);
      expect(droneManager.totalBuilt).toBe(3);
    });

    it('should check for required components', () => {
      droneManager.buildDrone('basicGatherer');

      expect(mockCraftingManager.hasComponents).toHaveBeenCalledWith({
        chassis: 1,
        circuit: 1,
        powerCore: 1
      });
    });

    it('should consume components on successful build', () => {
      droneManager.buildDrone('basicGatherer');

      expect(mockCraftingManager.consumeComponents).toHaveBeenCalledWith({
        chassis: 1,
        circuit: 1,
        powerCore: 1
      });
    });

    it('should fail if drone type is invalid', () => {
      const result = droneManager.buildDrone('invalidDrone');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Unknown drone type: invalidDrone');
      expect(droneManager.availableDrones).toBe(0);
    });

    it('should fail if insufficient components', () => {
      mockCraftingManager.hasComponents.mockReturnValue(false);

      const result = droneManager.buildDrone('basicGatherer');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Insufficient components');
      expect(droneManager.availableDrones).toBe(0);
    });

    it('should fail if consumeComponents fails', () => {
      mockCraftingManager.hasComponents.mockReturnValue(true);
      mockCraftingManager.consumeComponents.mockReturnValue(false);

      const result = droneManager.buildDrone('basicGatherer');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to consume components');
      expect(droneManager.availableDrones).toBe(0);
    });

    it('should not increment totalBuilt on failure', () => {
      mockCraftingManager.hasComponents.mockReturnValue(false);

      droneManager.buildDrone('basicGatherer');

      expect(droneManager.totalBuilt).toBe(0);
    });
  });

  describe('canBuildDrone', () => {
    it('should return true if has components', () => {
      mockCraftingManager.hasComponents.mockReturnValue(true);

      expect(droneManager.canBuildDrone('basicGatherer')).toBe(true);
    });

    it('should return false if missing components', () => {
      mockCraftingManager.hasComponents.mockReturnValue(false);

      expect(droneManager.canBuildDrone('basicGatherer')).toBe(false);
    });

    it('should return false for invalid drone type', () => {
      expect(droneManager.canBuildDrone('invalidDrone')).toBe(false);
    });

    it('should check correct components for basicGatherer', () => {
      mockCraftingManager.hasComponents.mockReturnValue(true);

      droneManager.canBuildDrone('basicGatherer');

      expect(mockCraftingManager.hasComponents).toHaveBeenCalledWith({
        chassis: 1,
        circuit: 1,
        powerCore: 1
      });
    });
  });

  describe('deployDrone', () => {
    beforeEach(() => {
      // Setup: player has available drones
      droneManager.availableDrones = 3;

      // Mock a valid resource tile
      mockHexGrid.getTile.mockReturnValue({
        type: 'iron',
        isStarting: false,
        drones: 0
      });
      mockHexGrid.canDeployDrone.mockReturnValue(true);
      mockHexGrid.addDroneToTile.mockReturnValue(true);
    });

    it('should deploy drone successfully', () => {
      const result = droneManager.deployDrone(1, 0);

      expect(result.success).toBe(true);
      expect(droneManager.availableDrones).toBe(2);
    });

    it('should add deployment to deployments array', () => {
      droneManager.deployDrone(1, 0);

      expect(droneManager.deployments).toEqual([
        { q: 1, r: 0, droneType: 'basicGatherer' }
      ]);
    });

    it('should deploy to multiple tiles', () => {
      droneManager.deployDrone(1, 0);
      droneManager.deployDrone(2, 0);

      expect(droneManager.availableDrones).toBe(1);
      expect(droneManager.deployments.length).toBe(2);
    });

    it('should call hexGrid.addDroneToTile with correct coordinates', () => {
      droneManager.deployDrone(1, 0);

      expect(mockHexGrid.addDroneToTile).toHaveBeenCalledWith(1, 0);
    });

    it('should fail if no drones available', () => {
      droneManager.availableDrones = 0;

      const result = droneManager.deployDrone(1, 0);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No drones available');
    });

    it('should fail if tile is invalid', () => {
      mockHexGrid.getTile.mockReturnValue(null);

      const result = droneManager.deployDrone(99, 99);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid tile');
    });

    it('should fail if tile is starting tile', () => {
      mockHexGrid.getTile.mockReturnValue({
        type: 'iron',
        isStarting: true,
        drones: 0
      });

      const result = droneManager.deployDrone(0, 0);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Cannot deploy to starting tile');
    });

    it('should fail if tile is empty', () => {
      mockHexGrid.getTile.mockReturnValue({
        type: 'empty',
        isStarting: false,
        drones: 0
      });

      const result = droneManager.deployDrone(1, 0);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Cannot deploy to empty tile');
    });

    it('should fail if tile at maximum capacity', () => {
      mockHexGrid.canDeployDrone.mockReturnValue(false);

      const result = droneManager.deployDrone(1, 0);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Tile at maximum capacity');
    });

    it('should fail if addDroneToTile fails', () => {
      mockHexGrid.addDroneToTile.mockReturnValue(false);

      const result = droneManager.deployDrone(1, 0);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Failed to deploy drone');
    });

    it('should not modify availableDrones on failure', () => {
      droneManager.availableDrones = 3;
      mockHexGrid.getTile.mockReturnValue(null);

      droneManager.deployDrone(99, 99);

      expect(droneManager.availableDrones).toBe(3);
    });

    it('should not add to deployments on failure', () => {
      mockHexGrid.canDeployDrone.mockReturnValue(false);

      droneManager.deployDrone(1, 0);

      expect(droneManager.deployments.length).toBe(0);
    });
  });

  describe('removeDrone', () => {
    beforeEach(() => {
      // Setup: tile with drones deployed
      mockHexGrid.getTile.mockReturnValue({
        type: 'iron',
        drones: 2
      });

      // Setup: existing deployments
      droneManager.deployments = [
        { q: 1, r: 0, droneType: 'basicGatherer' },
        { q: 2, r: 0, droneType: 'basicGatherer' }
      ];
      droneManager.availableDrones = 1;
    });

    it('should remove drone successfully', () => {
      const result = droneManager.removeDrone(1, 0);

      expect(result.success).toBe(true);
    });

    it('should increment availableDrones', () => {
      droneManager.removeDrone(1, 0);

      expect(droneManager.availableDrones).toBe(2);
    });

    it('should call setTileDrones to decrement drones', () => {
      droneManager.removeDrone(1, 0);

      expect(mockHexGrid.setTileDrones).toHaveBeenCalledWith(1, 0, 1);
    });

    it('should remove from deployments array', () => {
      droneManager.removeDrone(1, 0);

      expect(droneManager.deployments).toEqual([
        { q: 2, r: 0, droneType: 'basicGatherer' }
      ]);
    });

    it('should remove correct deployment when multiple exist', () => {
      droneManager.removeDrone(2, 0);

      expect(droneManager.deployments).toEqual([
        { q: 1, r: 0, droneType: 'basicGatherer' }
      ]);
    });

    it('should fail if tile is invalid', () => {
      mockHexGrid.getTile.mockReturnValue(null);

      const result = droneManager.removeDrone(99, 99);

      expect(result.success).toBe(false);
      expect(result.error).toBe('Invalid tile');
    });

    it('should fail if no drones on tile', () => {
      mockHexGrid.getTile.mockReturnValue({
        type: 'iron',
        drones: 0
      });

      const result = droneManager.removeDrone(1, 0);

      expect(result.success).toBe(false);
      expect(result.error).toBe('No drones on this tile');
    });

    it('should not modify availableDrones on failure', () => {
      mockHexGrid.getTile.mockReturnValue(null);

      droneManager.removeDrone(99, 99);

      expect(droneManager.availableDrones).toBe(1);
    });

    it('should handle removing when deployment not in array', () => {
      // This can happen if deployments array is out of sync
      droneManager.deployments = [];

      const result = droneManager.removeDrone(1, 0);

      // Should still succeed (drone removed from tile)
      expect(result.success).toBe(true);
      expect(droneManager.availableDrones).toBe(2);
    });
  });

  describe('getSaveData', () => {
    it('should return serializable data', () => {
      droneManager.totalBuilt = 10;
      droneManager.availableDrones = 3;
      droneManager.deployments = [
        { q: 1, r: 0, droneType: 'basicGatherer' },
        { q: 2, r: 0, droneType: 'basicGatherer' }
      ];

      const saveData = droneManager.getSaveData();

      expect(saveData).toEqual({
        totalBuilt: 10,
        availableDrones: 3,
        deployments: [
          { q: 1, r: 0, droneType: 'basicGatherer' },
          { q: 2, r: 0, droneType: 'basicGatherer' }
        ]
      });
    });

    it('should return copy of deployments not reference', () => {
      droneManager.deployments = [{ q: 1, r: 0, droneType: 'basicGatherer' }];

      const saveData = droneManager.getSaveData();
      saveData.deployments.push({ q: 2, r: 0, droneType: 'basicGatherer' });

      expect(droneManager.deployments.length).toBe(1);
    });

    it('should handle zero values', () => {
      const saveData = droneManager.getSaveData();

      expect(saveData.totalBuilt).toBe(0);
      expect(saveData.availableDrones).toBe(0);
      expect(saveData.deployments).toEqual([]);
    });
  });

  describe('loadSaveData', () => {
    it('should load totalBuilt from save data', () => {
      droneManager.loadSaveData({ totalBuilt: 15 });

      expect(droneManager.totalBuilt).toBe(15);
    });

    it('should load availableDrones from save data', () => {
      droneManager.loadSaveData({ availableDrones: 5 });

      expect(droneManager.availableDrones).toBe(5);
    });

    it('should load deployments from save data', () => {
      droneManager.loadSaveData({
        deployments: [
          { q: 1, r: 0, droneType: 'basicGatherer' },
          { q: 2, r: 0, droneType: 'basicGatherer' }
        ]
      });

      expect(droneManager.deployments).toEqual([
        { q: 1, r: 0, droneType: 'basicGatherer' },
        { q: 2, r: 0, droneType: 'basicGatherer' }
      ]);
    });

    it('should restore drones to tiles from deployments', () => {
      droneManager.loadSaveData({
        deployments: [
          { q: 1, r: 0, droneType: 'basicGatherer' },
          { q: 2, r: 0, droneType: 'basicGatherer' }
        ]
      });

      expect(mockHexGrid.addDroneToTile).toHaveBeenCalledWith(1, 0);
      expect(mockHexGrid.addDroneToTile).toHaveBeenCalledWith(2, 0);
      expect(mockHexGrid.addDroneToTile).toHaveBeenCalledTimes(2);
    });

    it('should load all fields together', () => {
      droneManager.loadSaveData({
        totalBuilt: 10,
        availableDrones: 3,
        deployments: [{ q: 1, r: 0, droneType: 'basicGatherer' }]
      });

      expect(droneManager.totalBuilt).toBe(10);
      expect(droneManager.availableDrones).toBe(3);
      expect(droneManager.deployments.length).toBe(1);
    });

    it('should handle missing totalBuilt in save data', () => {
      droneManager.totalBuilt = 5;

      droneManager.loadSaveData({ availableDrones: 2 });

      // totalBuilt should remain unchanged
      expect(droneManager.totalBuilt).toBe(5);
    });

    it('should handle missing availableDrones in save data', () => {
      droneManager.availableDrones = 3;

      droneManager.loadSaveData({ totalBuilt: 10 });

      // availableDrones should remain unchanged
      expect(droneManager.availableDrones).toBe(3);
    });

    it('should handle missing deployments in save data', () => {
      droneManager.deployments = [{ q: 1, r: 0, droneType: 'basicGatherer' }];

      droneManager.loadSaveData({ totalBuilt: 10 });

      // deployments should remain unchanged
      expect(droneManager.deployments.length).toBe(1);
    });

    it('should handle empty save data', () => {
      droneManager.totalBuilt = 5;
      droneManager.availableDrones = 2;

      droneManager.loadSaveData({});

      // All should remain unchanged
      expect(droneManager.totalBuilt).toBe(5);
      expect(droneManager.availableDrones).toBe(2);
    });

    it('should handle zero values in save data', () => {
      droneManager.totalBuilt = 10;
      droneManager.availableDrones = 5;

      droneManager.loadSaveData({
        totalBuilt: 0,
        availableDrones: 0,
        deployments: []
      });

      expect(droneManager.totalBuilt).toBe(0);
      expect(droneManager.availableDrones).toBe(0);
      expect(droneManager.deployments).toEqual([]);
    });
  });
});
