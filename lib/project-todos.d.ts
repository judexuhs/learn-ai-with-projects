export type ProjectTodo = {
  title: string;
  instruction: string;
  recommendation?: string;
};

export const projectTodos: Record<string, Record<string, ProjectTodo[]>>;
export function getStepTodos(projectSlug: string, stepId: string): ProjectTodo[];

