// i18n.js - Internationalization utility
// Provides translation functions for multi-language support

import enTranslations from '../locales/en.json';
import deTranslations from '../locales/de.json';

let currentLanguage = 'en';
let translations = {};

// Available translations
const availableTranslations = {
  en: enTranslations,
  de: deTranslations
};

/**
 * Load translations for a specific language
 * @param {string} lang - Language code (e.g., 'en', 'de')
 */
export function loadTranslations(lang) {
  try {
    if (availableTranslations[lang]) {
      translations = availableTranslations[lang];
      currentLanguage = lang;
    } else {
      console.warn(`Translations for ${lang} not found, falling back to English`);
      translations = availableTranslations.en;
      currentLanguage = 'en';
    }
  } catch (error) {
    console.error('Failed to load translations:', error);
    // Fallback to English if loading fails
    translations = availableTranslations.en;
    currentLanguage = 'en';
  }
}

/**
 * Get translation for a key
 * Supports dot notation for nested keys (e.g., 'navigation.map')
 * Supports parameter replacement (e.g., {amount})
 * @param {string} key - Translation key
 * @param {object} params - Parameters to replace in translation
 * @returns {string} Translated text or key if not found
 */
export function t(key, params = {}) {
  // Handle undefined or null keys
  if (!key) {
    console.warn('Translation key is undefined or null');
    return '';
  }
  
  // If key doesn't contain dots and doesn't start with a known namespace,
  // it might be a plain string (e.g., "New Drone"), return as-is
  if (!key.includes('.') && !key.match(/^(navigation|map|structures|drones|crafting|resources|tiles|settings|notifications|debug)\./)) {
    return key;
  }
  
  // Split key by dots for nested access
  const keys = key.split('.');
  let value = translations;
  
  // Navigate through nested object
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      // Key not found, try fallback to English
      if (currentLanguage !== 'en') {
        console.warn(`Translation not found for key: ${key} in ${currentLanguage}, falling back to English`);
        return getFallbackTranslation(key, params);
      }
      console.warn(`Translation not found for key: ${key}`);
      return key;
    }
  }
  
  // If value is not a string, return the key
  if (typeof value !== 'string') {
    console.warn(`Translation for key ${key} is not a string:`, value);
    return key;
  }
  
  // Replace parameters in the format {paramName}
  let result = value;
  for (const [paramKey, paramValue] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
  }
  
  return result;
}

/**
 * Fallback to English translation if current language is missing the key
 * @param {string} key - Translation key
 * @param {object} params - Parameters to replace
 * @returns {string} English translation or key
 */
function getFallbackTranslation(key, params) {
  const enTranslations = availableTranslations.en;
  
  const keys = key.split('.');
  let value = enTranslations;
  
  for (const k of keys) {
    if (value && typeof value === 'object' && k in value) {
      value = value[k];
    } else {
      return key;
    }
  }
  
  if (typeof value !== 'string') {
    return key;
  }
  
  // Replace parameters
  let result = value;
  for (const [paramKey, paramValue] of Object.entries(params)) {
    result = result.replace(new RegExp(`\\{${paramKey}\\}`, 'g'), paramValue);
  }
  
  return result;
}

/**
 * Get current language
 * @returns {string} Current language code
 */
export function getCurrentLanguage() {
  return currentLanguage;
}

/**
 * Set language and reload translations
 * @param {string} lang - Language code
 */
export function setLanguage(lang) {
  loadTranslations(lang);
  // Emit event for UI updates
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

/**
 * Initialize i18n by loading language from settings
 * Checks localStorage for saved language preference
 */
function initializeLanguage() {
  try {
    const savedSettings = localStorage.getItem('panix_settings');
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      if (settings.language) {
        loadTranslations(settings.language);
        return;
      }
    }
  } catch (error) {
    console.error('Failed to load language from settings:', error);
  }
  
  // Default to English if no saved language
  loadTranslations('en');
}

// Initialize with language from settings or default to English
initializeLanguage();
