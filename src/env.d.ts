/// <reference path="../.astro/db-types.d.ts" />
/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface Window {
  posthog: {
    opt_in_capturing(): void;
    opt_out_capturing(): void;
    has_opted_in_capturing(): boolean;
    has_opted_out_capturing(): boolean;
  };
}
