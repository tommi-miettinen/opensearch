import { useState, useEffect } from "react";

/**
 * useDebounce hook
 *
 * @param {any} value - value to debounce
 * @param {number} delay - debounce delay in milliseconds defaults to 100ms
 * @return {any} - debounced value
 */
const useDebounce = (value: any, delay = 100) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};

export default useDebounce;
