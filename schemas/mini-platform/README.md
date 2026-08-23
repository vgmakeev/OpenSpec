# mini-platform schema

This schema adapts OpenSpec to systems built with mini, mini-admin, generated
SDKs, custom web/mobile clients, tasks, integrations, and optional extension
packages.

Its artifact graph is:

```text
proposal -> specs ─┐
         -> design ├-> tasks -> apply
                   ┘
```

This is the standard OpenSpec artifact lifecycle and dependency graph. The
schema intentionally customizes the capability spec template, not the flow.

The important distinction in that template is that scenarios support a
requirement; they do not replace the system contract. Capability specs can
express outcomes, invariants, states, interfaces, workflows, and quality
constraints. Requirement bodies may include structured state, contract,
permission, delivery, compatibility, or limit tables before their scenarios.

Acceptance criteria may use stable `AC` IDs when tests, repositories, releases,
or external documents need to cite them. Other requirement kinds do not need an
ID taxonomy merely for graph tooling. The task template includes a compact,
conditional Definition of Done with the mini architecture linter; it does not
add another artifact or change the OpenSpec lifecycle.

## Use

Set the schema when creating a change:

```bash
openspec new change <name> --schema mini-platform
```

Or make it the project default:

```yaml
# openspec/config.yaml
schema: mini-platform
```

Validate the packaged schema with:

```bash
openspec schema validate mini-platform
```
