import { createContext, useContext, useEffect } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type SettingsContextType = {
    darkMode: boolean;
    setDarkMode: (newValue: boolean) => void;
};

const SettingsContext = createContext<SettingsContextType | null>(null);

export const SettingsProvider = ({ children }: { children: React.ReactNode }) => {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>("dark-mode", window.matchMedia("(prefers-color-scheme: dark)").matches);

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

// eslint-disable-next-line react-refresh/only-export-components
export const useSettings = () => {
    const context = useContext(SettingsContext);
    if (!context) throw new Error("useSettings must be used within a SettingsProvider");
    return context;
};
