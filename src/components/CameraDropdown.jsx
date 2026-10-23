import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

const materias = [
  { nome: "Introdução ao Estudo da Língua Portuguesa I", classe: "bg-[#e040bb]" },
  { nome: "Introdução aos Estudos Clássicos I", classe: "bg-[#6c4fcf]" },
  { nome: "Introdução aos Estudos Literários I", classe: "bg-[#2e7d32]" },
  { nome: "Elementos de Linguística I", classe: "bg-[#e67e22]" },
];

const itemBase =
  "flex items-center gap-2.5 py-[5px] pr-[18px] pl-[5px] border-none rounded-full no-underline font-[inherit] text-sm font-bold text-white cursor-pointer transition-[opacity,transform] duration-150 shadow-[0_4px_16px_rgba(0,0,0,0.3)] hover:opacity-[0.88] hover:scale-[1.01] active:scale-[0.98]";
const iconeItem =
  "w-[46px] h-[46px] rounded-full border-[2.5px] border-white/60 bg-white/20 flex items-center justify-center shrink-0 text-[22px] overflow-hidden";

const CameraDropdown = ({ aberto, onSelecionarMateria }) => {
  return (
    <div className={`${aberto ? "flex" : "hidden"} flex-col gap-2.5 py-4 px-3.5 absolute top-3.5 left-3.5 z-[100] min-w-[300px]`}>
      {materias.map((materia) => (
        <button key={materia.nome} className={`${itemBase} ${materia.classe}`} onClick={onSelecionarMateria}>
          <span className={iconeItem}>📖</span>
          {materia.nome}
        </button>
      ))}

      <Link to="/" className={`${itemBase} bg-[#2979ff]`}>
        <span className={iconeItem}>
          <img src={logo} alt="JOVI Logo" className="w-full h-full object-cover rounded-full block" />
        </span>
        Abrir App
      </Link>
    </div>
  );
};

export default CameraDropdown;