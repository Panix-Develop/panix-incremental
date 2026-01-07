// SettingsManager.js - Manages game settings and user preferences
// Handles number formatting, language selection, and player customization

/**
 * Manages game settings (language, number format, player name)
 * Persists settings to localStorage
 */
export class SettingsManager {
  constructor() {
    // Default settings
    this.settings = {
      numberFormat: 'normal', // 'normal', 'scientific', 'engineering'
      language: 'en', // 'en', 'de'
      playerName: 'Commander',
      version: '0.1.0'
    };
    
    this.loadSettings();
  }

  /**
   * Load settings from localStorage
   * Merges saved settings with defaults to handle new settings
   */
  loadSettings() {
    try {
      const saved = localStorage.getItem('panix_settings');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Merge with defaults to handle new settings added in updates
        this.settings = { ...this.settings, ...parsed };
      }
    } catch (error) {
      console.error('Failed to load settings:', error);
    }
  }

  /**
   * Save settings to localStorage
   */
  saveSettings() {
    try {
      localStorage.setItem('panix_settings', JSON.stringify(this.settings));
    } catch (error) {
      console.error('Failed to save settings:', error);
    }
  }

  /**
   * Get a setting value by key
   * @param {string} key - Setting key
   * @returns {*} Setting value
   */
  getSetting(key) {
    return this.settings[key];
  }

  /**
   * Set a setting value by key
   * @param {string} key - Setting key
   * @param {*} value - Setting value
   */
  setSetting(key, value) {
    this.settings[key] = value;
    this.saveSettings();
  }

  /**
   * Get current number format
   * @returns {string} 'normal', 'scientific', or 'engineering'
   */
  getNumberFormat() {
    return this.settings.numberFormat;
  }

  /**
   * Set number format
   * @param {string} format - 'normal', 'scientific', or 'engineering'
   */
  setNumberFormat(format) {
    if (!['normal', 'scientific', 'engineering'].includes(format)) {
      console.warn(`Invalid number format: ${format}, using 'normal'`);
      format = 'normal';
    }
    this.settings.numberFormat = format;
    this.saveSettings();
  }

  /**
   * Get current language
   * @returns {string} Language code (e.g., 'en', 'de')
   */
  getLanguage() {
    return this.settings.language;
  }

  /**
   * Set language
   * @param {string} lang - Language code (e.g., 'en', 'de')
   */
  setLanguage(lang) {
    this.settings.language = lang;
    this.saveSettings();
  }

  /**
   * Get player name
   * @returns {string} Player name
   */
  getPlayerName() {
    return this.settings.playerName;
  }

  /**
   * Set player name
   * @param {string} name - Player name
   */
  setPlayerName(name) {
    if (!name || name.trim().length === 0) {
      console.warn('Player name cannot be empty');
      return;
    }
    if (name.length > 20) {
      console.warn('Player name too long, truncating to 20 characters');
      name = name.substring(0, 20);
    }
    this.settings.playerName = name.trim();
    this.saveSettings();
  }

  /**
   * Get all settings
   * @returns {object} All settings
   */
  getAllSettings() {
    return { ...this.settings };
  }

  /**
   * Reset settings to defaults
   */
  resetSettings() {
    this.settings = {
      numberFormat: 'normal',
      language: 'en',
      playerName: 'Commander',
      version: '0.1.0'
    };
    this.saveSettings();
  }
}
