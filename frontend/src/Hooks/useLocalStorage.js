import { useState } from 'react';

export function useLocalStorage(key, initialData = null) {
  const [value, setValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      if (item === null || item === 'undefined' || item === 'null') return initialData;
      return JSON.parse(item);
    } catch (e) {
      return initialData;
    }
  });

  const setLocalStorage = (newValue) => {
    const resolved = typeof newValue === 'function' ? newValue(value) : newValue;
    try {
      localStorage.setItem(key, JSON.stringify(resolved));
    } catch (e) {
      // ignore write errors (e.g., storage full or privacy mode)
    }
    setValue(resolved);
  };

  return [value, setLocalStorage];
}
