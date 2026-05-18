import { createContext, useContext, useState } from "react";
import { modifiedStack, originalStack } from "../fakedata";
import type { ExecutionStack } from "../models/stack";

type StacksContextType = {
  originalStack: ExecutionStack | null;
  modifiedStack: ExecutionStack | null;
  originalPosition: number;
  setOriginalPosition: (newPosition: number) => void;
  modifiedPosition: number;
  setModifiedPosition: (newPosition: number) => void;
  updateTablesPositions: (newPosition: number) => void;
  increaseOriginalPosition: () => void;
  increaseModifiedPosition: () => void;
  decreaseOriginalPosition: () => void;
  decreaseModifiedPosition: () => void;
};

const StacksContext = createContext<StacksContextType | null>(null);

export const StacksProvider = ({ children }: { children: React.ReactNode }) => {
  const [originalPosition, setOriginalPosition] = useState(0);
  const [modifiedPosition, setModifiedPosition] = useState(0);

  /**
   * Sets a new position for both steps tables.
   * @param newPosition The new position for both tables.
   */
  const updateTablesPositions = (newPosition: number) => {
    setOriginalPosition(newPosition);
    setModifiedPosition(newPosition);
  };

  /**
   * Increases the original stack selected position.
   */
  const increaseOriginalPosition = () => {
    if (originalPosition < originalStack.steps.length - 1) {
      setOriginalPosition(originalPosition + 1);
    }
  };

  /**
   * Increases the modified stack selected position.
   */
  const increaseModifiedPosition = () => {
    if (modifiedPosition < modifiedStack.steps.length - 1) {
      setModifiedPosition(modifiedPosition + 1);
    }
  };

  /**
   * Decreases the original stack selected position.
   */
  const decreaseOriginalPosition = () => {
    if (originalPosition > 0) {
      setOriginalPosition(originalPosition - 1);
    }
  };

  /**
   * Decreases the modified stack selected position.
   */
  const decreaseModifiedPosition = () => {
    if (modifiedPosition > 0) {
      setModifiedPosition(modifiedPosition - 1);
    }
  };

  return (
    <StacksContext.Provider
      value={{
        originalStack,
        modifiedStack,
        originalPosition,
        setOriginalPosition,
        modifiedPosition,
        setModifiedPosition,
        updateTablesPositions,
        increaseOriginalPosition,
        increaseModifiedPosition,
        decreaseOriginalPosition,
        decreaseModifiedPosition,
      }}
    >
      {children}
    </StacksContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStacks = () => {
  const context = useContext(StacksContext);
  if (!context)
    throw new Error("useStacks must be used within a StacksProvider");
  return context;
};
