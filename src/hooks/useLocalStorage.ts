import { useEffect, useState } from "react";

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

  /**
   * Store a specified value in the local storage.
   * @param newValue The value to be stored in the local storage.
   */
  const setStoredValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };

  useEffect(() => {
    const listener = (e: StorageEvent) => {
      if (e.key === key) {
        setValue(e.newValue ? JSON.parse(e.newValue) : defaultValue);
      }
    };
    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, [key, defaultValue]);

  /**
   * Clear the value from the local storage.
   */
  const removeKey = () => {
    setValue(defaultValue);
    localStorage.removeItem(key);
  }

  return [value, setStoredValue, removeKey] as const;
};
