// ConfigScene.js - Configuration editor (Dev Mode only)
// Allows editing game configuration in development mode

import Phaser from 'phaser';
import { isDevMode } from '../utils/devMode.js';
import { getAllStructures, STRUCTURES } from '../config/structures.js';
import { getAllDroneRecipes } from '../config/recipes.js';
import { getAllResources } from '../config/resources.js';
import { getAllTileTypes } from '../config/tiles.js';
import { ConfigManager } from '../systems/ConfigManager.js';

export class ConfigScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ConfigScene' });
    this.selectedType = 'structures';
    this.selectedEntity = null;
    this.configManager = new ConfigManager();
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
            <button id="config-type-resources" class="btn secondary">Resources</button>
            <button id="config-type-tiles" class="btn secondary">Tile Types</button>
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
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
              <h3 style="margin: 0;">Editor</h3>
              <div id="config-editor-toolbar" style="display: flex; gap: 0.5rem;">
                <!-- Toolbar buttons will be populated when entity is selected -->
              </div>
            </div>
            <div id="config-editor" class="stat-card" style="max-height: 500px; overflow-y: auto;">
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
    // Remove any existing event listeners by cloning and replacing elements
    const addNewBtn = document.getElementById('config-add-new');
    if (addNewBtn) {
      const newAddNewBtn = addNewBtn.cloneNode(true);
      addNewBtn.parentNode.replaceChild(newAddNewBtn, addNewBtn);
      newAddNewBtn.addEventListener('click', () => {
        this.addNewEntity();
      });
    }

    // Type selector buttons
    const resourcesBtn = document.getElementById('config-type-resources');
    if (resourcesBtn) {
      const newResourcesBtn = resourcesBtn.cloneNode(true);
      resourcesBtn.parentNode.replaceChild(newResourcesBtn, resourcesBtn);
      newResourcesBtn.addEventListener('click', () => {
        this.selectType('resources');
      });
    }

    const tilesBtn = document.getElementById('config-type-tiles');
    if (tilesBtn) {
      const newTilesBtn = tilesBtn.cloneNode(true);
      tilesBtn.parentNode.replaceChild(newTilesBtn, tilesBtn);
      newTilesBtn.addEventListener('click', () => {
        this.selectType('tiles');
      });
    }

    const structuresBtn = document.getElementById('config-type-structures');
    if (structuresBtn) {
      const newStructuresBtn = structuresBtn.cloneNode(true);
      structuresBtn.parentNode.replaceChild(newStructuresBtn, structuresBtn);
      newStructuresBtn.addEventListener('click', () => {
        this.selectType('structures');
      });
    }

    const dronesBtn = document.getElementById('config-type-drones');
    if (dronesBtn) {
      const newDronesBtn = dronesBtn.cloneNode(true);
      dronesBtn.parentNode.replaceChild(newDronesBtn, dronesBtn);
      newDronesBtn.addEventListener('click', () => {
        this.selectType('drones');
      });
    }

    // Export button
    const exportBtn = document.getElementById('config-export');
    if (exportBtn) {
      const newExportBtn = exportBtn.cloneNode(true);
      exportBtn.parentNode.replaceChild(newExportBtn, exportBtn);
      newExportBtn.addEventListener('click', () => {
        this.exportConfig();
      });
    }

    // Import button
    const importTriggerBtn = document.getElementById('config-import-trigger');
    if (importTriggerBtn) {
      const newImportTriggerBtn = importTriggerBtn.cloneNode(true);
      importTriggerBtn.parentNode.replaceChild(newImportTriggerBtn, importTriggerBtn);
      newImportTriggerBtn.addEventListener('click', () => {
        document.getElementById('config-import-file')?.click();
      });
    }

    const importFileInput = document.getElementById('config-import-file');
    if (importFileInput) {
      const newImportFileInput = importFileInput.cloneNode(true);
      importFileInput.parentNode.replaceChild(newImportFileInput, importFileInput);
      newImportFileInput.addEventListener('change', (e) => {
        this.importConfig(e);
      });
    }
  }

  /**
   * Select entity type
   */
  selectType(type) {
    this.selectedType = type;
    this.selectedEntity = null;

    // Update button states
    const resourcesBtn = document.getElementById('config-type-resources');
    const tilesBtn = document.getElementById('config-type-tiles');
    const structuresBtn = document.getElementById('config-type-structures');
    const dronesBtn = document.getElementById('config-type-drones');

    if (resourcesBtn) resourcesBtn.className = type === 'resources' ? 'btn' : 'btn secondary';
    if (tilesBtn) tilesBtn.className = type === 'tiles' ? 'btn' : 'btn secondary';
    if (structuresBtn) structuresBtn.className = type === 'structures' ? 'btn' : 'btn secondary';
    if (dronesBtn) dronesBtn.className = type === 'drones' ? 'btn' : 'btn secondary';

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
    if (this.selectedType === 'resources') {
      // Convert resources object to array
      const allResources = getAllResources();
      entities = Object.keys(allResources).map(key => ({
        id: key,
        ...allResources[key]
      }));
    } else if (this.selectedType === 'tiles') {
      // Convert tile types object to array
      const allTileTypes = getAllTileTypes();
      entities = Object.keys(allTileTypes).map(key => ({
        id: key,
        ...allTileTypes[key]
      }));
    } else if (this.selectedType === 'structures') {
      entities = getAllStructures();
    } else if (this.selectedType === 'drones') {
      // Convert droneRecipes object to array of entities
      const allDrones = getAllDroneRecipes();
      entities = Object.keys(allDrones).map(key => ({
        id: key,
        ...allDrones[key]
      }));
    }

    // Note: getAllStructures() and getAllDroneRecipes() already include custom entities from localStorage,
    // so we don't need to load them separately here

    listEl.innerHTML = entities.map(entity => {
      const isCustom = entity.id.startsWith('custom_');
      return `
      <div class="config-entity-item" data-id="${entity.id}" style="
        padding: 0.75rem;
        margin-bottom: 0.5rem;
        background: var(--bg-primary);
        border: 2px solid ${this.selectedEntity?.id === entity.id ? 'var(--accent-primary)' : 'var(--border-color)'};
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.2s;
      ">
        <div style="font-weight: 600;">
          ${entity.icon || '⚙️'} ${entity.name || entity.id}
        </div>
        <div style="font-size: 0.85rem; color: var(--text-secondary);">${entity.id}</div>
      </div>
    `;
    }).join('');

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
    // Check if it's a custom entity in localStorage
    if (id.startsWith('custom_')) {
      let storageKey;
      if (this.selectedType === 'resources') storageKey = 'dev_resources_override';
      else if (this.selectedType === 'tiles') storageKey = 'dev_tiles_override';
      else if (this.selectedType === 'structures') storageKey = 'dev_structures_override';
      else if (this.selectedType === 'drones') storageKey = 'dev_drones_override';
      
      const existing = localStorage.getItem(storageKey);
      if (existing) {
        const overrides = JSON.parse(existing);
        if (overrides[id]) {
          this.selectedEntity = { id, ...overrides[id] };
        }
      }
    } else {
      // Load from defaults
      if (this.selectedType === 'resources') {
        const allResources = getAllResources();
        this.selectedEntity = { id, ...allResources[id] };
      } else if (this.selectedType === 'tiles') {
        const allTileTypes = getAllTileTypes();
        this.selectedEntity = { id, ...allTileTypes[id] };
      } else if (this.selectedType === 'structures') {
        this.selectedEntity = getAllStructures().find(s => s.id === id);
      } else if (this.selectedType === 'drones') {
        const allDrones = getAllDroneRecipes();
        this.selectedEntity = { id, ...allDrones[id] };
      }
    }

    this.updateEntityList();
    this.updateEditor();
  }

  /**
   * Update the editor panel
   */
  updateEditor() {
    const editorEl = document.getElementById('config-editor');
    const toolbarEl = document.getElementById('config-editor-toolbar');
    
    if (!editorEl || !toolbarEl) return;

    if (!this.selectedEntity) {
      editorEl.innerHTML = `
        <p style="color: var(--text-secondary); font-style: italic;">
          Select an entity from the list to edit
        </p>
      `;
      toolbarEl.innerHTML = '';
      return;
    }

    // Use form-based editor for resources, tiles, and structures; JSON editor for drones
    if (this.selectedType === 'resources') {
      this.buildResourceEditor(editorEl, toolbarEl);
    } else if (this.selectedType === 'tiles') {
      this.buildTileTypeEditor(editorEl, toolbarEl);
    } else if (this.selectedType === 'structures') {
      this.buildStructureEditor(editorEl, toolbarEl);
    } else {
      this.buildJSONEditor(editorEl, toolbarEl);
    }
  }

  /**
   * Build form-based resource editor UI
   * REQ-CFG-001: Resource management UI
   */
  buildResourceEditor(editorEl, toolbarEl) {
    // Update toolbar with action buttons
    toolbarEl.innerHTML = `
      <button id="config-save-changes" class="btn" style="padding: 0.5rem 1rem;">💾 Save</button>
      <button id="config-reset-entity" class="btn secondary" style="padding: 0.5rem 1rem;">🔄 Reset</button>
      ${this.selectedEntity.id.startsWith('custom_') ? '<button id="config-delete-entity" class="btn secondary" style="padding: 0.5rem 1rem; background: rgba(233, 69, 96, 0.2);">🗑️ Delete</button>' : ''}
    `;

    // Build form-based editor
    editorEl.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h4 style="margin-bottom: 0.5rem;">${this.selectedEntity.icon || '⚙️'} Edit Resource</h4>
      </div>

      <div id="config-validation-errors" style="display: none; margin-bottom: 1rem;"></div>

      <form id="resource-editor-form" style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">ID</label>
          <input type="text" id="resource-id" value="${this.selectedEntity.id}" 
            ${!this.selectedEntity.id.startsWith('custom_') ? 'disabled' : ''}
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">Alphanumeric, hyphens, and underscores only</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Name (i18n key)</label>
          <input type="text" id="resource-name" value="${this.selectedEntity.name || ''}" 
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">e.g., resources.myResource</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Icon (emoji)</label>
          <input type="text" id="resource-icon" value="${this.selectedEntity.icon || ''}" 
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">Single emoji character</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Base Rate</label>
          <input type="number" id="resource-baseRate" value="${this.selectedEntity.baseRate || 0}" step="0.1"
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">Base generation rate multiplier</small>
        </div>
      </form>
    `;

    // Add event listeners
    document.getElementById('config-save-changes')?.addEventListener('click', () => {
      this.saveResourceChanges();
    });

    document.getElementById('config-reset-entity')?.addEventListener('click', () => {
      this.resetEntity();
    });

    if (this.selectedEntity.id.startsWith('custom_')) {
      document.getElementById('config-delete-entity')?.addEventListener('click', () => {
        this.deleteEntity();
      });
    }
  }

  /**
   * Build form-based tile type editor UI
   * REQ-CFG-002: Tile type management UI
   */
  buildTileTypeEditor(editorEl, toolbarEl) {
    // Update toolbar with action buttons
    toolbarEl.innerHTML = `
      <button id="config-save-changes" class="btn" style="padding: 0.5rem 1rem;">💾 Save</button>
      <button id="config-reset-entity" class="btn secondary" style="padding: 0.5rem 1rem;">🔄 Reset</button>
      ${this.selectedEntity.id.startsWith('custom_') ? '<button id="config-delete-entity" class="btn secondary" style="padding: 0.5rem 1rem; background: rgba(233, 69, 96, 0.2);">🗑️ Delete</button>' : ''}
    `;

    // Get all resources for dropdown
    const allResources = getAllResources();
    const resourceOptions = Object.keys(allResources).map(resId => 
      `<option value="${resId}" ${this.selectedEntity.resourceProduced === resId ? 'selected' : ''}>${allResources[resId].icon} ${resId}</option>`
    ).join('');

    // Build form-based editor
    editorEl.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h4 style="margin-bottom: 0.5rem;">🗺️ Edit Tile Type</h4>
      </div>

      <div id="config-validation-errors" style="display: none; margin-bottom: 1rem;"></div>

      <form id="tile-editor-form" style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">ID</label>
          <input type="text" id="tile-id" value="${this.selectedEntity.id}" 
            ${!this.selectedEntity.id.startsWith('custom_') ? 'disabled' : ''}
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">Alphanumeric, hyphens, and underscores only</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Name (i18n key)</label>
          <input type="text" id="tile-name" value="${this.selectedEntity.name || ''}" 
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">e.g., tiles.myTileType</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Resource Produced</label>
          <select id="tile-resourceProduced" style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
            <option value="">None</option>
            ${resourceOptions}
          </select>
          <small style="color: var(--text-secondary);">Resource generated by drones on this tile</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Base Rate</label>
          <input type="number" id="tile-baseRate" value="${this.selectedEntity.baseRate || 0}" step="0.1"
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">Base production rate per drone</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Allowed Drones</label>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem; background: var(--bg-primary); border: 1px solid var(--border-color); border-radius: 4px;">
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="checkbox" id="tile-drone-basic" value="basic" 
                ${(this.selectedEntity.allowedDrones || []).includes('basic') ? 'checked' : ''}>
              <span>Basic Gatherer</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="checkbox" id="tile-drone-advanced" value="advanced" 
                ${(this.selectedEntity.allowedDrones || []).includes('advanced') ? 'checked' : ''}>
              <span>Advanced Gatherer</span>
            </label>
            <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
              <input type="checkbox" id="tile-drone-elite" value="elite" 
                ${(this.selectedEntity.allowedDrones || []).includes('elite') ? 'checked' : ''}>
              <span>Elite Gatherer</span>
            </label>
          </div>
          <small style="color: var(--text-secondary);">Which drone types can work on this tile</small>
        </div>
      </form>
    `;

    // Add event listeners
    document.getElementById('config-save-changes')?.addEventListener('click', () => {
      this.saveTileTypeChanges();
    });

    document.getElementById('config-reset-entity')?.addEventListener('click', () => {
      this.resetEntity();
    });

    if (this.selectedEntity.id.startsWith('custom_')) {
      document.getElementById('config-delete-entity')?.addEventListener('click', () => {
        this.deleteEntity();
      });
    }
  }

  /**
   * Build form-based structure editor UI
   * REQ-CFG-003: Enhanced structure management
   */
  buildStructureEditor(editorEl, toolbarEl) {
    // Update toolbar with action buttons
    toolbarEl.innerHTML = `
      <button id="config-save-changes" class="btn" style="padding: 0.5rem 1rem;">💾 Save</button>
      <button id="config-reset-entity" class="btn secondary" style="padding: 0.5rem 1rem;">🔄 Reset</button>
      ${this.selectedEntity.id.startsWith('custom_') ? '<button id="config-delete-entity" class="btn secondary" style="padding: 0.5rem 1rem; background: rgba(233, 69, 96, 0.2);">🗑️ Delete</button>' : ''}
    `;

    // Get available resources for dropdowns
    const allResources = getAllResources();
    const resourceIds = Array.isArray(allResources) ? allResources.map(r => r.id) : Object.values(allResources).map(r => r.id);

    // Get available tile types for restrictions
    const allTileTypes = getAllTileTypes();
    const tileTypeIds = Array.isArray(allTileTypes) ? allTileTypes.map(t => t.id) : Object.values(allTileTypes).map(t => t.id);

    // Prepare costs array for rendering
    const costs = this.selectedEntity.costs || {};
    const costsArray = Object.entries(costs);

    // Prepare buildableOn array
    const buildableOn = this.selectedEntity.buildableOn || [];

    // Build form-based editor
    editorEl.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h4 style="margin-bottom: 0.5rem;">${this.selectedEntity.icon || '🏗️'} Edit Structure</h4>
      </div>

      <div id="config-validation-errors" style="display: none; margin-bottom: 1rem;"></div>

      <form id="structure-editor-form" style="display: flex; flex-direction: column; gap: 1rem;">
        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">ID</label>
          <input type="text" id="structure-id" value="${this.selectedEntity.id}" 
            ${!this.selectedEntity.id.startsWith('custom_') ? 'disabled' : ''}
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">Alphanumeric, hyphens, and underscores only</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Name (i18n key)</label>
          <input type="text" id="structure-name" value="${this.selectedEntity.name || ''}" 
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">e.g., structures.myStructure.name</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Description (i18n key)</label>
          <input type="text" id="structure-description" value="${this.selectedEntity.description || ''}" 
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">e.g., structures.myStructure.description</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Icon (emoji)</label>
          <input type="text" id="structure-icon" value="${this.selectedEntity.icon || ''}" 
            style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <small style="color: var(--text-secondary);">Single emoji character</small>
        </div>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
          <div>
            <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Tier</label>
            <input type="number" id="structure-tier" value="${this.selectedEntity.tier || 1}" min="1"
              style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
            <small style="color: var(--text-secondary);">Structure tier (1-5+, unlimited)</small>
          </div>

          <div>
            <label style="display: block; margin-bottom: 0.25rem; font-weight: 600;">Type</label>
            <select id="structure-type" 
              style="width: 100%; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
              <option value="energy" ${this.selectedEntity.type === 'energy' ? 'selected' : ''}>Energy</option>
              <option value="production" ${this.selectedEntity.type === 'production' ? 'selected' : ''}>Production</option>
              <option value="mining" ${this.selectedEntity.type === 'mining' ? 'selected' : ''}>Mining</option>
              <option value="research" ${this.selectedEntity.type === 'research' ? 'selected' : ''}>Research</option>
              <option value="storage" ${this.selectedEntity.type === 'storage' ? 'selected' : ''}>Storage</option>
            </select>
          </div>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Build Costs</label>
          <div id="structure-costs-list" style="display: flex; flex-direction: column; gap: 0.5rem;">
            ${costsArray.map(([resource, amount], index) => `
              <div class="cost-entry" data-index="${index}" style="display: flex; gap: 0.5rem; align-items: center;">
                <select class="cost-resource" data-index="${index}" 
                  style="flex: 1; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
                  ${resourceIds.map(id => `<option value="${id}" ${id === resource ? 'selected' : ''}>${id}</option>`).join('')}
                </select>
                <input type="number" class="cost-amount" data-index="${index}" value="${amount}" min="0" 
                  style="width: 120px; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
                <button type="button" class="btn secondary remove-cost" data-index="${index}" style="padding: 0.5rem;">❌</button>
              </div>
            `).join('')}
          </div>
          <button type="button" id="add-cost-btn" class="btn secondary" style="margin-top: 0.5rem; padding: 0.5rem;">+ Add Cost</button>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Production</label>
          <div style="display: grid; grid-template-columns: 1fr 120px; gap: 0.5rem;">
            <select id="structure-production-resource" 
              style="padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
              <option value="">None</option>
              ${(() => {
                // Determine current production resource
                let currentProductionResource = '';
                let currentProductionAmount = 0;
                
                if (this.selectedEntity.stats?.energyPerSecond !== undefined) {
                  currentProductionResource = 'energy';
                  currentProductionAmount = this.selectedEntity.stats.energyPerSecond;
                } else if (this.selectedEntity.stats?.productionRate) {
                  const keys = Object.keys(this.selectedEntity.stats.productionRate);
                  if (keys.length > 0) {
                    currentProductionResource = keys[0];
                    currentProductionAmount = this.selectedEntity.stats.productionRate[keys[0]];
                  }
                }
                
                return resourceIds.map(id => 
                  `<option value="${id}" ${id === currentProductionResource ? 'selected' : ''}>${id}</option>`
                ).join('');
              })()}
            </select>
            <input type="number" id="structure-production-amount" 
              value="${(() => {
                if (this.selectedEntity.stats?.energyPerSecond !== undefined) {
                  return this.selectedEntity.stats.energyPerSecond;
                } else if (this.selectedEntity.stats?.productionRate) {
                  const keys = Object.keys(this.selectedEntity.stats.productionRate);
                  if (keys.length > 0) {
                    return this.selectedEntity.stats.productionRate[keys[0]];
                  }
                }
                return 0;
              })()}" 
              step="0.1" min="0"
              style="padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          </div>
          <small style="color: var(--text-secondary);">Amount per second</small>
        </div>

        <div>
          <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Buildable On (Tile Types)</label>
          <div id="structure-buildable-on" style="display: flex; flex-wrap: wrap; gap: 0.5rem; padding: 0.5rem; background: rgba(0,0,0,0.2); border-radius: 4px; min-height: 50px;">
            ${tileTypeIds.map(id => `
              <label style="display: flex; align-items: center; gap: 0.25rem; padding: 0.25rem 0.5rem; background: var(--bg-secondary); border-radius: 4px; cursor: pointer;">
                <input type="checkbox" class="buildable-on-checkbox" value="${id}" ${buildableOn.includes(id) ? 'checked' : ''}
                  style="cursor: pointer;">
                <span style="font-size: 0.9rem;">${id}</span>
              </label>
            `).join('')}
          </div>
          <small style="color: var(--text-secondary);">Select tile types where this structure can be built</small>
        </div>
      </form>
    `;

    // Add event listeners for dynamic cost management
    this.attachCostEventListeners();

    // Add event listeners for save/reset/delete
    document.getElementById('config-save-changes')?.addEventListener('click', () => {
      this.saveStructureChanges();
    });

    document.getElementById('config-reset-entity')?.addEventListener('click', () => {
      this.resetEntity();
    });

    if (this.selectedEntity.id.startsWith('custom_')) {
      document.getElementById('config-delete-entity')?.addEventListener('click', () => {
        this.deleteEntity();
      });
    }
  }

  /**
   * Attach event listeners for cost entries
   */
  attachCostEventListeners() {
    // Add cost button
    document.getElementById('add-cost-btn')?.addEventListener('click', () => {
      const costsList = document.getElementById('structure-costs-list');
      if (!costsList) return;

      const allResources = getAllResources();
      const resourceIds = Array.isArray(allResources) ? allResources.map(r => r.id) : Object.values(allResources).map(r => r.id);
      const defaultResource = resourceIds[0] || 'iron';
      const currentIndex = costsList.querySelectorAll('.cost-entry').length;

      const costEntryHTML = `
        <div class="cost-entry" data-index="${currentIndex}" style="display: flex; gap: 0.5rem; align-items: center;">
          <select class="cost-resource" data-index="${currentIndex}" 
            style="flex: 1; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
            ${resourceIds.map(id => `<option value="${id}" ${id === defaultResource ? 'selected' : ''}>${id}</option>`).join('')}
          </select>
          <input type="number" class="cost-amount" data-index="${currentIndex}" value="10" min="0" 
            style="width: 120px; padding: 0.5rem; background: var(--bg-primary); color: var(--text-primary); border: 1px solid var(--border-color); border-radius: 4px;">
          <button type="button" class="btn secondary remove-cost" data-index="${currentIndex}" style="padding: 0.5rem;">❌</button>
        </div>
      `;

      costsList.insertAdjacentHTML('beforeend', costEntryHTML);
      this.attachRemoveCostListeners();
    });

    // Remove cost buttons
    this.attachRemoveCostListeners();
  }

  /**
   * Attach event listeners to remove cost buttons
   */
  attachRemoveCostListeners() {
    document.querySelectorAll('.remove-cost').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const entry = e.target.closest('.cost-entry');
        if (entry) {
          entry.remove();
        }
      });
    });
  }

  /**
   * Build JSON-based editor for structures and drones
   */
  buildJSONEditor(editorEl, toolbarEl) {

    // Update toolbar with action buttons
    toolbarEl.innerHTML = `
      <button id="config-save-changes" class="btn" style="padding: 0.5rem 1rem;">💾 Save</button>
      <button id="config-reset-entity" class="btn secondary" style="padding: 0.5rem 1rem;">🔄 Reset</button>
      ${this.selectedEntity.id.startsWith('custom_') ? '<button id="config-delete-entity" class="btn secondary" style="padding: 0.5rem 1rem; background: rgba(233, 69, 96, 0.2);">🗑️ Delete</button>' : ''}
    `;

    // Update editor content (scrollable area)
    editorEl.innerHTML = `
      <div style="margin-bottom: 1rem;">
        <h4 style="margin-bottom: 0.5rem;">${this.selectedEntity.icon || '⚙️'} ${this.selectedEntity.name || this.selectedEntity.id}</h4>
      </div>

      <div class="info-box" style="background: rgba(126, 211, 33, 0.1); border-color: #7ED321;">
        <p style="margin: 0; font-size: 0.9rem;">
          <strong>💡 Live Editing</strong><br>
          Edit the JSON below and click "Save" to update localStorage. 
          The game will use your changes on next page load. Click "Reset" to restore defaults.
        </p>
      </div>

      <textarea id="config-json-editor" style="
        width: 100%;
        min-height: 300px;
        background: var(--bg-primary);
        color: var(--text-primary);
        padding: 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        margin-top: 1rem;
        font-family: 'Courier New', monospace;
        font-size: 0.85rem;
        line-height: 1.5;
        resize: vertical;
      ">${JSON.stringify(this.selectedEntity, null, 2)}</textarea>
    `;

    // Add event listeners for toolbar buttons
    document.getElementById('config-save-changes')?.addEventListener('click', () => {
      this.saveEntityChanges();
    });

    document.getElementById('config-reset-entity')?.addEventListener('click', () => {
      this.resetEntity();
    });

    // Add delete listener for custom entities
    if (this.selectedEntity.id.startsWith('custom_')) {
      document.getElementById('config-delete-entity')?.addEventListener('click', () => {
        this.deleteEntity();
      });
    }
  }

  /**
   * Export configuration as JSON
   */
  /**
   * Export all configs to JSON file
   * REQ-CFG-008: Config import/export
   */
  exportConfig() {
    // Gather all entity types
    const allResources = getAllResources();
    const allTiles = getAllTileTypes();
    const allStructures = getAllStructures();
    const allDrones = getAllDroneRecipes();

    // Convert to arrays where needed
    const resourcesArray = Array.isArray(allResources) ? allResources : Object.values(allResources);
    const tilesArray = Array.isArray(allTiles) ? allTiles : Object.values(allTiles);

    // Build export data with metadata
    const exportData = {
      metadata: {
        version: '1.0.0',
        timestamp: new Date().toISOString(),
        exportedFrom: 'PANIX Incremental Dev Config Editor',
        entityCounts: {
          resources: resourcesArray.length,
          tiles: tilesArray.length,
          structures: allStructures.length,
          drones: Object.keys(allDrones).length
        }
      },
      resources: resourcesArray,
      tiles: tilesArray,
      structures: allStructures,
      drones: allDrones
    };

    // Create filename with date
    const date = new Date().toISOString().split('T')[0];
    const filename = `panix-config-${date}.json`;

    // Create blob and download
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    console.log(`Exported all configs to ${filename}`);
    alert(`✅ Config exported successfully!\n\nFile: ${filename}\n\nResources: ${resourcesArray.length}\nTiles: ${tilesArray.length}\nStructures: ${allStructures.length}\nDrones: ${Object.keys(allDrones).length}`);
  }

  /**
   * Save changes to the current entity in localStorage
   */
  saveEntityChanges() {
    const textarea = document.getElementById('config-json-editor');
    if (!textarea) return;

    try {
      const editedData = JSON.parse(textarea.value);
      
      // Get storage key based on type
      const storageKey = this.selectedType === 'structures' 
        ? 'dev_structures_override' 
        : 'dev_drones_override';
      
      // Get existing overrides or create new object
      let overrides = {};
      const existing = localStorage.getItem(storageKey);
      if (existing) {
        overrides = JSON.parse(existing);
      }
      
      // Store the edited entity
      overrides[this.selectedEntity.id] = editedData;
      localStorage.setItem(storageKey, JSON.stringify(overrides));
      
      // Update the selected entity with new data
      this.selectedEntity = { id: this.selectedEntity.id, ...editedData };
      
      // Show success message
      const infoBox = document.querySelector('#config-editor .info-box');
      if (infoBox) {
        infoBox.style.background = 'rgba(126, 211, 33, 0.2)';
        infoBox.style.borderColor = '#7ED321';
        infoBox.innerHTML = `
          <p style="margin: 0; font-size: 0.9rem;">
            <strong>✅ Saved!</strong><br>
            Changes saved to localStorage. Reload the page to see changes take effect.
          </p>
        `;
        
        setTimeout(() => {
          infoBox.style.background = 'rgba(126, 211, 33, 0.1)';
          infoBox.innerHTML = `
            <p style="margin: 0; font-size: 0.9rem;">
              <strong>💡 Live Editing</strong><br>
              Edit the JSON below and click "Save Changes" to update localStorage. 
              The game will use your changes on next page load. Click "Reset" to restore defaults.
            </p>
          `;
        }, 3000);
      }
      
      console.log(`Saved ${this.selectedEntity.id} to localStorage`);
      
    } catch (error) {
      // Show error message
      const infoBox = document.querySelector('#config-editor .info-box');
      if (infoBox) {
        infoBox.style.background = 'rgba(233, 69, 96, 0.2)';
        infoBox.style.borderColor = 'var(--accent-primary)';
        infoBox.innerHTML = `
          <p style="margin: 0; font-size: 0.9rem;">
            <strong>❌ Error</strong><br>
            Invalid JSON: ${error.message}
          </p>
        `;
      }
      console.error('Failed to save config:', error);
    }
  }

  /**
   * Save changes to a resource (form-based editor)
   */
  saveResourceChanges() {
    const errorDiv = document.getElementById('config-validation-errors');
    
    // Read form values
    const id = document.getElementById('resource-id').value.trim();
    const name = document.getElementById('resource-name').value.trim();
    const icon = document.getElementById('resource-icon').value.trim();
    const baseRate = parseFloat(document.getElementById('resource-baseRate').value);
    
    // Build resource data
    const resourceData = { 
      id, 
      name, 
      icon, 
      baseRate,
      // Mark as edit if we're modifying an existing entity
      _isEdit: this.selectedEntity && this.selectedEntity.id === id
    };
    
    // Validate using ConfigManager
    const validation = this.configManager.validateResource(resourceData);
    
    if (!validation.valid) {
      // Show validation errors
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = `
        <strong>⚠️ Validation Errors:</strong>
        <ul>
          ${validation.errors.map(err => `<li>${err}</li>`).join('')}
        </ul>
      `;
      return;
    }
    
    // Clear errors
    errorDiv.style.display = 'none';
    errorDiv.innerHTML = '';
    
    // Save to localStorage
    let overrides = {};
    const existing = localStorage.getItem('dev_resources_override');
    if (existing) {
      overrides = JSON.parse(existing);
    }
    
    overrides[id] = resourceData;
    localStorage.setItem('dev_resources_override', JSON.stringify(overrides));
    
    // Update selected entity
    this.selectedEntity = { id, ...resourceData };
    
    // Show success message
    const infoBox = document.querySelector('#config-editor .info-box');
    if (infoBox) {
      infoBox.style.background = 'rgba(126, 211, 33, 0.2)';
      infoBox.style.borderColor = '#7ED321';
      infoBox.innerHTML = `
        <p style="margin: 0; font-size: 0.9rem;">
          <strong>✅ Saved!</strong><br>
          Resource saved to localStorage. Reload the page to see changes take effect.
        </p>
      `;
      
      setTimeout(() => {
        infoBox.style.background = 'rgba(126, 211, 33, 0.1)';
        infoBox.innerHTML = `
          <p style="margin: 0; font-size: 0.9rem;">
            <strong>💡 Live Editing</strong><br>
            Edit the form below and click "Save Changes" to update localStorage. 
            The game will use your changes on next page load. Click "Reset" to restore defaults.
          </p>
        `;
      }, 3000);
    }
    
    // Refresh the entity list to show changes
    this.updateEntityList();
    
    console.log(`Saved resource ${id} to localStorage`);
  }

  /**
   * Save changes to a tile type (form-based editor)
   */
  saveTileTypeChanges() {
    const errorDiv = document.getElementById('config-validation-errors');
    
    // Read form values
    const id = document.getElementById('tile-id').value.trim();
    const name = document.getElementById('tile-name').value.trim();
    const resourceProduced = document.getElementById('tile-resourceProduced').value;
    const baseRate = parseFloat(document.getElementById('tile-baseRate').value);
    
    // Read allowed drones checkboxes
    const allowedDrones = [];
    if (document.getElementById('tile-drone-basic')?.checked) allowedDrones.push('basic');
    if (document.getElementById('tile-drone-advanced')?.checked) allowedDrones.push('advanced');
    if (document.getElementById('tile-drone-elite')?.checked) allowedDrones.push('elite');
    
    // Build tile data
    const tileData = { 
      id, 
      name, 
      resourceProduced: resourceProduced || null, 
      baseRate,
      allowedDrones,
      // Mark as edit if we're modifying an existing entity
      _isEdit: this.selectedEntity && this.selectedEntity.id === id
    };
    
    // Validate using ConfigManager
    const validation = this.configManager.validateTileType(tileData);
    
    if (!validation.valid) {
      // Show validation errors
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = `
        <strong>⚠️ Validation Errors:</strong>
        <ul>
          ${validation.errors.map(err => `<li>${err}</li>`).join('')}
        </ul>
      `;
      return;
    }
    
    // Clear errors
    errorDiv.style.display = 'none';
    errorDiv.innerHTML = '';
    
    // Save to localStorage
    let overrides = {};
    const existing = localStorage.getItem('dev_tiles_override');
    if (existing) {
      overrides = JSON.parse(existing);
    }
    
    overrides[id] = tileData;
    localStorage.setItem('dev_tiles_override', JSON.stringify(overrides));
    
    // Update selected entity
    this.selectedEntity = { id, ...tileData };
    
    // Show success message
    const infoBox = document.querySelector('#config-editor .info-box');
    if (infoBox) {
      infoBox.style.background = 'rgba(126, 211, 33, 0.2)';
      infoBox.style.borderColor = '#7ED321';
      infoBox.innerHTML = `
        <p style="margin: 0; font-size: 0.9rem;">
          <strong>✅ Saved!</strong><br>
          Tile type saved to localStorage. Reload the page to see changes take effect.
        </p>
      `;
      
      setTimeout(() => {
        infoBox.style.background = 'rgba(126, 211, 33, 0.1)';
        infoBox.innerHTML = `
          <p style="margin: 0; font-size: 0.9rem;">
            <strong>💡 Live Editing</strong><br>
            Edit the form below and click "Save Changes" to update localStorage. 
            The game will use your changes on next page load. Click "Reset" to restore defaults.
          </p>
        `;
      }, 3000);
    }
    
    // Refresh the entity list to show changes
    this.updateEntityList();
    
    console.log(`Saved tile type ${id} to localStorage`);
  }

  /**
   * Save changes to a structure (form-based editor)
   * REQ-CFG-003: Enhanced structure management
   */
  saveStructureChanges() {
    const errorDiv = document.getElementById('config-validation-errors');
    
    // Read form values
    const id = document.getElementById('structure-id').value.trim();
    const name = document.getElementById('structure-name').value.trim();
    const description = document.getElementById('structure-description').value.trim();
    const icon = document.getElementById('structure-icon').value.trim();
    const tier = parseInt(document.getElementById('structure-tier').value);
    const type = document.getElementById('structure-type').value;
    
    // Read costs
    const costs = {};
    document.querySelectorAll('.cost-entry').forEach(entry => {
      const resource = entry.querySelector('.cost-resource').value;
      const amount = parseFloat(entry.querySelector('.cost-amount').value);
      if (resource && amount > 0) {
        costs[resource] = amount;
      }
    });
    
    // Read production
    const productionResource = document.getElementById('structure-production-resource').value;
    const productionAmount = parseFloat(document.getElementById('structure-production-amount').value);
    
    // Build stats object based on production
    const stats = {};
    if (productionResource && productionAmount > 0) {
      if (productionResource === 'energy') {
        stats.energyPerSecond = productionAmount;
      } else {
        stats.productionRate = {
          [productionResource]: productionAmount
        };
      }
    }
    
    // Read buildable on checkboxes
    const buildableOn = [];
    document.querySelectorAll('.buildable-on-checkbox:checked').forEach(checkbox => {
      buildableOn.push(checkbox.value);
    });
    
    // Build structure data
    const structureData = {
      id,
      name,
      description,
      icon,
      tier,
      type,
      costs,
      stats,
      buildableOn,
      category: type, // Category matches type for now
      color: this.selectedEntity.color || 0xF5A623, // Keep existing color or default
      // Mark as edit if we're modifying an existing entity (either default or custom)
      _isEdit: this.selectedEntity && this.selectedEntity.id === id
    };
    
    // Validate using ConfigManager
    const validation = this.configManager.validateStructure(structureData);
    
    if (!validation.valid) {
      // Show validation errors
      errorDiv.style.display = 'block';
      errorDiv.innerHTML = `
        <div class="info-box" style="background: rgba(233, 69, 96, 0.2); border-color: var(--accent-primary);">
          <strong>⚠️ Validation Errors:</strong>
          <ul style="margin: 0.5rem 0 0 1.5rem;">
            ${validation.errors.map(err => `<li>${err}</li>`).join('')}
          </ul>
        </div>
      `;
      return;
    }
    
    // Clear errors
    errorDiv.style.display = 'none';
    errorDiv.innerHTML = '';
    
    // Save to localStorage
    let overrides = {};
    const existing = localStorage.getItem('dev_structures_override');
    if (existing) {
      overrides = JSON.parse(existing);
    }
    
    overrides[id] = structureData;
    localStorage.setItem('dev_structures_override', JSON.stringify(overrides));
    
    // Update selected entity
    this.selectedEntity = { ...structureData };
    
    // Show success message by temporarily updating the first info box or creating one
    let successMsg = document.createElement('div');
    successMsg.className = 'info-box';
    successMsg.style.cssText = 'background: rgba(126, 211, 33, 0.2); border-color: #7ED321; margin-bottom: 1rem;';
    successMsg.innerHTML = `
      <p style="margin: 0; font-size: 0.9rem;">
        <strong>✅ Saved!</strong><br>
        Structure saved to localStorage. Reload the page to see changes take effect.
      </p>
    `;
    
    const form = document.getElementById('structure-editor-form');
    if (form) {
      form.insertBefore(successMsg, form.firstChild);
      
      setTimeout(() => {
        successMsg.remove();
      }, 3000);
    }
    
    // Refresh the entity list to show changes
    this.updateEntityList();
    
    console.log(`Saved structure ${id} to localStorage`);
  }

  /**
   * Reset entity to default (remove localStorage override)
   */
  resetEntity() {
    let storageKey;
    if (this.selectedType === 'structures') {
      storageKey = 'dev_structures_override';
    } else if (this.selectedType === 'drones') {
      storageKey = 'dev_drones_override';
    } else if (this.selectedType === 'resources') {
      storageKey = 'dev_resources_override';
    } else if (this.selectedType === 'tiles') {
      storageKey = 'dev_tiles_override';
    }
    
    // Get existing overrides
    const existing = localStorage.getItem(storageKey);
    if (existing) {
      const overrides = JSON.parse(existing);
      delete overrides[this.selectedEntity.id];
      
      if (Object.keys(overrides).length === 0) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(overrides));
      }
    }
    
    // Reload the entity from defaults
    if (this.selectedType === 'structures') {
      const defaultEntity = getAllStructures().find(s => s.id === this.selectedEntity.id);
      if (defaultEntity) {
        this.selectedEntity = defaultEntity;
      }
    } else if (this.selectedType === 'drones') {
      const allDrones = getAllDroneRecipes();
      this.selectedEntity = { id: this.selectedEntity.id, ...allDrones[this.selectedEntity.id] };
    } else if (this.selectedType === 'resources') {
      const allResources = getAllResources();
      const defaultResource = allResources.find(r => r.id === this.selectedEntity.id);
      if (defaultResource) {
        this.selectedEntity = defaultResource;
      }
    } else if (this.selectedType === 'tiles') {
      const allTiles = getAllTileTypes();
      const defaultTile = allTiles.find(t => t.id === this.selectedEntity.id);
      if (defaultTile) {
        this.selectedEntity = defaultTile;
      }
    }
    
    this.updateEditor();
    
    console.log(`Reset ${this.selectedEntity.id} to default`);
  }

  /**
   * Add a new entity (creates a template in localStorage)
   */
  addNewEntity() {
    // Prevent duplicate creation if already in progress
    if (this._creatingEntity) {
      return;
    }
    this._creatingEntity = true;

    // Generate a unique ID using timestamp and random suffix
    const timestamp = Date.now();
    const randomSuffix = Math.floor(Math.random() * 10000);
    const newId = `custom_${this.selectedType.slice(0, -1)}_${timestamp}_${randomSuffix}`;
    
    // Create template based on type
    let template = {};
    let storageKey;
    
    if (this.selectedType === 'structures') {
      storageKey = 'dev_structures_override';
      template = {
        id: newId,
        name: 'New Structure',
        icon: '🏗️',
        description: 'Custom structure description',
        category: 'custom',
        unlocked: true,
        buildableOn: ['empty'],
        costs: {
          iron: 100,
          silicon: 50,
          energy: 0
        },
        stats: {
          energyPerSecond: 0
        },
        buildable: true
      };
    } else if (this.selectedType === 'drones') {
      storageKey = 'dev_drones_override';
      template = {
        id: newId,
        name: 'New Drone',
        description: 'Custom drone description',
        components: {
          chassis: 1,
          circuit: 1,
          powerCore: 1
        },
        buildTime: 0,
        stats: {
          gatherRate: 0.5,
          durability: Infinity
        }
      };
    } else if (this.selectedType === 'resources') {
      storageKey = 'dev_resources_override';
      template = {
        id: newId,
        name: 'resources.custom_resource',
        icon: '🔹',
        baseRate: 1
      };
    } else if (this.selectedType === 'tiles') {
      storageKey = 'dev_tiles_override';
      template = {
        id: newId,
        name: 'tiles.custom_tile',
        resourceProduced: null,
        baseRate: 1,
        allowedDrones: ['basic', 'advanced', 'elite']
      };
    }
    
    // Save to localStorage
    
    let overrides = {};
    const existing = localStorage.getItem(storageKey);
    if (existing) {
      overrides = JSON.parse(existing);
    }
    
    overrides[newId] = template;
    localStorage.setItem(storageKey, JSON.stringify(overrides));
    
    // Select the new entity
    this.selectedEntity = { id: newId, ...template };
    
    // Update UI
    this.updateEntityList();
    this.updateEditor();
    
    // Reset creation flag after a short delay
    setTimeout(() => {
      this._creatingEntity = false;
    }, 100);
    
    console.log(`Created new ${this.selectedType} entity: ${newId}`);
  }

  /**
   * Delete a custom entity
   */
  deleteEntity() {
    if (!this.selectedEntity || !this.selectedEntity.id.startsWith('custom_')) {
      console.warn('Can only delete custom entities');
      return;
    }

    // Special check for tile types - verify no map tiles use this type
    if (this.selectedType === 'tiles') {
      const mapScene = this.scene.get('MapScene');
      if (mapScene && mapScene.hexGrid) {
        const allTiles = mapScene.hexGrid.getAllTiles();
        const tilesUsingType = allTiles.filter(t => t.type === this.selectedEntity.id);
        
        if (tilesUsingType.length > 0) {
          alert(`Cannot delete tile type "${this.selectedEntity.id}" because ${tilesUsingType.length} tile(s) on the map are using it.\n\nChange those tiles to a different type first.`);
          return;
        }
      }
    }

    // Check dependencies before deleting
    const dependencies = this.configManager.checkDependencies(
      this.selectedType.slice(0, -1), // Remove 's' from type
      this.selectedEntity.id
    );

    if (dependencies.length > 0) {
      alert(`Cannot delete ${this.selectedEntity.name || this.selectedEntity.id} because it is used by:\n\n${dependencies.join('\n')}\n\nRemove these dependencies first.`);
      return;
    }

    if (!confirm(`Delete ${this.selectedEntity.name || this.selectedEntity.id}? This cannot be undone.`)) {
      return;
    }

    let storageKey;
    if (this.selectedType === 'structures') {
      storageKey = 'dev_structures_override';
    } else if (this.selectedType === 'drones') {
      storageKey = 'dev_drones_override';
    } else if (this.selectedType === 'resources') {
      storageKey = 'dev_resources_override';
    } else if (this.selectedType === 'tiles') {
      storageKey = 'dev_tiles_override';
    }
    
    const existing = localStorage.getItem(storageKey);
    if (existing) {
      const overrides = JSON.parse(existing);
      delete overrides[this.selectedEntity.id];
      
      if (Object.keys(overrides).length === 0) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(overrides));
      }
    }

    console.log(`Deleted custom entity: ${this.selectedEntity.id}`);
    
    // Clear selection and refresh
    this.selectedEntity = null;
    this.updateEntityList();
    this.updateEditor();
  }

  /**
   * Import configuration from JSON file
   */
  /**
   * Import configs from JSON file
   * REQ-CFG-008: Config import/export with validation
   */
  importConfig(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = JSON.parse(e.target.result);
        console.log('Imported config:', data);

        // Validate structure
        if (!data.resources && !data.tiles && !data.structures && !data.drones) {
          alert('❌ Invalid config file: No entity data found.\n\nExpected properties: resources, tiles, structures, drones');
          return;
        }

        // Validate each entity type using ConfigManager
        const validationErrors = [];
        let validCounts = { resources: 0, tiles: 0, structures: 0, drones: 0 };

        // Validate resources
        if (data.resources && Array.isArray(data.resources)) {
          data.resources.forEach((resource, index) => {
            const validation = this.configManager.validateResource(resource, true);
            if (!validation.valid) {
              validationErrors.push(`Resource #${index + 1} (${resource.id || 'unknown'}): ${validation.errors.join(', ')}`);
            } else {
              validCounts.resources++;
            }
          });
        }

        // Validate tiles
        if (data.tiles && Array.isArray(data.tiles)) {
          data.tiles.forEach((tile, index) => {
            const validation = this.configManager.validateTileType(tile, true);
            if (!validation.valid) {
              validationErrors.push(`Tile #${index + 1} (${tile.id || 'unknown'}): ${validation.errors.join(', ')}`);
            } else {
              validCounts.tiles++;
            }
          });
        }

        // Validate structures
        if (data.structures && Array.isArray(data.structures)) {
          data.structures.forEach((structure, index) => {
            const validation = this.configManager.validateStructure(structure, true);
            if (!validation.valid) {
              validationErrors.push(`Structure #${index + 1} (${structure.id || 'unknown'}): ${validation.errors.join(', ')}`);
            } else {
              validCounts.structures++;
            }
          });
        }

        // Validate drones
        if (data.drones && typeof data.drones === 'object') {
          Object.entries(data.drones).forEach(([id, drone], index) => {
            const droneData = { id, ...drone };
            const validation = this.configManager.validateDrone(droneData, true);
            if (!validation.valid) {
              validationErrors.push(`Drone #${index + 1} (${id}): ${validation.errors.join(', ')}`);
            } else {
              validCounts.drones++;
            }
          });
        }

        // Show validation errors if any
        if (validationErrors.length > 0) {
          const errorSummary = validationErrors.slice(0, 10).join('\n');
          const moreErrors = validationErrors.length > 10 ? `\n... and ${validationErrors.length - 10} more errors` : '';
          alert(`❌ Import failed due to validation errors:\n\n${errorSummary}${moreErrors}\n\nPlease fix these issues and try again.`);
          return;
        }

        // Show summary and ask for confirmation
        const summary = [
          `📊 Import Summary:`,
          ``,
          `✅ Valid entities found:`,
          `  Resources: ${validCounts.resources}`,
          `  Tiles: ${validCounts.tiles}`,
          `  Structures: ${validCounts.structures}`,
          `  Drones: ${validCounts.drones}`,
          ``,
          `⚠️ This will overwrite existing custom configs in localStorage.`,
          ``,
          `Do you want to proceed?`
        ].join('\n');

        if (!confirm(summary)) {
          console.log('Import cancelled by user');
          return;
        }

        // Import resources
        if (data.resources && validCounts.resources > 0) {
          const resourceOverrides = {};
          data.resources.forEach(resource => {
            resourceOverrides[resource.id] = resource;
          });
          localStorage.setItem('dev_resources_override', JSON.stringify(resourceOverrides));
        }

        // Import tiles
        if (data.tiles && validCounts.tiles > 0) {
          const tileOverrides = {};
          data.tiles.forEach(tile => {
            tileOverrides[tile.id] = tile;
          });
          localStorage.setItem('dev_tiles_override', JSON.stringify(tileOverrides));
        }

        // Import structures
        if (data.structures && validCounts.structures > 0) {
          const structureOverrides = {};
          data.structures.forEach(structure => {
            structureOverrides[structure.id] = structure;
          });
          localStorage.setItem('dev_structures_override', JSON.stringify(structureOverrides));
        }

        // Import drones
        if (data.drones && validCounts.drones > 0) {
          localStorage.setItem('dev_drones_override', JSON.stringify(data.drones));
        }

        // Refresh UI
        this.configManager.refresh();
        this.updateEntityList();

        alert(`✅ Import successful!\n\nImported:\n  Resources: ${validCounts.resources}\n  Tiles: ${validCounts.tiles}\n  Structures: ${validCounts.structures}\n  Drones: ${validCounts.drones}\n\nReload the page to see all changes take effect.`);
        
        console.log('Import completed successfully');
      } catch (error) {
        console.error('Failed to import config:', error);
        alert(`❌ Failed to import configuration:\n\n${error.message}\n\nPlease check the file format and try again.`);
      }
      
      // Reset file input
      event.target.value = '';
    };
    reader.readAsText(file);
  }
}
