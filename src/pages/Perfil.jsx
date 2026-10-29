import { useState } from "react";
import { Link } from "react-router-dom";
import avatarPadrao from "../assets/avatar.png";
import CardPerfil from "../components/CardPerfil";

const CHAVE_PERFIL = "joviclass:perfil";

function lerPerfil() {
  try {
    return JSON.parse(localStorage.getItem(CHAVE_PERFIL)) || {};
  } catch {
    return {};
  }
}

const Perfil = () => {
  const [nome, setNome] = useState(() => lerPerfil().nome ?? "Helena Martins");
  const [curso, setCurso] = useState(() => lerPerfil().curso ?? "Economia · 4º período");
  const [email, setEmail] = useState(() => lerPerfil().email ?? "helena.martins@email.com");
  const [foto, setFoto] = useState(avatarPadrao);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const salvarPerfil = (event) => {
    event.preventDefault();
    localStorage.setItem(CHAVE_PERFIL, JSON.stringify({ nome, curso, email }));
    setModalAberto(false);
  };

  return (
    <>
      <main className="mx-auto w-full max-w-[1100px] flex-1 px-[18px] pt-[22px] pb-10 min-[900px]:px-11 min-[900px]:pt-10">
        <div className="mb-5">
          <h1 className="mb-0.5 text-[1.7rem] font-extrabold text-[#12142b]">
            Perfil
          </h1>
          <p className="mb-5 text-sm text-[var(--bg-color5)]">
            Gerencie seus dados e preferências de estudo.
          </p>
        </div>

        <CardPerfil
          nome={nome}
          curso={curso}
          email={email}
          foto={foto}
          mudarFoto={setFoto}
          editarPerfil={abrirModal}
        />

        <h2 className="mt-[22px] mb-3 text-[1.05rem] font-extrabold text-[#12142b]">
          Suas estatísticas
        </h2>

        <div className="grid grid-cols-2 gap-[14px] min-[560px]:max-[899px]:grid-cols-4">
          <div className="rounded-[var(--raio)] bg-[var(--bg-color2)] p-[18px] text-center shadow-[var(--sombra)]">
            <span className="text-xs font-semibold text-[var(--bg-color5)]">
              Matérias
            </span>
            <p className="mt-1.5 text-[1.7rem] font-extrabold text-[var(--bg-color1)]">
              6
            </p>
          </div>

          <div className="rounded-[var(--raio)] bg-[var(--bg-color2)] p-[18px] text-center shadow-[var(--sombra)]">
            <span className="text-xs font-semibold text-[var(--bg-color5)]">
              Tarefas feitas
            </span>
            <p className="mt-1.5 text-[1.7rem] font-extrabold text-[var(--bg-color1)]">
              48
            </p>
          </div>
        </div>

        <button
          className="mt-[22px] block w-full cursor-pointer rounded-[14px] border border-[#ffd6d6] bg-[#fff5f5] p-[14px] text-sm font-extrabold text-[#e0304a] transition-colors hover:bg-[#ffe9e9]"
          type="button"
          onClick={() => alert("Você saiu da conta.")}
        >
          Sair da conta
        </button>
      </main>

      {modalAberto && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(10,12,40,0.45)] p-5"
          onClick={fecharModal}
        >
          <div
            className="w-full max-w-[380px] rounded-2xl bg-white p-[22px] text-left shadow-[var(--sombra-forte)]"
            onClick={(event) => event.stopPropagation()}
          >
            <h3 className="mb-4 text-[1.05rem] text-[#12142b]">
              Editar perfil
            </h3>

            <form onSubmit={salvarPerfil}>
              <div className="mb-[14px] flex flex-col gap-1.5">
                <label
                  htmlFor="campoNome"
                  className="text-[12.5px] font-bold text-[#444]"
                >
                  Nome completo
                </label>
                <input
                  className="rounded-[10px] border border-[#e2e4f0] bg-[#fafafe] px-3 py-[11px] font-[inherit] text-sm text-[#12142b] focus:border-[var(--bg-color1)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,15,176,0.12)]"
                  type="text"
                  id="campoNome"
                  value={nome}
                  onChange={(event) => setNome(event.target.value)}
                  required
                />
              </div>

              <div className="mb-[14px] flex flex-col gap-1.5">
                <label
                  htmlFor="campoCurso"
                  className="text-[12.5px] font-bold text-[#444]"
                >
                  Curso e período
                </label>
                <input
                  className="rounded-[10px] border border-[#e2e4f0] bg-[#fafafe] px-3 py-[11px] font-[inherit] text-sm text-[#12142b] focus:border-[var(--bg-color1)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,15,176,0.12)]"
                  type="text"
                  id="campoCurso"
                  value={curso}
                  onChange={(event) => setCurso(event.target.value)}
                />
              </div>

              <div className="mb-[14px] flex flex-col gap-1.5">
                <label
                  htmlFor="campoEmail"
                  className="text-[12.5px] font-bold text-[#444]"
                >
                  E-mail
                </label>
                <input
                  className="rounded-[10px] border border-[#e2e4f0] bg-[#fafafe] px-3 py-[11px] font-[inherit] text-sm text-[#12142b] focus:border-[var(--bg-color1)] focus:bg-white focus:outline-none focus:shadow-[0_0_0_3px_rgba(0,15,176,0.12)]"
                  type="email"
                  id="campoEmail"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  required
                />
              </div>

              <div className="flex gap-2.5">
                <button
                  type="button"
                  className="flex-1 cursor-pointer rounded-[10px] bg-[#eef0f5] p-2.5 text-[13.5px] font-bold text-[#444] transition-colors hover:bg-[#e0e3eb]"
                  onClick={fecharModal}
                >
                  Cancelar
                </button>

                <button
                  type="submit"
                  className="flex-1 cursor-pointer rounded-[10px] bg-[var(--bg-color1)] p-2.5 text-[13.5px] font-bold text-white transition-colors hover:bg-[#000c8c]"
                >
                  Salvar alterações
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <nav className="fixed right-0 bottom-0 left-0 z-40 flex items-center justify-around bg-white px-1.5 pt-2 pb-[10px] shadow-[0_-4px_16px_rgba(0,0,0,0.08)] min-[900px]:hidden">
        <Link
          to="/"
          className="flex flex-col items-center gap-[3px] text-[10.5px] font-bold text-[var(--bg-color5)]"
        >
          <span className="text-lg">🏠︎</span>
          <span>Início</span>
        </Link>

        <Link
          to="/materias"
          className="flex flex-col items-center gap-[3px] text-[10.5px] font-bold text-[var(--bg-color5)]"
        >
          <span className="text-lg">📖</span>
          <span>Matérias</span>
        </Link>

        <Link
          to="/camera"
          aria-label="Câmera"
          className="mt-[-26px] flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[var(--bg-color1)] text-xl shadow-[0_8px_18px_rgba(0,15,176,0.4)]"
        >
          <span className="text-xl">📷</span>
        </Link>

        <Link
          to="/calendario"
          className="flex flex-col items-center gap-[3px] text-[10.5px] font-bold text-[var(--bg-color5)]"
        >
          <span className="text-lg">📝</span>
          <span>Tarefas</span>
        </Link>

        <Link
          to="/perfil"
          className="flex flex-col items-center gap-[3px] text-[10.5px] font-bold text-[var(--bg-color1)]"
        >
          <span className="text-lg">👤</span>
          <span>Perfil</span>
        </Link>
      </nav>
    </>
  );
};

export default Perfil;
