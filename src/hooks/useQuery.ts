import { QueryContext } from "./../contexts/QueryContext";
import { useContext } from "react";

export const useQuery = () => {
  const context = useContext(QueryContext);
  if (!context) throw new Error("useQuery must be used within a QueryProvider");
  return context;
};
