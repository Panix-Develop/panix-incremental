// TabNavigation.js - Tab system for scene switching
// REQ-UI-001: Tab navigation between Map, Crafting, Drones

export class TabNavigation {
  constructor(game) {
    this.game = game;
    this.currentTab = 'map';
    this.tabs = [
      { id: 'map', label: 'Map', icon: '🗺️', locked: false },
      { id: 'galaxy', label: 'Galaxy', icon: '🌌', locked: true },
      { id: 'crafting', label: 'Crafting', icon: '🔧', locked: false },
      { id: 'drones', label: 'Drones', icon: '🤖', locked: false },
      { id: 'structures', label: 'Structures', icon: '🏗️', locked: false },
      { id: 'research', label: 'Research', icon: '🔬', locked: true },
      { id: 'settings', label: 'Settings', icon: '⚙️', locked: false }
    ];
    
    this.setupTabs();
  }

  /**
   * Setup tab navigation UI
   */
  setupTabs() {
    const navButtons = document.getElementById('nav-buttons');
    
    if (!navButtons) {
      console.error('Navigation buttons container not found!');
      return;
    }

    // Create navigation buttons
    navButtons.innerHTML = this.tabs.map(tab => `
      <button class="nav-btn ${tab.id === 'map' ? 'active' : ''} ${tab.locked ? 'locked' : ''}" 
              data-tab="${tab.id}"
              ${tab.locked ? 'title="This feature is locked"' : ''}>
        <span class="nav-btn-icon">${tab.icon}</span>
        <span>${tab.label}${tab.locked ? ' 🔒' : ''}</span>
      </button>
    `).join('');

    // Add click handlers
    const buttons = navButtons.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
      button.addEventListener('click', (e) => {
        const tab = e.currentTarget.getAttribute('data-tab');
        this.switchTab(tab);
      });
    });
  }

  /**
   * Switch to a different tab
   * @param {string} tabName - Tab id to switch to
   */
  switchTab(tabName) {
    const tab = this.tabs.find(t => t.id === tabName);
    if (!tab) {
      console.error('Invalid tab:', tabName);
      return;
    }

    // Don't switch to locked tabs
    if (tab.locked) {
      console.log('Tab is locked:', tabName);
      return;
    }

    this.currentTab = tabName;

    // Update button states
    const buttons = document.querySelectorAll('.nav-btn');
    buttons.forEach(button => {
      if (button.getAttribute('data-tab') === tabName) {
        button.classList.add('active');
      } else {
        button.classList.remove('active');
      }
    });

    // Get panels
    const phaserGame = document.getElementById('phaser-game');
    const uiOverlay = document.getElementById('ui-overlay');
    const craftingPanel = document.getElementById('crafting-panel');
    const dronesPanel = document.getElementById('drones-panel');
    const structuresPanel = document.getElementById('structures-panel');
    const researchPanel = document.getElementById('research-panel');
    const galaxyPanel = document.getElementById('galaxy-panel');
    const settingsPanel = document.getElementById('settings-panel');

    // Hide all content first
    if (phaserGame) phaserGame.style.display = 'none';
    if (uiOverlay) uiOverlay.style.display = 'none';
    if (craftingPanel) craftingPanel.style.display = 'none';
    if (dronesPanel) dronesPanel.style.display = 'none';
    if (structuresPanel) structuresPanel.style.display = 'none';
    if (researchPanel) researchPanel.style.display = 'none';
    if (galaxyPanel) galaxyPanel.style.display = 'none';
    if (settingsPanel) settingsPanel.style.display = 'none';

    // Show appropriate content
    switch (tabName) {
      case 'map':
        if (phaserGame) phaserGame.style.display = 'block';
        if (uiOverlay) uiOverlay.style.display = 'block';
        break;

      case 'crafting':
        if (craftingPanel) {
          craftingPanel.style.display = 'block';
          const craftingScene = this.game.scene.getScene('CraftingScene');
          if (craftingScene) {
            craftingScene.updateUI();
          }
        }
        break;

      case 'drones':
        if (dronesPanel) {
          dronesPanel.style.display = 'block';
          const dronesScene = this.game.scene.getScene('DronesScene');
          if (dronesScene) {
            dronesScene.updateUI();
          }
        }
        break;

      case 'structures':
        if (structuresPanel) {
          structuresPanel.style.display = 'block';
          const structuresScene = this.game.scene.getScene('StructuresScene');
          if (structuresScene) {
            structuresScene.updatePanel();
          }
        }
        break;

      case 'research':
        if (researchPanel) {
          researchPanel.style.display = 'block';
        }
        break;

      case 'galaxy':
        if (galaxyPanel) {
          galaxyPanel.style.display = 'block';
        }
        break;

      case 'settings':
        if (settingsPanel) {
          settingsPanel.style.display = 'block';
          const settingsScene = this.game.scene.getScene('SettingsScene');
          if (settingsScene) {
            settingsScene.updateUI();
          }
        }
        break;
    }
  }

  /**
   * Get current active tab
   * @returns {string} - Current tab name
   */
  getCurrentTab() {
    return this.currentTab;
  }
}
