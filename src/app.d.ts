// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: {
        TEAM_DOMAIN: string;
        ACCESS_AUD: string;
      };
      context: {
        waitUntil(promise: Promise<any>): void;
      };
      caches: CacheStorage & { default: Cache };
    }
    interface Locals {
      user?: string | any;
    }
  }
}

export {};
