## Purpose

<!-- New capability only: at least 50 characters. Delete for an existing capability. -->

## Feature Context

**Delivery mode:** <!-- new | existing | mixed -->

**Feature/screen scope:** <!-- user journey and affected Flutter screens -->

### Sources

<!-- Separate human/product inputs, Figma, legacy AC, and observed app/tests.
     Existing UI/code is evidence of current behavior, not product truth. -->

| Source | Provenance | What it establishes | Conflict / open question |
|---|---|---|---|
| <!-- link or stable ID --> | <!-- human input / legacy requirement / Figma / observed implementation / platform convention --> | | |

### Existing Baseline

<!-- Existing/mixed only: what works, what is incomplete, and what is unproven.
     For a new feature write N/A. -->

### Inherited App And Platform Behavior

<!-- Existing state management, routing, generated SDK, design system, platform,
     and accessibility behavior reused unchanged. Do not restate or retest it
     unless this feature changes or configures it. -->

## Feature Coverage

| Concern | Requirement(s) or N/A | What needs human confirmation |
|---|---|---|
| Read data: API/local sources, filters, sorting, aggregation, calculated values, formatting | | |
| Pure business logic: decision tables for branching rules and calculations | | |
| Business operations beyond ordinary API CRUD | | |
| External/API interactions and visible timeout/offline/pending behavior | | |
| Domain/app state and loading/empty/error/partial/stale UI states | | |
| Realtime/push/sync invalidation, refresh, and visible UI update | | |
| Small set of key navigation and end-to-end journeys | | |
| Other affected concerns | | |

## Human Review

<!-- The agent MUST leave PENDING. Human reviewer confirms/corrects decision
     tables, checks the small set of key journeys, and resolves explicit
     questions. Nominal read rendering and simple operations need only a scan. -->

**Reviewer:** <!-- human name -->

**Verdict:** PENDING <!-- APPROVED | CHANGES_REQUESTED; human-owned -->

**Decision-table feedback:** <!-- correct / corrections / N/A -->

**Journey feedback:** <!-- adequate / missing or excessive scenarios -->

**Resolved questions:** <!-- answers or N/A -->

## ADDED Requirements

### Requirement: [AC-<capability>-001] <!-- concise observable behavior -->

**Kind:** <!-- acceptance | invariant | state | contract | workflow | quality -->

**Concern:** <!-- read | decision | operation | external | state | realtime | journey | other -->

**Surfaces:** <!-- android | ios | web | desktop | ui | api | storage | sync | platform -->

**Owner:** <!-- accountable product/domain owner -->

**Source:** <!-- source link/ID; invented meaning is [ASSUMPTION] plus an open question -->

<!-- Write one normative SHALL/MUST statement. Add only the structure that
     removes ambiguity: read mapping/format; decision table; operation contract;
     visible API/offline failure; domain/app state; realtime/push/sync refresh;
     or one of roughly 3-7 key journeys.

     Product behavior belongs here. Decision tables are the requirements form
     for pure business logic. Pure Dart placement plus unit tests, widgets,
     state library, router, generated SDK usage, platform adapters, and other
     test seams belong in design.md and tasks.md.

     "Other" is conditional: permissions, local persistence, sync conflicts,
     deep links, background execution, accessibility, localization, adaptive
     layout, analytics, privacy, compatibility, or rollout. -->

#### Scenario: <!-- representative success, boundary, or material failure -->

- **WHEN** <!-- trigger and relevant preconditions -->
- **THEN** <!-- user- or system-observable result -->
- **AND** <!-- optional guarantee -->

<!-- Add only necessary requirements. Do not expand decision-table rows into
     repetitive scenarios; keep feature-level journeys few and meaningful. -->
