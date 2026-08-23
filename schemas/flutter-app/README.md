# flutter-app schema

Use this schema for a standalone Flutter application that does not use mini as
its backend framework. It keeps the standard OpenSpec artifact graph and
archive semantics while specializing design coverage and Definition of Done
for Flutter experience, state, data, platform, and delivery concerns.

```bash
openspec new change <name> --schema flutter-app
openspec schema validate flutter-app
```

Set `schema: flutter-app` in `openspec/config.yaml` and use project `context`
or artifact `rules` for the actual state library, routing, monorepo tooling,
flavors, supported platforms, and test/build commands. The schema deliberately
does not prescribe Riverpod, Bloc, GoRouter, Melos, FVM, or a folder layout.
