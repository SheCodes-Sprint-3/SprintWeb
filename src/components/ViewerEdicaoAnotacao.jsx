
import { useState, useEffect } from "react";

const ViewerEdicaoAnotacao = ({ item, onFechar, onSalvar, onBaixar }) => {
  const [editando, setEditando] = useState(false);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    if (item) {
      setTexto(item.conteudo || "");
      setEditando(false);
    }
  }, [item]);

  if (!item) return null;

  function salvar() {
    onSalvar(texto);
    setEditando(false);
  }

  return (
    <div className="fixed inset-0 z-[300] flex items-center justify-center bg-black/55 p-5 backdrop-blur-[4px] animate-[fadeOverlay_0.2s_ease] max-[699px]:items-end max-[699px]:p-0">
      <div className="flex max-h-[90vh] w-full max-w-[860px] flex-col overflow-hidden rounded-[20px] bg-white shadow-[0_24px_60px_rgba(0,0,0,0.25)] animate-[slideUpModal_0.22s_ease] max-[699px]:max-h-[92vh] max-[699px]:max-w-full max-[699px]:rounded-b-none">
        <div className="flex shrink-0 items-center justify-between gap-3 border-b border-[#f0f0f5] px-[22px] py-[18px]">
          <span className="min-w-0 flex-1 truncate text-[15px] font-bold text-[#222]">{item.nome}</span>
          <div className="flex shrink-0 items-center gap-2">
            {item.tipo === "anotacao" && !editando && (
              <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-[var(--bg-color4,#1466ff)] bg-transparent px-[14px] py-[7px] text-[13px] font-semibold text-[var(--bg-color4,#1466ff)] transition-all duration-200 hover:bg-[var(--bg-color4,#1466ff)] hover:text-white" onClick={() => setEditando(true)}>
                Editar
              </button>
            )}
            <button type="button" className="flex h-[34px] w-[34px] shrink-0 cursor-pointer items-center justify-center rounded-lg border-0 bg-[#f0f0f5] text-[#555] transition-colors duration-200 hover:bg-[#e0e0e5] hover:text-[#111]" onClick={onFechar} title="Fechar">
              ✕
            </button>
          </div>
        </div>

        <div className="flex flex-1 flex-col items-stretch overflow-auto p-6">
          {item.tipo === "anotacao" ? (
            editando ? (
              <div>
                <textarea className="min-h-[260px] w-full resize-y rounded-[10px] border border-[#ddd] p-[14px] text-[14px] leading-[1.6] outline-none transition-colors duration-200 focus:border-[#145cff]" placeholder="Escreva suas anotações aqui..." value={texto} onChange={(e) => setTexto(e.target.value)} />
                <div className="mt-4 flex justify-end gap-[10px] max-[699px]:flex-col">
                  <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-[var(--bg-color4,#1466ff)] bg-transparent px-4 py-[10px] text-[14px] font-semibold text-[var(--bg-color4,#1466ff)] transition-all duration-200 hover:bg-[var(--bg-color4,#1466ff)] hover:text-white max-[699px]:w-full" onClick={() => setEditando(false)}>
                    Cancelar
                  </button>
                  <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-0 bg-[var(--bg-color4,#1466ff)] px-4 py-[10px] text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#0d55e0] max-[699px]:w-full" onClick={salvar}>
                    Salvar
                  </button>
                </div>
              </div>
            ) : (
              <p className="break-words whitespace-pre-wrap text-[15px] leading-[1.75] text-[#333]">{item.conteudo || "(sem conteúdo)"}</p>
            )
          ) : item.tipoArquivo === "pdf" ? (
            <iframe className="h-[65vh] w-full rounded-lg border-0 bg-[#f8f8f8] max-[699px]:h-[55vh]" src={item.url} title={item.nome} />
          ) : item.tipoArquivo === "imagem" ? (
            <img className="mx-auto block max-h-[65vh] max-w-full rounded-[10px] object-contain" src={item.url} alt={item.nome} />
          ) : (
            <div className="flex flex-col items-center justify-center gap-[14px] px-5 py-12 text-center text-[14px] leading-[1.6] text-[#aaa]">
              <span>Não é possível pré-visualizar este tipo de arquivo.</span>
              <button type="button" className="mt-5 inline-flex items-center justify-center gap-2 self-center whitespace-nowrap rounded-lg border-0 bg-[var(--bg-color4,#1466ff)] px-4 py-[10px] text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#0d55e0]" onClick={() => onBaixar(item.id)}>
                Baixar arquivo
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewerEdicaoAnotacao;
