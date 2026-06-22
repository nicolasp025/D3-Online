import { useContext } from "react";
import { ExperimentContext } from "../contexts/ExperimentContext";

export const useExperimentContext = () => {
  const context = useContext(ExperimentContext);
  if (!context)
    throw new Error(
      "useExperimentContext must be used within a ExperimentContextProvider",
    );
  return context;
};
