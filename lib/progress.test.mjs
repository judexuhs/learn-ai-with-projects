import test from 'node:test';
import assert from 'node:assert/strict';

import { completionCount, nextStepId, normalizeProgress, progressKey } from './progress.mjs';

const known = ['define', 'build', 'publish'];

test('normalizeProgress keeps only known unique step ids', () => {
  assert.deepEqual(normalizeProgress(['define', 'wrong', 'define', 2, 'publish'], known), ['define', 'publish']);
});

test('completionCount counts valid completed steps', () => {
  assert.equal(completionCount(['define', 'wrong'], known), 1);
});

test('nextStepId finds the first unfinished step', () => {
  assert.equal(nextStepId(['define'], known), 'build');
  assert.equal(nextStepId(known, known), null);
});

test('progressKey is scoped to a project slug', () => {
  assert.equal(progressKey('book-of-answers'), 'ai-project-lab:book-of-answers:progress');
});
