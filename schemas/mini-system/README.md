# mini-system schema

Use this schema for a project whose system boundary is based on mini. The
project may include only a backend or may span mini backend, mini-admin, a web
frontend, and Flutter clients using mini's generated versioned SDK.

It keeps the stock OpenSpec artifact graph and archive behavior. The content is
specialized for mini boundary ownership, full-stack surface coverage, tasks and
integrations, and the conditional mini architecture gate.

```bash
openspec new change <name> --schema mini-system
openspec schema validate mini-system
```

Set `schema: mini-system` in `openspec/config.yaml`. Project `context` and
artifact `rules` should name the selected mini extensions, actual client
surfaces, commands, and local conventions. Unaffected design rows and
Definition of Done checks are deleted rather than filled with ceremony.
