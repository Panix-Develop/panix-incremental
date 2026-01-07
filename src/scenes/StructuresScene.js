// StructuresScene.js - Structures overview page
// Display all built structures and statistics

import Phaser from 'phaser';
import { getStructure } from '../config/structures.js';
import { t } from '../utils/i18n.js';

export class StructuresScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StructuresScene' });
    this.structureManager = null;
    this.resourceManager = null;
  }

  /**
   * Initialize with managers
   * @param {object} data - Initialization data
   */
  init(data) {
    this.structureManager = data.structureManager;
    this.resourceManager = data.resourceManager;
  }

  create() {
    this.createPanel();
    this.updatePanel();

    // Listen for structure events to refresh
    window.addEventListener('structureBuilt', () => this.updatePanel());
    window.addEventListener('structureDemolished', () => this.updatePanel());
    
    // Listen for language changes to refresh UI
    window.addEventListener('settingsUpdated', (e) => {
      if (e.detail.setting === 'language') {
        this.updatePanel();
      }
    });
  }

  /**
   * Create the structures panel UI
   */
  createPanel() {
    let panel = document.getElementById('structures-panel');
    
    // Create panel if it doesn't exist
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'structures-panel';
      panel.style.display = 'none';
      document.getElementById('main-content').appendChild(panel);
    }

    panel.innerHTML = `
      <div class="page-panel">
        <h2>${t('structures.title')}</h2>
        <div id="structures-content"></div>
      </div>
    `;
  }

  /**
   * Update panel with current data
   */
  updatePanel() {
    if (!this.structureManager) return;

    const content = document.getElementById('structures-content');
    if (!content) return;

    const allStructures = this.structureManager.getAllStructures();
    const totalEnergy = this.structureManager.getTotalEnergyGeneration();

    let html = `
      <div class="stat-card">
        <h3>${t('structures.stats')}</h3>
        <div class="tile-info-row">
          <span class="tile-info-label">${t('structures.totalBuilt')}:</span>
          <span class="tile-info-value">${allStructures.length}</span>
        </div>
        <div class="tile-info-row">
          <span class="tile-info-label">${t('structures.energyGeneration')}:</span>
          <span class="tile-info-value">${t('structures.energyPerSecond', { amount: totalEnergy.toFixed(1) })}</span>
        </div>
      </div>
    `;

    // Group structures by type
    const structuresByType = {};
    for (const structure of allStructures) {
      if (!structuresByType[structure.structureType]) {
        structuresByType[structure.structureType] = [];
      }
      structuresByType[structure.structureType].push(structure);
    }

    if (allStructures.length > 0) {
      html += `
        <div class="stat-card" style="margin-top: 1rem;">
          <h3>${t('structures.builtStructures')}</h3>
      `;

      for (const [structureType, structures] of Object.entries(structuresByType)) {
        const structureDef = getStructure(structureType);
        const count = structures.length;
        const totalEnergyForType = structures.reduce((sum, s) => sum + (s.stats.energyPerSecond || 0), 0);

        html += `
          <div style="margin-bottom: 1.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.5rem;">
              <span style="font-size: 1.5rem;">${structureDef.icon}</span>
              <div>
                <div style="font-weight: 600; font-size: 1.1rem;">${t(structureDef.name)}</div>
                <div style="font-size: 0.85rem; color: var(--text-secondary);">
                  ${count} ${t('structures.built')} • ${t('structures.energyPerSecond', { amount: totalEnergyForType.toFixed(1) })}
                </div>
              </div>
            </div>
            <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(120px, 1fr)); gap: 0.5rem; margin-left: 2.5rem;">
        `;

        for (const structure of structures) {
          html += `
            <div style="padding: 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 4px;">
              <div style="font-size: 0.85rem; color: var(--text-secondary);">
                Q${structure.q}, R${structure.r}
              </div>
              <div style="font-size: 0.9rem; color: var(--success);">
                +${structure.stats.energyPerSecond.toFixed(1)}/s
              </div>
            </div>
          `;
        }

        html += `
            </div>
          </div>
        `;
      }

      html += `</div>`;
    } else {
      html += `
        <div class="info-box" style="margin-top: 1rem;">
          <p>${t('structures.noStructures')}</p>
          <p style="margin-top: 0.5rem; font-size: 0.9rem;">
            ${t('structures.buildHint')}
          </p>
        </div>
      `;
    }

    content.innerHTML = html;
  }

  /**
   * Update loop
   */
  update() {
    // Could add periodic updates here if needed
  }
}
