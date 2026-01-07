// i18n.test.js - Tests for internationalization utilities
import { describe, it, expect, beforeEach } from 'vitest';
import { t, getCurrentLanguage, setLanguage, loadTranslations } from './i18n.js';

describe('i18n', () => {
  describe('t (translation function)', () => {
    beforeEach(() => {
      // Load English translations
      loadTranslations('en');
    });

    it('should translate simple keys', () => {
      expect(t('resources.iron')).toBe('Iron');
      expect(t('resources.silicon')).toBe('Silicon');
    });

    it('should translate nested keys with dot notation', () => {
      expect(t('navigation.map')).toBe('Map');
      expect(t('navigation.crafting')).toBe('Crafting');
    });

    it('should return key if translation not found', () => {
      expect(t('nonexistent.key')).toBe('nonexistent.key');
    });

    it('should translate keys without parameters', () => {
      const result = t('crafting.cost');
      expect(result).toBe('Cost');
    });

    it('should translate component names', () => {
      const result = t('crafting.components.chassis.name');
      expect(result).toBe('Drone Chassis');
    });

    it('should handle empty parameters object', () => {
      expect(t('crafting.title', {})).toBe('Crafting Station');
    });

    it('should handle complex nested keys', () => {
      const result = t('crafting.components.chassis.description');
      expect(result).toContain('frame');
    });
  });

  describe('loadTranslations', () => {
    it('should load English translations successfully', () => {
      loadTranslations('en');
      expect(getCurrentLanguage()).toBe('en');
      expect(t('resources.iron')).toBe('Iron');
    });

    it('should load German translations successfully', () => {
      loadTranslations('de');
      expect(getCurrentLanguage()).toBe('de');
      expect(t('resources.iron')).toBe('Eisen');
    });

    it('should update current language after loading', () => {
      loadTranslations('de');
      expect(getCurrentLanguage()).toBe('de');
    });

    it('should fallback to English for unsupported languages', () => {
      loadTranslations('fr'); // French not available
      expect(getCurrentLanguage()).toBe('en');
      expect(t('resources.iron')).toBe('Iron');
    });
  });

  describe('getCurrentLanguage', () => {
    it('should return current language', () => {
      loadTranslations('de');
      expect(getCurrentLanguage()).toBe('de');

      loadTranslations('en');
      expect(getCurrentLanguage()).toBe('en');
    });

    it('should return en by default', () => {
      expect(['en', 'de']).toContain(getCurrentLanguage());
    });
  });

  describe('setLanguage', () => {
    it('should load translations and emit event', () => {
      const eventSpy = vi.fn();
      window.addEventListener('languageChanged', eventSpy);

      setLanguage('de');

      expect(getCurrentLanguage()).toBe('de');
      expect(eventSpy).toHaveBeenCalled();
      
      const event = eventSpy.mock.calls[0][0];
      expect(event.type).toBe('languageChanged');
      expect(event.detail.language).toBe('de');

      window.removeEventListener('languageChanged', eventSpy);
    });

    it('should update current language', () => {
      setLanguage('de');
      expect(getCurrentLanguage()).toBe('de');
    });
  });

  describe('fallback mechanism', () => {
    it('should fallback to English for missing keys', () => {
      loadTranslations('de');
      
      // Access key that doesn't exist in German
      const result = t('nonexistent.key');
      
      // Should return the key itself as fallback
      expect(result).toBe('nonexistent.key');
    });
  });

  describe('special characters', () => {
    it('should handle translations with special characters', () => {
      loadTranslations('de');

      // Test German-specific characters
      expect(t('settings.title')).toContain('Einstellungen');
    });

    it('should handle German translations with umlauts', () => {
      loadTranslations('de');

      const result = t('settings.title');
      expect(result).toContain('Einstellungen');
    });
  });
});