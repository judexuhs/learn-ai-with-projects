export function progressKey(slug) {
  return `ai-project-lab:${slug}:progress`;
}

export function normalizeProgress(value, knownStepIds) {
  if (!Array.isArray(value)) return [];
  const known = new Set(knownStepIds);
  return [...new Set(value.filter((id) => typeof id === 'string' && known.has(id)))];
}

export function completionCount(value, knownStepIds) {
  return normalizeProgress(value, knownStepIds).length;
}

export function nextStepId(value, knownStepIds) {
  const completed = new Set(normalizeProgress(value, knownStepIds));
  return knownStepIds.find((id) => !completed.has(id)) ?? null;
}
