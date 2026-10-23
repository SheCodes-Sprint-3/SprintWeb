import { FaWandMagicSparkles } from "react-icons/fa6";

const CameraZoom = () => {
  const opt = "py-0.5 px-2 rounded-[20px] cursor-pointer tracking-[0.02em] transition-colors duration-200";

  return (
    <div className="absolute bottom-[18px] left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[rgba(30,30,30,0.72)] backdrop-blur-[10px] rounded-[30px] py-1.5 px-3.5">

      <span className={`${opt} text-sm font-semibold text-white/65`}>0.6</span>
      <span className={`${opt} text-[15px] font-extrabold text-[#f5a623]`}>1×</span>
      <span className={`${opt} text-sm font-semibold text-white/65`}>2</span>
      <button className="bg-white/15 border-none text-white w-[30px] h-[30px] rounded-full ml-1 cursor-pointer flex items-center justify-center text-[13px]">
        <FaWandMagicSparkles />
      </button>
      
    </div>
  );
};

export default CameraZoom;