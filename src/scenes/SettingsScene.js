// SettingsScene.js - Settings interface scene
// Provides UI for game configuration and preferences

import Phaser from 'phaser';

export class SettingsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'SettingsScene' });
    this.settingsManager = null;
    this.uiContainer = null;
  }

  /**
   * Initialize with managers
   * @param {object} data - {settingsManager}
   */
  init(data) {
    this.settingsManager = data.settingsManager;
  }

  create() {
    this.createUI();
    console.log('SettingsScene created');
  }

  /**
   * Create DOM-based settings UI
   */
  createUI() {
    let panel = document.getElementById('settings-panel');
    
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'settings-panel';
      panel.style.display = 'none';
      document.getElementById('main-content').appendChild(panel);
    }

    this.uiContainer = panel;
    this.updateUI();
  }

  /**
   * Update the settings UI with current state
   */
  updateUI() {
    if (!this.uiContainer) return;

    const numberFormat = this.settingsManager.getNumberFormat();
    const language = this.settingsManager.getLanguage();
    const playerName = this.settingsManager.getPlayerName();

    let html = `
      <h1>Settings</h1>
      
      <!-- Display Settings Section -->
      <div style="margin-bottom: 2.5rem;">
        <h3>Display Settings</h3>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Number Format
          </label>
          <select 
            id="number-format-select" 
            class="settings-select"
            style="width: 100%; padding: 0.75rem; background: var(--bg-secondary); color: var(--text-primary); border: 2px solid var(--border-color); border-radius: 5px; font-size: 1rem; cursor: pointer;"
          >
            <option value="normal" ${numberFormat === 'normal' ? 'selected' : ''}>Normal (1.23K, 4.56M)</option>
            <option value="scientific" ${numberFormat === 'scientific' ? 'selected' : ''}>Scientific (1.23e3, 4.56e6)</option>
            <option value="engineering" ${numberFormat === 'engineering' ? 'selected' : ''}>Engineering (1.23e3, 12.3e3)</option>
          </select>
        </div>

        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Language
          </label>
          <select 
            id="language-select" 
            class="settings-select"
            style="width: 100%; padding: 0.75rem; background: var(--bg-secondary); color: var(--text-primary); border: 2px solid var(--border-color); border-radius: 5px; font-size: 1rem; cursor: pointer;"
          >
            <option value="en" ${language === 'en' ? 'selected' : ''}>English</option>
            <option value="de" ${language === 'de' ? 'selected' : ''}>German (Deutsch)</option>
          </select>
        </div>
      </div>

      <!-- Player Settings Section -->
      <div style="margin-bottom: 2.5rem;">
        <h3>Player Settings</h3>
        
        <div style="margin-bottom: 1.5rem;">
          <label style="display: block; color: var(--text-secondary); margin-bottom: 0.5rem;">
            Player Name
          </label>
          <input 
            type="text" 
            id="player-name-input" 
            value="${playerName}"
            maxlength="20"
            placeholder="Enter your name"
            style="width: 100%; padding: 0.75rem; background: var(--bg-secondary); color: var(--text-primary); border: 2px solid var(--border-color); border-radius: 5px; font-size: 1rem; box-sizing: border-box;"
          />
          <div style="color: var(--text-secondary); font-size: 0.85rem; margin-top: 0.5rem;">
            Maximum 20 characters
          </div>
        </div>

        <button id="update-name-btn" class="btn">
          Update Name
        </button>
      </div>

      <!-- About Section -->
      <div class="info-box">
        <h3 style="margin-top: 0;">About</h3>
        <div style="color: var(--text-secondary); line-height: 1.6;">
          <div style="margin-bottom: 0.5rem;">
            <strong style="color: var(--text-primary);">Panix Incremental</strong>
          </div>
          <div style="margin-bottom: 0.5rem;">
            Version: <strong style="color: var(--accent-primary);">0.1.0</strong>
          </div>
          <div style="margin-bottom: 0.5rem;">
            Stage: <strong style="color: var(--accent-primary);">2 - Core Systems Enhancement</strong>
          </div>
          <div style="margin-top: 1rem; font-size: 0.9rem;">
            A space-themed incremental game featuring hex-grid resource management, drone automation, and strategic expansion.
          </div>
        </div>
      </div>
    `;

    this.uiContainer.innerHTML = html;
    this.attachEventListeners();
  }

  /**
   * Attach event listeners to UI elements
   */
  attachEventListeners() {
    // Number format select
    const numberFormatSelect = document.getElementById('number-format-select');
    if (numberFormatSelect) {
      numberFormatSelect.addEventListener('change', (e) => {
        this.settingsManager.setNumberFormat(e.target.value);
        this.emitSettingsUpdated('numberFormat', e.target.value);
      });
    }

    // Language select
    const languageSelect = document.getElementById('language-select');
    if (languageSelect) {
      languageSelect.addEventListener('change', async (e) => {
        this.settingsManager.setLanguage(e.target.value);
        // Import i18n and update language
        const { setLanguage } = await import('../utils/i18n.js');
        await setLanguage(e.target.value);
        this.emitSettingsUpdated('language', e.target.value);
      });
    }

    // Update name button
    const updateNameBtn = document.getElementById('update-name-btn');
    const playerNameInput = document.getElementById('player-name-input');
    if (updateNameBtn && playerNameInput) {
      updateNameBtn.addEventListener('click', () => {
        const newName = playerNameInput.value.trim();
        if (newName && newName.length > 0) {
          this.settingsManager.setPlayerName(newName);
          this.emitSettingsUpdated('playerName', newName);
          
          // Show success feedback
          updateNameBtn.textContent = '✓ Updated!';
          updateNameBtn.style.background = 'var(--success)';
          setTimeout(() => {
            updateNameBtn.textContent = 'Update Name';
            updateNameBtn.style.background = '';
          }, 2000);
        }
      });

      // Also allow Enter key to update name
      playerNameInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
          updateNameBtn.click();
        }
      });
    }
  }

  /**
   * Emit settings updated event
   * @param {string} setting - Setting that was changed
   * @param {*} value - New value
   */
  emitSettingsUpdated(setting, value) {
    window.dispatchEvent(new CustomEvent('settingsUpdated', {
      detail: { setting, value }
    }));
  }

  /**
   * Show this scene
   */
  show() {
    if (this.uiContainer) {
      this.uiContainer.style.display = 'block';
    }
  }

  /**
   * Hide this scene
   */
  hide() {
    if (this.uiContainer) {
      this.uiContainer.style.display = 'none';
    }
  }
}
