import type { D3CallStack } from "./stack";

export type D3Divergence = D3StateDivergence | D3FlowDivergence;

type D3AbstractDivergence = {
  id: number;
  displayName: string;
};

export type D3StateDivergence = D3AbstractDivergence & {
  originalPosition: number;
  modifiedPosition: number;
  context: string;
};

export type D3FlowDivergence = D3AbstractDivergence & {
  originalPosition: DivergencePosition;
  modifiedPosition: DivergencePosition;
};

export type DivergencePosition = {
  start: number;
  stop: number | null;
};

export type D3DebugResponse = {
  metadata: { language: string };
  //queries: string[][];
  flowDivergences: D3FlowDivergence[];
  stateDivergences: D3StateDivergence[];
  v1: D3CallStack;
  v2: D3CallStack;
};
