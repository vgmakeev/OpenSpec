# system-driven schema

This schema keeps the standard OpenSpec lifecycle while giving complex,
multi-surface systems a richer capability contract.

```text
proposal -> specs ─┐
         -> design ├-> tasks -> apply -> archive
                   ┘
```

It is stack-neutral. A mini backend, Flutter application, web client, worker,
integration, or mixed system uses the same artifacts. Stack conventions and
commands belong in project-local `context` and per-artifact `rules` in
`openspec/config.yaml`.

Scenarios support requirements; they do not replace the system contract.
Capability specs express acceptance criteria, invariants, states, public
contracts, workflows, and quality constraints. Stable `AC` IDs are optional
and useful only when tests, releases, repositories, or external documents need
to cite an acceptance criterion.

The task template ends with a compact conditional Definition of Done. OpenSpec
validates artifact structure; tests provide behavioral evidence; project
linters check implementation conventions. No linter is expected to interpret
requirement prose.

OpenSpec archive remains the canonicality mechanism: accepted delta
requirement blocks are merged into living
`openspec/specs/<capability>/spec.md` files.

## Use

```bash
openspec new change <name> --schema system-driven
openspec schema validate system-driven
```

Or make it the project default:

```yaml
# openspec/config.yaml
schema: system-driven

context: |
  Describe the stack, system boundaries, and enduring project conventions.

rules:
  design:
    - Add only the stack-specific design rules that are not already in the schema.
  tasks:
    - Add the project's focused test, lint, and build commands to Definition of Done.
```
