import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import FormularioComunidade from "../components/FormularioComunidade";
import ModalMembros from "../components/ModalMembros";
import ModalRegras from "../components/ModalRegras";
import ListaRegras from "../components/ListaRegras";
import SalaArquivos from "../components/SalaArquivos";

const API_BASE = `http://${window.location.hostname}:3000`;

async function apiRemota(caminho, { body, ...opcoes } = {}) {
  const init = { credentials: "include", ...opcoes };
  if (body instanceof FormData) {
    init.body = body;
  } else if (body !== undefined) {
    init.headers = { "Content-Type": "application/json" };
    init.body = JSON.stringify(body);
  }
  const resposta = await fetch(`${API_BASE}${caminho}`, init);
  const dados = await resposta.json().catch(() => ({}));
  if (!resposta.ok) {
    const erro = new Error(dados.erro || "Não foi possível concluir a ação.");
    erro.status = resposta.status;
    throw erro;
  }
  return dados;
}

const USAR_BACKEND = false;

const novoId = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

function apiLocal(caminho, { method = "GET", body } = {}) {
  const CHAVE = "joviclass_db";
  let db;
  try {
    db = JSON.parse(localStorage.getItem(CHAVE)) || { comunidades: [] };
  } catch {
    db = { comunidades: [] };
  }
  const salvar = () => {
    try {
      localStorage.setItem(CHAVE, JSON.stringify(db));
    } catch {
      throw Object.assign(new Error("Sem espaço no navegador. Tente uma foto menor."), { status: 507 });
    }
  };
  const erro = (msg, status = 400) => Object.assign(new Error(msg), { status });
  const eu = { id: "local", nome: "Você", email: "voce@local.com" };

  const [recurso, id, sub, subId, subSub] = caminho.split("/").filter(Boolean).map(decodeURIComponent);
  const com = db.comunidades.find((c) => c.id === id);
  const ehAdminLocal = (c, mid) => c.administradores.map(String).includes(String(mid));

  if (recurso === "auth") return { autenticado: true, usuario: eu };
  if (recurso === "materias") return { materias: [] };
  if (recurso !== "comunidades") throw erro("Rota inexistente.", 404);

  if (!id) {
    if (method === "POST") {
      const nova = { ...body, id: novoId(), criadorId: eu.id, administradores: [eu.id], membros: [eu] };
      db.comunidades.push(nova);
      salvar();
      return { comunidade: nova };
    }
    return { comunidades: db.comunidades };
  }

  if (!com) throw erro("Comunidade não encontrada.", 404);

  if (!sub) {
    if (method === "PUT") {
      Object.assign(com, body);
      salvar();
      return { comunidade: com };
    }
    if (method === "DELETE") {
      db.comunidades = db.comunidades.filter((c) => c.id !== id);
      salvar();
      return {};
    }
  }

  if (sub === "pastas") return { pastas: [] };

  if (sub === "entrar" || sub === "sair") {
    com.membros = com.membros.filter((m) => m.id !== eu.id);
    if (sub === "entrar") com.membros.push(eu);
    salvar();
    return {};
  }

  if (sub === "membros") {
    if (method === "GET") {
      return {
        membros: com.membros.map((m) => ({
          ...m,
          criador: String(m.id) === String(com.criadorId),
          administrador: ehAdminLocal(com, m.id),
        })),
      };
    }
    if (method === "POST" && !subId) {
      if (com.membros.some((m) => m.email === body.email)) throw erro("Esse e-mail já é membro.");
      com.membros.push({ id: novoId(), nome: body.email.split("@")[0], email: body.email });
    } else if (subSub === "administrador") {
      com.administradores = com.administradores.filter((a) => String(a) !== String(subId));
      if (method === "PUT") com.administradores.push(subId);
    } else if (method === "DELETE") {
      com.membros = com.membros.filter((m) => m.id !== subId);
      com.administradores = com.administradores.filter((a) => String(a) !== String(subId));
    }
    salvar();
    return {};
  }

  throw erro("Rota inexistente.", 404);
}

async function api(caminho, opcoes = {}) {
  return USAR_BACKEND ? apiRemota(caminho, opcoes) : apiLocal(caminho, opcoes);
}

