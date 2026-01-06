// formatNumber.js - Number formatting utilities
// Provides multiple number formatting styles for resource display

/**
 * Format number with suffix notation (K, M, B, T, etc.)
 * Examples: 1234 -> 1.23K, 1234567 -> 1.23M
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatNormal(num) {
  if (num === 0) return '0';
  if (num < 0) return '-' + formatNormal(Math.abs(num));
  
  const suffixes = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'Oc', 'No', 'Dc'];
  const tier = Math.floor(Math.log10(Math.abs(num)) / 3);
  
  if (tier === 0) {
    // Numbers less than 1000, show up to 2 decimal places
    return num < 10 ? num.toFixed(2) : Math.floor(num).toString();
  }
  
  if (tier >= suffixes.length) {
    // Very large numbers - use scientific notation
    return num.toExponential(2);
  }
  
  const suffix = suffixes[tier];
  const scale = Math.pow(10, tier * 3);
  const scaled = num / scale;
  
  // Show 2 decimal places for numbers < 10, 1 decimal for >= 10
  const decimals = scaled < 10 ? 2 : 1;
  return scaled.toFixed(decimals) + suffix;
}

/**
 * Format number in scientific notation
 * Examples: 1234 -> 1.23e3, 1234567 -> 1.23e6
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatScientific(num) {
  if (num === 0) return '0';
  if (num < 0) return '-' + formatScientific(Math.abs(num));
  
  if (num < 1000) {
    // Numbers less than 1000, show as-is with up to 2 decimal places
    return num < 10 ? num.toFixed(2) : Math.floor(num).toString();
  }
  
  return num.toExponential(2);
}

/**
 * Format number in engineering notation
 * Exponent is always a multiple of 3
 * Examples: 1234 -> 1.23e3, 12345 -> 12.3e3, 123456 -> 123e3
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function formatEngineering(num) {
  if (num === 0) return '0';
  if (num < 0) return '-' + formatEngineering(Math.abs(num));
  
  if (num < 1000) {
    // Numbers less than 1000, show as-is with up to 2 decimal places
    return num < 10 ? num.toFixed(2) : Math.floor(num).toString();
  }
  
  const exponent = Math.floor(Math.log10(num));
  const engineeringExponent = Math.floor(exponent / 3) * 3;
  const mantissa = num / Math.pow(10, engineeringExponent);
  
  // Determine decimal places based on mantissa size
  let decimals;
  if (mantissa < 10) {
    decimals = 2;
  } else if (mantissa < 100) {
    decimals = 1;
  } else {
    decimals = 0;
  }
  
  return mantissa.toFixed(decimals) + 'e' + engineeringExponent;
}

/**
 * Main formatting function - dispatches to appropriate formatter
 * @param {number} num - Number to format
 * @param {string} format - Format type: 'normal', 'scientific', or 'engineering'
 * @returns {string} Formatted number
 */
export function formatNumber(num, format = 'normal') {
  // Handle edge cases
  if (typeof num !== 'number' || isNaN(num)) {
    return '0';
  }
  
  if (!isFinite(num)) {
    return num > 0 ? '∞' : '-∞';
  }
  
  switch (format) {
    case 'scientific':
      return formatScientific(num);
    case 'engineering':
      return formatEngineering(num);
    case 'normal':
    default:
      return formatNormal(num);
  }
}
