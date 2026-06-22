import { createContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SettingsContextType = {
  darkMode: boolean;
  setDarkMode: (newValue: boolean) => void;
};

export const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [darkMode, setDarkMode] = useLocalStorage<boolean>(
    "dark-mode",
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return (
    <SettingsContext.Provider
      value={{
        darkMode,
        setDarkMode,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
