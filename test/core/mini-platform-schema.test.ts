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
  '### Requirement: [CONTRACT-orders-cancel-v1] Cancel order command',
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

describe('mini-platform packaged schema', () => {
  let tempDir: string | undefined;

  afterEach(async () => {
    if (tempDir) await fs.rm(tempDir, { recursive: true, force: true });
    tempDir = undefined;
  });

  it('preserves the standard OpenSpec artifact graph', () => {
    const schema = loadSchema(path.join(process.cwd(), 'schemas', 'mini-platform', 'schema.yaml'));

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
  });

  it('preserves rich requirement metadata and contract tables when applying a delta', async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'openspec-mini-platform-'));
    const changeDir = path.join(tempDir, 'openspec', 'changes', 'cancel-order');
    const mainSpecsDir = path.join(tempDir, 'openspec', 'specs');
    const source = path.join(changeDir, 'specs', 'orders', 'cancellation', 'spec.md');
    await fs.mkdir(path.dirname(source), { recursive: true });
    await fs.writeFile(source, RICH_DELTA);

    const [update] = await findSpecUpdates(changeDir, mainSpecsDir);
    const result = await buildUpdatedSpec(update, 'cancel-order', { silent: true });

    expect(result.counts.added).toBe(1);
    expect(result.rebuilt).toContain(
      '### Requirement: [CONTRACT-orders-cancel-v1] Cancel order command'
    );
    expect(result.rebuilt).toContain('**Surfaces:** api, sdk, admin, mobile');
    expect(result.rebuilt).toContain('| cancellable order | accepted result | — |');
    expect(result.rebuilt).toContain('#### Scenario: Terminal order is rejected');
  });
});
