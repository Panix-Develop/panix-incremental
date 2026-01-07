// devMode.js - Dev mode detection utilities
// Determines if app is running in development mode

/**
 * Check if the app is running in development mode
 * Checks multiple sources:
 * 1. Vite's import.meta.env.DEV
 * 2. URL parameter ?dev=true
 * 3. localStorage dev_mode flag
 * @returns {boolean} True if in dev mode
 */
export function isDevMode() {
  // Check Vite environment variable
  if (import.meta.env.DEV) {
    return true;
  }

  // Check URL parameter
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('dev') === 'true') {
    return true;
  }

  // Check localStorage flag
  try {
    const devFlag = localStorage.getItem('dev_mode');
    if (devFlag === 'true') {
      return true;
    }
  } catch (e) {
    console.warn('Unable to access localStorage for dev mode check');
  }

  return false;
}

/**
 * Enable dev mode (stores in localStorage)
 */
export function enableDevMode() {
  try {
    localStorage.setItem('dev_mode', 'true');
    console.log('Dev mode enabled. Reload the page to apply changes.');
  } catch (e) {
    console.error('Unable to enable dev mode:', e);
  }
}

/**
 * Disable dev mode (removes from localStorage)
 */
export function disableDevMode() {
  try {
    localStorage.removeItem('dev_mode');
    console.log('Dev mode disabled. Reload the page to apply changes.');
  } catch (e) {
    console.error('Unable to disable dev mode:', e);
  }
}

/**
 * Toggle dev mode
 */
export function toggleDevMode() {
  if (isDevMode()) {
    disableDevMode();
  } else {
    enableDevMode();
  }
}

// Expose to window for console access
if (typeof window !== 'undefined') {
  window.devMode = {
    isEnabled: isDevMode,
    enable: enableDevMode,
    disable: disableDevMode,
    toggle: toggleDevMode
  };
}
