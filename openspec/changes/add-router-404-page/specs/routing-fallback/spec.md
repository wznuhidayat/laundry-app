## ADDED Requirements
### Requirement: Unmatched Route Handling
The system SHALL render a branded 404 experience whenever a user navigates to a route that Nuxt cannot resolve, keeping the user inside the app shell and offering navigational recovery actions styled with DaisyUI components.

#### Scenario: Staff opens an unknown path
- **GIVEN** a signed-in staff member enters or clicks a URL that is not registered in the router
- **WHEN** Nuxt reports a 404 error for that navigation
- **THEN** the app MUST show a DaisyUI card that clearly states the resource was not found and keeps the existing theme background
- **AND** a primary button SHALL route the user to the dashboard
- **AND** a secondary action SHALL allow the user to retry the previous page or go back (e.g., using router.back())
