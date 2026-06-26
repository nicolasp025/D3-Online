import { useContext } from "react";
import { InspectorContext } from "../contexts/InspectorContext";

export const useInspector = () => {
  const ctx = useContext(InspectorContext);
  if (!ctx) throw new Error("useInspector must be used within provider");
  return ctx;
};