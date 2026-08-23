# Designing complex mini systems with OpenSpec

The `mini-platform` schema is for changes that may span generated backend and
admin behavior, custom admin workflows, web/mobile SDK clients, business
services, background work, integrations, realtime delivery, and data/API
migrations.

## What is customized

The artifact lifecycle remains the standard OpenSpec flow: proposal and specs,
design, tasks, apply, and archive all retain their stock dependencies and
semantics. The customization is deliberately concentrated in the capability
spec template.

The default OpenSpec schema correctly treats a spec as a behavioral contract,
but its minimal template makes scenarios the dominant visible structure.
GitHub Spec Kit adds user stories, functional requirements, entities,
measurable outcomes, technical context, constitution gates, contracts, and
story-oriented tasks. Those are useful ingredients, but a user-story-first
shape is still incomplete for multi-surface systems where state ownership,
asynchronous work, compatibility, and operator behavior are first-class
concerns.

The mini schema combines the strongest parts without turning one document into
a giant implementation plan:

| Concern | Durable home |
|---|---|
| Problem, proposed changes, capabilities, impact | `proposal.md` |
| Outcomes, invariants, states, public contracts, workflows, quality constraints | capability specs |
| Technical approach and decisions | `design.md` |
| Implementation checklist and its verification | `tasks.md` |

## Requirement model

Every normative requirement has a stable ID and one semantic kind:

| Prefix | Meaning | Example |
|---|---|---|
| `AC` | Observable outcome | order cancellation is visible to the customer |
| `RULE` | Domain or quality invariant | a captured payment cannot be silently discarded |
| `STATE` | Lifecycle and transitions | pending -> cancelled with explicit guards |
| `CONTRACT` | API, SDK, UI, event, or file boundary | versioned mobile cancellation command |
| `FLOW` | Multi-step orchestration | cancel, compensate provider, publish status |

The requirement body can contain tables for contracts or state machines. It
still includes at least one scenario because examples and failure cases are the
best way to expose ambiguity and provide candidate tests.

This shape remains compatible with OpenSpec delta/archive behavior: arbitrary
top-level sections are kept out of delta specs, while the complete requirement
block is the durable merge unit.

## Mini design routing

The design must choose the smallest framework boundary that owns the behavior:

```text
persisted state -> Resource + CRUDL
summary read -> ResourceRuntime.aggregate
domain decision/transaction -> service
callable non-CRUDL behavior -> CustomMethod
protocol escape hatch -> classified raw FastAPI adapter
work after the request -> task
provider/inbound event -> External boundary + connection/trigger
ordinary operator state -> generated mini-admin
workflow-heavy operator tool -> custom mini-admin using the shared SDK
web/mobile client -> generated, version-pinned SDK contract
```

This routing is design guidance for mini projects, not an extra artifact or a
change to OpenSpec orchestration. Authorization, row scopes, tenancy,
idempotency, cache invalidation, observability, realtime, API/SDK compatibility,
migrations, and rollback belong in requirements when externally normative and
in design when they are implementation choices.

## Lifecycle ownership

OpenSpec owns proposal, review, apply, sync, and archive. graph-ba is optional
trace infrastructure only:

```text
OpenSpec requirement ID
  <- IMPLEMENTS - source/registry/service/UI contract
  <- COVERS - test definition
  <- VERIFIES - executed or manual evidence
  <- TRACES_TO - supporting artifact
```

There is no graph-ba proposal folder, task list, change gate, acceptance, or
archive lifecycle in this model.
