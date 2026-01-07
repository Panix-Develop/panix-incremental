import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    // Environment
    environment: 'jsdom',
    
    // Coverage settings
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        'dist/',
        '**/*.config.js',
        '**/*.test.js',
        'src/main.js',
        'src/locales/',
        '.tasks/',
        '.ai/'
      ],
      thresholds: {
        lines: 70,
        functions: 70,
        branches: 70,
        statements: 70
      }
    },
    
    // Test files
    include: ['**/*.test.js'],
    exclude: ['node_modules', 'dist'],
    
    // Globals
    globals: true,
    
    // Setup files
    setupFiles: [],
    
    // Timeouts
    testTimeout: 10000,
    hookTimeout: 10000
  }
});
