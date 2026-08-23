# Designing complex systems with OpenSpec

The `system-driven` schema is for changes that may span domain state,
administrative or operator interfaces, web/mobile clients, APIs and SDKs,
background work, integrations, realtime delivery, and data or contract
migrations. It is deliberately independent of any framework.

## What is customized

The artifact lifecycle remains the standard OpenSpec flow. Proposal, specs,
design, tasks, apply, and archive retain their stock dependencies and
semantics; only the expected content is richer.

| Concern | Durable home |
|---|---|
| Problem, outcomes, scope/non-goals, capabilities, impact | `proposal.md` |
| Acceptance, invariants, states, public contracts, workflows, quality | capability specs |
| System coverage, technical approach, decisions, risks | `design.md` |
| Implementation steps, verification, Definition of Done | `tasks.md` |

The design uses six conditional coverage rows: domain/data/state, application
behavior/APIs, operator/admin interfaces, client/public contracts,
async/external work, and delivery/evolution. Authors delete unaffected rows and
sections. This makes omissions visible without turning every design into a
full-system questionnaire.

## Requirement model

Every normative requirement has one semantic kind:

| Kind | Meaning |
|---|---|
| `acceptance` | Binary observable condition for accepting the capability |
| `invariant` | Domain, authorization, consistency, or safety rule |
| `state` | Lifecycle states, transitions, guards, and effects |
| `contract` | API, SDK, UI, event, file, provider, or CLI boundary |
| `workflow` | Ordered behavior across components or time |
| `quality` | Measurable reliability, performance, compatibility, privacy, or operability constraint |

Each requirement has `Kind`, affected `Surfaces`, an accountable `Owner`, a
normative SHALL/MUST statement, and at least one WHEN/THEN scenario. The body
may add state, contract, permission, delivery, compatibility, or limit tables.

Every behavior-changing change adds or modifies at least one acceptance
requirement. Stable `AC-*` IDs are optional and should be introduced only when
other artifacts need a durable citation. Other requirement kinds do not need
an ID taxonomy for trace tooling.

This remains compatible with OpenSpec archive because the complete requirement
block is the durable merge unit. Accepted deltas are merged into living specs
under `openspec/specs/`; proposal, design, and tasks remain change history.

## Project profiles, not more forks

Project configuration supplies the technology-specific layer. `context` is
injected into all artifacts, while `rules` apply only to the named artifact.
They guide authors and agents; they are not executable semantic validators.

A mini project can add its boundary routing and architecture command:

```yaml
schema: system-driven

context: |
  Backend and admin use mini; public clients use the generated versioned SDK.

rules:
  design:
    - Route persisted/admin state through Resource and CRUDL, domain decisions through services, non-CRUDL calls through CustomMethod, and work outside the request through tasks. Use custom mini-admin only for workflow-heavy operator tools.
  tasks:
    - For affected backend boundaries include the enforce-level mini architecture lint; state N/A for client-only or documentation changes.
```

A Flutter-only project uses the same schema with different rules:

```yaml
schema: system-driven

context: |
  This is a Flutter client with offline-first state and versioned remote APIs.

rules:
  design:
    - When affected, cover navigation, state ownership, offline/sync behavior, platform channels, accessibility, and API compatibility.
  tasks:
    - Include focused Flutter tests and `flutter analyze`; add platform builds only for affected targets.
```

No separate fork is needed. A project may vendor the schema under
`openspec/schemas/system-driven/` to pin its version while continuing to use
the standard OpenSpec CLI.

## Definition of Done and traceability

The generic Definition of Done requires strict OpenSpec validation, evidence
for acceptance criteria, and focused checks. Migration, compatibility,
rollout, operator visibility, and documentation checks are conditional.
Project rules add stack linters and build commands.

OpenSpec does not ask a stack linter to parse requirement prose: structure,
behavior, and implementation architecture are separate evidence layers.
Traceability tools such as graph-ba are optional projections. They may connect
the few stable acceptance IDs that need cross-repository evidence, but they do
not own proposal, task, gate, or archive lifecycle.
