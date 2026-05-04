export type ExecutionStack = {
  id: number;
  steps: ExecutionStep[];
};

export type ExecutionStep = {
  id: number;
  content: string;
  position: number;
  displayName: string;
};
