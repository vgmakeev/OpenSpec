import { afterEach, describe, expect, it } from 'vitest';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadSchema } from '../../src/core/artifact-graph/schema.js';
import { buildUpdatedSpec, findSpecUpdates } from '../../src/core/specs-apply.js';

const RICH_DELTA = [
  '## Purpose',
  '',
  'Defines a durable order cancellation contract across API, SDK, admin, and workers.',
  '',
  '## ADDED Requirements',
  '',
  '### Requirement: Cancel order command',
  '',
  '**Kind:** contract',
  '',
  '**Surfaces:** api, sdk, admin, mobile',
  '',
  '**Owner:** orders',
  '',
  'The system SHALL expose one versioned cancellation command.',
  '',
  '| Input | Output | Error |',
  '|---|---|---|',
  '| cancellable order | accepted result | — |',
  '| terminal order | — | stable conflict |',
  '',
  '#### Scenario: Terminal order is rejected',
  '',
  '- **WHEN** a client cancels an order in a terminal state',
  '- **THEN** the command returns the stable conflict without changing state',
  '',
].join('\n');

describe('system-driven packaged schema', () => {
  let tempDir: string | undefined;

  afterEach(async () => {
    if (tempDir) await fs.rm(tempDir, { recursive: true, force: true });
    tempDir = undefined;
  });

  it('preserves the standard OpenSpec artifact graph', async () => {
    const schema = loadSchema(path.join(process.cwd(), 'schemas', 'system-driven', 'schema.yaml'));

    expect(schema.artifacts.map((artifact) => artifact.id)).toEqual([
      'proposal',
      'specs',
      'design',
      'tasks',
    ]);
    expect(schema.artifacts.find((artifact) => artifact.id === 'design')?.requires).toEqual([
      'proposal',
    ]);
    expect(schema.artifacts.find((artifact) => artifact.id === 'tasks')?.requires).toEqual([
      'specs',
      'design',
    ]);
    expect(schema.apply?.requires).toEqual(['tasks']);
    expect(schema.apply?.tracks).toBe('tasks.md');
    expect(schema.artifacts.find((artifact) => artifact.id === 'tasks')?.instruction).toContain(
      'openspec validate <change> --strict'
    );
    expect(schema.artifacts.find((artifact) => artifact.id === 'tasks')?.instruction).not.toContain(
      'uv run mini'
    );
    expect(schema.artifacts.find((artifact) => artifact.id === 'specs')?.instruction).not.toContain(
      'graph-ba'
    );
    expect(schema.artifacts.find((artifact) => artifact.id === 'specs')?.instruction).toContain(
      'Every behavior-changing OpenSpec change must add or modify at least one'
    );

    const proposalTemplate = await fs.readFile(
      path.join(process.cwd(), 'schemas', 'system-driven', 'templates', 'proposal.md'),
      'utf8'
    );
    const designTemplate = await fs.readFile(
      path.join(process.cwd(), 'schemas', 'system-driven', 'templates', 'design.md'),
      'utf8'
    );
    expect(proposalTemplate).toContain('## Desired Outcomes');
    expect(proposalTemplate).toContain('### Non-Goals');
    expect(designTemplate).toContain('## System Coverage');
    expect(designTemplate).toContain('| Operator and administrative interfaces |');
    expect(designTemplate).toContain('| Client applications and public contracts |');
    expect(designTemplate).not.toContain('mini-admin');
  });

  it('preserves rich requirement metadata and contract tables when applying a delta', async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'openspec-system-driven-'));
    const changeDir = path.join(tempDir, 'openspec', 'changes', 'cancel-order');
    const mainSpecsDir = path.join(tempDir, 'openspec', 'specs');
    const source = path.join(changeDir, 'specs', 'orders', 'cancellation', 'spec.md');
    await fs.mkdir(path.dirname(source), { recursive: true });
    await fs.writeFile(source, RICH_DELTA);

    const [update] = await findSpecUpdates(changeDir, mainSpecsDir);
    const result = await buildUpdatedSpec(update, 'cancel-order', { silent: true });

    expect(result.counts.added).toBe(1);
    expect(result.rebuilt).toContain('### Requirement: Cancel order command');
    expect(result.rebuilt).toContain('**Surfaces:** api, sdk, admin, mobile');
    expect(result.rebuilt).toContain('| cancellable order | accepted result | — |');
    expect(result.rebuilt).toContain('#### Scenario: Terminal order is rejected');
  });
});
