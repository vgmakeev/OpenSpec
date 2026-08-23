## Context

<!-- Current system facts and constraints needed to explain the design. Link to proposal/specs instead of repeating them. -->

## Architecture Coverage

<!-- Delete unused rows. One row may map to several stable Trace IDs. -->

| Area | Decision / owning contract | Trace IDs | Why this boundary |
|---|---|---|---|
| Domain state / registry Resource | | | |
| CRUDL / aggregate reads | | | |
| Service / invariants / FSM | | | |
| CustomMethod / raw adapter | | | |
| Standard / custom mini-admin | | | |
| Generated SDK / web / mobile | | | |
| Task / schedule | | | |
| Integration / external provider | | | |
| Realtime / event / push | | | |
| Migration / compatibility | | | |

## Domain And State Model

<!-- Resources/entities, ownership, relations, invariants, state transitions, projections, and authoritative source. Prefer a compact table or diagram. -->

## Surface And Contract Design

<!-- For each affected API, SDK, admin, web/mobile, CLI, event or file surface: inputs, outputs, errors, permissions, versioning, cache/offline behavior, and fallback. -->

## Runtime Flows

<!-- Important request, task, integration, realtime, or migration sequences. State sync/async boundaries and transaction ownership. -->

## Boundary And Failure Semantics

<!-- Classify provider calls and tasks. Cover idempotency/dedup, retry/backoff, locks/concurrency, time budgets, evidence, operator visibility, partial failure, and rollback. -->

## Cross-Cutting Policies

### Authorization And Row Scope

<!-- Backend enforcement and matching client/admin behavior. -->

### Tenancy

<!-- Request/worker context, PostgreSQL schema, cache/S3 keys, provider account scope, and analytics tenant dimension. -->

### Observability And Realtime

<!-- Low-cardinality policy, logs/traces, events, invalidation/refetch, replay and sync-required behavior. -->

### Compatibility And Migration

<!-- API/SDK versions, expand-contract data migration, delayed mobile clients, rollout and rollback. -->

## Decisions

### Decision: <!-- decision title -->

- **Choice:**
- **Rationale:**
- **Alternatives rejected:**

## Risks / Trade-Offs

- **Risk:** <!-- risk --> -> **Mitigation:** <!-- mitigation -->

## Open Questions

<!-- Only deferrable unknowns that cannot change requirements, architecture, or task decomposition. Delete if empty. -->
