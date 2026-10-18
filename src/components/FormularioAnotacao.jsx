
const FormularioAnotacao = ({ tituloAnotacao, textoAnotacao, setTituloAnotacao, setTextoAnotacao, cancelar, salvar }) => {
  return (
    <div className="mt-6 w-full rounded-[22px] bg-white p-7 shadow-[0 8px 24px rgba(18, 42, 110, .07)] max-[699px]:p-5">
      <div className="mb-5 flex items-center justify-between">
        <h2 className="text-[18px] text-[#222]">Nova Anotação</h2>
        <button type="button" className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border-0 bg-[#f0f0f5] text-[14px] text-[#555] transition-colors duration-200 hover:bg-[#e0e0e5]" onClick={cancelar}>✕</button>
      </div>

      <input type="text" className="mb-3 w-full rounded-[10px] border border-[#ddd] px-[14px] py-3 text-[15px] font-semibold outline-none transition-colors duration-200 focus:border-[#145cff]" placeholder="Título da anotação..." value={tituloAnotacao} onChange={(e) => setTituloAnotacao(e.target.value)} />

      <textarea className="min-h-[200px] w-full resize-y rounded-[10px] border border-[#ddd] p-[14px] text-[14px] leading-[1.6] outline-none transition-colors duration-200 focus:border-[#145cff]" placeholder="Escreva suas anotações aqui..." value={textoAnotacao} onChange={(e) => setTextoAnotacao(e.target.value)} />

      <div className="mt-4 flex justify-end gap-[10px] max-[699px]:flex-wrap">
        <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-2 border-[var(--bg-color4,#1466ff)] bg-transparent px-4 py-[10px] text-[14px] font-semibold text-[var(--bg-color4,#1466ff)] transition-all duration-200 hover:bg-[var(--bg-color4,#1466ff)] hover:text-white max-[699px]:flex-1" onClick={cancelar}>Cancelar</button>
        <button type="button" className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg border-0 bg-[var(--bg-color4,#1466ff)] px-4 py-[10px] text-[14px] font-semibold text-white transition-colors duration-200 hover:bg-[#0d55e0] max-[699px]:flex-1" onClick={salvar}>Salvar anotação</button>
      </div>
    </div>
  );
};

export default FormularioAnotacao;
