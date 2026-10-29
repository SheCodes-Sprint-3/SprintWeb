import { useRef } from "react";
import logoGoogle from "../assets/google-logo.png";
import logoNotion from "../assets/Notion-Logo.png";


const CardPerfil = ({ nome, curso, email, foto, mudarFoto, editarPerfil, conectarGoogle, conectarNotion }) => {
  const inputFotoRef = useRef(null);

  const trocarFoto = () => {
    inputFotoRef.current.click();
  };

  const handleFoto = (event) => {
    const arquivo = event.target.files[0];

    if (arquivo) {
      const imagem = URL.createObjectURL(arquivo);
      mudarFoto(imagem);
    }
  };

  return (
    <section className="flex flex-wrap items-center justify-between gap-[18px] rounded-[22px] bg-[linear-gradient(135deg,var(--grad-inicio),var(--bg-color4)_120%)] p-6 text-white shadow-[var(--sombra-forte)]">
      <div className="flex items-center gap-4">
        <div className="relative h-[76px] w-[76px] shrink-0">
          <img
            src={foto}
            alt={`Foto de perfil de ${nome}`}
            className="h-full w-full rounded-full border-[3px] border-white/70 object-cover"
          />

          <button
            className="absolute -bottom-0.5 -right-0.5 flex h-[26px] w-[26px] items-center justify-center rounded-full border-2 border-white bg-[#34d399] text-[#043b2a] cursor-pointer"
            type="button"
            onClick={trocarFoto}
            aria-label="Trocar foto"
          >
            <svg
              className="h-[13px] w-[13px]"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M4 20h16M13.5 6.5l3 3L8.5 17.5H5.5v-3l8-8Z"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <input
            ref={inputFotoRef}
            type="file"
            accept="image/*"
            hidden
            onChange={handleFoto}
          />
        </div>

        <div>
          <h2 className="text-[1.2rem] font-extrabold">{nome}</h2>
          <span className="block text-[12.5px] opacity-90">{curso}</span>
          <span className="block text-[12.5px] opacity-90">{email}</span>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-[14px]">
        <button
          className="rounded-xl border border-white/40 bg-white/[0.18] px-[18px] py-[10px] text-[13px] font-bold text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/[0.28] cursor-pointer"
          type="button"
          onClick={editarPerfil}
        >
          Editar perfil
        </button>

        <div className="flex items-center gap-2">
          <button
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full bg-white/[0.92] p-0 transition-[transform,box-shadow] duration-200 cursor-pointer"
            type="button"
            title="Conectar Google"
            aria-label="Conectar Google"
            onClick={conectarGoogle}
          >
            <img
              src={logoGoogle}
              alt="Google"
              className="h-[30px] w-[30px] object-contain"
            />
          </button>

          <button
            className="flex h-[38px] w-[38px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/[0.92] p-0 transition-[transform,box-shadow] duration-200 cursor-pointer"
            type="button"
            title="Conectar Notion"
            aria-label="Conectar Notion"
            onClick={conectarNotion}
          >
            <img
              src={logoNotion}
              alt="Notion"
              className="h-[26px] w-auto max-w-none shrink-0"
            />
          </button>
        </div>
      </div>
    </section>
  );
};

export default CardPerfil;