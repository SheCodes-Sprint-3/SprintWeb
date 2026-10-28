const Overlay = ({ cancelar, confirmar }) => {
  return (
    <div
      id="overlay"
      className="fixed inset-0 z-[100] hidden items-center justify-center bg-[rgba(10,12,40,0.45)] p-5 [&.show]:flex"
    >
      <div className="w-full max-w-[320px] rounded-2xl bg-white p-[22px] text-center shadow-[var(--sombra-forte)]">
        <p className="mb-4 font-bold text-[#12142b]">
          Deseja confirmar esta ação?
        </p>

        <div className="flex gap-2.5">
          <button
            id="cancelBtn"
            className="flex-1 cursor-pointer rounded-[10px] bg-[#eef0f5] p-2.5 text-[13.5px] font-bold text-[#444]"
            onClick={cancelar}
          >
            Cancelar
          </button>

          <button
            id="okBtn"
            className="flex-1 cursor-pointer rounded-[10px] bg-[var(--bg-color1)] p-2.5 text-[13.5px] font-bold text-white"
            onClick={confirmar}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;