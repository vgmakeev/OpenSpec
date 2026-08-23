## 1. Tracer Slice - <!-- smallest end-to-end proof of the design -->

- [ ] 1.1 `[TRACE-ID]` <!-- repository/package: implementation step; verify with exact command or observable evidence -->
- [ ] 1.2 `[TRACE-ID]` <!-- contract/client/admin step; verify ... -->

## 2. Capability Slice - <!-- independently useful or verifiable increment -->

- [ ] 2.1 `[TRACE-ID]` <!-- implementation and verification -->
- [ ] 2.2 `[P] [TRACE-ID]` <!-- genuinely parallel work in a different ownership/file boundary; verification -->

## 3. Rollout And Evidence

- [ ] 3.1 `[TRACE-ID]` <!-- migration/compatibility/rollout step; verify rollback readiness -->
- [ ] 3.2 `[TRACE-ID]` <!-- run final gates and capture release/production evidence -->

<!-- Rules:
     - Every task uses - [ ] N.M syntax and names its proof.
     - Group by vertical slice, not by database/backend/frontend departments.
     - Cite stable capability Trace IDs, not the temporary change name.
     - Delete unused sample groups and do not retain placeholder tasks. -->
