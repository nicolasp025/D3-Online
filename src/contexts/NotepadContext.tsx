import { createContext, useContext, useState } from "react";

type NotepadContextType = {
  content: string;
  setContent: (newValue: string) => void;
};

const NotepadContext = createContext<NotepadContextType | null>(null);

export const NotepadProvider = ({ children }: { children: React.ReactNode }) => {
  const [content, setContent] = useState<string>("");

  return (
    <NotepadContext.Provider
      value={{
        content,
        setContent,
      }}
    >
      {children}
    </NotepadContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useNotepad = () => {
  const context = useContext(NotepadContext);
  if (!context) throw new Error("useNotepad must be used within a NotepadProvider");
  return context;
};