const REGRAS_PADRAO = [
  "Respeite todos os membros da comunidade — sem ofensas, preconceito ou assédio.",
  "Mantenha as conversas relacionadas ao propósito da comunidade (estudos, dúvidas, materiais).",
  "Não compartilhe conteúdo ilegal, ofensivo ou que viole direitos autorais.",
  "Não faça spam, propaganda ou divulgação não relacionada aos estudos.",
  "Ao compartilhar resumos, exercícios ou materiais de terceiros, cite a fonte sempre que possível.",
  "Em caso de conflitos ou dúvidas sobre as regras, procure um administrador da comunidade.",
];

const SALAS_PADRAO = [
  { icone: "💬", nome: "Geral", desc: "Conversa livre entre os membros", tipo: "chat" },
  { icone: "📚", nome: "Estudos", desc: "Dúvidas e discussões sobre conteúdo", tipo: "chat" },
  { icone: "📁", nome: "Arquivos", desc: "Compartilhe materiais e documentos", tipo: "arquivos" },
  { icone: "📢", nome: "Avisos", desc: "Comunicados importantes da comunidade", tipo: "chat" },
];

const ehCriador = (comunidade, usuario) =>
  !!usuario && !!comunidade && String(comunidade.criadorId) === String(usuario.id);

const ehAdmin = (comunidade, usuario) => {
  if (!usuario || !comunidade) return false;
  const admins = comunidade.administradores || [String(comunidade.criadorId)];
  return admins.map(String).includes(String(usuario.id));
};

const CHAVE_SALAS = "joviclass_salas";
const CHAVE_ACEITAS = "joviclass_regras_aceitas";

const lerJSON = (chave, padrao) => {
  try {
    return JSON.parse(localStorage.getItem(chave)) ?? padrao;
  } catch {
    return padrao;
  }
};

function TresPontos({ onClick, title }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="flex shrink-0 flex-col items-center justify-center gap-[3px] rounded-lg px-2 py-1.5 transition hover:bg-[#f0f0f5]"
    >
      {[0, 1, 2].map((i) => (
        <span key={i} className="block h-1 w-1 rounded-full bg-[#555]" />
      ))}
    </button>
  );
}

