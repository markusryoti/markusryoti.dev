/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  posthog: {
    opt_in_capturing(): void;
    opt_out_capturing(): void;
    consent: {
      isOptedIn(): boolean;
      isOptedOut(): boolean;
    };
  };
}
