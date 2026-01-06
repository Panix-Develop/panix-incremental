// LockedPageOverlay.js - Overlay component for locked pages
// Shows lock icon and message for features not yet unlocked

export class LockedPageOverlay {
  constructor(message = 'This feature is locked', hint = 'Continue playing to unlock') {
    this.message = message;
    this.hint = hint;
    this.overlay = null;
  }

  /**
   * Create and show the overlay
   * @param {HTMLElement} parentElement - Parent element to append overlay to
   */
  show(parentElement) {
    if (!parentElement) {
      console.error('Parent element required for locked overlay');
      return;
    }

    // Remove existing overlay if present
    this.hide();

    // Create overlay
    this.overlay = document.createElement('div');
    this.overlay.className = 'locked-overlay';
    this.overlay.innerHTML = `
      <div class="locked-overlay-content">
        <div class="locked-icon">🔒</div>
        <h2 class="locked-message">${this.message}</h2>
        <p class="locked-hint">${this.hint}</p>
      </div>
    `;

    parentElement.appendChild(this.overlay);
  }

  /**
   * Hide and remove the overlay
   */
  hide() {
    if (this.overlay && this.overlay.parentElement) {
      this.overlay.remove();
      this.overlay = null;
    }
  }

  /**
   * Update overlay message
   * @param {string} message - New message
   * @param {string} hint - New hint (optional)
   */
  updateMessage(message, hint = null) {
    this.message = message;
    if (hint) {
      this.hint = hint;
    }

    // Update existing overlay if shown
    if (this.overlay) {
      const messageEl = this.overlay.querySelector('.locked-message');
      const hintEl = this.overlay.querySelector('.locked-hint');
      
      if (messageEl) messageEl.textContent = message;
      if (hintEl && hint) hintEl.textContent = hint;
    }
  }
}
