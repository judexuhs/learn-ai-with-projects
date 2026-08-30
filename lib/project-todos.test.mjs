import assert from 'node:assert/strict';
import test from 'node:test';

import { getStepTodos, projectTodos } from './project-todos.mjs';

const projectSteps = {
  'book-of-answers': ['define', 'file', 'generate', 'run', 'customize', 'test', 'publish', 'review'],
  'image-to-prompt': ['prototype', 'architecture', 'schema', 'endpoint', 'upload', 'call', 'edit', 'errors', 'evaluate', 'ship'],
  'research-to-deck': ['brief', 'questions', 'search-plan', 'search', 'evidence', 'outline', 'report', 'fact-check', 'revise', 'story', 'template', 'slides', 'publish'],
  'content-workbench': ['goal', 'structure', 'collect', 'extract', 'sources', 'topics', 'select', 'outline', 'draft', 'revise', 'diff', 'style-profile', 'ship'],
};

test('every project step has a concrete action checklist', () => {
  for (const [projectSlug, stepIds] of Object.entries(projectSteps)) {
    assert.deepEqual(Object.keys(projectTodos[projectSlug]), stepIds);

    for (const stepId of stepIds) {
      const todos = getStepTodos(projectSlug, stepId);
      assert.ok(todos.length >= 3, `${projectSlug}/${stepId} needs at least 3 todos`);
      for (const todo of todos) {
        assert.ok(todo.title.trim().length >= 4, `${projectSlug}/${stepId} has a vague todo title`);
        assert.ok(todo.instruction.trim().length >= 12, `${projectSlug}/${stepId} needs a concrete instruction`);
      }
    }
  }
});

test('the first beginner step covers tool choice and opening a real project', () => {
  const text = JSON.stringify(getStepTodos('book-of-answers', 'define'));
  assert.match(text, /Coding 工具/);
  assert.match(text, /WorkBuddy/);
  assert.match(text, /Codex/);
  assert.match(text, /项目文件夹/);
  assert.match(text, /index\.html/);
});

test('the content workbench preserves human decisions and version learning', () => {
  const text = JSON.stringify(projectTodos['content-workbench']);
  assert.match(text, /相邻选题/);
  assert.match(text, /人工版本/);
  assert.match(text, /风格档案/);
  assert.match(text, /确认/);
});

test('project checklist copy contains no em dash characters', () => {
  assert.doesNotMatch(JSON.stringify(projectTodos), /[—–]/);
});
