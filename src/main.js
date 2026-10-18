/**
 * Byeokjiwang (벽지왕) Application Bootstrap Entry Point
 * Clean Architecture Implementation
 * 
 * Architecture Layers:
 * - Domain Layer (src/domain/): Pure Entities and System Constants
 * - Application Layer (src/application/): Single-responsibility Use Cases and DI Container
 * - Infrastructure Layer (src/infrastructure/): LocalStorage Adapters, Repositories, EventBus
 * - Presentation Layer (src/presentation/): Components, Modals, UI Helpers, Orchestrator App
 */

import { app } from './presentation/App.js';
import { showToast } from './presentation/ui/Toast.js';
import { useCases } from './application/index.js';
import { router } from './core/Router.js';
import { eventBus } from './core/EventBus.js';

// Re-export common utilities for developer testing and backwards compatibility
export { app, showToast, useCases, router, eventBus };

// Bootstrap the application when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    app.bootstrap();
  });
} else {
  app.bootstrap();
}
