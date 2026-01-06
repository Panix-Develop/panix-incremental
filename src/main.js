// main.js - Entry point for Panix Incremental
// REQ-STATE-001: Initialize Phaser game

// Import modular CSS
import './styles/base.css';
import './styles/components.css';
import './styles/pages.css';
import './styles/utilities.css';

import Phaser from 'phaser';
import { gameConfig } from './config/gameConfig.js';
import { MapScene } from './scenes/MapScene.js';
import { CraftingScene } from './scenes/CraftingScene.js';
import { DronesScene } from './scenes/DronesScene.js';
import { StructuresScene } from './scenes/StructuresScene.js';
import { SettingsScene } from './scenes/SettingsScene.js';
import { ResourceManager } from './systems/ResourceManager.js';
import { SettingsManager } from './systems/SettingsManager.js';
import { CraftingManager } from './systems/CraftingManager.js';
import { DroneManager } from './systems/DroneManager.js';
import { StructureManager } from './systems/StructureManager.js';
import { TabNavigation } from './ui/TabNavigation.js';
import { ResourcePanel } from './ui/ResourcePanel.js';
import { saveGame, loadGame, hasSaveData } from './utils/saveLoad.js';

// Add scenes to config
gameConfig.scene = [MapScene, CraftingScene, DronesScene, StructuresScene, SettingsScene];

// Create Phaser game instance
const game = new Phaser.Game(gameConfig);

// Store managers globally for save/load
let managers = null;
let autoSaveInterval = null;

// Initialize managers after game is ready
game.events.once('ready', () => {
  // Wait a frame for scenes to be registered
  setTimeout(() => {
    const mapScene = game.scene.getScene('MapScene');
    
    if (mapScene && mapScene.hexGrid) {
      // Initialize managers (shared across scenes)
      const resourceManager = new ResourceManager();
      const craftingManager = new CraftingManager(resourceManager);
      const droneManager = new DroneManager(craftingManager, mapScene.hexGrid);
      const structureManager = new StructureManager(resourceManager);
      const settingsManager = new SettingsManager();

      // Store managers for save/load
      managers = {
        resourceManager,
        craftingManager,
        droneManager,
        structureManager,
        settingsManager,
        hexGrid: mapScene.hexGrid
      };

      // REQ-STATE-004: Load game on startup
      const wasLoaded = loadGame(managers);
      if (wasLoaded) {
        showNotification('Game loaded successfully!');
        
        // Refresh all tile visuals after loading drones
        managers.droneManager.getDeployments().forEach(deployment => {
          mapScene.refreshTile(deployment.q, deployment.r);
        });
      }

      // Pass managers to MapScene
      mapScene.resourceManager = resourceManager;
      mapScene.craftingManager = craftingManager;
      mapScene.droneManager = droneManager;
      mapScene.structureManager = structureManager;
      mapScene.settingsManager = settingsManager;
      
      // Recreate ResourcePanel with settingsManager
      mapScene.resourcePanel = new ResourcePanel(settingsManager);
      
      // Set managers on TileInfoPanel
      if (mapScene.tileInfoPanel) {
        mapScene.tileInfoPanel.setManagers(structureManager, resourceManager);
      }

      // Initialize CraftingScene with managers
      game.scene.start('CraftingScene', {
        craftingManager: craftingManager,
        resourceManager: resourceManager
      });

      // Initialize DronesScene with managers
      game.scene.start('DronesScene', {
        droneManager: droneManager,
        craftingManager: craftingManager
      });

      // Initialize StructuresScene with managers
      game.scene.start('StructuresScene', {
        structureManager: structureManager,
        resourceManager: resourceManager
      });

      // Initialize SettingsScene with managers
      game.scene.start('SettingsScene', {
        settingsManager: settingsManager
      });

      // Start with MapScene active, other scenes in background
      game.scene.sleep('CraftingScene');
      game.scene.sleep('DronesScene');
      game.scene.sleep('StructuresScene');

      // Initialize tab navigation
      const tabNavigation = new TabNavigation(game);

      // REQ-STATE-002: Auto-save every 10 seconds
      autoSaveInterval = setInterval(() => {
        if (managers) {
          saveGame(managers);
        }
      }, 10000);

      // REQ-STATE-002: Save on page unload
      window.addEventListener('beforeunload', () => {
        if (managers) {
          saveGame(managers);
        }
      });

      // Listen for manual save button
      window.addEventListener('manualSave', () => {
        if (managers) {
          const success = saveGame(managers);
          if (success) {
            showNotification('Game saved!');
          } else {
            showNotification('Failed to save game');
          }
        }
      });

      // Listen for debug reset resources
      window.addEventListener('debugResetResources', () => {
        if (managers) {
          managers.resourceManager.resources.iron = 0;
          managers.resourceManager.resources.silicon = 0;
          managers.resourceManager.resources.energy = 0;
          showNotification('Resources reset to 0');
        }
      });

      // Listen for debug hard reset
      window.addEventListener('debugHardReset', () => {
        if (managers) {
          // Clear save data
          localStorage.clear();
          
          // Reset all managers
          managers.resourceManager.resources = { iron: 0, silicon: 0, energy: 0 };
          managers.craftingManager.components = { chassis: 0, circuit: 0, powerCore: 0 };
          managers.droneManager.availableDrones = 0;
          managers.droneManager.totalBuilt = 0;
          managers.droneManager.deployments = [];
          managers.structureManager.reset();
          
          // Reset all drones from tiles
          managers.hexGrid.getAllTiles().forEach(tile => {
            if (tile.drones > 0) {
              managers.hexGrid.setTileDrones(tile.q, tile.r, 0);
            }
          });
          
          showNotification('Hard reset complete!');
          
          // Refresh all UI
          const mapScene = game.scene.getScene('MapScene');
          if (mapScene) {
            mapScene.updateTileVisuals();
          }
        }
      });

      // Expose to window for debugging
      window.game = game;
      window.resourceManager = resourceManager;
      window.craftingManager = craftingManager;
      window.droneManager = droneManager;
      window.saveGame = () => saveGame(managers);
      window.loadGame = () => loadGame(managers);

      console.log('Panix Incremental - All systems initialized');
    }
  }, 100);
});

/**
 * Show a notification to the user
 * @param {string} message - Message to display
 */
function showNotification(message) {
  const notification = document.createElement('div');
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(233, 69, 96, 0.95);
    color: white;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: bold;
    z-index: 1000;
    animation: slideDown 0.3s ease-out;
  `;
  
  document.body.appendChild(notification);
  
  // Remove after 3 seconds
  setTimeout(() => {
    notification.style.animation = 'slideUp 0.3s ease-out';
    setTimeout(() => {
      notification.remove();
    }, 300);
  }, 3000);
}

console.log('Panix Incremental - Game initialized');

