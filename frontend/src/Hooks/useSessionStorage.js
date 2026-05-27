// src/Hooks/useSessionStorage.js
import { useState } from "react";

export function useSessionStorage(key, initialData = null) {
  const [Data, setData] = useState(() => {
    try {
      const item = sessionStorage.getItem(key);
      if (!item || item === "undefined" || item === "null") return initialData;
      return JSON.parse(item);
    } catch {
      return initialData;
    }
  });

  const updateSessionStorage = (newData) => {
    const value = typeof newData === "function" ? newData(Data) : newData;
    sessionStorage.setItem(key, JSON.stringify(value));
    setData(value);
  };

  return [Data, updateSessionStorage];
}