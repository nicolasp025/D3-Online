import { createContext, useContext, useState } from "react";
import type {
  D3Divergence,
  D3FlowDivergence,
  D3StateDivergence,
} from "../models/divergence";
import { fakeFlowDivergences, fakeStateDivergences } from "../fakedata";

type DivergenceContextType = {
  flowDivergences: D3FlowDivergence[];
  setFlowDivergences: (divergences: D3FlowDivergence[]) => void;

  stateDivergences: D3StateDivergence[];
  setStateDivergences: (divergences: D3StateDivergence[]) => void;

  selectedDivergence: D3Divergence | null;
  setSelectedDivergence: (d: D3Divergence) => void;

  isFlowDivergence: (d: D3Divergence) => boolean;
};

const DivergenceContext = createContext<DivergenceContextType | null>(null);

export const DivergenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [flowDivergences, setFlowDivergences] =
    useState<D3FlowDivergence[]>(fakeFlowDivergences);

  const [stateDivergences, setStateDivergences] =
    useState<D3StateDivergence[]>(fakeStateDivergences);

  const [selectedDivergence, setSelectedDivergence] =
    useState<D3Divergence | null>(null);

  /**
   * Returns true if the specified divergence is a FlowDivergence, false otherwise.
   * If the divergence has a unique position, it should be a StateDivergence.
   * @param d The specified divergence.
   * @returns A boolean.
   */
  const isFlowDivergence = (d: D3Divergence): d is D3FlowDivergence => {
    return !("context" in d);
  };

  return (
    <DivergenceContext.Provider
      value={{
        flowDivergences,
        setFlowDivergences,

        stateDivergences,
        setStateDivergences,

        selectedDivergence,
        setSelectedDivergence,

        isFlowDivergence,
      }}
    >
      {children}
    </DivergenceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDivergence = () => {
  const context = useContext(DivergenceContext);
  if (!context)
    throw new Error("useDivergence must be used within a DivergenceProvider");
  return context;
};
