// i18n.js - Internationalization utility
// Provides translation functions for multi-language support

let currentLanguage = 'en';
let translations = {};

/**
 * Load translations for a specific language
 * @param {string} lang - Language code (e.g., 'en', 'de')
 * @returns {Promise<void>}
 */
export async function loadTranslations(lang) {
  try {
    const response = await fetch(`/src/locales/${lang}.json`);
    if (!response.ok) {
      throw new Error(`Failed to load translations for ${lang}`);
    }
    translations = await response.json();
    currentLanguage = lang;
  } catch (error) {
    console.error('Failed to load translations:', error);
    // Fallback to English if loading fails
    if (lang !== 'en') {
      await loadTranslations('en');
    }
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
async function getFallbackTranslation(key, params) {
  try {
    const response = await fetch('/src/locales/en.json');
    const enTranslations = await response.json();
    
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
  } catch (error) {
    console.error('Failed to load fallback translation:', error);
    return key;
  }
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
 * @returns {Promise<void>}
 */
export async function setLanguage(lang) {
  await loadTranslations(lang);
  // Emit event for UI updates
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { language: lang } }));
}

// Initialize with English by default
loadTranslations('en');
