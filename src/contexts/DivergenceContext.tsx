import { createContext, useContext, useState } from "react";
import type { D3FlowDivergence, D3StateDivergence } from "../models/divergence";
import { fakeFlowDivergences, fakeStateDivergences } from "../fakedata";

type DivergenceContextType = {
  flowDivergences: D3FlowDivergence[];
  setFlowDivergences: (divergences: D3FlowDivergence[]) => void;

  stateDivergences: D3StateDivergence[];
  setStateDivergences: (divergences: D3StateDivergence[]) => void;
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

  return (
    <DivergenceContext.Provider
      value={{
        flowDivergences,
        setFlowDivergences,

        stateDivergences,
        setStateDivergences,
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
