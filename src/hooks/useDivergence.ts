import { useContext } from "react";
import { DivergenceContext } from "../contexts/DivergenceContext";

export const useDivergence = () => {
  const context = useContext(DivergenceContext);
  if (!context)
    throw new Error("useDivergence must be used within a DivergenceProvider");
  return context;
};
