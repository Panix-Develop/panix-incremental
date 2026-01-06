// ConfigScene.js - Configuration editor (Dev Mode only)
// Allows editing game configuration in development mode

import Phaser from 'phaser';
import { isDevMode } from '../utils/devMode.js';
import { getAllStructures, STRUCTURES } from '../config/structures.js';
import { droneRecipes } from '../config/recipes.js';

export class ConfigScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ConfigScene' });
    this.selectedType = 'structures';
    this.selectedEntity = null;
  }

  create() {
    // Only create panel if in dev mode
    if (!isDevMode()) {
      console.warn('ConfigScene only available in dev mode');
      return;
    }

    this.createPanel();
    this.updateEntityList();
  }

  /**
   * Create the config panel UI
   */
  createPanel() {
    let panel = document.getElementById('config-panel');
    
    // Create panel if it doesn't exist
    if (!panel) {
      panel = document.createElement('div');
      panel.id = 'config-panel';
      panel.style.display = 'none';
      document.getElementById('main-content').appendChild(panel);
    }

    panel.innerHTML = `
      <div class="page-panel">
        <h2>🛠️ Configuration Editor</h2>
        
        <div class="info-box" style="background: rgba(233, 69, 96, 0.2); border-color: var(--accent-primary);">
          <strong>⚠️ Dev Mode Only</strong>
          <p style="margin: 0.5rem 0 0 0; font-size: 0.9rem;">
            This editor allows you to modify game configuration. Changes are stored in browser localStorage 
            and can be exported as JSON files.
          </p>
        </div>

        <div style="margin-top: 2rem;">
          <h3>Entity Type</h3>
          <div style="display: flex; gap: 0.5rem; margin-bottom: 1.5rem;">
            <button id="config-type-structures" class="btn">Structures</button>
            <button id="config-type-drones" class="btn secondary">Drones</button>
          </div>
        </div>

        <div style="display: grid; grid-template-columns: 300px 1fr; gap: 2rem;">
          <!-- Entity List -->
          <div>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="margin: 0;">Entities</h3>
              <button id="config-add-new" class="btn" style="margin: 0; padding: 0.5rem 1rem;">+ Add New</button>
            </div>
            <div id="config-entity-list" class="stat-card" style="max-height: 500px; overflow-y: auto;">
              <!-- Entity list will be populated here -->
            </div>
          </div>

          <!-- Entity Editor -->
          <div>
            <h3>Editor</h3>
            <div id="config-editor" class="stat-card">
              <p style="color: var(--text-secondary); font-style: italic;">
                Select an entity from the list to edit
              </p>
            </div>

            <div style="margin-top: 1rem; display: flex; gap: 0.5rem;">
              <button id="config-export" class="btn">📥 Export JSON</button>
              <button id="config-import-trigger" class="btn secondary">📤 Import JSON</button>
              <input type="file" id="config-import-file" accept=".json" style="display: none;">
            </div>
          </div>
        </div>
      </div>
    `;

    this.setupEventListeners();
  }

  /**
   * Set up event listeners
   */
  setupEventListeners() {
    // Type selector buttons
    document.getElementById('config-type-structures')?.addEventListener('click', () => {
      this.selectType('structures');
    });
    document.getElementById('config-type-drones')?.addEventListener('click', () => {
      this.selectType('drones');
    });

    // Export button
    document.getElementById('config-export')?.addEventListener('click', () => {
      this.exportConfig();
    });

    // Import button
    document.getElementById('config-import-trigger')?.addEventListener('click', () => {
      document.getElementById('config-import-file')?.click();
    });

    document.getElementById('config-import-file')?.addEventListener('change', (e) => {
      this.importConfig(e);
    });
  }

  /**
   * Select entity type
   */
  selectType(type) {
    this.selectedType = type;
    this.selectedEntity = null;

    // Update button states
    const structuresBtn = document.getElementById('config-type-structures');
    const dronesBtn = document.getElementById('config-type-drones');

    if (structuresBtn && dronesBtn) {
      if (type === 'structures') {
        structuresBtn.className = 'btn';
        dronesBtn.className = 'btn secondary';
      } else {
        structuresBtn.className = 'btn secondary';
        dronesBtn.className = 'btn';
      }
    }

    this.updateEntityList();
    this.updateEditor();
  }

  /**
   * Update entity list based on selected type
   */
  updateEntityList() {
    const listEl = document.getElementById('config-entity-list');
    if (!listEl) return;

    let entities = [];
    if (this.selectedType === 'structures') {
      entities = getAllStructures();
    } else if (this.selectedType === 'drones') {
      // Convert droneRecipes object to array of entities
      entities = Object.keys(droneRecipes).map(key => ({
        id: key,
        ...droneRecipes[key]
      }));
    }

    listEl.innerHTML = entities.map(entity => `
      <div class="config-entity-item" data-id="${entity.id}" style="
        padding: 0.75rem;
        margin-bottom: 0.5rem;
        background: var(--bg-primary);
        border: 2px solid ${this.selectedEntity?.id === entity.id ? 'var(--accent-primary)' : 'var(--border-color)'};
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      ">
        <div style="font-weight: 600;">${entity.icon || '⚙️'} ${entity.name || entity.id}</div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">${entity.id}</div>
      </div>
    `).join('');

    // Add click handlers
    listEl.querySelectorAll('.config-entity-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = item.getAttribute('data-id');
        this.selectEntity(id);
      });
    });
  }

  /**
   * Select an entity to edit
   */
  selectEntity(id) {
    if (this.selectedType === 'structures') {
      this.selectedEntity = getAllStructures().find(s => s.id === id);
    } else if (this.selectedType === 'drones') {
      this.selectedEntity = { id, ...droneRecipes[id] };
    }

    this.updateEntityList();
    this.updateEditor();
  }

  /**
   * Update the editor panel
   */
  updateEditor() {
    const editorEl = document.getElementById('config-editor');
    if (!editorEl) return;

    if (!this.selectedEntity) {
      editorEl.innerHTML = `
        <p style="color: var(--text-secondary); font-style: italic;">
          Select an entity from the list to edit
        </p>
      `;
      return;
    }

    editorEl.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h4 style="margin-bottom: 0.5rem;">${this.selectedEntity.icon || '⚙️'} ${this.selectedEntity.name || this.selectedEntity.id}</h4>
      </div>

      <div class="info-box" style="background: rgba(245, 166, 35, 0.1); border-color: #F5A623;">
        <p style="margin: 0; font-size: 0.9rem;">
          <strong>Read-Only View</strong><br>
          Full editing functionality coming soon. For now, you can export and manually edit JSON files.
        </p>
      </div>

      <pre style="
        background: var(--bg-primary);
        padding: 1rem;
        border-radius: 4px;
        overflow-x: auto;
        margin-top: 1rem;
        font-size: 0.85rem;
        line-height: 1.5;
      ">${JSON.stringify(this.selectedEntity, null, 2)}</pre>
    `;
  }

  /**
   * Export configuration as JSON
   */
  exportConfig() {
    let data = {};
    let filename = '';

    if (this.selectedType === 'structures') {
      data = { structures: STRUCTURES };
      filename = 'structures-config.json';
    } else if (this.selectedType === 'drones') {
      data = { droneRecipes: droneRecipes };
      filename = 'drones-config.json';
    }

    // Create blob and download
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`Exported ${filename}`);
  }

  /**
   * Import configuration from JSON file
   */
  importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        console.log('Imported config:', data);

        // Store in localStorage for dev mode
        const key = `dev_config_${this.selectedType}`;
        localStorage.setItem(key, JSON.stringify(data));

        alert(`Configuration imported successfully!\n\nReload the page to apply changes.\n\nNote: This is stored in browser localStorage and won't persist across browsers or devices.`);
      } catch (error) {
        console.error('Failed to import config:', error);
        alert('Failed to import configuration. Please check the file format.');
      }
    };
    reader.readAsText(file);
  }
}