const Comunidades = () => {
  const navigate = useNavigate();
  const [params, setParams] = useSearchParams();
  const iniciou = useRef(false);
  const chatRef = useRef(null);

  const [usuario, setUsuario] = useState(null);
  const [comunidades, setComunidades] = useState([]);
  const [ativaId, setAtivaId] = useState(null);
  const [sala, setSala] = useState(null);
  const [salasDados, setSalasDados] = useState(() => lerJSON(CHAVE_SALAS, {}));
  const [aceitas, setAceitas] = useState(() => new Set(lerJSON(CHAVE_ACEITAS, [])));
  const [formulario, setFormulario] = useState(null); 
  const [menu, setMenu] = useState(null); 
  const [membrosAberto, setMembrosAberto] = useState(false);
  const [pendente, setPendente] = useState(null);
  const [regrasVisiveis, setRegrasVisiveis] = useState(true);
  const [mensagem, setMensagem] = useState("");

  const [notificacoes, setNotificacoes] = useState([]);
  const marcarTodasComoLidas = () =>
    setNotificacoes((lista) => lista.map((n) => ({ ...n, lida: true })));

  const ativa = comunidades.find((c) => c.id === ativaId) || null;
  const menuCom = menu ? comunidades.find((c) => c.id === menu.id) : null;
  const regrasDe = (c) => (c?.regras?.length ? c.regras : REGRAS_PADRAO);
  const mensagens = salasDados[ativaId]?.[sala?.nome]?.mensagens || [];

  const carregarComunidades = useCallback(async () => {
    try {
      const dados = await api("/comunidades");
      setComunidades(dados.comunidades || []);
    } catch (e) {
      console.error("Erro ao carregar comunidades:", e);
    }
  }, []);

  useEffect(() => {
    if (iniciou.current) return; 
    iniciou.current = true;

    (async () => {
      try {
        const dados = await api("/auth/me");
        if (dados.autenticado) setUsuario(dados.usuario);
      } catch {
        setUsuario(null);
      }

      const convite = params.get("convite");
      if (convite) {
        try {
          await api(`/comunidades/${encodeURIComponent(convite)}/entrar`, { method: "POST" });
          sessionStorage.removeItem("joviclass_convite_pendente");
          setParams({}, { replace: true });
          alert("Você entrou na comunidade!");
        } catch (e) {
          if (e.status === 401) {
            sessionStorage.setItem("joviclass_convite_pendente", convite);
            navigate("/");
            return;
          }
          alert(e.message);
        }
      }
      carregarComunidades();
    })();
  }, [params, setParams, navigate, carregarComunidades]);

  useEffect(() => {
    localStorage.setItem(CHAVE_SALAS, JSON.stringify(salasDados));
  }, [salasDados]);

  useEffect(() => {
    if (chatRef.current) chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [mensagens.length]);

  async function salvarComunidade(dados) {
    try {
      if (formulario.edicao) {
        const id = formulario.edicao;
        const res = await api(`/comunidades/${id}`, { method: "PUT", body: dados });
        setComunidades((l) => l.map((c) => (c.id === id ? { ...c, ...res.comunidade } : c)));
      } else {
        const res = await api("/comunidades", { method: "POST", body: { ...dados, regras: [...REGRAS_PADRAO] } });
        setComunidades((l) => [...l, res.comunidade]);
      }
      setFormulario(null);
    } catch (e) {
      alert(e.message);
    }
  }

  async function excluir(c) {
    if (!confirm(`Tem certeza que deseja excluir a comunidade "${c.nome}"?`)) return;
    try {
      await api(`/comunidades/${c.id}`, { method: "DELETE" });
      setComunidades((l) => l.filter((x) => x.id !== c.id));
      setSalasDados(({ [c.id]: _removida, ...resto }) => resto);
      if (ativaId === c.id) voltarComunidades();
    } catch (e) {
      alert(e.message);
    }
  }

  async function sair(c) {
    if (!confirm(`Deseja sair da comunidade "${c.nome}"?`)) return;
    try {
      await api(`/comunidades/${c.id}/sair`, { method: "DELETE" });
      voltarComunidades();
      carregarComunidades();
    } catch (e) {
      alert(e.message);
    }
  }

  function abrirMenu(e, id) {
    e.stopPropagation();
    const r = e.currentTarget.getBoundingClientRect();
    setMenu({
      id,
      top: r.bottom + 6,
      left: Math.max(8, Math.min(r.right - 200, window.innerWidth - 208)),
    });
  }

  function acaoMenu(acao) {
    const c = menuCom;
    setMenu(null);
    if (!c) return;
    if (acao === "membros") {
      setAtivaIdMenu(c.id);
      setMembrosAberto(true);
    } else if (acao === "editar") setFormulario({ edicao: c.id });
    else if (acao === "sair") sair(c);
    else if (acao === "excluir") excluir(c);
  }

  const [membrosId, setMembrosId] = useState(null);
  const setAtivaIdMenu = (id) => setMembrosId(id);
  const comMembros = comunidades.find((c) => c.id === membrosId);

  function abrirComunidade(c) {
    if (aceitas.has(c.id)) entrarNaComunidade(c.id);
    else setPendente(c);
  }

  function aceitarRegras() {
    const novo = new Set(aceitas).add(pendente.id);
    localStorage.setItem(CHAVE_ACEITAS, JSON.stringify([...novo]));
    setAceitas(novo);
    entrarNaComunidade(pendente.id);
    setPendente(null);
  }

  function entrarNaComunidade(id) {
    setAtivaId(id);
    setSala(null);
  }

  function voltarComunidades() {
    setAtivaId(null);
    setSala(null);
  }

  /*  Chat  */
  function enviarMensagem() {
    const texto = mensagem.trim();
    if (!texto) return;
    setSalasDados((prev) => ({
      ...prev,
      [ativaId]: {
        ...prev[ativaId],
        [sala.nome]: { mensagens: [...(prev[ativaId]?.[sala.nome]?.mensagens || []), texto] },
      },
    }));
    setMensagem("");
  }

  const itemMenu = "block w-full px-[18px] py-3 text-left text-sm font-semibold text-[#333] hover:bg-[#f0f4ff] hover:text-[#1466ff]";

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#f0f0f5] font-[Manrope,Arial,sans-serif] min-[700px]:flex-row">

      <main className="flex-1 overflow-y-auto p-[30px]">
        {!ativa && (
          <>
            <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="mb-2.5 mt-5 text-3xl font-bold">Comunidades</h1>
                <p className="text-[grey]">Participe de grupos de estudo e colabore com outros estudantes.</p>
              </div>
              <button
                type="button"
                onClick={() => setFormulario({ edicao: null })}
                className="shrink-0 cursor-pointer self-start whitespace-nowrap rounded-[10px] bg-[#1466ff] px-[18px] py-2.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-[#0d55e0]"
              >
                + Nova Comunidade
              </button>
            </div>

            <div className="mt-[30px] flex flex-col gap-5 md:flex-row md:flex-wrap">
              {comunidades.map((c) => (
                <div
                  key={c.id}
                  onClick={() => abrirComunidade(c)}
                  className="w-full cursor-pointer overflow-hidden rounded-[18px] bg-white shadow-[0_4px_15px_rgba(0,0,0,.08)] transition duration-300 hover:-translate-y-[5px] hover:shadow-[0_8px_25px_rgba(0,0,0,.13)] md:w-80"
                >
                  <div className="flex h-[120px] items-center justify-center overflow-hidden bg-[#1466ff]">
                    {c.foto ? <img src={c.foto} alt="foto" className="h-full w-full object-cover" /> : <span className="text-[50px]">🏫</span>}
                  </div>
                  <div className="p-5">
                    <div className="mb-2.5 flex items-start justify-between">
                      <h3 className="mr-2.5 flex-1 font-bold text-[#222]">{c.nome}</h3>
                      <TresPontos title="Opções" onClick={(e) => abrirMenu(e, c.id)} />
                    </div>
                    <p className="mb-4 text-[#666]">{c.descricao}</p>
                    <div className="flex justify-between text-sm text-[#777]">
                      <span>📁 {c.categoria}</span>
                      <span>🌐 {c.privacidade}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {/*  PÁGINA DA COMUNIDADE  */}
        {ativa && (
          <div className="mt-[30px]">
            <div className="mb-[30px]">
              <div className="mb-5 flex items-center gap-3">
                <button type="button" onClick={voltarComunidades} className="text-[22px] text-[#4b5563] transition hover:text-[#4b4dff]">←</button>
                <p className="text-[15px] text-[#64748b]">Comunidades › {ativa.nome}</p>
                <div className="ml-auto">
                  <TresPontos onClick={(e) => abrirMenu(e, ativa.id)} />
                </div>
              </div>

              <div className="mb-5 flex h-[180px] w-full items-center justify-center overflow-hidden rounded-[18px] bg-gradient-to-br from-[#1466ff] to-[#000fb0]">
                {ativa.foto ? <img src={ativa.foto} alt="banner" className="h-full w-full object-cover" /> : <span className="text-[70px]">🏫</span>}
              </div>

              <h1 className="mb-2.5 mt-5 text-3xl font-bold">{ativa.nome}</h1>
              <p className="mt-1.5 text-[#666]">{ativa.descricao}</p>
            </div>

            <section className="mt-[22px] rounded-[18px] border border-[#e0e4ff] bg-white px-6 py-[22px] shadow-[0_6px_18px_rgba(0,15,176,.08)]">
              <div className="flex items-center justify-between gap-3">
                <h2 className="flex items-center gap-2.5 text-base font-extrabold text-[#1a1a2e]">
                  <span className="flex h-11 w-11 items-center justify-center rounded-[10px] bg-[#eef0ff] text-[22px]">📋</span>
                  Regras da comunidade
                </h2>
                <button
                  type="button"
                  aria-expanded={regrasVisiveis}
                  onClick={() => setRegrasVisiveis(!regrasVisiveis)}
                  className="rounded-full border border-[#e0e4ff] bg-[#eef0ff] px-3.5 py-[7px] text-xs font-bold text-[#000fb0] transition hover:-translate-y-px hover:bg-[#e0e4ff]"
                >
                  {regrasVisiveis ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              {regrasVisiveis && (
                <div className="mt-4">
                  <ListaRegras regras={regrasDe(ativa)} />
                </div>
              )}
            </section>

            {/* Salas */}
            {!sala && (
              <div className="mt-5">
                <p className="mb-4 text-xl font-bold text-[#222]">Salas</p>
                <div className="mb-[30px] flex flex-col gap-3">
                  {SALAS_PADRAO.map((s) => (
                    <div
                      key={s.nome}
                      onClick={() => setSala(s)}
                      className="group flex cursor-pointer items-center justify-between rounded-[14px] bg-white px-5 py-[18px] shadow-[0_2px_10px_rgba(0,0,0,.07)] transition hover:translate-x-[5px] hover:shadow-[0_4px_16px_rgba(20,102,255,.13)]"
                    >
                      <div className="flex items-center gap-3.5">
                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#e8efff] text-[22px]">{s.icone}</div>
                        <div>
                          <div className="text-[15px] font-bold text-[#1a1a2e]">{s.nome}</div>
                          <div className="mt-0.5 text-[13px] text-[#888]">{s.desc}</div>
                        </div>
                      </div>
                      <div className="rounded-lg bg-[#e8efff] px-3.5 py-[7px] text-[13px] font-bold text-[#1466ff] transition group-hover:bg-[#1466ff] group-hover:text-white">
                        Entrar →
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Sala interna */}
            {sala && (
              <div className="mt-2.5">
                <div className="mb-6 mt-5 flex items-center gap-3.5">
                  <button type="button" onClick={() => setSala(null)} className="text-[22px] text-[#4b5563] transition hover:text-[#4b4dff]">←</button>
                  <span className="text-[22px] font-bold text-[#1a1a2e]">{sala.icone} {sala.nome}</span>
                </div>

                {sala.tipo === "arquivos" ? (
                  <SalaArquivos comId={ativa.id} api={api} apiBase={API_BASE} />
                ) : (
                  <div className="mt-2.5">
                    <h2 className="mb-3 text-[17px] font-bold text-[#333]">💬 Chat</h2>
                    <div ref={chatRef} className="mt-4 h-[300px] overflow-y-auto rounded-[14px] bg-white p-[15px] shadow-[0_2px_10px_rgba(0,0,0,.07)]">
                      {mensagens.map((texto, i) => (
                        <div key={i} className="mb-2.5 w-fit max-w-full rounded-[10px] bg-[#dbe7ff] px-3.5 py-2.5 text-sm md:max-w-[70%]">
                          {texto}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 flex flex-col gap-2.5 md:flex-row">
                      <input
                        value={mensagem}
                        onChange={(e) => setMensagem(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && enviarMensagem()}
                        placeholder="Digite uma mensagem..."
                        className="flex-1 rounded-[10px] border border-[#ccc] p-3"
                      />
                      <button type="button" onClick={enviarMensagem} className="rounded-[10px] bg-[#1466ff] px-[18px] py-3 text-white">
                        Enviar
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ============ MENU DE OPÇÕES ============ */}
      {menu && menuCom && (
        <>
          <div className="fixed inset-0 z-[1099]" onClick={() => setMenu(null)} />
          <div
            className="fixed z-[1100] min-w-[200px] overflow-hidden rounded-xl bg-white py-1.5 shadow-[0_8px_30px_rgba(0,0,0,.15)]"
            style={{ top: menu.top, left: menu.left }}
          >
            <button type="button" className={itemMenu} onClick={() => acaoMenu("membros")}>👥 Gerenciar membros</button>
            {ehAdmin(menuCom, usuario) && (
              <button type="button" className={itemMenu} onClick={() => acaoMenu("editar")}>✏️ Editar comunidade</button>
            )}
            {!ehCriador(menuCom, usuario) && (
              <button type="button" className={itemMenu} onClick={() => acaoMenu("sair")}>🚪 Sair da comunidade</button>
            )}
            {ehCriador(menuCom, usuario) && (
              <button type="button" className={`${itemMenu} !text-[#e53e3e] hover:!bg-[#fff0f0] hover:!text-[#c53030]`} onClick={() => acaoMenu("excluir")}>
                🗑️ Excluir comunidade
              </button>
            )}
          </div>
        </>
      )}

      {formulario && (
        <FormularioComunidade
          comunidade={comunidades.find((c) => c.id === formulario.edicao)}
          onFechar={() => setFormulario(null)}
          onSalvar={salvarComunidade}
        />
      )}

      {membrosAberto && comMembros && (
        <ModalMembros
          comunidade={comMembros}
          api={api}
          criador={ehCriador(comMembros, usuario)}
          admin={ehAdmin(comMembros, usuario)}
          onFechar={() => setMembrosAberto(false)}
          onAlterou={carregarComunidades}
        />
      )}

      {pendente && (
        <ModalRegras
          nome={pendente.nome}
          regras={regrasDe(pendente)}
          onVoltar={() => setPendente(null)}
          onAceitar={aceitarRegras}
        />
      )}
    </div>
  );
}

export default Comunidades;