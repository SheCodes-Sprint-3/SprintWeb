const Toast = ({ toast })=> {
  if (!toast) return null;

  return (
    <div
      className={`fixed bottom-[90px] left-1/2 z-[200] -translate-x-1/2 rounded-xl bg-[#12142b] px-[18px] py-3 text-[13px] font-bold text-white transition-[opacity,transform] duration-[250ms] ease ${
        toast.show
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-5 opacity-0"
      }`}
    >
      {toast.msg}
    </div>
  );
}

export default Toast;