// saveLoad.js - Save/load system using localStorage
// REQ-STATE-002: Persistent save system

const SAVE_KEY = 'panix_incremental_save';
const SAVE_VERSION = '1.0';

/**
 * Save game state to localStorage
 * REQ-STATE-003: Save data structure
 * @param {object} managers - All game managers
 * @returns {boolean} - Success status
 */
export function saveGame(managers) {
  try {
    const saveData = {
      version: SAVE_VERSION,
      timestamp: Date.now(),
      resources: managers.resourceManager.getSaveData(),
      crafting: managers.craftingManager.getSaveData(),
      drones: managers.droneManager.getSaveData()
    };

    localStorage.setItem(SAVE_KEY, JSON.stringify(saveData));
    console.log('Game saved successfully');
    return true;
  } catch (error) {
    console.error('Failed to save game:', error);
    return false;
  }
}

/**
 * Load game state from localStorage
 * REQ-STATE-004: Load and restore state
 * @param {object} managers - All game managers
 * @returns {boolean} - True if save was loaded, false if no save exists
 */
export function loadGame(managers) {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    
    if (!savedData) {
      console.log('No save data found, starting fresh');
      return false;
    }

    const saveData = JSON.parse(savedData);

    // Version check (for future compatibility)
    if (saveData.version !== SAVE_VERSION) {
      console.warn('Save version mismatch, starting fresh');
      return false;
    }

    // Load data into managers
    if (saveData.resources && managers.resourceManager) {
      managers.resourceManager.loadSaveData(saveData.resources);
    }

    if (saveData.crafting && managers.craftingManager) {
      managers.craftingManager.loadSaveData(saveData.crafting);
    }

    if (saveData.drones && managers.droneManager) {
      managers.droneManager.loadSaveData(saveData.drones);
    }

    console.log('Game loaded successfully from', new Date(saveData.timestamp));
    return true;
  } catch (error) {
    console.error('Failed to load game:', error);
    return false;
  }
}

/**
 * Check if a save exists
 * @returns {boolean}
 */
export function hasSaveData() {
  return localStorage.getItem(SAVE_KEY) !== null;
}

/**
 * Delete save data
 * @returns {boolean}
 */
export function deleteSave() {
  try {
    localStorage.removeItem(SAVE_KEY);
    console.log('Save data deleted');
    return true;
  } catch (error) {
    console.error('Failed to delete save:', error);
    return false;
  }
}

/**
 * Get save info without loading
 * @returns {object|null}
 */
export function getSaveInfo() {
  try {
    const savedData = localStorage.getItem(SAVE_KEY);
    if (!savedData) return null;

    const saveData = JSON.parse(savedData);
    return {
      version: saveData.version,
      timestamp: saveData.timestamp,
      date: new Date(saveData.timestamp).toLocaleString()
    };
  } catch (error) {
    console.error('Failed to get save info:', error);
    return null;
  }
}
