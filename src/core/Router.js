/**
 * Router - Declarative SPA Router with Guards
 * Clean Architecture - Core Layer
 */
import { eventBus } from './EventBus.js';
import { APP_EVENTS } from '../domain/constants/AppConstants.js';

export class Router {
  constructor() {
    this.routes = [];
    this.guards = [];
    this.currentHash = '';
    this.isNavigating = false;

    window.addEventListener('hashchange', () => this.handleRouting());
  }

  addRoute(pattern, handler) {
    this.routes.push({ pattern, handler });
    return this;
  }

  addGuard(guardFn) {
    this.guards.push(guardFn);
    return this;
  }

  navigate(hash) {
    if (!hash.startsWith('#')) hash = `#${hash}`;
    if (window.location.hash === hash) {
      this.handleRouting();
    } else {
      window.location.hash = hash;
    }
  }

  handleRouting() {
    if (this.isNavigating) return;
    this.isNavigating = true;

    try {
      const rawHash = window.location.hash || '#home';
      const cleanHash = rawHash.trim().toLowerCase();
      this.currentHash = cleanHash;

      // 1. Run Route Guards
      for (const guard of this.guards) {
        const canProceed = guard(cleanHash, rawHash);
        if (canProceed === false) {
          this.isNavigating = false;
          return;
        }
      }

      // 2. Match Route Handlers
      let matched = false;
      for (const route of this.routes) {
        if (typeof route.pattern === 'string' && route.pattern === cleanHash) {
          route.handler(rawHash);
          matched = true;
          break;
        } else if (route.pattern instanceof RegExp && route.pattern.test(rawHash)) {
          const match = rawHash.match(route.pattern);
          route.handler(rawHash, match);
          matched = true;
          break;
        }
      }

      // 3. Fallback to Home if not matched
      if (!matched && cleanHash.startsWith('#')) {
        const homeRoute = this.routes.find(r => r.pattern === '#home' || r.pattern === '');
        if (homeRoute) homeRoute.handler(rawHash);
      }

      eventBus.emit(APP_EVENTS.NAVIGATE, { hash: cleanHash, raw: rawHash });
    } finally {
      this.isNavigating = false;
    }
  }

  start() {
    this.handleRouting();
  }
}

export const router = new Router();
