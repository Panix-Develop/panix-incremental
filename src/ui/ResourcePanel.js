// ResourcePanel.js - Resource display component
// REQ-RES-002: Display resources in panel

import { formatNumber } from '../utils/formatNumber.js';
import { t } from '../utils/i18n.js';

export class ResourcePanel {
  constructor(settingsManager = null) {
    this.panel = document.getElementById('resource-panel');
    this.settingsManager = settingsManager;
    
    if (!this.panel) {
      console.error('Resource panel element not found!');
      return;
    }

    this.createPanelContent();
    
    // Load saved width
    const savedWidth = localStorage.getItem('resourcePanelWidth');
    if (savedWidth) {
      this.panel.style.width = savedWidth + 'px';
    }
    
    // Save width on resize
    const resizeObserver = new ResizeObserver(entries => {
      for (let entry of entries) {
        const width = entry.contentRect.width;
        localStorage.setItem('resourcePanelWidth', width);
      }
    });
    resizeObserver.observe(this.panel);
    
    // Listen for settings changes to update number format and language
    window.addEventListener('settingsUpdated', (e) => {
      if (e.detail.setting === 'numberFormat') {
        // Trigger a refresh of the display
        this.lastResources = null;
      } else if (e.detail.setting === 'language') {
        // Rebuild panel with new translations
        this.createPanelContent();
        this.lastResources = null;
      }
    });
  }

  /**
   * Create the panel HTML structure
   */
  createPanelContent() {
    this.panel.innerHTML = `
      <h3 style="margin: 0 0 1rem 0; color: var(--accent-primary); border-bottom: 2px solid var(--accent-primary); padding-bottom: 0.5rem;">
        ${t('common.resources')}
      </h3>
      <div class="resource-list">
        <div class="resource-item">
          <span class="resource-name">${t('resources.iron')}</span>
          <span class="resource-value" id="resource-iron">0</span>
          <span class="resource-rate" id="rate-iron">+0.0/s</span>
        </div>
        <div class="resource-item">
          <span class="resource-name">${t('resources.silicon')}</span>
          <span class="resource-value" id="resource-silicon">0</span>
          <span class="resource-rate" id="rate-silicon">+0.0/s</span>
        </div>
        <div class="resource-item">
          <span class="resource-name">${t('resources.energy')}</span>
          <span class="resource-value" id="resource-energy">0</span>
          <span class="resource-rate" id="rate-energy">+0.0/s</span>
        </div>
      </div>
      <button 
        id="debug-add-resources" 
        class="btn" 
        style="margin-top: 1rem; padding: 0.5rem; font-size: 0.8rem; background: var(--bg-tertiary);"
        title="${t('common.debugAdd')}"
      >
        🔧 ${t('common.debugAdd')}
      </button>
      <button 
        id="debug-reset-resources" 
        class="btn" 
        style="margin-top: 0.5rem; padding: 0.5rem; font-size: 0.8rem; background: var(--accent-secondary);"
        title="${t('common.resetResources')}"
      >
        🔄 ${t('common.resetResources')}
      </button>
      <button 
        id="debug-hard-reset" 
        class="btn" 
        style="margin-top: 0.5rem; padding: 0.5rem; font-size: 0.8rem; background: #d32f2f;"
        title="${t('common.reset')}"
      >
        ⚠️ ${t('common.reset')}
      </button>
      <button 
        id="manual-save-btn" 
        class="btn" 
        style="margin-top: 0.5rem; padding: 0.5rem; font-size: 0.8rem; background: var(--color-silicon);"
        title="${t('common.saveGame')}"
      >
        💾 ${t('common.saveGame')}
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
    const format = this.settingsManager ? this.settingsManager.getNumberFormat() : 'normal';
    
    // Update values with formatted numbers
    this.updateElement('resource-iron', formatNumber(resources.iron, format));
    this.updateElement('resource-silicon', formatNumber(resources.silicon, format));
    this.updateElement('resource-energy', formatNumber(resources.energy, format));

    // Update rates
    this.updateElement('rate-iron', this.formatRate(rates.iron, format));
    this.updateElement('rate-silicon', this.formatRate(rates.silicon, format));
    this.updateElement('rate-energy', this.formatRate(rates.energy, format));
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
   * @param {string} format - Number format
   * @returns {string} - Formatted rate string
   */
  formatRate(rate, format = 'normal') {
    if (rate === 0) return '+0.0/s';
    if (rate < 1) {
      return `+${rate.toFixed(2)}/s`;
    }
    return `+${formatNumber(rate, format)}/s`;
  }
}
