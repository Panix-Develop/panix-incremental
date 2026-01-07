// DronesScene.js - Drone building interface scene
// REQ-DRONE-002: Display drone building UI

import Phaser from 'phaser';
import { recipes, getDroneRecipe, getAllDroneRecipes } from '../config/recipes.js';
import { t } from '../utils/i18n.js';

export class DronesScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DronesScene' });
    this.droneManager = null;
    this.craftingManager = null;
    this.uiContainer = null;
    this.lastUpdate = 0;
  }

  /**
   * Initialize with managers
   * @param {object} data - {droneManager, craftingManager}
   */
  init(data) {
    this.droneManager = data.droneManager;
    this.craftingManager = data.craftingManager;
  }

  create() {
    // Create UI container in DOM
    this.createUI();
    
    // Listen for language changes to refresh UI
    window.addEventListener('settingsUpdated', (e) => {
      if (e.detail.setting === 'language') {
        this.updateUI();
      }
    });
  }

  /**
   * Create DOM-based drones UI
   * REQ-DRONE-002: Display drone recipes and build button
   */
  createUI() {
    // Get or create drones panel
    let panel = document.getElementById('drones-panel');
    
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'drones-panel';
      panel.style.display = 'none';
      document.getElementById('main-content').appendChild(panel);
    }

    this.uiContainer = panel;
    
    // Build panel content
    this.updateUI();
  }

  /**
   * Update the drones UI with current state
   */
  updateUI() {
    if (!this.uiContainer) return;

    const components = this.craftingManager.getAllComponents();
    const availableDrones = this.droneManager.getAvailableDrones();
    const totalBuilt = this.droneManager.getTotalBuilt();

    let html = `
      <h1>${t('drones.title')}</h1>
        
        <div style="margin-bottom: 2rem;">
          <h3>${t('drones.droneInventory')}</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 1rem;">
            <div class="stat-card">
              <div class="stat-card-label">${t('drones.availableDrones')}</div>
              <div class="stat-card-value">${availableDrones}</div>
            </div>
            <div class="stat-card secondary">
              <div class="stat-card-label">${t('drones.totalBuilt')}</div>
              <div class="stat-card-value">${totalBuilt}</div>
            </div>
          </div>
          <div class="info-box">
            <div style="color: var(--text-secondary); font-size: 0.9rem;">
              ${t('drones.tip')}
            </div>
          </div>
        </div>

        <div style="margin-bottom: 2rem;">
          <h3>${t('drones.componentInventory')}</h3>
          <div style="display: flex; gap: 2rem;">
            <div>
              <span style="color: var(--text-secondary);">${t('crafting.chassis')}:</span>
              <span style="color: var(--text-primary); margin-left: 0.5rem; font-weight: bold;">${components.chassis}</span>
            </div>
            <div>
              <span style="color: var(--text-secondary);">${t('crafting.circuits')}:</span>
              <span style="color: var(--text-primary); margin-left: 0.5rem; font-weight: bold;">${components.circuit}</span>
            </div>
            <div>
              <span style="color: var(--text-secondary);">${t('crafting.powerCores')}:</span>
              <span style="color: var(--text-primary); margin-left: 0.5rem; font-weight: bold;">${components.powerCore}</span>
            </div>
          </div>
        </div>

        <h3>${t('drones.buildDrones')}</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
    `;

    // Get all drone recipes (including custom ones)
    const allDrones = getAllDroneRecipes();
    
    // Add build card for each drone type
    Object.entries(allDrones).forEach(([droneType, recipe]) => {
      const canBuild = this.droneManager.canBuildDrone(droneType);
      const isCustom = droneType.startsWith('custom_');
    
    html += `
      <div class="craft-card ${canBuild ? 'craftable' : 'not-craftable'}">
        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">
          ${t(recipe.name)}
          ${isCustom ? '<span style="color: var(--accent-primary); font-size: 0.75rem; margin-left: 0.5rem;">CUSTOM</span>' : ''}
        </h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">${t(recipe.description)}</p>
        
        <div style="margin-bottom: 1rem;">
          <div style="color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 600;">${t('drones.description')}:</div>
    `;

    // Display component requirements
    for (const [component, amount] of Object.entries(recipe.components)) {
      const current = components[component] || 0;
      const hasEnough = current >= amount;
      const color = hasEnough ? 'var(--text-primary)' : 'var(--accent-primary)';
      const displayName = component.charAt(0).toUpperCase() + component.slice(1);
      
      html += `
        <div style="color: ${color}; margin-left: 1rem; display: flex; justify-content: space-between; padding: 0.3rem 0;">
          <span>${displayName}:</span>
          <span>${amount} <span style="color: var(--text-secondary); font-size: 0.9rem;">(have ${current})</span></span>
        </div>
      `;
    }

    html += `
        </div>
        
        <div style="margin-bottom: 1rem; padding: 0.75rem; background: rgba(74, 144, 226, 0.1); border-radius: 4px;">
          <div style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.3rem;">${t('drones.gatherRate')}:</div>
          <div style="color: var(--color-silicon); font-weight: 600;">${t('drones.gatherRateValue', { rate: recipe.stats.gatherRate })}</div>
        </div>

        <button 
          class="btn build-drone-btn" 
          data-drone="${droneType}"
          ${!canBuild ? 'disabled' : ''}
        >
          ${canBuild ? t('drones.buildDrone') : t('drones.insufficientComponents')}
        </button>
      </div>
    `;
    }); // End forEach

    html += `
        </div>
    `;

    this.uiContainer.innerHTML = html;

    // Add event listeners to build buttons
    const buildButtons = this.uiContainer.querySelectorAll('.build-drone-btn');
    buildButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const droneType = e.target.getAttribute('data-drone');
        this.handleBuild(droneType, e.target);
      });
    });
  }

  /**
   * Handle build button click
   * REQ-DRONE-003: Visual feedback on build
   * @param {string} droneType - Drone type to build
   * @param {HTMLElement} button - Button element for feedback
   */
  handleBuild(droneType, button) {
    const result = this.droneManager.buildDrone(droneType);
    
    if (result.success) {
      // Visual feedback - button flash
      button.style.background = 'var(--color-silicon)';
      button.style.color = 'var(--bg-primary)';
      button.textContent = 'Drone Built!';
      
      setTimeout(() => {
        this.updateUI();
      }, 300);
    } else {
      // Error feedback
      button.style.background = '#d32f2f';
      button.textContent = result.error || 'Failed';
      
      setTimeout(() => {
        this.updateUI();
      }, 500);
    }
  }

  update(time, delta) {
    // Update UI when panel is visible
    const panel = document.getElementById('drones-panel');
    if (panel && panel.style.display !== 'none') {
      // Update less frequently to avoid performance issues
      if (!this.lastUpdate || time - this.lastUpdate > 500) {
        this.updateUI();
        this.lastUpdate = time;
      }
    }
  }
}
