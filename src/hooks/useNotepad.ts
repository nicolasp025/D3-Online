import { useContext } from "react";
import { NotepadContext } from "../contexts/NotepadContext";

export const useNotepad = () => {
  const context = useContext(NotepadContext);
  if (!context)
    throw new Error("useNotepad must be used within a NotepadProvider");
  return context;
};
