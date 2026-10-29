import { useState, useMemo, useEffect } from "react";
import { ChevronLeft, ChevronRight, Plus, X, BookOpen, CalendarDays, Trash2, CheckCircle2, Home, Camera, ClipboardList, User, } from "lucide-react";

const MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro",
];

const DIAS_SEMANA = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const CATEGORIAS = ["Projeto", "Tutoria", "Prova", "Outros"];
const PRIORIDADES = {
  alta: { rotulo: "Alta", borda: "border-l-[#e53935]", selo: "bg-[#fde8e8] text-[#c62828]" },
  media: { rotulo: "Média", borda: "border-l-[#fb8c00]", selo: "bg-[#fff3e0] text-[#e65100]" },
  baixa: { rotulo: "Baixa", borda: "border-l-[#43a047]", selo: "bg-[#e8f5e9] text-[#2e7d32]" },
};

function lerStorage(chave, padrao) {
  try {
    return JSON.parse(localStorage.getItem(chave)) ?? padrao;
  } catch {
    return padrao;
  }
}

function mesmoDia(data, ano, mes, dia) {
  return (
    data.getFullYear() === ano && data.getMonth() === mes && data.getDate() === dia
  );
}

function formatarData(dataStr) {
  if (!dataStr) return "";
  const [ano, mes, dia] = dataStr.split("-");
  return `${dia}/${mes}/${ano}`;
}

