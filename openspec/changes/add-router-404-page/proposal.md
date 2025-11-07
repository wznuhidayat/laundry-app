## Why
Unregistered routes currently fall back to Nuxt's generic error output, which is off-brand and does not guide staff back to supported flows. We need a branded 404 experience that keeps users inside the app shell.

## What Changes
- Add a routing fallback requirement that renders a DaisyUI-styled 404 page for unmatched routes.
- Ensure the page offers quick navigation back to the dashboard (or login when signed out) while remaining within the existing app shell.

## Impact
- Affected specs: routing-fallback
- Affected code: `error.vue`, potentially layout-level wrappers if required for theming.
