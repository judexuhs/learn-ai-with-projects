const topicLinks: Record<string, string> = {
  model: 'how-llms-generate', token: 'token-and-context', 'context-window': 'token-and-context',
  context: 'provide-context', prompt: 'write-a-good-prompt', 'system-prompt': 'write-a-good-prompt',
  hallucination: 'hallucination', api: 'api-and-server', server: 'api-and-server', 'request-response': 'api-and-server',
  'tool-calling': 'tool-use', 'web-search': 'tool-use', workflow: 'workflow-and-agent',
  agent: 'workflow-and-agent', automation: 'workflow-and-agent', 'human-approval': 'iterate-with-ai',
  'human-in-the-loop': 'iterate-with-ai', 'partial-regeneration': 'iterate-with-ai',
  evaluation: 'verify-ai-output', 'evaluation-set': 'verify-ai-output', 'visual-qa': 'verify-ai-output',
  citation: 'verify-ai-output', evidence: 'verify-ai-output', 'source-credibility': 'verify-ai-output',
  json: 'structured-output', 'structured-output': 'structured-output', multimodal: 'multimodal-input',
  rag: 'rag-knowledge-base', embedding: 'rag-knowledge-base', cost: 'model-cost-latency',
  latency: 'model-cost-latency', 'cost-control': 'model-cost-latency', privacy: 'privacy-and-permissions',
  guardrail: 'privacy-and-permissions',
};

export function topicHrefForConcept(slug: string) {
  const topic = topicLinks[slug];
  return topic ? `/concepts/${topic}` : undefined;
}
