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
    this.isInitialized = false;
  }

  register(pattern, handler, options = {}) {
    let regex = null;
    if (pattern instanceof RegExp) {
      regex = pattern;
    } else if (typeof pattern === 'string') {
      if (pattern.startsWith('^') || pattern.includes('(') || pattern.includes('*') || pattern.includes('+')) {
        try {
          regex = new RegExp(pattern, 'i');
        } catch (e) {
          console.error(`[Router] Invalid regex pattern: ${pattern}`, e);
        }
      }
    }

    this.routes.push({
      pattern,
      regex,
      handler,
      guard: options.guard || null
    });
    return this;
  }

  addRoute(pattern, handler, options = {}) {
    return this.register(pattern, handler, options);
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

      // 1. Run Global Route Guards
      for (const guard of this.guards) {
        const canProceed = guard(cleanHash, rawHash);
        if (canProceed === false) {
          return;
        }
      }

      // 2. Match Route Handlers
      let matched = false;
      for (const route of this.routes) {
        if (route.regex) {
          const match = rawHash.match(route.regex) || cleanHash.match(route.regex);
          if (match) {
            // Check route-specific guard
            if (typeof route.guard === 'function') {
              const canProceed = route.guard(cleanHash, rawHash);
              if (canProceed === false) {
                return;
              }
            }

            const params = match.groups || {};
            try {
              route.handler(params, rawHash, match);
            } catch (err) {
              console.error(`[Router] Error executing handler for ${rawHash}:`, err);
            }
            matched = true;
            break;
          }
        } else if (typeof route.pattern === 'string') {
          if (cleanHash === route.pattern.toLowerCase()) {
            // Check route-specific guard
            if (typeof route.guard === 'function') {
              const canProceed = route.guard(cleanHash, rawHash);
              if (canProceed === false) {
                return;
              }
            }

            try {
              route.handler({}, rawHash);
            } catch (err) {
              console.error(`[Router] Error executing handler for ${rawHash}:`, err);
            }
            matched = true;
            break;
          }
        }
      }

      // 3. Fallback to Home if not matched
      if (!matched && cleanHash.startsWith('#')) {
        const homeRoute = this.routes.find(r => r.pattern === '^.*$' || r.pattern === '#home' || r.pattern === '');
        if (homeRoute) {
          try {
            homeRoute.handler({}, rawHash);
          } catch (err) {
            console.error(`[Router] Error executing fallback home handler for ${rawHash}:`, err);
          }
        }
      }

      eventBus.publish(APP_EVENTS.NAVIGATE, { hash: cleanHash, raw: rawHash });
    } finally {
      this.isNavigating = false;
    }
  }

  init() {
    if (this.isInitialized) return;
    this.isInitialized = true;
    window.addEventListener('hashchange', () => this.handleRouting());
    this.handleRouting();
  }

  start() {
    this.init();
  }
}

export const router = new Router();
