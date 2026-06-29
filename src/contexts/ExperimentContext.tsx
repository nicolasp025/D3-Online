import { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

type ExperimentContextType = {
  consent: boolean;
  setConsent: (newValue: boolean) => void;
  url1: string | null;
  setUrl1: (newValue: string) => void;
  url2: string | null;
  setUrl2: (newValue: string) => void;
  userID: string | null;
  setUserID: (newValue: string) => void;
  clearAll: () => void;
};

export const ExperimentContext = createContext<ExperimentContextType | null>(
  null,
);

export const ConsentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [consent, setConsent, clearConsent] = useLocalStorage<boolean>(
    "exp-consent",
    false,
  );
  const [url1, setUrl1, clearUrl1] = useLocalStorage<string | null>(
    "url1",
    null,
  );
  const [url2, setUrl2, clearUrl2] = useLocalStorage<string | null>(
    "url2",
    null,
  );
  const [userID, setUserID, clearUserID] = useLocalStorage<string | null>(
    "userID",
    null,
  );

  /**
   * Clear all stored values in localStorage related to the experiment.
   */
  const clearAll = () => {
    clearConsent();
    clearUrl1();
    clearUrl2();
    clearUserID();
  };

  return (
    <ExperimentContext.Provider
      value={{
        consent,
        setConsent,
        url1,
        setUrl1,
        url2,
        setUrl2,
        userID,
        setUserID,
        clearAll,
      }}
    >
      {children}
    </ExperimentContext.Provider>
  );
};
