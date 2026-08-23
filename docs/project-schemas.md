# Project-specific schemas with the OpenSpec flow

This fork provides two schemas and does not replace OpenSpec's lifecycle:

| Schema | Project boundary |
|---|---|
| `mini-system` | A mini-based system; optionally backend, mini-admin, web frontend, Flutter client, workers, and integrations |
| `flutter-app` | A standalone Flutter application with no assumption that its backend uses mini |

Both use the same artifact graph:

```text
proposal -> specs ─┐
         -> design ├-> tasks -> apply -> archive
                   ┘
```

Archive remains the canonicality mechanism: accepted delta requirement blocks
are merged into living `openspec/specs/<capability>/spec.md` files. Proposal,
design, and tasks remain the history of an individual change.

## Shared specification contract

The two schemas deliberately share the durable requirement model:

| Kind | Meaning |
|---|---|
| `acceptance` | Binary observable condition for accepting the capability |
| `invariant` | Domain, authorization, consistency, privacy, or safety rule |
| `state` | Lifecycle states, transitions, guards, and observable effects |
| `contract` | Public UI, API, SDK, event, storage, file, or platform boundary |
| `workflow` | Ordered behavior across components or time |
| `quality` | Measurable reliability, performance, accessibility, compatibility, privacy, or operability constraint |

Each normative requirement has `Kind`, affected `Surfaces`, an accountable
`Owner`, a SHALL/MUST statement, and at least one WHEN/THEN scenario. Structured
state, contract, permission, offline/sync, delivery, error, limit, and
compatibility tables are added when they remove ambiguity.

Every behavior-changing change adds or modifies at least one acceptance
requirement. Stable `AC-*` IDs are optional and introduced only when tests,
releases, repositories, or external documents need durable citations. Other
requirements do not receive IDs merely for graph tooling.

## `mini-system`

The mini schema checks six conditional design areas:

- backend state and reads through Resource, CRUDL, and aggregate;
- domain behavior and API through services, FSM, CustomMethod, or exceptional raw adapters;
- registry-driven or custom mini-admin;
- generated SDK contracts and web/Flutter clients;
- tasks, schedules, integrations, and external boundaries;
- realtime/cache/migration/compatibility and delivery evolution.

The Definition of Done includes mini's enforce-level architecture lint only
when backend, registry, service, task, or integration boundaries are affected.
It does not parse or validate OpenSpec prose.

## `flutter-app`

The standalone Flutter schema checks experience/navigation, domain and state,
API/storage/offline/sync, platform capabilities, accessibility/localization,
and build/release evolution. It avoids prescribing a state library, router,
folder layout, FVM, or monorepo tool.

Its Definition of Done includes focused unit/widget/integration/golden tests
as applicable, `flutter analyze`, and conditional platform builds,
accessibility, localization, compatibility, analytics, and rollout evidence.

## Project configuration

Choose exactly one schema in `openspec/config.yaml` and add only facts that are
specific to the repository:

```yaml
schema: mini-system # or flutter-app

context: |
  Supported surfaces, stack choices, public contracts, and enduring constraints.

rules:
  design:
    - Add a repository-specific architecture rule only when the schema does not already cover it.
  tasks:
    - Use this repository's exact focused test and build commands.
```

`context` and `rules` guide artifact generation; they are not executable
semantic validators. OpenSpec validates artifact structure, tests and evidence
validate behavior, and stack tools validate implementation conformance.
graph-ba remains an optional trace projection and owns no change lifecycle.
