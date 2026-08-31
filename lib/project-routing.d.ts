export type EvidenceId = 'chat' | 'coding-tool' | 'web-product' | 'ai-api';
export type GoalId = 'small-product' | 'ai-tool' | 'research-workflow' | 'content-system';
export type ProjectSlug = 'book-of-answers' | 'image-to-prompt' | 'research-to-deck' | 'content-workbench';

export type RoutingOption<T extends string> = { id: T; label: string; description: string };
export type ProjectProfile = { number: string; title: string; time: string; api: string; output: string };
export type ProjectRecommendation = {
  evidence: EvidenceId;
  goal: GoalId;
  projectSlug: ProjectSlug;
  entry: string;
  stageLabel: string;
  reason: string;
  route: ProjectSlug[];
  project: ProjectProfile;
};

export const evidenceLevels: RoutingOption<EvidenceId>[];
export const goalOptions: RoutingOption<GoalId>[];
export const projectProfiles: Record<ProjectSlug, ProjectProfile>;
export function recommendProject(evidence: EvidenceId, goal: GoalId): ProjectRecommendation;
