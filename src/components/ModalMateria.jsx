
const ModalMateria = ({ aberto, editandoId, nomeInput, corSelecionada, inputRef, cores, mudarNome, mudarCor, cancelar, salvar }) => {
  if (!aberto) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) cancelar();
      }}
    >
      <div className="w-full max-w-[420px] rounded-[20px] bg-[var(--bg-color2)] p-[30px]">
        <div className="flex items-center justify-between text-base font-bold">
          <p>{editandoId !== null ? "Renomear Matéria" : "Nova Matéria"}</p>
          <button
            className="flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-lg border-0 bg-[var(--bg-color4)] text-sm text-white"
            onClick={cancelar}
            aria-label="Fechar modal"
          >
            ✕
          </button>
        </div>

        <div className="mt-[25px] flex flex-col gap-[10px]">
          <label htmlFor="nomeMateria" className="text-sm font-semibold text-[#444]">
            Nome da matéria
          </label>
          <input
            ref={inputRef}
            type="text"
            id="nomeMateria"
            placeholder="Ex: Matemática"
            value={nomeInput}
            onChange={(e) => mudarNome(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") salvar();
            }}
            className="rounded-[10px] border border-[#ccc] p-[14px] text-[15px] outline-none transition-colors focus:border-[var(--bg-color4)]"
          />
        </div>

        <div className="mt-[25px] flex flex-col gap-[10px]">
          <label className="text-sm font-semibold text-[#444]">Cor da matéria</label>
          <div className="flex flex-wrap gap-[10px] max-[899px]:gap-2">
            {cores.map(({ cor, nome }) => (
              <button
                key={cor}
                type="button"
                className={`h-8 w-8 cursor-pointer rounded-full border-[3px] border-solid p-0 outline-none transition-[transform,border-color] duration-150 hover:scale-[1.15] ${
                  corSelecionada === cor
                    ? "scale-[1.15] border-[#222]"
                    : "border-transparent"
                }`}
                style={{ background: cor }}
                title={nome}
                aria-label={nome}
                aria-pressed={corSelecionada === cor}
                onClick={() => mudarCor(cor)}
              />
            ))}
          </div>
        </div>

        <div className="mt-[30px] flex justify-end gap-[10px] max-[899px]:flex-col">
          <button
            className="cursor-pointer rounded-lg border-0 bg-[#e0e0e0] px-[18px] py-[10px] font-semibold text-[#383838] transition-colors hover:bg-[#ccc] max-[899px]:w-full"
            onClick={cancelar}
          >
            Cancelar
          </button>
          <button
            className="cursor-pointer rounded-lg border-0 bg-[var(--bg-color4)] px-[18px] py-[10px] font-semibold text-[var(--bg-color2)] transition-colors hover:bg-[#0d55e0] max-[899px]:w-full"
            onClick={salvar}
          >
            {editandoId !== null ? "Salvar" : "Criar Matéria"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalMateria;
