import test from 'node:test';
import assert from 'node:assert/strict';

import { learningPaths, topics, validateLearningContent } from './learning-content.mjs';

test('ships eighteen substantial topics across three learning layers', () => {
  assert.equal(topics.length, 18);
  assert.equal(new Set(topics.map((topic) => topic.slug)).size, topics.length);
  assert.equal(topics.filter((topic) => topic.category === '原理层').length, 6);
  assert.equal(topics.filter((topic) => topic.category === '应用层').length, 6);
  assert.equal(topics.filter((topic) => topic.category === '项目层').length, 6);

  for (const topic of topics) {
    assert.ok(topic.title.length > 0);
    assert.ok(topic.question.length > 0);
    assert.ok(topic.takeaway.length >= 12);
    assert.ok(topic.sections.length >= 4, `${topic.slug} needs at least four teaching sections`);
    assert.ok(topic.sections.every((section) => section.paragraphs.length >= 1));
    assert.ok(topic.experiment.steps.length >= 3, `${topic.slug} needs a hands-on experiment`);
    assert.ok(topic.experiment.observe.length >= 2);
    assert.ok(topic.misconceptions.length >= 2);
    assert.ok(topic.situations.length >= 2);
  }
});

test('three goal paths only reference existing topics and projects', () => {
  assert.equal(learningPaths.length, 3);
  assert.deepEqual(validateLearningContent(['book-of-answers', 'image-to-prompt', 'research-to-deck']), []);

  for (const path of learningPaths) {
    assert.ok(path.outcome.length > 0);
    assert.ok(path.steps.length >= 4);
    assert.equal(new Set(path.steps.map((step) => step.topic)).size, path.steps.length);
  }
});

test('visible learning copy contains no typographic dash separators', () => {
  const copy = JSON.stringify({ topics, learningPaths });
  assert.equal(copy.includes('—'), false);
  assert.equal(copy.includes('–'), false);
});
