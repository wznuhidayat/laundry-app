# Project Context

## Purpose
Laundry App is the POS-style admin front-end for a laundry business. It supports staff authentication, real-time order entry with a cart workflow, status management and printing for existing orders, and maintenance of master data (services, durations, delivery options, perfumes, discounts, and customers). The app targets desktop usage inside the store and assumes an accompanying backend that exposes REST endpoints.

## Tech Stack
- Nuxt 3 (Vue 3, Composition API, file-based routing, `<script setup>`)
- TypeScript (lightweight typing aided by Nuxt auto-imports)
- Pinia + `pinia-plugin-persistedstate` for state management and auth persistence
- Tailwind CSS with DaisyUI themes for UI components
- Axios for REST integration, `@vueuse/nuxt` utilities (debounce, date formatting)
- Iconify icons, Google Fonts (Open Sans), `@nuxt/icon` integration

## Project Conventions

### Code Style
- Use `<script setup>` with the Composition API (`ref`, `reactive`, `computed`, `watch`); prefer camelCase variables and PascalCase component names.
- TypeScript is optional but favored; stores and forms type inputs when practical and fall back to flexible types for backend payloads.
- Formatting follows ESLint defaults scaffolded by `@nuxt/eslint`; there is no Prettier config, so keep spacing consistent with existing files.
- Reuse helpers under `utils/` (e.g., `currency`, `customRound`, `discountLabel`) instead of duplicating formatting logic.

### Architecture Patterns
- Pages map to Nuxt routes and declare the `admin` layout when auth gating is required; the layout wires the sidebar, navbar, and toast notification shell.
- `middleware/auth.ts` protects admin routes by checking `useAuthStore().user`; `pages/login.vue` is the only public page.
- Pinia stores under `stores/` encapsulate API access, pagination state, and mutations; pages call store actions via `useFetch` for initial data and rely on computed getters for reactive state.
- Shared UI pieces (cards, modals, pagination, sidebar) live in `components/` and use DaisyUI classes to keep pages lean.
- The `cart` store orchestrates the POS flow: adding services, selecting perfumes, applying shipping and discounts, attaching a customer, and posting a combined payload to `/order/checkout`.
- Runtime configuration (`runtimeConfig.public.apiBase`) centralizes the backend URL so environments can override it without code changes.

### Testing Strategy
- No automated tests (unit, component, or e2e) are present. Manual verification through the Nuxt dev server is currently required.
- When adding features, prefer lightweight component tests (Vitest + Vue Test Utils) or at least Playwright smoke tests for core flows (login, create order, checkout) to reduce regressions.

### Git Workflow
- Default branch is assumed to be `main`; create short-lived feature branches per change (e.g., `feature/add-discount-filters`).
- Keep commits focused and descriptive; conventional prefixes (`feat:`, `fix:`, `chore:`) ease changelog generation and reviews.
- Open pull requests for review before merging; rebase or squash as needed to keep `main` linear.

## Domain Context
- Core entities: services (name, type `item/weight/length`, duration, price), durations (display name, numeric length), delivery options (name, price), perfumes, discounts (type `amount` or `percentage`, numeric value), and customers (code, name, phone, address).
- Order workflow: staff builds a cart of services, optionally selects a perfume per line item, chooses delivery and discount, and assigns an existing customer or treats checkout as guest. Checkout posts arrays of `service_id`, `qty`, `perfume_id`, plus delivery/discount/customer IDs.
- Order status codes follow backend convention (`0` pending, `1` completed, `2` cancelled). Order history allows printing invoices and changing status via a modal; deletions require confirmation.
- Customer search inside checkout uses `/customer-search` with a debounced query; results clear when a customer is chosen.
- Monetary values are displayed in Indonesian Rupiah via the `currency()` helper; always pass integer totals to avoid rounding drift.

## Important Constraints
- The app depends on the configured backend (default `http://localhost:3333`) for all data; without a reachable API the UI will render placeholders but actions fail.
- Axios requests expect a bearer token from `authStore.token`; login uses `withCredentials` to receive cookies and persists user data via local storage.
- Most admin pages load data in `setup()` using `useFetch`, so backend latency directly affects page rendering; consider loading states before adding new blocking calls.
- The root template references `<AppHeader />`; ensure this component exists or remove the reference before deploying builds to avoid runtime errors.
- Toast notifications auto-clear after 3 seconds; long-running operations should surface progress elsewhere if needed.

## External Dependencies
- REST API provided by the laundry backend (AdonisJS expected): `/login`, `/logout`, `/service`, `/duration`, `/discount`, `/delivery`, `/perfume`, `/customer`, `/customer-search`, `/order`, `/order/status/:id`, `/order/checkout`, `/order/:id`.
- Google Fonts API for Open Sans, Iconify CDN assets for icons, and the DaisyUI package for UI styling.
- Browser must allow local storage and cookies for persisted auth (Pinia plugin) and HTTP-only session handling.
