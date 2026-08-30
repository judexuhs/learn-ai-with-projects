import test from 'node:test';
import assert from 'node:assert/strict';

import { coreConcepts, learningPaths, validateConceptLearning } from './concept-learning.mjs';

test('core learning sequence contains six unique concepts', () => {
  assert.equal(coreConcepts.length, 6);
  assert.equal(new Set(coreConcepts.map((item) => item.slug)).size, 6);
});

test('learning paths are actionable and contain no duplicate concepts within a path', () => {
  assert.equal(learningPaths.length, 4);
  for (const path of learningPaths) {
    assert.ok(path.outcome.length > 0);
    assert.equal(new Set(path.concepts).size, path.concepts.length);
  }
});

test('all referenced slugs exist in the concept dictionary', () => {
  const known = ['model', 'prompt', 'context-window', 'hallucination', 'tool-calling', 'workflow', 'system-prompt', 'evaluation', 'feedback-loop', 'html', 'javascript', 'api', 'json', 'server', 'state', 'deployment', 'citation', 'human-approval', 'partial-regeneration', 'embedding', 'rag', 'agent', 'fine-tuning', 'guardrail', 'observability'];
  assert.deepEqual(validateConceptLearning(known), []);
});
