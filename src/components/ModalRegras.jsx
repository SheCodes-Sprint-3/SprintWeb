import { useState } from "react";
import ListaRegras from "./ListaRegras";

const ModalRegras = ({ nome, regras, onVoltar, onAceitar }) => {
  const [aceito, setAceito] = useState(false);

  return (
    <div className="fixed inset-0 z-[1200] flex items-center justify-center bg-[rgba(10,12,40,.55)] p-5 backdrop-blur-[2px]">
      <div className="max-h-[90vh] w-full max-w-[480px] overflow-y-auto rounded-3xl bg-white shadow-[0_25px_60px_rgba(0,0,0,.25)]">
        <div className="rounded-t-3xl bg-gradient-to-br from-[#0015d6] to-[#000fb0] px-[26px] pb-[22px] pt-[26px] text-center text-white">
          <span className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-[14px] bg-white/[.18] text-[22px]">📋</span>
          <h2 className="text-[1.15rem] font-extrabold tracking-tight">Regras da comunidade</h2>
          <p className="mx-auto mt-2 max-w-[340px] text-[13px] leading-[1.55] text-white/90">
            Antes de entrar em <strong className="text-white">{nome}</strong>, leia e aceite as regras abaixo.
          </p>
        </div>

        <div className="px-[26px] pb-[26px] pt-6">
          <ListaRegras regras={regras} />

          <label
            className={`mt-5 flex cursor-pointer items-start gap-2.5 rounded-xl border px-3.5 py-3 text-[12.5px] leading-normal text-[#333] transition ${
              aceito ? "border-[#34d399] bg-[#a7f3d0]" : "border-[#e0e4ff] bg-[#eef0ff]"
            }`}
          >
            <input
              type="checkbox"
              checked={aceito}
              onChange={(e) => setAceito(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[#000fb0]"
            />
            <span>Li e concordo com as regras desta comunidade.</span>
          </label>

          <div className="mt-[22px] flex gap-2.5">
            <button type="button" onClick={onVoltar} className="flex-1 rounded-xl bg-[#f0f0f5] p-[13px] text-[13.5px] font-bold text-[#555] hover:bg-[#e4e4ec]">
              Voltar
            </button>
            <button
              type="button"
              disabled={!aceito}
              onClick={onAceitar}
              className="flex-1 rounded-xl bg-gradient-to-br from-[#0015d6] to-[#1466ff] p-[13px] text-[13.5px] font-bold text-white shadow-[0_7px_18px_rgba(0,15,176,.25)] transition enabled:hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:bg-none disabled:bg-[#c7cbe0] disabled:shadow-none"
            >
              Entrar na comunidade
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalRegras