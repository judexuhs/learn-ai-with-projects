import assert from 'node:assert/strict';
import test from 'node:test';

import {
  buildAnswerResult,
  buildContentIdeas,
  buildDeck,
  buildImagePromptResult,
  buildResearchWorkspace,
  compareDrafts,
} from './demo-workflows.mjs';

test('book result preserves the question and returns a useful answer', () => {
  const result = buildAnswerResult('我应该现在开始吗？', () => 0);
  assert.equal(result.question, '我应该现在开始吗？');
  assert.ok(result.answer.length >= 6);
  assert.ok(result.id);
});

test('image analysis always follows the UI schema', () => {
  const result = buildImagePromptResult({ name: 'city-night.jpg', width: 1600, height: 900 });
  assert.deepEqual(Object.keys(result), ['subject', 'composition', 'lighting', 'color', 'style', 'prompt', 'negativePrompt']);
  assert.match(result.composition, /横向/);
  assert.match(result.prompt, /city night/);
});

test('research workspace keeps evidence citations connected to the report', () => {
  const workspace = buildResearchWorkspace({ topic: 'AI 如何改变内容团队', audience: '内容负责人', questions: ['哪些环节最先改变？'] });
  assert.ok(workspace.evidence.length >= 6);
  assert.ok(workspace.report.includes('[1]'));
  assert.ok(workspace.outline.length >= 4);
});

test('deck is derived from an approved report', () => {
  const slides = buildDeck('第一段结论。\n\n第二段证据。\n\n第三段建议。', 'AI 内容团队');
  assert.ok(slides.length >= 4);
  assert.equal(slides[0].title, 'AI 内容团队');
});

test('content ideas explain provenance and difference', () => {
  const ideas = buildContentIdeas([{ id: 'a1', title: 'AI 写作的证据链', body: '内容团队需要保存来源并确认判断。' }]);
  assert.equal(ideas.length, 5);
  assert.ok(ideas.every((idea) => idea.sourceIds.includes('a1')));
  assert.ok(ideas.every((idea) => idea.difference.length > 0));
});

test('draft comparison requires explicit confirmation before preferences are persisted', () => {
  const diff = compareDrafts('我们可以充分利用 AI 来提升效率。', '先保留证据，再让 AI 加速整理。');
  assert.equal(diff.confirmed, false);
  assert.ok(diff.observations.length > 0);
});
