// DronesScene.js - Drone building interface scene
// REQ-DRONE-002: Display drone building UI

import Phaser from 'phaser';
import { recipes, getDroneRecipe } from '../config/recipes.js';

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
    
    console.log('DronesScene created');
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
      <h1>Drone Assembly Bay</h1>
        
        <div style="margin-bottom: 2rem;">
          <h3>Drone Inventory</h3>
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.5rem; margin-bottom: 1rem;">
            <div class="stat-card">
              <div class="stat-card-label">Available Drones</div>
              <div class="stat-card-value">${availableDrones}</div>
            </div>
            <div class="stat-card secondary">
              <div class="stat-card-label">Total Built</div>
              <div class="stat-card-value">${totalBuilt}</div>
            </div>
          </div>
          <div class="info-box">
            <div style="color: var(--text-secondary); font-size: 0.9rem;">
              💡 <strong>Tip:</strong> Build drones here, then deploy them to resource tiles in the Map tab to generate resources.
            </div>
          </div>
        </div>

        <div style="margin-bottom: 2rem;">
          <h3>Component Inventory</h3>
          <div style="display: flex; gap: 2rem;">
            <div>
              <span style="color: var(--text-secondary);">Chassis:</span>
              <span style="color: var(--text-primary); margin-left: 0.5rem; font-weight: bold;">${components.chassis}</span>
            </div>
            <div>
              <span style="color: var(--text-secondary);">Circuits:</span>
              <span style="color: var(--text-primary); margin-left: 0.5rem; font-weight: bold;">${components.circuit}</span>
            </div>
            <div>
              <span style="color: var(--text-secondary);">Power Cores:</span>
              <span style="color: var(--text-primary); margin-left: 0.5rem; font-weight: bold;">${components.powerCore}</span>
            </div>
          </div>
        </div>

        <h3>Build Drones</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: 1.5rem;">
    `;

    // Add build card for basic gatherer drone
    const droneType = 'basicGatherer';
    const recipe = getDroneRecipe(droneType);
    const canBuild = this.droneManager.canBuildDrone(droneType);
    
    html += `
      <div class="craft-card ${canBuild ? 'craftable' : 'not-craftable'}">
        <h4 style="color: var(--text-primary); margin-bottom: 0.5rem;">${recipe.name}</h4>
        <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1rem;">${recipe.description}</p>
        
        <div style="margin-bottom: 1rem;">
          <div style="color: var(--text-secondary); margin-bottom: 0.5rem; font-weight: 600;">Required Components:</div>
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
          <div style="color: var(--text-secondary); font-size: 0.85rem; margin-bottom: 0.3rem;">Generation Rate:</div>
          <div style="color: var(--color-silicon); font-weight: 600;">${recipe.stats.gatherRate} resources/sec per drone</div>
        </div>

        <button 
          class="btn build-drone-btn" 
          data-drone="${droneType}"
          ${!canBuild ? 'disabled' : ''}
        >
          ${canBuild ? 'Build Drone' : 'Insufficient Components'}
        </button>
      </div>
    `;

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
