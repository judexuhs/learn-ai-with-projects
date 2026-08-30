export type ImagePromptResult = { subject: string; composition: string; lighting: string; color: string; style: string; prompt: string; negativePrompt: string };
export function buildAnswerResult(question: string, random?: () => number): { id: string; question: string; answer: string };
export function buildImagePromptResult(input?: { name?: string; width?: number; height?: number }): ImagePromptResult;
export function buildResearchWorkspace(input: { topic: string; audience: string; questions: string[] }): { topic: string; audience: string; questions: string[]; evidence: Array<{ id: string; title: string; sourceType: string; note: string; strength: string; url: string; selected: boolean; demo: boolean }>; outline: string[]; report: string };
export function buildDeck(report: string, title: string): Array<{ id: string; title: string; body: string; type: string }>;
export function buildContentIdeas(articles: Array<{ id: string; title: string; body: string }>): Array<{ id: string; kind: string; title: string; why: string; difference: string; sourceIds: string[] }>;
export function compareDrafts(aiDraft: string, userDraft: string): { confirmed: boolean; observations: string[] };
