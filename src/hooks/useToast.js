import { useState, useRef, useCallback, useEffect } from "react";

export function useToast() {
  const [toast, setToast] = useState(null);
  const timerRef = useRef(null);

  const mostrarToast = useCallback((msg) => {
    setToast({ msg, show: true });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      setToast((t) => (t ? { ...t, show: false } : t));
    }, 2500);
  }, []);

  useEffect(() => () => clearTimeout(timerRef.current), []);

  return { toast, mostrarToast };
}