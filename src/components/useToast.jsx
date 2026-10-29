import { useState, useRef, useCallback } from "react";

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

  const ToastEl = toast ? (
    <div
      className={`fixed bottom-[90px] left-1/2 z-[200] -translate-x-1/2 rounded-xl bg-[#12142b] px-[18px] py-3 text-[13px] font-bold text-white transition-[opacity,transform] duration-[250ms] ease ${
        toast.show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      {toast.msg}
    </div>
  ) : null;

  return { mostrarToast, ToastEl };
}