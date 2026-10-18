import { useCallback, useEffect, useRef, useState } from "react";

const caixa = "mb-4 rounded-[14px] bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,.07)]";
const btnAzul = "h-[46px] whitespace-nowrap rounded-[10px] bg-[#1466ff] px-5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-[#c8cede]";

const SalaArquivos = ({ comId, api, apiBase }) => {
  const [materias, setMaterias] = useState([]);
  const [pastas, setPastas] = useState(null);
  const [selecionada, setSelecionada] = useState("");
  const [aberta, setAberta] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const arquivoRef = useRef(null);

  const base = `/comunidades/${encodeURIComponent(comId)}/pastas`;

  const carregarPastas = useCallback(async () => {
    try {
      const dados = await api(base);
      setPastas(dados.pastas || []);
    } catch (e) {
      console.error(e);
      setPastas([]);
    }
  }, [base, api]);

  useEffect(() => {
    carregarPastas();
    api("/materias")
      .then((d) => setMaterias((d.materias || []).filter((m) => m.compartilhada === true)))
      .catch(console.error);
  }, [carregarPastas, api]);

  async function adicionarPasta() {
    if (!selecionada) return alert("Selecione uma matéria compartilhada.");
    try {
      await api(base, { method: "POST", body: { materiaId: selecionada } });
      setSelecionada("");
      carregarPastas();
    } catch (e) {
      alert(e.message);
    }
  }

  async function removerPasta(pasta) {
    if (!confirm("Remover esta pasta da comunidade? Os arquivos originais não serão excluídos.")) return;
    try {
      await api(`${base}/${encodeURIComponent(pasta.id)}`, { method: "DELETE" });
      if (aberta?.pasta.id === pasta.id) setAberta(null);
      carregarPastas();
    } catch (e) {
      alert(e.message);
    }
  }

  async function abrirPasta(pasta) {
    try {
      const dados = await api(`${base}/${encodeURIComponent(pasta.id)}/arquivos`);
      setAberta({ pasta, arquivos: dados.arquivos || [] });
    } catch (e) {
      alert(e.message);
    }
  }

  async function enviarArquivo() {
    const arquivo = arquivoRef.current?.files[0];
    if (!arquivo) return alert("Selecione um arquivo.");

    const formulario = new FormData();
    formulario.append("arquivo", arquivo);

    try {
      setEnviando(true);
      await api(`${base}/${encodeURIComponent(aberta.pasta.id)}/arquivos`, { method: "POST", body: formulario });
      await abrirPasta(aberta.pasta);
      carregarPastas();
    } catch (e) {
      alert(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <div>
      <h2 className="mb-3.5 text-[17px] font-bold text-[#333]">📁 Pastas compartilhadas</h2>

      <div className={caixa}>
        <span className="text-sm font-bold text-[#1a1a2e]">Adicionar uma pasta</span>
        <p className="mb-4 mt-1.5 max-w-[380px] text-[12.5px] leading-normal text-[#888]">
          Escolha uma matéria que você marcou como compartilhada. Todos os membros da comunidade poderão abrir os arquivos.
        </p>
        <div className="grid grid-cols-1 gap-2.5 md:grid-cols-[minmax(0,1fr)_auto]">
          <select
            aria-label="Matéria para compartilhar"
            value={selecionada}
            onChange={(e) => setSelecionada(e.target.value)}
            disabled={!materias.length}
            className="h-[46px] min-w-0 cursor-pointer rounded-[10px] border border-[#d9dfeb] bg-[#fafbfe] px-3.5 text-sm text-[#25283c] focus:border-[#1466ff] focus:outline-none disabled:cursor-not-allowed disabled:bg-[#f3f4f7] disabled:text-[#85889a]"
          >
            <option value="">
              {materias.length ? "Selecione uma matéria compartilhada" : "Nenhuma matéria disponível para compartilhar"}
            </option>
            {materias.map((m) => (
              <option key={m.id} value={m.id}>{m.nome}</option>
            ))}
          </select>
          <button type="button" onClick={adicionarPasta} disabled={!materias.length} className={btnAzul}>
            Adicionar
          </button>
        </div>
      </div>

      <div className="mt-[18px] grid gap-2.5">
        {pastas === null && <p>Carregando pastas...</p>}
        {pastas?.length === 0 && <p>Ainda não há pastas compartilhadas nesta comunidade.</p>}
        {pastas?.map((pasta) => (
          <div key={pasta.id} className="flex flex-col justify-between gap-3 rounded-xl border border-[#e3e7f0] bg-white px-3 py-2.5 md:flex-row md:items-center">
            <button
              type="button"
              onClick={() => abrirPasta(pasta)}
              className="min-h-[38px] min-w-0 flex-1 rounded-lg px-1 py-1.5 text-left text-sm font-semibold text-[#202338] [overflow-wrap:anywhere] hover:bg-[#f1f5ff] hover:text-[#1466ff]"
            >
              📁 {pasta.nome} · {pasta.arquivos} arquivo(s)
            </button>
            {pasta.podeRemover && (
              <button type="button" onClick={() => removerPasta(pasta)} className="rounded-md px-1.5 py-0.5 text-sm text-[#aaa] hover:bg-[#fff0f0] hover:text-[#e53e3e]">
                Remover
              </button>
            )}
          </div>
        ))}
      </div>

      {aberta && (
        <div className="mt-[22px] rounded-[14px] border border-[#e3e7f0] bg-[#f8f9fc] p-3.5 md:p-[18px]">
          <h3 className="mb-3.5 text-base font-bold leading-snug text-[#1a1d32] [overflow-wrap:anywhere] md:text-[17px]">
            📁 {aberta.pasta.nome}
          </h3>

          {aberta.pasta.podeAdicionar && (
            <div className={`${caixa} flex flex-col gap-2`}>
              <label htmlFor="uploadArquivoCompartilhado">Adicionar arquivo à pasta:</label>
              <input ref={arquivoRef} id="uploadArquivoCompartilhado" type="file" className="max-w-full" />
              <button type="button" onClick={enviarArquivo} disabled={enviando} className="self-start rounded-lg bg-[#1466ff] px-4 py-2.5 text-white disabled:opacity-60">
                {enviando ? "Enviando..." : "Enviar arquivo"}
              </button>
            </div>
          )}

          {aberta.arquivos.length === 0 && <p>Esta pasta ainda não possui arquivos.</p>}
          {aberta.arquivos.map((arquivo) => (
            <a
              key={arquivo.id}
              href={`${apiBase}${base}/${encodeURIComponent(aberta.pasta.id)}/arquivos/${encodeURIComponent(arquivo.id)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mb-[9px] flex min-h-[46px] items-center rounded-[11px] border border-[#e5e8f1] bg-white px-3 py-[11px] text-[13px] text-[#272a3d] transition [overflow-wrap:anywhere] last:mb-0 hover:-translate-y-px hover:border-[#b9c9ee] hover:text-[#1466ff] md:px-3.5 md:py-3 md:text-sm"
            >
              📄 {arquivo.nome}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default SalaArquivos