import type { D3FlowDivergence } from "./divergence";
import type { D3StackFrame } from "./stack";

export type TreeRow = {
  index: number;
  frame: D3StackFrame | null;
  modifiedFrame: D3StackFrame | null;
  hasPreviousInDivergence: boolean;
  hasNextInDivergence: boolean;
  isStateDivergence: boolean;
  flowDivergence: D3FlowDivergence | null;
};
