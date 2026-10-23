import { FaPersonRunning, FaCameraRotate, FaCircleDot, FaCircle } from "react-icons/fa6";
import logo from "../assets/logo.png";

const CameraHeader = ({ onLogoClick }) => {
  const icone = "text-[18px] opacity-85 max-[360px]:text-[15px]";

  return (
    <div className="bg-black pt-3.5 px-[18px] pb-2.5 flex items-center justify-between shrink-0">
      <button
        className="w-11 h-11 p-0 border-none rounded-full bg-gradient-to-br from-[#2979ff] to-[#5e8aeb] flex items-center justify-center cursor-pointer shadow-[0_2px_12px_rgba(41,121,255,0.5)] shrink-0 overflow-hidden"
        onClick={onLogoClick}
      >
        <img src={logo} alt="JOVI Logo" className="w-full h-full object-cover rounded-full block" />
      </button>

      <div className="flex items-center gap-[18px] text-white max-[430px]:gap-3.5 max-[360px]:gap-2.5">
        <FaPersonRunning className={icone} />
        <FaCircleDot className={icone} />

        <span className="text-[15px] font-bold text-[#f5a623] tracking-[0.08em] max-[360px]:text-[13px]">ZEISS</span>
        
        <FaCameraRotate className={icone} />
        <FaCircle className={icone} />
      </div>
    </div>
  );
};

export default CameraHeader;