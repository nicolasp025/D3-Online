import { createContext, useContext, useRef, useState } from "react";

type DivergenceTreeContextType = {
  selectedRow: number | null;
  setSelectedRow: (newValue: number | null) => void;
  selectedRef: React.RefObject<HTMLDivElement>;
};

const DivergenceTreeContext = createContext<DivergenceTreeContextType | null>(
  null,
);

export const DivergenceTreeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [selectedRow, setSelectedRow] = useState<number | null>(null);
  const selectedRef = useRef<HTMLDivElement>(null);

  return (
    <DivergenceTreeContext.Provider
      value={{
        selectedRow,
        setSelectedRow,
        selectedRef,
      }}
    >
      {children}
    </DivergenceTreeContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useDivergenceTree = () => {
  const context = useContext(DivergenceTreeContext);
  if (!context)
    throw new Error(
      "useDivergenceTree must be used within a DivergenceTreeProvider",
    );
  return context;
};
