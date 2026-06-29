import { createContext, useRef, useState } from "react";

type DivergenceTreeContextType = {
  selectedRow: number | null;
  setSelectedRow: (newValue: number | null) => void;
  selectedRef: React.RefObject<HTMLDivElement | null>;
};

export const DivergenceTreeContext =
  createContext<DivergenceTreeContextType | null>(null);

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
