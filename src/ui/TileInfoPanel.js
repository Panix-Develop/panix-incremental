// TileInfoPanel.js - Tile details panel component
// REQ-INFO-001: Display selected tile details

export class TileInfoPanel {
  constructor() {
    this.panel = document.getElementById('tile-info-panel');
    
    if (!this.panel) {
      console.error('Tile info panel element not found!');
      return;
    }

    this.currentTile = null;
    this.deployBtn = null;
    this.removeBtn = null;
  }

  /**
   * Show panel with tile information
   * REQ-INFO-002, REQ-INFO-003, REQ-INFO-004: Display tile details
   * @param {object} tile - Tile data
   * @param {object} hexGrid - HexGrid instance for calculations
   */
  show(tile, hexGrid) {
    if (!tile) {
      this.hide();
      return;
    }

    this.currentTile = tile;
    this.panel.style.display = 'block';

    const generationRate = hexGrid.getTileGenerationRate(tile.q, tile.r);

    let content = `
      <div class="tile-info-header">
        ${this.getTileTitle(tile)}
      </div>
      <div class="tile-info-content">
        <div class="tile-info-row">
          <span class="tile-info-label">Coordinates:</span>
          <span class="tile-info-value">Q${tile.q}, R${tile.r}</span>
        </div>
    `;

    // REQ-INFO-003: Starting tile special display
    if (tile.isStarting) {
      content += `
        <div class="tile-info-row">
          <span class="tile-info-label">Type:</span>
          <span class="tile-info-value">Starting Base</span>
        </div>
        <div class="tile-info-row">
          <span class="tile-info-label">Auto-collecting:</span>
          <span class="tile-info-value">+${generationRate.toFixed(1)} Iron/s</span>
        </div>
      `;
    }
    // REQ-INFO-004: Empty tile display
    else if (tile.type === 'empty') {
      content += `
        <div class="tile-info-row">
          <span class="tile-info-label">Type:</span>
          <span class="tile-info-value">Empty Tile</span>
        </div>
        <div style="margin-top: 1rem; color: var(--text-secondary); font-style: italic;">
          No resources available
        </div>
      `;
    }
    // REQ-INFO-002: Resource tile display
    else {
      const resourceName = tile.type.charAt(0).toUpperCase() + tile.type.slice(1);
      content += `
        <div class="tile-info-row">
          <span class="tile-info-label">Resource:</span>
          <span class="tile-info-value">${resourceName} Deposit</span>
        </div>
        <div class="tile-info-row">
          <span class="tile-info-label">Drones:</span>
          <span class="tile-info-value">${tile.drones}/${tile.maxDrones}</span>
        </div>
        <div class="tile-info-row">
          <span class="tile-info-label">Generation:</span>
          <span class="tile-info-value">+${generationRate.toFixed(1)} ${resourceName}/s</span>
        </div>
      `;

      // REQ-INFO-002: Deploy button (will be enabled when drones available)
      // REQ-DEPLOY-004: Disable for starting tile (already handled above)
      if (!tile.isStarting && tile.type !== 'empty') {
        const canDeploy = tile.drones < tile.maxDrones;
        const canRemove = tile.drones > 0;
        
        content += `
          <div style="display: flex; gap: 0.5rem; margin-top: 1rem;">
            <button id="deploy-drone-btn" class="btn" ${!canDeploy ? 'disabled' : ''} style="flex: 1;">
              ${canDeploy ? 'Deploy Drone' : 'At Capacity'}
            </button>
            <button id="remove-drone-btn" class="btn" ${!canRemove ? 'disabled' : ''} style="flex: 1; background: var(--accent-secondary);">
              ${canRemove ? 'Remove Drone' : 'No Drones'}
            </button>
          </div>
        `;
      }
    }

    content += `
      </div>
    `;

    this.panel.innerHTML = content;

    // Set up deploy button click handler (only if not already set)
    const deployBtn = document.getElementById('deploy-drone-btn');
    if (deployBtn && deployBtn !== this.deployBtn) {
      console.log('[TileInfoPanel] Setting up new deploy button listener');
      this.deployBtn = deployBtn;
      deployBtn.addEventListener('click', () => {
        console.log('[TileInfoPanel] Deploy button CLICKED!');
        this.onDeployDrone();
      });
    }

    // Set up remove button click handler (only if not already set)
    const removeBtn = document.getElementById('remove-drone-btn');
    if (removeBtn && removeBtn !== this.removeBtn) {
      console.log('[TileInfoPanel] Setting up new remove button listener');
      this.removeBtn = removeBtn;
      removeBtn.addEventListener('click', () => {
        console.log('[TileInfoPanel] Remove button CLICKED!');
        this.onRemoveDrone();
      });
    }
  }

  /**
   * Hide the panel
   * REQ-INFO-001: Panel hides when no tile selected
   */
  hide() {
    this.panel.style.display = 'none';
    this.currentTile = null;
  }

  /**
   * Get display title for tile
   * @param {object} tile - Tile data
   * @returns {string} - Title text
   */
  getTileTitle(tile) {
    if (tile.isStarting) {
      return 'Starting Base';
    }
    if (tile.type === 'empty') {
      return 'Empty Tile';
    }
    return tile.type.charAt(0).toUpperCase() + tile.type.slice(1) + ' Deposit';
  }

  /**
   * Handle deploy drone button click
   * This will be connected to DroneManager later
   */
  onDeployDrone() {
    console.log('[TileInfoPanel] Deploy drone button clicked for tile:', this.currentTile);
    // Emit custom event that will be handled by main game logic
    const event = new CustomEvent('deployDrone', {
      detail: { tile: this.currentTile }
    });
    window.dispatchEvent(event);
    console.log('[TileInfoPanel] deployDrone event dispatched');
  }

  /**
   * Handle remove drone button click
   */
  onRemoveDrone() {
    // Emit custom event that will be handled by main game logic
    const event = new CustomEvent('removeDrone', {
      detail: { tile: this.currentTile }
    });
    window.dispatchEvent(event);
  }

  /**
   * Refresh panel with updated tile data
   * @param {object} tile - Updated tile data
   * @param {object} hexGrid - HexGrid instance
   */
  refresh(tile, hexGrid) {
    if (this.currentTile && 
        this.currentTile.q === tile.q && 
        this.currentTile.r === tile.r) {
      this.show(tile, hexGrid);
    }
  }

  /**
   * Update deploy button state based on available drones
   * @param {number} availableDrones - Number of drones player has
   */
  updateDeployButton(availableDrones) {
    const deployBtn = document.getElementById('deploy-drone-btn');
    const removeBtn = document.getElementById('remove-drone-btn');
    
    if (deployBtn && this.currentTile) {
      const canDeploy = availableDrones > 0 && 
                       this.currentTile.drones < this.currentTile.maxDrones;
      
      deployBtn.disabled = !canDeploy;
      
      if (availableDrones === 0) {
        deployBtn.textContent = 'No Drones Available';
      } else if (this.currentTile.drones >= this.currentTile.maxDrones) {
        deployBtn.textContent = 'At Capacity';
      } else {
        deployBtn.textContent = 'Deploy Drone';
      }
    }

    if (removeBtn && this.currentTile) {
      const canRemove = this.currentTile.drones > 0;
      removeBtn.disabled = !canRemove;
      
      if (canRemove) {
        removeBtn.textContent = 'Remove Drone';
      } else {
        removeBtn.textContent = 'No Drones';
      }
    }
  }
}
