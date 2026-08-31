import test from 'node:test';
import assert from 'node:assert/strict';

import { recommendProject } from './project-routing.mjs';

test('chat users always start with the answer book', () => {
  const result = recommendProject('chat', 'content-system');
  assert.equal(result.projectSlug, 'book-of-answers');
  assert.equal(result.entry, 'setup');
  assert.deepEqual(result.route, ['book-of-answers', 'image-to-prompt', 'content-workbench']);
});

test('coding-tool users start the answer book after tool setup', () => {
  const result = recommendProject('coding-tool', 'ai-tool');
  assert.equal(result.projectSlug, 'book-of-answers');
  assert.equal(result.entry, 'define');
});

test('people who shipped a webpage move to a real model call', () => {
  const result = recommendProject('web-product', 'research-workflow');
  assert.equal(result.projectSlug, 'image-to-prompt');
  assert.deepEqual(result.route, ['image-to-prompt', 'research-to-deck']);
});

test('API users branch by the system they want to build', () => {
  assert.equal(recommendProject('ai-api', 'research-workflow').projectSlug, 'research-to-deck');
  assert.equal(recommendProject('ai-api', 'content-system').projectSlug, 'content-workbench');
  assert.equal(recommendProject('ai-api', 'ai-tool').projectSlug, 'image-to-prompt');
});

test('unknown answers are rejected instead of silently misclassifying a user', () => {
  assert.throws(() => recommendProject('unknown', 'ai-tool'));
  assert.throws(() => recommendProject('chat', 'unknown'));
});
