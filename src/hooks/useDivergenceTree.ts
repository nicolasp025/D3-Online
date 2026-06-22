import { useContext } from "react";
import { DivergenceTreeContext } from "../contexts/DivergenceTreeContext";

export const useDivergenceTree = () => {
  const context = useContext(DivergenceTreeContext);
  if (!context)
    throw new Error(
      "useDivergenceTree must be used within a DivergenceTreeProvider",
    );
  return context;
};