function JanelaModal({ aberta, aoFechar, titulo, children }) {
  if (!aberta) return null;
  return (
    <div className="fixed inset-0 bg-[rgba(10,12,40,0.45)] z-[1000] flex items-center justify-center p-4" onClick={aoFechar}>
      <div className="shadow-[0_10px_30px_rgba(0,15,176,0.25)] bg-white rounded-2xl w-full max-w-sm p-5 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={aoFechar} className="bg-[#1466ff] absolute top-3 right-3 w-7 h-7 rounded-lg border-none flex items-center justify-center text-white cursor-pointer">
          <X size={14} />
        </button>
        <h2 className="text-[#12142b] text-lg font-bold m-0 mb-4 pr-8">{titulo}</h2>
        {children}
      </div>
    </div>
  );
}

function CampoFormulario({ rotulo, children }) {
  return (
    <label className="flex flex-col gap-1 mb-3">
      <span className="text-[#333] text-xs font-semibold">{rotulo}</span>
      {children}
    </label>
  );
}


export default function CalendarioJoviClass() {
  const hoje = useMemo(() => new Date(), []);
  const [dataAtual, setDataAtual] = useState(new Date());

  const [eventos, setEventos] = useState(() =>
    lerStorage("joviclass:eventos", []).map((e) => ({ ...e, data: new Date(e.data) }))
  );
  const [entregas, setEntregas] = useState(() => lerStorage("joviclass:entregas", []));
  const [tarefas, setTarefas] = useState(() => lerStorage("joviclass:tarefas", []));

  useEffect(() => {
    localStorage.setItem("joviclass:eventos", JSON.stringify(eventos));
  }, [eventos]);

  useEffect(() => {
    localStorage.setItem("joviclass:entregas", JSON.stringify(entregas));
  }, [entregas]);

  useEffect(() => {
    localStorage.setItem("joviclass:tarefas", JSON.stringify(tarefas));
  }, [tarefas]);

  const [diaSelecionado, setDiaSelecionado] = useState(null);
  const [modalEventoAberto, setModalEventoAberto] = useState(false);
  const [modalEntregaAberto, setModalEntregaAberto] = useState(false);
  const [modalTarefaAberto, setModalTarefaAberto] = useState(false);

  const [formEvento, setFormEvento] = useState({ titulo: "", categoria: "Projeto", descricao: "" });
  const [formEntrega, setFormEntrega] = useState({ titulo: "", materia: "", data: "", prioridade: "media" });
  const [formTarefa, setFormTarefa] = useState({ texto: "", materia: "" });

  const ano = dataAtual.getFullYear();
  const mes = dataAtual.getMonth();

  const grade = useMemo(() => {
    const primeiroDiaSemana = new Date(ano, mes, 1).getDay();
    const ultimoDiaMes = new Date(ano, mes + 1, 0).getDate();
    const ultimoDiaMesAnterior = new Date(ano, mes, 0).getDate();
    const celulas = [];

    for (let i = primeiroDiaSemana; i > 0; i--) {
      celulas.push({ tipo: "esmaecido", numero: ultimoDiaMesAnterior - i + 1 });
    }
    for (let i = 1; i <= ultimoDiaMes; i++) {
      celulas.push({ tipo: "atual", numero: i });
    }
    const restante = (7 - (celulas.length % 7)) % 7;
    for (let i = 1; i <= restante; i++) {
      celulas.push({ tipo: "esmaecido", numero: i });
    }
    return celulas;
  }, [ano, mes]);

  function eventosDoDia(dia) {
    return eventos.filter((ev) => mesmoDia(ev.data, ano, mes, dia));
  }
  function entregasDoDia(dia) {
    return entregas.filter((en) => {
      if (!en.data) return false;
      const d = new Date(en.data + "T00:00:00");
      return mesmoDia(d, ano, mes, dia);
    });
  }

  function mudarMes(delta) {
    setDataAtual(new Date(ano, mes + delta, 1));
  }

  function abrirDia(dia) {
    setDiaSelecionado({ ano, mes, dia });
    setFormEvento({ titulo: "", categoria: "Projeto", descricao: "" });
    setModalEventoAberto(true);
  }

  function salvarEvento() {
    if (!formEvento.titulo.trim() || !diaSelecionado) return;
    const { ano: a, mes: m, dia: d } = diaSelecionado;
    setEventos((prev) => [
      ...prev,
      {
        id: `local-${Date.now()}`,
        titulo: formEvento.titulo.trim(),
        categoria: formEvento.categoria,
        descricao: formEvento.descricao.trim(),
        data: new Date(a, m, d),
      },
    ]);
    setModalEventoAberto(false);
  }

  function removerEvento(id) {
    setEventos((prev) => prev.filter((e) => e.id !== id));
  }

  function salvarEntrega() {
    if (!formEntrega.titulo.trim()) return;
    const id = Date.now();
    const nova = { id, ...formEntrega, titulo: formEntrega.titulo.trim(), materia: formEntrega.materia.trim() };
    setEntregas((prev) =>
      [...prev, nova].sort((a, b) => {
        if (!a.data) return 1;
        if (!b.data) return -1;
        return new Date(a.data) - new Date(b.data);
      })
    );
    setTarefas((prev) => [
      ...prev,
      { id, texto: nova.titulo, materia: nova.materia, concluida: false, vemDeEntrega: true },
    ]);
    setFormEntrega({ titulo: "", materia: "", data: "", prioridade: "media" });
    setModalEntregaAberto(false);
  }

  function removerEntrega(id) {
    setEntregas((prev) => prev.filter((e) => e.id !== id));
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }

  function salvarTarefa() {
    if (!formTarefa.texto.trim()) return;
    setTarefas((prev) => [
      ...prev,
      { id: Date.now(), texto: formTarefa.texto.trim(), materia: formTarefa.materia.trim(), concluida: false },
    ]);
    setFormTarefa({ texto: "", materia: "" });
    setModalTarefaAberto(false);
  }

  function alternarTarefa(id) {
    setTarefas((prev) => prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t)));
  }
  function removerTarefa(id) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
  }

  const totalTarefas = tarefas.length;
  const tarefasConcluidas = tarefas.filter((t) => t.concluida).length;
  const progresso = totalTarefas === 0 ? 0 : Math.round((tarefasConcluidas / totalTarefas) * 100);
  const tarefasOrdenadas = [...tarefas].sort((a, b) => a.concluida - b.concluida);

  return (
    <div className="bg-[#f0f0f5] min-h-full font-[Manrope,Arial,sans-serif]">
      { }
      <div className="bg-gradient-to-br from-[#0015d6] to-[#000fb0] text-white w-full -mt-[25px]">
        <div className="bg-gradient-to-br from-[#000fb0] to-[#1466ff] pt-6 px-6 pb-7 sm:px-8">
          <h1 className="text-2xl font-extrabold tracking-[-0.02em] m-0 sm:text-[30px]">Calendário</h1>
          <p className="text-sm opacity-80 mt-1 mb-0">Organize seus eventos, provas e entregas</p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 pb-28 sm:px-6">
        <div className="bg-white rounded-2xl mt-4 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-5">
            <button onClick={() => mudarMes(-1)} className="p-1 bg-transparent border-none cursor-pointer flex">
              <ChevronLeft size={26} className="text-[#000fb0]" />
            </button>
            <div className="text-[#12142b] font-bold text-lg sm:text-2xl">
              {MESES[mes]} {ano}
            </div>
            <button onClick={() => mudarMes(1)} className="p-1 bg-transparent border-none cursor-pointer flex">
              <ChevronRight size={26} className="text-[#000fb0]" />
            </button>
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2">
            {DIAS_SEMANA.map((d) => (
              <span key={d} className="text-[#12142b] flex items-center justify-center h-8 font-bold text-[11px] sm:h-10 sm:text-sm">
                {d}
              </span>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {grade.map((celula, idx) => {
              if (celula.tipo === "esmaecido") {
                return (
                  <div key={idx} className="bg-[#ececec] text-[#999] flex items-center justify-center h-11 rounded-lg text-xs sm:h-[90px] sm:text-sm">
                    {celula.numero}
                  </div>
                );
              }
              const dia = celula.numero;
              const ehHoje = mesmoDia(hoje, ano, mes, dia);
              const totalDoDia = eventosDoDia(dia).length + entregasDoDia(dia).length;
              return (
                <div
                  key={idx}
                  onClick={() => abrirDia(dia)}
                  className={`relative flex flex-col items-start justify-start p-1.5 h-11 rounded-lg cursor-pointer text-[11px] font-medium sm:h-[90px] sm:text-sm ${ehHoje ? "bg-[#000fb0] text-white" : "bg-[#f0f0f5] text-[#12142b]"
                    }`}
                >
                  <span className="font-bold">{dia}</span>
                  {totalDoDia > 0 && (
                    <span
                      className={`absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full ${ehHoje ? "bg-white" : "bg-[#1466ff]"
                        }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>


        <div className="bg-white rounded-2xl mt-4 p-4 sm:p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-[#111] text-base font-bold flex items-center gap-2 m-0 sm:text-lg">
              <CalendarDays size={18} className="text-[#000fb0]" />
              Próximas Entregas
            </h2>
            <button onClick={() => setModalEntregaAberto(true)} className="bg-[#1466ff] text-white text-[13px] font-semibold py-2 px-3.5 rounded-lg border-none flex items-center gap-1 cursor-pointer sm:text-sm">
              <Plus size={14} /> Nova entrega
            </button>
          </div>

          {entregas.length === 0 ? (
            <p className="text-[#999] text-center text-sm py-6">Nenhuma entrega cadastrada. Clique em "Nova entrega" para adicionar.</p>
          ) : (
            <div className="flex flex-col gap-2.5">
              {entregas.map((en) => {
                const p = PRIORIDADES[en.prioridade];
                return (
                  <div key={en.id} className={`bg-[#f0f0f5] border-l-4 ${p.borda} flex items-center justify-between gap-3 rounded-lg py-3 px-4 flex-wrap`}>
                    <div className="flex flex-col gap-1 flex-1 min-w-[140px]">
                      <span className="text-[#111] font-bold text-sm">{en.titulo}</span>
                      <span className="text-[#666] text-xs flex gap-3 flex-wrap">
                        {en.materia && <span>📚 {en.materia}</span>}
                        {en.data && <span>📅 {formatarData(en.data)}</span>}
                      </span>
                    </div>
                    <span className={`${p.selo} text-[11px] font-bold py-0.5 px-2.5 rounded-full uppercase tracking-[0.04em]`}>{p.rotulo}</span>
                    <button onClick={() => removerEntrega(en.id)} className="text-[#bbb] bg-transparent border-none p-1 cursor-pointer flex hover:text-[#dc2626]">
                      <Trash2 size={16} />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl mt-4 p-4 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <h2 className="text-[#111] text-base font-bold flex items-center gap-2 m-0 sm:text-lg">
              <CheckCircle2 size={18} className="text-[#000fb0]" />
              Checklist de Entregas
            </h2>
            <button onClick={() => setModalTarefaAberto(true)} className="bg-[#1466ff] text-white text-[13px] font-semibold py-2 px-3.5 rounded-lg border-none flex items-center gap-1 cursor-pointer sm:text-sm">
              <Plus size={14} /> Nova tarefa
            </button>
          </div>

          <div className="mb-4">
            <div className="text-[#666] text-xs font-semibold mb-2">
              {tarefasConcluidas} de {totalTarefas} concluídas
            </div>
            <div className="bg-[#e0e0e0] h-2 rounded-full overflow-hidden">
              <div style={{ width: `${progresso}%` }} className="bg-gradient-to-r from-[#000fb0] to-[#1466ff] h-full rounded-full transition-[width] duration-300 ease-in-out" />
            </div>
          </div>

          {tarefas.length === 0 ? (
            <p className="text-[#999] text-center text-sm py-6">Nenhuma tarefa adicionada. Clique em "+ Nova tarefa" para começar.</p>
          ) : (
            <ul className="list-none flex flex-col gap-2 m-0 p-0">
              {tarefasOrdenadas.map((t) => (
                <li key={t.id} className={`bg-[#f0f0f5] flex items-center gap-3 rounded-lg py-3 px-4 ${t.concluida ? "opacity-[0.55]" : ""}`}>
                  <input
                    type="checkbox"
                    checked={t.concluida}
                    onChange={() => alternarTarefa(t.id)}
                    className="accent-[#1466ff] w-5 h-5 shrink-0 cursor-pointer"
                  />
                  <div className="flex-1 flex flex-col gap-0.5">
                    <span className={`text-[#111] text-sm font-semibold ${t.concluida ? "line-through" : ""}`}>{t.texto}</span>
                    {t.materia && <span className="text-[#888] text-xs">{t.materia}</span>}
                  </div>
                  <button onClick={() => removerTarefa(t.id)} className="text-[#bbb] bg-transparent border-none p-1 cursor-pointer flex hover:text-[#dc2626]">
                    <Trash2 size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <JanelaModal aberta={modalEventoAberto} aoFechar={() => setModalEventoAberto(false)} titulo="Novo Evento">
        {diaSelecionado &&
          (() => {
            const doDia = [
              ...eventosDoDia(diaSelecionado.dia).map((e) => ({ ...e, origem: "evento" })),
              ...entregasDoDia(diaSelecionado.dia).map((e) => ({ ...e, origem: "entrega" })),
            ];
            if (doDia.length === 0) return null;
            return (
              <div className="flex flex-col gap-2 max-h-40 overflow-y-auto mb-3">
                <span className="text-[#000fb0] text-[11px] font-extrabold uppercase tracking-[0.04em]">Eventos do dia</span>
                {doDia.map((ev) => (
                  <div key={`${ev.origem}-${ev.id}`} className="bg-[#eef0ff] border border-[#e0e4ff] flex items-center justify-between gap-2 rounded-lg py-2 px-3">
                    <div>
                      <div className="text-[#12142b] flex items-center gap-2 text-sm">
                        <span className="bg-[#1466ff] w-2 h-2 rounded-full shrink-0" />
                        <strong>{ev.titulo}</strong>
                      </div>
                      <span className="text-[#888888] text-xs ml-4">
                        {ev.origem === "entrega" ? `Entrega · ${formatarData(ev.data)}` : ev.categoria}
                      </span>
                    </div>
                    {ev.origem === "evento" && (
                      <button
                        type="button"
                        onClick={() => removerEvento(ev.id)}
                        aria-label={`Excluir evento ${ev.titulo}`}
                        className="text-[#bbb] bg-transparent border-none p-1 cursor-pointer flex shrink-0 hover:text-[#dc2626]"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
              </div>
            );
          })()}

        <CampoFormulario rotulo="Título:">
          <input
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit]"
            placeholder="Ex. Trabalho de matemática"
            value={formEvento.titulo}
            onChange={(e) => setFormEvento((f) => ({ ...f, titulo: e.target.value }))}
          />
        </CampoFormulario>
        <CampoFormulario rotulo="Categoria:">
          <select
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit]"
            value={formEvento.categoria}
            onChange={(e) => setFormEvento((f) => ({ ...f, categoria: e.target.value }))}
          >
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </CampoFormulario>
        <CampoFormulario rotulo="Descrição:">
          <textarea
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit] resize-none h-20"
            placeholder="Descreva o evento..."
            value={formEvento.descricao}
            onChange={(e) => setFormEvento((f) => ({ ...f, descricao: e.target.value }))}
          />
        </CampoFormulario>
        <button onClick={salvarEvento} className="bg-[#1466ff] text-white text-[13px] sm:text-sm border-none flex items-center gap-1 cursor-pointer w-full font-semibold p-2.5 rounded-lg mt-1">
          Salvar Evento
        </button>
      </JanelaModal>

      <JanelaModal aberta={modalEntregaAberto} aoFechar={() => setModalEntregaAberto(false)} titulo="Nova Entrega">
        <CampoFormulario rotulo="Título:">
          <input
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit]"
            placeholder="Ex. Relatório de Biologia"
            value={formEntrega.titulo}
            onChange={(e) => setFormEntrega((f) => ({ ...f, titulo: e.target.value }))}
          />
        </CampoFormulario>
        <CampoFormulario rotulo="Matéria:">
          <input
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit]"
            placeholder="Ex. Biologia"
            value={formEntrega.materia}
            onChange={(e) => setFormEntrega((f) => ({ ...f, materia: e.target.value }))}
          />
        </CampoFormulario>
        <CampoFormulario rotulo="Data de entrega:">
          <input
            type="date"
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit]"
            value={formEntrega.data}
            onChange={(e) => setFormEntrega((f) => ({ ...f, data: e.target.value }))}
          />
        </CampoFormulario>
        <CampoFormulario rotulo="Prioridade:">
          <select
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit]"
            value={formEntrega.prioridade}
            onChange={(e) => setFormEntrega((f) => ({ ...f, prioridade: e.target.value }))}
          >
            <option value="alta">Alta</option>
            <option value="media">Média</option>
            <option value="baixa">Baixa</option>
          </select>
        </CampoFormulario>
        <button onClick={salvarEntrega} className="bg-[#1466ff] text-white text-[13px] sm:text-sm border-none flex items-center gap-1 cursor-pointer w-full font-semibold p-2.5 rounded-lg mt-1">
          Salvar Entrega
        </button>
      </JanelaModal>

      <JanelaModal aberta={modalTarefaAberto} aoFechar={() => setModalTarefaAberto(false)} titulo="Nova Tarefa">
        <CampoFormulario rotulo="Tarefa:">
          <input
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit]"
            placeholder="Ex. Estudar capítulo 3"
            value={formTarefa.texto}
            onChange={(e) => setFormTarefa((f) => ({ ...f, texto: e.target.value }))}
          />
        </CampoFormulario>
        <CampoFormulario rotulo="Matéria:">
          <input
            className="border border-[#ccc] rounded-lg py-[9px] px-2.5 text-sm outline-none w-full font-[inherit]"
            placeholder="Ex. Matemática"
            value={formTarefa.materia}
            onChange={(e) => setFormTarefa((f) => ({ ...f, materia: e.target.value }))}
          />
        </CampoFormulario>
        <button onClick={salvarTarefa} className="bg-[#1466ff] text-white text-[13px] sm:text-sm border-none flex items-center gap-1 cursor-pointer w-full font-semibold p-2.5 rounded-lg mt-1">
          Adicionar Tarefa
        </button>
      </JanelaModal>
    </div>
  );
}