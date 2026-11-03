import { useState } from "react";
import avatarPadrao from "../assets/avatar.png";
import CardPerfil from "../components/CardPerfil";
import Toast from "../components/Toast";
import { useToast } from "../hooks/useToast";
import useAuth from "../hooks/useAuth";
import usePerfil from "../hooks/usePerfil";
import useLocalStorage from "../hooks/useLocalStorage";

const Perfil = () => {
  const { toast, mostrarToast } = useToast();
  const { logout } = useAuth();
  const { perfil, salvarPerfil } = usePerfil();

  const [materias] = useLocalStorage("materias", []);
  const [tarefas] = useLocalStorage("joviclass:tarefas", []);
  const tarefasFeitas = tarefas.filter((t) => t.concluida).length;

  const [nome, setNome] = useState(perfil.nome);
  const [curso, setCurso] = useState(perfil.curso);
  const [email, setEmail] = useState(perfil.email);
  const [foto, setFoto] = useState(avatarPadrao);
  const [modalAberto, setModalAberto] = useState(false);

  const abrirModal = () => {
    setNome(perfil.nome);
    setCurso(perfil.curso);
    setEmail(perfil.email);
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const salvar = (event) => {
    event.preventDefault();
    salvarPerfil({ nome: nome.trim(), curso: curso.trim(), email: email.trim() });
    setModalAberto(false);
    mostrarToast("✅ Perfil atualizado!");
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
          nome={perfil.nome || "Visitante"}
          curso={perfil.curso || "Curso não informado"}
          email={perfil.email}
          foto={foto}
          mudarFoto={setFoto}
          editarPerfil={abrirModal}
          conectarGoogle={() => mostrarToast("Google ainda não está integrado.")}
          conectarNotion={() => mostrarToast("Notion ainda não está integrado.")}
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
              {materias.length}
            </p>
          </div>

          <div className="rounded-[var(--raio)] bg-[var(--bg-color2)] p-[18px] text-center shadow-[var(--sombra)]">
            <span className="text-xs font-semibold text-[var(--bg-color5)]">
              Tarefas feitas
            </span>
            <p className="mt-1.5 text-[1.7rem] font-extrabold text-[var(--bg-color1)]">
              {tarefasFeitas}
            </p>
          </div>
        </div>

        <button
          className="mt-[22px] block w-full cursor-pointer rounded-[14px] border border-[#ffd6d6] bg-[#fff5f5] p-[14px] text-sm font-extrabold text-[#e0304a] transition-colors hover:bg-[#ffe9e9]"
          type="button"
          onClick={logout}
        >
          Sair da conta
        </button>
      </main>

      <Toast toast={toast} />

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

            <form onSubmit={salvar}>
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
                  placeholder="Ex.: Engenharia de Software · 1º ano"
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
    </>
  );
};

export default Perfil;