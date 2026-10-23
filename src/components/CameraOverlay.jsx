import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const CameraOverlay = ({ aberto, onCancelar }) => {
  const navigate = useNavigate();
  const [nomeArquivo, setNomeArquivo] = useState("");
  const [salvarApp, setSalvarApp] = useState(true);
  const [salvando, setSalvando] = useState(false);

  if (!aberto) {
    return null;
  }

  const salvar = () => {
    const nome = nomeArquivo.trim() || "AulaX_DataX";

    console.log("Nome do arquivo:", nome);
    console.log("Salvar no App:", salvarApp);

    setSalvando(true);

    setTimeout(() => {
      onCancelar();
      navigate("/");
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-[8px] z-[999] flex items-center justify-center">
      <div className="bg-white rounded-3xl w-[90%] max-w-[340px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,0.45)] animate-popIn">
        <div className="bg-gradient-to-br from-[#1a56db] to-[#5e8aeb] p-5 flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-xl bg-white/25 flex items-center justify-center shrink-0 overflow-hidden">
            <img src={logo} alt="JOVI Logo" className="w-full h-full object-cover block" />
          </div>

          <div>
            <h2 className="text-[17px] font-bold text-white m-0 mb-0.5">JoviClass</h2>
            <p className="text-xs text-white/75 m-0">Salvar anotações em PDF</p>
          </div>
        </div>

        <div className="p-5">
          <p className="text-xs font-bold text-[#888] uppercase tracking-[0.06em] mb-2">Nome do arquivo</p>

          <input
            className="w-full py-3 px-3.5 border-[1.5px] border-[#d1d5db] rounded-xl text-[15px] outline-none mb-2 font-[inherit] focus:border-[#1a56db]"
            type="text"
            placeholder="AulaX_DataX"
            value={nomeArquivo}
            onChange={(e) => setNomeArquivo(e.target.value)}
          />

          <p className="text-xs text-[#aaa] mb-4">O arquivo será salvo em PDF na sua galeria.</p>

          <label className="flex items-center gap-2 text-sm text-[#333] cursor-pointer mb-5">
            <input
              className="w-[18px] h-[18px] accent-[#1a56db] cursor-pointer text-black"
              type="text"
              checked={salvarApp}
              onChange={(e) => setSalvarApp(e.target.checked)}
            />
            Salvar na galeria e no App JoviClass
          </label>

          <div className="flex gap-2.5">
            <button className="flex-1 p-[13px] border-none rounded-full text-[15px] font-bold bg-[#fef2f2] text-[#b91c1c] cursor-pointer font-[inherit]" onClick={onCancelar}>
              Cancelar
            </button>

            <button
              className="flex-[1.4] p-[13px] border-none rounded-full text-[15px] font-bold bg-gradient-to-br from-[#1a56db] to-[#5e8aeb] text-white cursor-pointer font-[inherit] disabled:cursor-not-allowed disabled:opacity-80"
              onClick={salvar}
              disabled={salvando}
            >
              {salvando ? "✔ Salvo!" : "Salvar PDF"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraOverlay;