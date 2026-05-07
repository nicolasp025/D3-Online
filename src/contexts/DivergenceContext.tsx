import { createContext, useContext, useState } from "react";
import type { Divergence, FlowDivergence } from "../models/divergence";
import { fakeDivergences } from "../fakedata";

type DivergenceContextType = {
  divergences: Divergence[];
  setDivergences: (divergences: Divergence[]) => void;
  selectedDivergence: Divergence | null;
  setSelectedDivergence: (d: Divergence) => void;
  isFlowDivergence: (d: Divergence) => boolean;
};

const DivergenceContext = createContext<DivergenceContextType | null>(null);

export const DivergenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [divergences, setDivergences] = useState<Divergence[]>(fakeDivergences);
  const [selectedDivergence, setSelectedDivergence] =
    useState<Divergence | null>(null);

  /**
   * Returns true if the specified divergence is a FlowDivergence, false otherwise.
   * If the divergence has a unique position, it should be a StateDivergence.
   * @param d The specified divergence.
   * @returns A boolean.
   */
  const isFlowDivergence = (d: Divergence): d is FlowDivergence => {
    return !("position" in d);
  };

  return (
    <DivergenceContext.Provider
      value={{
        divergences,
        setDivergences,
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
