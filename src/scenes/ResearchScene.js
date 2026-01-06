// ResearchScene.js - Research page (currently locked)
// Placeholder for research tree system

import Phaser from 'phaser';
import { LockedPageOverlay } from '../ui/LockedPageOverlay.js';

export class ResearchScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResearchScene' });
    this.lockedOverlay = null;
  }

  create() {
    this.createPanel();
    this.showLockedOverlay();
  }

  /**
   * Create the research panel UI
   */
  createPanel() {
    let panel = document.getElementById('research-panel');
    
    // Create panel if it doesn't exist
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'research-panel';
      panel.style.display = 'none';
      panel.style.position = 'relative';
      document.getElementById('main-content').appendChild(panel);
    }

    panel.innerHTML = `
      <div class="page-panel">
        <h2>🔬 Research Lab</h2>
        <div id="research-content" style="opacity: 0.3; pointer-events: none;">
          <div class="info-box" style="margin-bottom: 2rem;">
            <p>The Research Lab allows you to unlock new technologies and upgrades.</p>
            <p>Research areas include:</p>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
            <div class="stat-card">
              <h3>📦 Resource Generation</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                Increase efficiency of resource gathering from tiles
              </p>
            </div>
            
            <div class="stat-card">
              <h3>🤖 Drone Efficiency</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                Improve drone gathering rates and reduce build costs
              </p>
            </div>
            
            <div class="stat-card">
              <h3>🏗️ Structures</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                Unlock new building types and upgrade existing ones
              </p>
            </div>
            
            <div class="stat-card">
              <h3>🗺️ Map Expansion</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                Expand your territory and discover new resource types
              </p>
            </div>
            
            <div class="stat-card">
              <h3>⚡ Automation</h3>
              <p style="font-size: 0.9rem; color: var(--text-secondary);">
                Automate resource collection and production
              </p>
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
    const panel = document.getElementById('research-panel');
    if (!panel) return;

    this.lockedOverlay = new LockedPageOverlay(
      'Research Lab not yet constructed',
      'Complete initial objectives and build required structures to unlock research'
    );
    
    this.lockedOverlay.show(panel);
  }
}
