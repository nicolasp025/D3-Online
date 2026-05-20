import { createContext, useContext, useState } from "react";
import { modifiedStack, originalStack } from "../fakedata";
import type { D3CallStack } from "../models/stack";

type StacksContextType = {
  originalStack: D3CallStack | null;
  modifiedStack: D3CallStack | null;
  originalPosition: number;
  setOriginalPosition: (newPosition: number) => void;
  modifiedPosition: number;
  setModifiedPosition: (newPosition: number) => void;
  updateTablesPositions: (newPosition: number) => void;
  increaseOriginalPosition: () => void;
  increaseModifiedPosition: () => void;
  decreaseOriginalPosition: () => void;
  decreaseModifiedPosition: () => void;
  handleFrameMoving: (e: React.KeyboardEvent) => void;
};

const StacksContext = createContext<StacksContextType | null>(null);

export const StacksProvider = ({ children }: { children: React.ReactNode }) => {
  const [originalPosition, setOriginalPosition] = useState(0);
  const [modifiedPosition, setModifiedPosition] = useState(0);

  /**
   * Sets a new position for both frames tables.
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
    if (originalPosition < originalStack.frames.length - 1) {
      setOriginalPosition(originalPosition + 1);
    }
  };

  /**
   * Increases the modified stack selected position.
   */
  const increaseModifiedPosition = () => {
    if (modifiedPosition < modifiedStack.frames.length - 1) {
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

  /**
   * Increases or decreases the table position when any arrow is pressed.
   * @param event The keyboard event.
   */
  const handleFrameMoving = (event: React.KeyboardEvent) => {
    event.preventDefault();
    switch (event.key) {
      case "ArrowUp":
        if (originalPosition > modifiedPosition) {
          decreaseOriginalPosition();
        } else if (modifiedPosition > originalPosition) {
          decreaseModifiedPosition();
        } else {
          decreaseOriginalPosition();
          decreaseModifiedPosition();
        }
        break;
      case "ArrowDown":
        increaseOriginalPosition();
        increaseModifiedPosition();
        break;
      case "ArrowRight":
        increaseModifiedPosition();
        break;
      case "ArrowLeft":
        increaseOriginalPosition();
        break;
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
        handleFrameMoving,
      }}
    >
      {children}
    </StacksContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useStacks = () => {
  const context = useContext(StacksContext);
  if (!context) throw new Error("useStacks must be used within a StacksProvider");
  return context;
};
