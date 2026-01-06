// CraftingScene.js - Crafting interface scene
// REQ-CRAFT-003: Display recipes and craft buttons

import Phaser from 'phaser';
import { recipes, getComponentRecipe } from '../config/recipes.js';

export class CraftingScene extends Phaser.Scene {
  constructor() {
    super({ key: 'CraftingScene' });
    this.craftingManager = null;
    this.resourceManager = null;
    this.uiContainer = null;
    this.lastUpdate = 0;
  }

  /**
   * Initialize with managers
   * @param {object} data - {craftingManager, resourceManager}
   */
  init(data) {
    this.craftingManager = data.craftingManager;
    this.resourceManager = data.resourceManager;
  }

  create() {
    // Create UI container in DOM
    this.createUI();
    
    console.log('CraftingScene created');
  }

  /**
   * Create DOM-based crafting UI
   * REQ-CRAFT-003: Display all recipes with costs
   */
  createUI() {
    // Get or create crafting panel
    let panel = document.getElementById('crafting-panel');
    
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'crafting-panel';
      panel.style.display = 'none';
      document.getElementById('main-content').appendChild(panel);
    }

    this.uiContainer = panel;
    
    // Build panel content
    this.updateUI();
  }

  /**
   * Update the crafting UI with current state
   */
  updateUI() {
    if (!this.uiContainer) return;

    const components = this.craftingManager.getAllComponents();
    const componentTypes = Object.keys(recipes.components);

    let html = `
      <h1>Crafting Station</h1>
        
        <div style="margin-bottom: 2rem;">
          <h3>Component Inventory</h3>
          <div style="display: flex; gap: 2rem; margin-bottom: 2rem;">
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
          <div class="info-box">
            <div style="color: var(--text-secondary); font-size: 0.9rem;">
              💡 <strong>Tip:</strong> Craft components from resources, then use them to build drones in the Drones tab.
            </div>
          </div>
        </div>

        <h3>Craft Components</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
    `;

    // Add craft cards for each component
    componentTypes.forEach(componentType => {
      const recipe = getComponentRecipe(componentType);
      const canCraft = this.craftingManager.canCraft(componentType);
      
      // Format component name
      const displayName = this.formatComponentName(componentType);
      
      html += `
        <div class="craft-card ${canCraft ? 'craftable' : 'not-craftable'}">
          <h4 style="color: var(--text-primary); margin-bottom: 1rem;">${displayName}</h4>
          <div style="margin-bottom: 1rem;">
            <div style="color: var(--text-secondary); margin-bottom: 0.5rem;">Cost:</div>
      `;

      // Display costs
      for (const [resource, amount] of Object.entries(recipe.cost)) {
        const current = this.resourceManager.getResource(resource);
        const hasEnough = current >= amount;
        const color = hasEnough ? 'var(--text-primary)' : 'var(--accent-primary)';
        
        html += `
          <div style="color: ${color}; margin-left: 1rem;">
            ${resource.charAt(0).toUpperCase() + resource.slice(1)}: ${amount}
            <span style="color: var(--text-secondary);">(${current})</span>
          </div>
        `;
      }

      html += `
          </div>
          <button 
            class="btn craft-btn" 
            data-component="${componentType}"
            ${!canCraft ? 'disabled' : ''}
          >
            ${canCraft ? 'Craft' : 'Insufficient Resources'}
          </button>
        </div>
      `;
    });

    html += `
        </div>
    `;

    this.uiContainer.innerHTML = html;

    // Add event listeners to craft buttons
    const craftButtons = this.uiContainer.querySelectorAll('.craft-btn');
    craftButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const componentType = e.target.getAttribute('data-component');
        this.handleCraft(componentType, e.target);
      });
    });
  }

  /**
   * Handle craft button click
   * REQ-CRAFT-005: Visual feedback on craft
   * @param {string} componentType - Component to craft
   * @param {HTMLElement} button - Button element for feedback
   */
  handleCraft(componentType, button) {
    const result = this.craftingManager.craftComponent(componentType);
    
    if (result.success) {
      // Visual feedback - button flash
      button.style.background = 'var(--accent-primary)';
      button.style.color = 'var(--bg-primary)';
      button.textContent = 'Crafted!';
      
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

  /**
   * Format component name for display
   * @param {string} name - Component name
   * @returns {string} - Formatted name
   */
  formatComponentName(name) {
    const names = {
      chassis: 'Chassis',
      circuit: 'Circuit Board',
      powerCore: 'Power Core'
    };
    return names[name] || name;
  }

  update(time, delta) {
    // Update UI when panel is visible
    const panel = document.getElementById('crafting-panel');
    if (panel && panel.style.display !== 'none') {
      // Update less frequently to avoid performance issues
      if (!this.lastUpdate || time - this.lastUpdate > 500) {
        this.updateUI();
        this.lastUpdate = time;
      }
    }
  }
}
