## Purpose

<!-- New capability only: describe its durable product responsibility in at
     least 50 characters. Delete this section for an existing capability. -->

## Feature Context

**Delivery mode:** <!-- new | existing | mixed -->

**Feature/screen scope:** <!-- user-visible boundary -->

### Sources

<!-- Use product/human inputs for meaning. For existing features, list legacy
     AC/RAW, observed UI/code/tests, and designs separately. Existing code is
     evidence of current behavior, not automatically a requirement. -->

| Source | Provenance | What it establishes | Conflict / open question |
|---|---|---|---|
| <!-- link or stable ID --> | <!-- human input / legacy requirement / design / observed implementation / platform convention --> | | |

### Existing Baseline

<!-- Existing/mixed only: what works, what is incomplete, and what is unproven.
     For a new feature write N/A. -->

### Inherited Platform Behavior

<!-- Standard mini CRUDL/FSM/SSE, web-client, Flutter, SDK, form, navigation,
     and design-system behavior reused unchanged. Do not restate or retest it
     unless this feature changes or configures it. -->

## Feature Coverage

<!-- Keep every row. Mark N/A deliberately and link applicable rows to the
     Requirement blocks below. This is a completeness map; only normative
     Requirement blocks become the canonical spec at archive. -->

| Concern | Requirement(s) or N/A | What needs human confirmation |
|---|---|---|
| Read data: sources, filters, sorting, aggregation, calculated values, formatting | | |
| Pure business logic: decision tables for branching rules and calculations | | |
| Business operations beyond ordinary CRUDL | | |
| External interactions and visible failure/pending behavior | | |
| Domain FSM and loading/empty/error/partial/filter screen states | | |
| SSE/realtime invalidation, refetch, and visible UI update | | |
| Small set of key end-to-end journeys | | |
| Other affected concerns | | |

## Human Review

<!-- The agent MUST leave the verdict PENDING. This is a blitz review: the
     human confirms/corrects decision tables, checks that the key journeys are
     adequate and complete, and resolves explicit conflicts/questions. Nominal
     read display and simple operations need only a quick sanity scan. -->

**Reviewer role:** <!-- analyst | product owner | assigned product reviewer -->

**Reviewer:** <!-- human name -->

**Reviewed at:** <!-- ISO date/time; human-owned -->

**Reviewed revision:** <!-- Git commit containing the exact reviewed requirement text -->

**Verdict:** PENDING <!-- APPROVED | CHANGES_REQUESTED; human-owned -->

**Decision-table feedback:** <!-- correct / corrections / N/A -->

**Journey feedback:** <!-- adequate / missing or excessive scenarios -->

**Resolved questions:** <!-- answers or N/A -->

## ADDED Requirements

### Requirement: [AC-<capability>-001] <!-- concise observable behavior -->

**Kind:** <!-- acceptance | invariant | state | contract | workflow | quality -->

**Concern:** <!-- read | decision | operation | external | state | realtime | journey | other -->

**Surfaces:** <!-- mini-admin | web | flutter | api | sdk | worker | integration | cli -->

**Owner:** <!-- accountable product/domain owner -->

**Source:** <!-- source link/ID; invented meaning is [ASSUMPTION] plus an open question -->

<!-- Write one normative SHALL/MUST statement and only the structure needed to
     remove ambiguity:

     - read: data source, filters/sorts/aggregates, calculation and format;
     - decision: explicit decision table with feasible rows and boundaries;
     - operation: preconditions, result, state effect and stable errors;
     - external: only feature-specific timeout/pending/retry/unavailable outcomes;
     - state: domain transitions and observable screen states;
     - realtime: event, invalidation/refetch rule and visible UI result;
     - journey: one of roughly 3-7 key feature-level paths;
     - other: permissions, privacy, limits, time, concurrency, accessibility,
       localization, analytics, compatibility, offline/deep links, or rollout,
       but only when this feature changes them.

     Product behavior belongs here. Decision tables are the requirements form
     for pure business logic. Their implementation as frontend/backend pure
     functions plus unit tests, or placement behind another boundary, belongs
     in design.md and tasks.md. -->

#### Scenario: <!-- representative success, boundary, or material failure -->

- **WHEN** <!-- trigger and relevant preconditions -->
- **THEN** <!-- observable result -->
- **AND** <!-- optional additional guarantee -->

<!-- Add only necessary requirement blocks. Every requirement needs at least
     one scenario, but do not repeat every decision-table row as a scenario.
     Keep feature-level end-to-end journeys few and meaningful. -->
