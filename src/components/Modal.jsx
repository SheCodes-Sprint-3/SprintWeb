const Modal = ({ onFechar, largura = "max-w-[420px]", children }) => {
  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/40 p-3"
      onClick={onFechar}
    >
      <div
        className={`relative max-h-[90dvh] w-full ${largura} overflow-y-auto rounded-2xl bg-white p-6 shadow-[0_10px_40px_rgba(0,0,0,.25)]`}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onFechar}
          className="absolute right-3 top-3 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#eee] text-[13px] text-[#555]"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;