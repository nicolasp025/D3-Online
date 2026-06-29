import { createContext, useState } from "react";

type NotepadContextType = {
  content: string;
  setContent: (newValue: string) => void;
};

export const NotepadContext = createContext<NotepadContextType | null>(null);

export const NotepadProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
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
