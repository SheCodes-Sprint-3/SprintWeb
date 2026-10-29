
const ListaArquivos = ({ itens, abrirViewer, abrirDropdown }) => {
  function iconeArquivo(item) {
    if (item.tipo === "anotacao") return "📝";
    if (item.tipoArquivo === "pdf") return "📄";
    if (item.tipoArquivo === "imagem") return "🖼️";
    return "📁";
  }

  function formatarData(iso) {
    const d = new Date(iso);
    return d.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
  }

  return (
    <section className="w-full mt-5">
      <div className="mb-4 flex items-center justify-between gap-4">
        <h2 className="mb-4 text-[21px] font-extrabold tracking-[-0.4px] text-[#101b4d] max-[699px]:text-[19px]">Arquivos e anotações</h2>
      </div>

      {itens.length === 0 ? (
        // mt-6 w-full rounded-[22px] bg-white p-7 shadow-[0 8px 24px rgba(18, 42, 110, .07)] max-[699px]:p-5
        <p className="flex min-h-[260px] items-center justify-center text-[16px] text-[#73798d]">Ainda não há arquivos.</p>
      ) : (
        <div className="mt-0 flex w-full flex-col gap-0 overflow-hidden rounded-[22px] bg-white shadow-[0 8px 24px rgba(18, 42, 110, .07)] max-[699px]:rounded-[18px]">
          {itens.map((item) => (
            <div key={item.id} className="flex min-h-[88px] cursor-pointer items-center justify-between border-b border-[#e8eaf2] bg-white px-5 py-[15px] transition-[box-shadow,transform,background] duration-200 hover:bg-[#fcfdff] hover:shadow-[inset_4px_0_0_#145cff] last:border-b-0 max-[699px]:min-h-[80px] max-[699px]:px-3 max-[699px]:py-[13px]" onClick={() => abrirViewer(item)}>
              <div className="flex flex-1 items-center gap-[15px] overflow-hidden max-[699px]:gap-[11px]">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[15px] bg-[#edf3ff] text-[#145cff] max-[699px]:h-[43px] max-[699px]:w-[43px] max-[699px]:rounded-[13px]">{iconeArquivo(item)}</div>
                <div className="overflow-hidden">
                  <div className="max-w-[420px] overflow-hidden text-ellipsis whitespace-nowrap text-[15px] font-bold text-[#141a31] max-[699px]:max-w-[180px] max-[699px]:text-[14px] max-[380px]:max-w-[145px]">{item.nome}</div>
                  <div className="mt-[6px] flex items-center gap-[7px] text-[12px] text-[#8a90a0] max-[699px]:gap-[5px] max-[699px]:text-[10.5px]">
                    <span className={`rounded-[20px] px-[9px] py-[3px] text-[11px] font-bold uppercase tracking-[0.3px] ${item.tipo === "anotacao" ? "bg-[#fff3cd] text-[#8a6200]" : item.tipoArquivo === "pdf" ? "bg-[#fde8e8] text-[#c0392b]" : item.tipoArquivo === "imagem" ? "bg-[#e8f8f0] text-[#1a8a55]" : "bg-[#eef2ff] text-[#3d5af1]"}`}>{item.tipo === "anotacao" ? "Anotação" : item.tipoArquivo}</span>
                    {formatarData(item.criadoEm)}
                  </div>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1">
                <button type="button" className="inline-flex cursor-pointer items-center gap-[5px] whitespace-nowrap rounded-[10px] border-[1.5px] border-[#e0e4ef] bg-transparent px-3 py-[6px] text-[13px] font-semibold text-[#145cff] transition-all duration-150 hover:border-[#145cff] hover:bg-[#eef2ff] max-[699px]:hidden" onClick={(e) => { e.stopPropagation(); abrirViewer(item); }}>Abrir</button>
                <button type="button" className="relative z-[1] h-[38px] w-[38px] shrink-0 cursor-pointer rounded-md border-0 bg-transparent text-[22px] tracking-[1px] text-[#8a90a0] transition-colors duration-200 hover:bg-[#f0f0f5] hover:text-[#333] max-[699px]:h-8 max-[699px]:w-8 max-[699px]:p-[3px]" title="Opções" onClick={(e) => { e.stopPropagation(); abrirDropdown(item.id, e.currentTarget); }}>&#8942;</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ListaArquivos;
