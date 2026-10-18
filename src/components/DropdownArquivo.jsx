
const DropdownArquivo = ({ dropdown, itens, abrirViewer, baixarItem, excluirItem }) => {
  if (!dropdown) return null;

  const item = itens.find((i) => i.id === dropdown.id);
  if (!item) return null;

  return (
    <div className="fixed z-[400] min-w-[180px] rounded-xl bg-white p-[6px] shadow-[0_8px_30px_rgba(0,0,0,0.15)] animate-[fadeInDrop_0.15s_ease]" style={{ top: dropdown.top, left: dropdown.left }}>
      <button type="button" className="flex w-full cursor-pointer items-center gap-[10px] rounded-lg border-0 bg-transparent px-[14px] py-[10px] text-left text-[14px] font-semibold text-[#333] transition-colors duration-150 hover:bg-[#f0f0f5]" onClick={() => abrirViewer(item)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
        Abrir
      </button>

      <button type="button" className="flex w-full cursor-pointer items-center gap-[10px] rounded-lg border-0 bg-transparent px-[14px] py-[10px] text-left text-[14px] font-semibold text-[#333] transition-colors duration-150 hover:bg-[#f0f0f5]" onClick={() => baixarItem(dropdown.id)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        Baixar
      </button>

      <button type="button" className="flex w-full cursor-pointer items-center gap-[10px] rounded-lg border-0 bg-transparent px-[14px] py-[10px] text-left text-[14px] font-semibold text-[#cc0000] transition-colors duration-150 hover:bg-[#fff0f0]" onClick={() => excluirItem(dropdown.id)}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="3 6 5 6 21 6" />
          <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
          <path d="M10 11v6" />
          <path d="M14 11v6" />
          <path d="M9 6V4h6v2" />
        </svg>
        Excluir
      </button>
    </div>
  );
};

export default DropdownArquivo;
