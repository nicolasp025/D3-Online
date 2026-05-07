import { createContext, useContext, useState } from "react";
import type { Divergence } from "../models/divergence";
import { fakeDivergences } from "../fakedata";

type DivergenceContextType = {
  divergences: Divergence[];
  setDivergences: (divergences: Divergence[]) => void;
  selectedDivergence: Divergence | null;
  setSelectedDivergence: (d: Divergence) => void;
};

const DivergenceContext = createContext<DivergenceContextType | null>(null);

export const DivergenceProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [divergences, setDivergences] = useState<Divergence[]>(fakeDivergences);
  const [selectedDivergence, setSelectedDivergence] =
    useState<Divergence | null>(fakeDivergences[0]);

  return (
    <DivergenceContext.Provider
      value={{
        divergences,
        setDivergences,
        selectedDivergence,
        setSelectedDivergence,
      }}
    >
      {children}
    </DivergenceContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useSelectedDivergence = () => {
  const context = useContext(DivergenceContext);
  if (!context)
    throw new Error(
      "useSelectedDivergence must be used within a DivergenceProvider",
    );
  return context;
};
