# mini-platform schema

This schema adapts OpenSpec to systems built with mini, mini-admin, generated
SDKs, custom web/mobile clients, tasks, integrations, and optional extension
packages.

Its artifact graph is:

```text
proposal -> specs -> design -> verification -> tasks -> apply
```

The important distinction is that scenarios support a requirement; they do not
replace the system contract. Capability specs can express outcomes, invariants,
states, interfaces, workflows, and quality constraints. The design then maps
those durable guarantees to mini-native implementation boundaries, and the
verification plan creates an independent gate before task generation.

Stable Trace IDs (`AC`, `RULE`, `STATE`, `CONTRACT`, and `FLOW`) belong to the
capability specs. graph-ba may index links from code/tests/evidence to those IDs,
but it does not own the OpenSpec change lifecycle.

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
