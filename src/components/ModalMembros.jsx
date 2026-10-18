import { useCallback, useEffect, useState } from "react";
import Modal from "./Modal";

const btnAzul = "whitespace-nowrap rounded-[10px] bg-[#1466ff] px-4 py-2.5 text-[13px] font-bold text-white transition hover:bg-[#0a4fd1]";
const btnIcone = "rounded-md px-1.5 py-0.5 text-sm text-[#aaa] transition hover:bg-[#fff0f0] hover:text-[#e53e3e]";

const ModalMembros = ({ comunidade, api, criador, admin, onFechar, onAlterou }) => {
  const [membros, setMembros] = useState(null);
  const [erro, setErro] = useState("");
  const [email, setEmail] = useState("");
  const [copiado, setCopiado] = useState(false);

  const base = `/comunidades/${encodeURIComponent(comunidade.id)}`;
  const link = `${window.location.origin}/comunidades?convite=${encodeURIComponent(comunidade.id)}`;
  const publica =
    String(comunidade.privacidade || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .trim()
      .toLowerCase() === "publica";

  const carregar = useCallback(async () => {
    try {
      const dados = await api(`${base}/membros`);
      setMembros(dados.membros || []);
      setErro("");
    } catch (e) {
      setErro(e.message);
    }
  }, [base, api]);

  useEffect(() => {
    carregar();
  }, [carregar]);

  async function executar(acao) {
    try {
      await acao();
      await carregar();
      onAlterou();
    } catch (e) {
      alert(e.message);
    }
  }

  function adicionar() {
    const valor = email.trim().toLowerCase();
    if (!valor.includes("@")) return alert("Digite um e-mail válido.");
    executar(async () => {
      await api(`${base}/membros`, { method: "POST", body: { email: valor } });
      setEmail("");
      alert("Membro adicionado!");
    });
  }

  const remover = (m) =>
    confirm(`Remover ${m.nome || "este membro"} da comunidade?`) &&
    executar(() => api(`${base}/membros/${encodeURIComponent(m.id)}`, { method: "DELETE" }));

  const alternarAdmin = (m) =>
    executar(() =>
      api(`${base}/membros/${encodeURIComponent(m.id)}/administrador`, {
        method: m.administrador ? "DELETE" : "PUT",
      })
    );

  async function copiar() {
    try {
      await navigator.clipboard.writeText(link);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 3000);
    } catch {
    }
  }

  return (
    <Modal onFechar={onFechar} largura="max-w-[520px]">
      <h2 className="mb-1.5 text-xl font-extrabold text-[#1a1a2e]">Gestão de membros</h2>

      {publica && (
        <div>
          <p className="mb-5 text-sm text-[#888]">Compartilhe o link para outra pessoa entrar na comunidade.</p>
          <div className="mb-2.5 flex flex-col gap-2.5 md:flex-row">
            <input
              readOnly
              value={link}
              className="min-w-0 flex-1 rounded-[10px] border border-[#ddd] bg-[#f8f9fc] px-3.5 py-2.5 text-[13px] text-[#444] focus:border-[#1466ff] focus:outline-none"
            />
            <button type="button" onClick={copiar} className={btnAzul}>Copiar</button>
          </div>
          <div className="mb-1 min-h-5 text-[13px] font-semibold text-[#2ecc71]">{copiado && "✅ Link copiado!"}</div>
        </div>
      )}

      {admin && (
        <div>
          <div className="my-4 flex items-center gap-3 text-[13px] text-[#aaa] before:h-px before:flex-1 before:bg-[#eee] after:h-px after:flex-1 after:bg-[#eee]">
            <span>ou adicione por e-mail</span>
          </div>
          <label htmlFor="emailConvite" className="mb-2 block text-sm font-semibold text-[#333]">E-mail do estudante:</label>
          <div className="mb-5 flex flex-col gap-2.5 md:flex-row">
            <input
              id="emailConvite"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="exemplo@email.com"
              className="min-w-0 flex-1 rounded-[10px] border border-[#ddd] px-3.5 py-2.5 text-sm focus:border-[#1466ff] focus:outline-none"
            />
            <button type="button" onClick={adicionar} className={btnAzul}>Adicionar</button>
          </div>
        </div>
      )}

      <p className="mb-2.5 text-[13px] font-bold text-[#555]">Membros da comunidade:</p>
      {erro && <p>{erro}</p>}
      {!erro && membros === null && <p>Carregando membros...</p>}
      {membros?.length === 0 && <p>Nenhum membro encontrado.</p>}

      {membros?.map((m) => {
        const podeRemover = !m.criador && (criador || (admin && !m.administrador));
        return (
          <div key={m.id} className="mb-2 flex flex-col justify-between gap-3 rounded-[10px] bg-[#f8f9fc] px-3.5 py-2.5 md:flex-row md:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-2 text-sm text-[#333]">
              <span className="text-base">👤</span>
              <div className="min-w-0 [overflow-wrap:anywhere]">
                <strong>{m.nome || "Usuário"}</strong>
                <div>{m.email || ""}</div>
              </div>
            </div>
            <div className="flex shrink-0 flex-wrap items-center gap-1.5">
              <span className="rounded-full bg-[#fff3cd] px-2.5 py-[3px] text-[11px] font-bold text-[#856404]">
                {m.criador ? "Criador" : m.administrador ? "Administrador" : "Membro"}
              </span>
              {criador && !m.criador && (
                <button type="button" className={btnIcone} onClick={() => alternarAdmin(m)}>
                  {m.administrador ? "− Admin" : "+ Admin"}
                </button>
              )}
              {podeRemover && (
                <button type="button" title="Remover membro" className={btnIcone} onClick={() => remover(m)}>✕</button>
              )}
            </div>
          </div>
        );
      })}
    </Modal>
  );
}

export default ModalMembros;