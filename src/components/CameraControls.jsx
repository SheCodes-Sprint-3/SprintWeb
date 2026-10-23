import { FaImage, FaRotate } from "react-icons/fa6";

const CameraControls = ({ onScan, processando }) => {
  const modo = "cursor-pointer tracking-[0.01em] transition-colors duration-200 text-sm max-[430px]:text-[13px] max-[360px]:text-[11px]";

  return (
    <div className="bg-black pt-2.5 pb-7 px-0 shrink-0">
      <div className="flex justify-center gap-[22px] pt-1.5 pb-3.5 max-[430px]:gap-4 max-[360px]:gap-2.5">
        <span className={`${modo} font-medium text-white/55`}>Noite</span>
        <span className={`${modo} font-medium text-white/55`}>Retrato</span>
        <span className={`${modo} font-bold text-[#f5a623]`}>Foto</span>
        <span className={`${modo} font-medium text-white/55`}>Vídeo</span>
        <span className={`${modo} font-medium text-white/55`}>Microfilme</span>
      </div>

      <div className="flex items-center justify-around px-[30px]">
        <button className="w-[52px] h-[52px] rounded-[10px] overflow-hidden border-none bg-white/[0.08] text-white text-[22px] cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-white/[0.18]">
          <FaImage />
        </button>

        <button
          className="w-20 h-20 rounded-full border-4 border-white/85 bg-transparent cursor-pointer flex items-center justify-center transition-transform duration-150 p-0 active:scale-[0.93] disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={onScan}
          disabled={processando}
        >
          <span className="w-[65px] h-[65px] rounded-full bg-white block border-2 border-black/[0.08]"></span>
        </button>

        <button className="w-[52px] h-[52px] rounded-xl border-none bg-white/10 text-white text-[22px] cursor-pointer flex items-center justify-center transition-colors duration-200 hover:bg-white/[0.18]">
          <FaRotate />
        </button>
      </div>
    </div>
  );
};

export default CameraControls;