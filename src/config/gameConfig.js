// gameConfig.js - Phaser game configuration
// REQ-STATE-001: Game must run at 60 FPS (Phaser default)

import Phaser from 'phaser';

export const gameConfig = {
  type: Phaser.AUTO,
  parent: 'phaser-game',
  width: 1920,
  height: 1080,
  backgroundColor: '#1a1a2e',
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  scene: [] // Scenes will be added in main.js
};
