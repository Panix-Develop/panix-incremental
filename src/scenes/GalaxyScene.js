// GalaxyScene.js - Galaxy map page (currently locked)
// Placeholder for galaxy exploration system

import Phaser from 'phaser';
import { LockedPageOverlay } from '../ui/LockedPageOverlay.js';
import { t } from '../utils/i18n.js';

export class GalaxyScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GalaxyScene' });
    this.lockedOverlay = null;
  }

  create() {
    this.createPanel();
    this.showLockedOverlay();
  }

  /**
   * Create the galaxy panel UI
   */
  createPanel() {
    let panel = document.getElementById('galaxy-panel');
    
    // Create panel if it doesn't exist
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'galaxy-panel';
      panel.style.display = 'none';
      panel.style.position = 'relative';
      document.getElementById('main-content').appendChild(panel);
    }

    panel.innerHTML = `
      <div class="page-panel">
        <h2>🌌 ${t('galaxy.title')}</h2>
        <div id="galaxy-content" style="opacity: 0.3; pointer-events: none;">
          <div class="info-box" style="margin-bottom: 2rem;">
            <p>${t('galaxy.locked')}</p>
            <p>${t('galaxy.hint')}</p>
          </div>
          
          <div style="display: flex; justify-content: space-around; align-items: center; padding: 3rem 0; flex-wrap: wrap; gap: 2rem;">
            <!-- Planet 1 -->
            <div style="text-align: center;">
              <div class="planet" style="
                width: 120px;
                height: 120px;
                border-radius: 50%;
                background: linear-gradient(135deg, #e94560 0%, #8B0000 100%);
                box-shadow: 0 0 30px rgba(233, 69, 96, 0.5);
                animation: planetFloat 6s ease-in-out infinite;
              "></div>
              <p style="margin-top: 1rem; color: var(--text-secondary);">Planet Alpha</p>
            </div>
            
            <!-- Planet 2 -->
            <div style="text-align: center;">
              <div class="planet" style="
                width: 100px;
                height: 100px;
                border-radius: 50%;
                background: linear-gradient(135deg, #4A90E2 0%, #1E3A5F 100%);
                box-shadow: 0 0 30px rgba(74, 144, 226, 0.5);
                animation: planetFloat 8s ease-in-out infinite;
                animation-delay: -2s;
              "></div>
              <p style="margin-top: 1rem; color: var(--text-secondary);">Planet Beta</p>
            </div>
            
            <!-- Planet 3 -->
            <div style="text-align: center;">
              <div class="planet" style="
                width: 140px;
                height: 140px;
                border-radius: 50%;
                background: linear-gradient(135deg, #50E3C2 0%, #006B5C 100%);
                box-shadow: 0 0 30px rgba(80, 227, 194, 0.5);
                animation: planetFloat 10s ease-in-out infinite;
                animation-delay: -4s;
              "></div>
              <p style="margin-top: 1rem; color: var(--text-secondary);">Planet Gamma</p>
            </div>
            
            <!-- Planet 4 -->
            <div style="text-align: center;">
              <div class="planet" style="
                width: 90px;
                height: 90px;
                border-radius: 50%;
                background: linear-gradient(135deg, #F5A623 0%, #8B6914 100%);
                box-shadow: 0 0 30px rgba(245, 166, 35, 0.5);
                animation: planetFloat 7s ease-in-out infinite;
                animation-delay: -6s;
              "></div>
              <p style="margin-top: 1rem; color: var(--text-secondary);">Planet Delta</p>
            </div>
            
            <!-- Planet 5 -->
            <div style="text-align: center;">
              <div class="planet" style="
                width: 110px;
                height: 110px;
                border-radius: 50%;
                background: linear-gradient(135deg, #9B59B6 0%, #4A2C5B 100%);
                box-shadow: 0 0 30px rgba(155, 89, 182, 0.5);
                animation: planetFloat 9s ease-in-out infinite;
                animation-delay: -8s;
              "></div>
              <p style="margin-top: 1rem; color: var(--text-secondary);">Planet Epsilon</p>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  /**
   * Show locked overlay
   */
  showLockedOverlay() {
    const panel = document.getElementById('galaxy-panel');
    if (!panel) return;

    this.lockedOverlay = new LockedPageOverlay(
      t('galaxy.locked'),
      t('galaxy.hint')
    );
    
    this.lockedOverlay.show(panel);
  }
}
