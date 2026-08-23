import { afterEach, describe, expect, it } from 'vitest';
import { promises as fs } from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { loadSchema } from '../../src/core/artifact-graph/schema.js';
import { buildUpdatedSpec, findSpecUpdates } from '../../src/core/specs-apply.js';

const SCHEMAS = ['mini-system', 'flutter-app'] as const;

const RICH_DELTA = [
  '## Purpose',
  '',
  'Defines a durable cancellation contract across client, API, and asynchronous work.',
  '',
  '## ADDED Requirements',
  '',
  '### Requirement: Cancel order command',
  '',
  '**Kind:** contract',
  '',
  '**Surfaces:** api, sdk, mobile',
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

describe('project-specific packaged schemas', () => {
  let tempDir: string | undefined;

  afterEach(async () => {
    if (tempDir) await fs.rm(tempDir, { recursive: true, force: true });
    tempDir = undefined;
  });

  it.each(SCHEMAS)('%s preserves the standard OpenSpec artifact graph', async (name) => {
    const schema = loadSchema(path.join(process.cwd(), 'schemas', name, 'schema.yaml'));

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
    expect(schema.artifacts.find((artifact) => artifact.id === 'specs')?.instruction).not.toContain(
      'graph-ba'
    );
    expect(schema.artifacts.find((artifact) => artifact.id === 'specs')?.instruction).toContain(
      'Every behavior-changing'
    );

    const proposal = await fs.readFile(
      path.join(process.cwd(), 'schemas', name, 'templates', 'proposal.md'),
      'utf8'
    );
    expect(proposal).toContain('## Desired Outcomes');
    expect(proposal).toContain('### Non-Goals');
  });

  it('specializes mini full-stack coverage and Definition of Done', async () => {
    const design = await fs.readFile(
      path.join(process.cwd(), 'schemas', 'mini-system', 'templates', 'design.md'),
      'utf8'
    );
    const tasks = await fs.readFile(
      path.join(process.cwd(), 'schemas', 'mini-system', 'templates', 'tasks.md'),
      'utf8'
    );

    expect(design).toContain('## Mini System Coverage');
    expect(design).toContain('| Operator UI: registry-driven / custom mini-admin |');
    expect(design).toContain('| Client contracts: generated SDK / web / Flutter |');
    expect(tasks).toContain('uv run mini registry-context lint <target>');
  });

  it('specializes standalone Flutter coverage and Definition of Done', async () => {
    const design = await fs.readFile(
      path.join(process.cwd(), 'schemas', 'flutter-app', 'templates', 'design.md'),
      'utf8'
    );
    const tasks = await fs.readFile(
      path.join(process.cwd(), 'schemas', 'flutter-app', 'templates', 'tasks.md'),
      'utf8'
    );

    expect(design).toContain('## Flutter App Coverage');
    expect(design).toContain('| Data: API / storage / offline / sync / conflicts / cache |');
    expect(design).not.toContain('mini-admin');
    expect(tasks).toContain('flutter analyze');
    expect(tasks).not.toContain('uv run mini');
  });

  it('preserves rich requirement blocks when OpenSpec applies a delta', async () => {
    tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'openspec-project-schemas-'));
    const changeDir = path.join(tempDir, 'openspec', 'changes', 'cancel-order');
    const mainSpecsDir = path.join(tempDir, 'openspec', 'specs');
    const source = path.join(changeDir, 'specs', 'orders', 'cancellation', 'spec.md');
    await fs.mkdir(path.dirname(source), { recursive: true });
    await fs.writeFile(source, RICH_DELTA);

    const [update] = await findSpecUpdates(changeDir, mainSpecsDir);
    const result = await buildUpdatedSpec(update, 'cancel-order', { silent: true });

    expect(result.counts.added).toBe(1);
    expect(result.rebuilt).toContain('### Requirement: Cancel order command');
    expect(result.rebuilt).toContain('**Surfaces:** api, sdk, mobile');
    expect(result.rebuilt).toContain('| cancellable order | accepted result | — |');
    expect(result.rebuilt).toContain('#### Scenario: Terminal order is rejected');
  });
});
