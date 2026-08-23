## Verification Strategy

<!-- What must be proven before merge/release, and which checks are independent of the implementation agent? -->

## Requirement Evidence Matrix

| Trace ID | Risk / contract | Proof layer | Test, command, fixture, or manual evidence | Owner |
|---|---|---|---|---|
| `AC-...` | | | | |

## Pre-Implementation Gates

<!-- Reviewer-owned. An agent must not mark these on the reviewer's behalf. -->

- [ ] Product/domain owner confirms outcomes, scope, invariants, and failure behavior.
- [ ] Architecture reviewer confirms mini boundary choices and ownership.
- [ ] QA/reviewer confirms scenarios cover material success, boundary, and failure cases.
- [ ] Contract owners confirm API/SDK/UI/event compatibility and migration expectations.
- [ ] Security/tenancy review is complete where authorization, secrets, external input, or tenant data is affected.

## Test Plan By Layer

### Registry / Schema / Migration

- <!-- validation, migration, constraints, permissions, compatibility -->

### Service / Domain / State

- <!-- invariants, transitions, transactions, idempotency, concurrency -->

### API / SDK / Admin / Client

- <!-- generated contracts, CRUDL/CustomMethod, UI states, mobile/web compatibility -->

### Task / Integration / Realtime

- <!-- retry, dedup, lock, provider failure, replay, operator and invalidation behavior -->

### End-To-End / Production

- <!-- tracer scenario, canary, metrics/logs, rollback trigger, post-release evidence -->

## Failure And Edge Matrix

| Condition | Expected behavior | Proof |
|---|---|---|
| duplicate/retry | | |
| unauthorized/wrong tenant | | |
| stale/offline client | | |
| provider unavailable/timeout | | |
| partial failure/rollback | | |

## Unresolved Findings

<!-- Blocking findings must be corrected upstream before tasks are generated. Delete when empty. -->

- **BLOCKING:** <!-- artifact/section to correct -->
