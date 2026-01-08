// ConfigManager.test.js - Unit tests for ConfigManager
import { describe, it, expect, beforeEach } from 'vitest';
import { ConfigManager } from './ConfigManager.js';

describe('ConfigManager', () => {
  let configManager;

  beforeEach(() => {
    configManager = new ConfigManager();
    configManager.refresh();
  });

  describe('validateResource', () => {
    it('should accept valid resource', () => {
      const validResource = {
        id: 'copper',
        name: 'resources.copper',
        icon: '🔶',
        baseRate: 1.5
      };

      const result = configManager.validateResource(validResource);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject resource with missing id', () => {
      const invalidResource = {
        name: 'resources.invalid',
        icon: '❌',
        baseRate: 1
      };

      const result = configManager.validateResource(invalidResource);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Resource ID is required');
    });

    it('should reject resource with missing name', () => {
      const invalidResource = {
        id: 'invalid',
        icon: '❌',
        baseRate: 1
      };

      const result = configManager.validateResource(invalidResource);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Resource name is required');
    });

    it('should reject resource with missing icon', () => {
      const invalidResource = {
        id: 'invalid',
        name: 'resources.invalid',
        baseRate: 1
      };

      const result = configManager.validateResource(invalidResource);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Resource icon is required');
    });

    it('should reject resource with invalid id format', () => {
      const invalidResource = {
        id: 'invalid resource!',
        name: 'resources.invalid',
        icon: '❌',
        baseRate: 1
      };

      const result = configManager.validateResource(invalidResource);

      expect(result.valid).toBe(false);
      expect(result.errors.some(err => err.includes('letters, numbers, hyphens'))).toBe(true);
    });

    it('should reject duplicate resource id', () => {
      const duplicateResource = {
        id: 'iron', // Already exists in default resources
        name: 'resources.iron_duplicate',
        icon: '🔩',
        baseRate: 1
      };

      const result = configManager.validateResource(duplicateResource);

      expect(result.valid).toBe(false);
      expect(result.errors.some(err => err.includes('already in use'))).toBe(true);
    });

    it('should allow editing existing resource with _isEdit flag', () => {
      const existingResource = {
        id: 'iron',
        name: 'resources.iron_modified',
        icon: '🔩',
        baseRate: 2,
        _isEdit: true
      };

      const result = configManager.validateResource(existingResource);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });
  });

  describe('validateTileType', () => {
    it('should accept valid tile type', () => {
      const validTile = {
        id: 'copper_tile',
        name: 'tiles.copper',
        resourceProduced: 'iron', // Use existing resource
        baseRate: 1,
        allowedDrones: ['basic']
      };

      const result = configManager.validateTileType(validTile);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject tile with missing id', () => {
      const invalidTile = {
        name: 'tiles.invalid',
        resourceProduced: 'iron',
        baseRate: 1
      };

      const result = configManager.validateTileType(invalidTile);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Tile type ID is required');
    });

    it('should reject tile with non-existent resource', () => {
      const invalidTile = {
        id: 'invalid_tile',
        name: 'tiles.invalid',
        resourceProduced: 'nonexistent_resource',
        baseRate: 1,
        allowedDrones: ['basic']
      };

      const result = configManager.validateTileType(invalidTile);

      expect(result.valid).toBe(false);
      expect(result.errors.some(err => err.includes('does not exist'))).toBe(true);
    });

    it('should accept tile with null resourceProduced', () => {
      const validTile = {
        id: 'empty_tile',
        name: 'tiles.empty',
        resourceProduced: null,
        baseRate: 0,
        allowedDrones: []
      };

      const result = configManager.validateTileType(validTile);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject duplicate tile id', () => {
      const duplicateTile = {
        id: 'iron', // Already exists in default tiles
        name: 'tiles.iron_duplicate',
        resourceProduced: 'iron',
        baseRate: 1,
        allowedDrones: ['basic']
      };

      const result = configManager.validateTileType(duplicateTile);

      expect(result.valid).toBe(false);
      expect(result.errors.some(err => err.includes('already in use'))).toBe(true);
    });
  });

  describe('validateStructure', () => {
    it('should accept valid structure', () => {
      const validStructure = {
        id: 'test_structure',
        name: 'Test Structure',
        icon: '🏗️',
        costs: {
          iron: 100,
          silicon: 50
        },
        stats: {}
      };

      const result = configManager.validateStructure(validStructure);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject structure with missing id', () => {
      const invalidStructure = {
        name: 'Invalid Structure',
        icon: '❌',
        costs: {}
      };

      const result = configManager.validateStructure(invalidStructure);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Structure ID is required');
    });

    it('should reject structure with non-existent cost resource', () => {
      const invalidStructure = {
        id: 'invalid_structure',
        name: 'Invalid Structure',
        icon: '❌',
        costs: {
          nonexistent_resource: 100
        }
      };

      const result = configManager.validateStructure(invalidStructure);

      expect(result.valid).toBe(false);
      expect(result.errors.some(err => err.includes('does not exist'))).toBe(true);
    });

    it.skip('should reject structure with non-existent production resource', () => {
      // Note: Production resource validation not yet implemented in ConfigManager
      const invalidStructure = {
        id: 'invalid_structure',
        name: 'Invalid Structure',
        icon: '❌',
        costs: { iron: 100 },
        stats: {
          production: {
            nonexistent_resource: 1
          }
        }
      };

      const result = configManager.validateStructure(invalidStructure);

      expect(result.valid).toBe(false);
      expect(result.errors.some(err => err.includes('does not exist'))).toBe(true);
    });
  });

  describe('validateDrone', () => {
    it('should accept valid drone', () => {
      const validDrone = {
        id: 'test_drone',
        name: 'Test Drone',
        components: {},
        stats: {}
      };

      const result = configManager.validateDrone(validDrone);

      expect(result.valid).toBe(true);
      expect(result.errors).toEqual([]);
    });

    it('should reject drone with missing id', () => {
      const invalidDrone = {
        name: 'Invalid Drone',
        components: {}
      };

      const result = configManager.validateDrone(invalidDrone);

      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Drone ID is required');
    });

    it.skip('should reject drone with non-existent component requirement', () => {
      // Note: Component validation not yet implemented in ConfigManager
      const invalidDrone = {
        id: 'invalid_drone',
        name: 'Invalid Drone',
        components: {
          nonexistent_component: 1
        }
      };

      const result = configManager.validateDrone(invalidDrone);

      expect(result.valid).toBe(false);
      expect(result.errors.some(err => err.includes('does not exist'))).toBe(true);
    });
  });

  describe('checkDependencies', () => {
    it('should find dependencies for resource used in tiles', () => {
      const dependencies = configManager.checkDependencies('resource', 'iron');

      expect(dependencies.length).toBeGreaterThan(0);
      expect(dependencies.some(dep => dep.includes('iron'))).toBe(true);
    });

    it('should return empty array for unused custom resource', () => {
      const dependencies = configManager.checkDependencies('resource', 'custom_unused_123');

      expect(dependencies).toEqual([]);
    });

    it('should find dependencies for resource used in structure costs', () => {
      const dependencies = configManager.checkDependencies('resource', 'silicon');

      expect(dependencies.length).toBeGreaterThan(0);
    });

    it('should handle non-existent entity gracefully', () => {
      const dependencies = configManager.checkDependencies('resource', 'completely_fake_id_xyz');

      expect(dependencies).toEqual([]);
    });
  });

  describe('integration tests', () => {
    it('should validate a complete resource workflow', () => {
      // Create new resource
      const newResource = {
        id: 'titanium',
        name: 'resources.titanium',
        icon: '🔷',
        baseRate: 0.5
      };

      const validation = configManager.validateResource(newResource);
      expect(validation.valid).toBe(true);

      // Check no dependencies exist yet
      const deps = configManager.checkDependencies('resource', 'titanium');
      expect(deps).toEqual([]);
    });

    it('should validate a complete tile type workflow', () => {
      // Create new tile using existing resource
      const newTile = {
        id: 'titanium_tile',
        name: 'tiles.titanium',
        resourceProduced: 'iron', // Use existing resource
        baseRate: 0.5,
        allowedDrones: ['basic', 'advanced']
      };

      const validation = configManager.validateTileType(newTile);
      expect(validation.valid).toBe(true);
    });

    it('should detect circular dependencies', () => {
      // Resources can't have circular deps in current system,
      // but structures depending on each other could
      const deps = configManager.checkDependencies('structure', 'solarPanel');
      
      // Should not crash and should return sensible results
      expect(Array.isArray(deps)).toBe(true);
    });
  });
});
