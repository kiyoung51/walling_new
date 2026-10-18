/**
 * EventBus - Global Pub/Sub Messaging
 * Clean Architecture - Core Layer
 */

class EventBus {
  constructor() {
    this.listeners = new Map();
  }

  on(event, callback) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, new Set());
    }
    this.listeners.get(event).add(callback);
    return () => this.off(event, callback);
  }

  off(event, callback) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).delete(callback);
    }
  }

  emit(event, data = null) {
    if (this.listeners.has(event)) {
      this.listeners.get(event).forEach(cb => {
        try {
          cb(data);
        } catch (err) {
          console.error(`[EventBus] Error in listener for event "${event}":`, err);
        }
      });
    }

    // Also dispatch to window CustomEvent for legacy/DOM interoperability
    try {
      window.dispatchEvent(new CustomEvent(event, { detail: data }));
    } catch (e) {
      // Ignore in non-browser env
    }
  }
}

export const eventBus = new EventBus();
