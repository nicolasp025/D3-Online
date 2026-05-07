export type Divergence = {
  id: number;
  description: string;
};

export type StateDivergence = Divergence & {
  position: number;
  originalValue: string;
  modifiedValue: string;
  context: string;
};

export type FlowDivergence = Divergence & {
  originalPosition: {
    start: number;
    end: number | null;
  };
  modifiedPosition: {
    start: number;
    end: number | null;
  };
};
