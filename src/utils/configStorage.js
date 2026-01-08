// configStorage.js - Centralized config storage utilities
// REQ-CFG-006: Secure config storage for dev mode

import { isDevMode } from './devMode.js';

/**
 * Storage key prefix for dev configs
 */
const DEV_CONFIG_PREFIX = 'dev_';

/**
 * Config types
 */
export const ConfigType = {
  STRUCTURES: 'structures',
  RESOURCES: 'resources',
  TILES: 'tiles',
  DRONES: 'drones'
};

/**
 * Save config data to dev storage
 * Only works in dev mode
 * @param {string} configType - Type of config (structures, resources, tiles, drones)
 * @param {object} data - Config data to save
 * @returns {boolean} Success status
 */
export function saveConfigToDev(configType, data) {
  if (!isDevMode()) {
    console.warn('Config storage only available in dev mode');
    return false;
  }

  try {
    const key = `${DEV_CONFIG_PREFIX}${configType}_override`;
    localStorage.setItem(key, JSON.stringify(data));
    console.log(`Saved ${configType} config to localStorage`);
    return true;
  } catch (error) {
    console.error(`Failed to save ${configType} config:`, error);
    return false;
  }
}

/**
 * Load config data from dev storage
 * Only works in dev mode
 * @param {string} configType - Type of config to load
 * @returns {object|null} Config data or null if not found
 */
export function loadConfigFromDev(configType) {
  if (!isDevMode()) {
    return null;
  }

  try {
    const key = `${DEV_CONFIG_PREFIX}${configType}_override`;
    const data = localStorage.getItem(key);
    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error(`Failed to load ${configType} config:`, error);
    return null;
  }
}

/**
 * Clear specific config type from dev storage
 * @param {string} configType - Type of config to clear
 * @returns {boolean} Success status
 */
export function clearConfigFromDev(configType) {
  if (!isDevMode()) {
    console.warn('Config storage only available in dev mode');
    return false;
  }

  try {
    const key = `${DEV_CONFIG_PREFIX}${configType}_override`;
    localStorage.removeItem(key);
    console.log(`Cleared ${configType} config from localStorage`);
    return true;
  } catch (error) {
    console.error(`Failed to clear ${configType} config:`, error);
    return false;
  }
}

/**
 * Clear all dev configs
 * @returns {boolean} Success status
 */
export function clearAllDevConfigs() {
  if (!isDevMode()) {
    console.warn('Config storage only available in dev mode');
    return false;
  }

  try {
    Object.values(ConfigType).forEach(type => {
      clearConfigFromDev(type);
    });
    console.log('Cleared all dev configs');
    return true;
  } catch (error) {
    console.error('Failed to clear all dev configs:', error);
    return false;
  }
}

/**
 * Get all stored dev config types
 * @returns {string[]} Array of config types that have stored data
 */
export function getStoredConfigTypes() {
  if (!isDevMode()) {
    return [];
  }

  const stored = [];
  Object.values(ConfigType).forEach(type => {
    const data = loadConfigFromDev(type);
    if (data) {
      stored.push(type);
    }
  });
  return stored;
}

/**
 * Export all dev configs as a single object
 * @returns {object} Object with all config types
 */
export function exportAllDevConfigs() {
  if (!isDevMode()) {
    return {};
  }

  const allConfigs = {};
  Object.values(ConfigType).forEach(type => {
    const data = loadConfigFromDev(type);
    if (data) {
      allConfigs[type] = data;
    }
  });
  return allConfigs;
}

/**
 * Import all dev configs from an object
 * @param {object} configs - Object with config data
 * @returns {boolean} Success status
 */
export function importAllDevConfigs(configs) {
  if (!isDevMode()) {
    console.warn('Config storage only available in dev mode');
    return false;
  }

  try {
    Object.entries(configs).forEach(([type, data]) => {
      if (Object.values(ConfigType).includes(type)) {
        saveConfigToDev(type, data);
      }
    });
    console.log('Imported all dev configs');
    return true;
  } catch (error) {
    console.error('Failed to import dev configs:', error);
    return false;
  }
}
