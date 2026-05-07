export type Divergence = StateDivergence | FlowDivergence;

type AbstractDivergence = {
  id: number;
  description: string;
};
  
export type StateDivergence = AbstractDivergence & {
  position: number;
  originalValue: string;
  modifiedValue: string;
  context: string;
};

export type FlowDivergence = AbstractDivergence & {
  originalPosition: {
    start: number;
    end: number | null;
  };
  modifiedPosition: {
    start: number;
    end: number | null;
  };
};
