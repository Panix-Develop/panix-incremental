// ResourcePanel.js - Resource display component
// REQ-RES-002: Display resources in panel

export class ResourcePanel {
  constructor() {
    this.panel = document.getElementById('resource-panel');
    
    if (!this.panel) {
      console.error('Resource panel element not found!');
      return;
    }

    this.createPanelContent();
  }

  /**
   * Create the panel HTML structure
   */
  createPanelContent() {
    this.panel.innerHTML = `
      <h3 style="margin: 0 0 1rem 0; color: var(--accent-primary); border-bottom: 2px solid var(--accent-primary); padding-bottom: 0.5rem;">
        Resources
      </h3>
      <div class="resource-list">
        <div class="resource-item">
          <span class="resource-name">Iron</span>
          <span class="resource-value" id="resource-iron">0</span>
          <span class="resource-rate" id="rate-iron">+0.0/s</span>
        </div>
        <div class="resource-item">
          <span class="resource-name">Silicon</span>
          <span class="resource-value" id="resource-silicon">0</span>
          <span class="resource-rate" id="rate-silicon">+0.0/s</span>
        </div>
        <div class="resource-item">
          <span class="resource-name">Energy</span>
          <span class="resource-value" id="resource-energy">0</span>
          <span class="resource-rate" id="rate-energy">+0.0/s</span>
        </div>
      </div>
      <button 
        id="debug-add-resources" 
        class="btn" 
        style="margin-top: 1rem; padding: 0.5rem; font-size: 0.8rem; background: var(--bg-tertiary);"
        title="Debug: Add 100 of each resource"
      >
        🔧 Debug +100
      </button>
      <button 
        id="debug-reset-resources" 
        class="btn" 
        style="margin-top: 0.5rem; padding: 0.5rem; font-size: 0.8rem; background: var(--accent-secondary);"
        title="Debug: Reset resources to 0"
      >
        🔄 Reset Resources
      </button>
      <button 
        id="debug-hard-reset" 
        class="btn" 
        style="margin-top: 0.5rem; padding: 0.5rem; font-size: 0.8rem; background: #d32f2f;"
        title="Debug: Hard reset - clears all progress"
      >
        ⚠️ Hard Reset
      </button>
      <button 
        id="manual-save-btn" 
        class="btn" 
        style="margin-top: 0.5rem; padding: 0.5rem; font-size: 0.8rem; background: var(--color-silicon);"
        title="Save game manually"
      >
        💾 Save Game
      </button>
    `;

    // Add event listener for debug button
    const debugBtn = document.getElementById('debug-add-resources');
    if (debugBtn) {
      debugBtn.addEventListener('click', () => {
        this.onDebugAddResources();
      });
    }

    // Add event listener for reset resources button
    const resetResourcesBtn = document.getElementById('debug-reset-resources');
    if (resetResourcesBtn) {
      resetResourcesBtn.addEventListener('click', () => {
        this.onDebugResetResources();
      });
    }

    // Add event listener for hard reset button
    const hardResetBtn = document.getElementById('debug-hard-reset');
    if (hardResetBtn) {
      hardResetBtn.addEventListener('click', () => {
        this.onDebugHardReset();
      });
    }

    // Add event listener for save button
    const saveBtn = document.getElementById('manual-save-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', () => {
        this.onManualSave();
      });
    }
  }

  /**
   * Debug function to add resources for testing
   */
  onDebugAddResources() {
    const event = new CustomEvent('debugAddResources', {
      detail: { amount: 100 }
    });
    window.dispatchEvent(event);
  }

  /**
   * Debug function to reset resources to zero
   */
  onDebugResetResources() {
    if (confirm('Reset all resources to 0?')) {
      const event = new CustomEvent('debugResetResources');
      window.dispatchEvent(event);
    }
  }

  /**
   * Debug function to perform hard reset
   */
  onDebugHardReset() {
    if (confirm('Hard reset will delete all progress. Are you sure?')) {
      const event = new CustomEvent('debugHardReset');
      window.dispatchEvent(event);
    }
  }

  /**
   * Manual save button handler
   */
  onManualSave() {
    const event = new CustomEvent('manualSave');
    window.dispatchEvent(event);
  }

  /**
   * Update resource display
   * REQ-RES-002: Updates in real-time
   * @param {object} resources - Current resource amounts
   * @param {object} rates - Generation rates per second
   */
  update(resources, rates) {
    // Update values
    this.updateElement('resource-iron', resources.iron);
    this.updateElement('resource-silicon', resources.silicon);
    this.updateElement('resource-energy', resources.energy);

    // Update rates
    this.updateElement('rate-iron', this.formatRate(rates.iron));
    this.updateElement('rate-silicon', this.formatRate(rates.silicon));
    this.updateElement('rate-energy', this.formatRate(rates.energy));
  }

  /**
   * Update a single element's text content
   * @param {string} id - Element ID
   * @param {string|number} value - New value
   */
  updateElement(id, value) {
    const element = document.getElementById(id);
    if (element) {
      element.textContent = value;
    }
  }

  /**
   * Format generation rate for display
   * @param {number} rate - Resources per second
   * @returns {string} - Formatted rate string
   */
  formatRate(rate) {
    if (rate === 0) return '+0.0/s';
    return `+${rate.toFixed(1)}/s`;
  }

  /**
   * Format large numbers with abbreviations
   * @param {number} num - Number to format
   * @returns {string} - Formatted number
   */
  formatNumber(num) {
    if (num < 1000) {
      return Math.floor(num).toString();
    } else if (num < 1000000) {
      return (num / 1000).toFixed(1) + 'K';
    } else if (num < 1000000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else {
      return (num / 1000000000).toFixed(1) + 'B';
    }
  }
}
