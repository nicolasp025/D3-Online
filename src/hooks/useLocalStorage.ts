import { useState } from "react";

/**
 * Returns a pair of getter/setter that permits to store info in local storage.
 * @param key The key in the local storage.
 * @param defaultValue The default value if not found in storage.
 * @returns The key in the local storage if possible, else the default value
 */
export const useLocalStorage = <T>(key: string, defaultValue: T) => {
  const [value, setValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  });

  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  return [value, setStoredValue] as const;
};
