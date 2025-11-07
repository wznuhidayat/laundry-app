## 1. Specification
- [x] 1.1 Draft routing-fallback spec delta describing the DaisyUI 404 requirement.

## 2. Implementation
- [x] 2.1 Create a Nuxt-level error page (e.g., `error.vue`) that inspects `error.statusCode` and renders a DaisyUI-styled 404 experience for unregistered routes.
- [x] 2.2 Provide primary/secondary CTA buttons to navigate back to the dashboard or retry, respecting existing theming.

## 3. Validation
- [ ] 3.1 Manually navigate to an unknown route and confirm the custom 404 page appears with working navigation controls. (Blocked: Nuxt dev server cannot bind to a port inside this sandbox, so manual navigation is not possible.)
