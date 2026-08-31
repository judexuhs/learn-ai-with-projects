export type TopicSection = { title: string; paragraphs: string[] };
export type TopicExperiment = {
  title: string;
  time: string;
  setup: string;
  steps: string[];
  observe: string[];
  conclusion: string;
};
export type TopicExample = {
  title: string;
  setup: string;
  before: string;
  after: string;
  insight: string;
};
export type TopicVisual = {
  type: 'flow' | 'layers' | 'compare' | 'bars';
  title: string;
  caption: string;
  items: { label: string; detail: string; value?: number }[];
};
export type Topic = {
  slug: string;
  title: string;
  shortTitle: string;
  category: '原理层' | '应用层' | '项目层';
  question: string;
  takeaway: string;
  intro: string;
  sections: TopicSection[];
  example: TopicExample;
  visual: TopicVisual;
  experiment: TopicExperiment;
  misconceptions: { title: string; explanation: string }[];
  situations: string[];
  relatedProject: { slug: string; title: string; step: string };
  next: string;
};
export type LearningPath = {
  slug: string;
  title: string;
  shortTitle: string;
  description: string;
  outcome: string;
  forWhom: string;
  project: string;
  steps: { topic: string; reason: string; action: string }[];
};
export const topics: Topic[];
export const learningPaths: LearningPath[];
export function getTopic(slug: string): Topic | undefined;
export function getLearningPath(slug: string): LearningPath | undefined;
export function validateLearningContent(knownProjectSlugs: string[]): string[];
