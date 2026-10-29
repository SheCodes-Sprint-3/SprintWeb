const UltimosArquivos = ({ arquivos }) => {
  return (
    <div className="flex flex-1 flex-col rounded-[var(--raio)] bg-[var(--bg-color2)] p-[18px] shadow-[var(--sombra)]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-extrabold text-[#12142b]">
          Últimos arquivos
        </h3>
      </div>

      {arquivos.length === 0 && (
        <p className="flex flex-1 items-center justify-center py-6 text-center text-[13px] text-[var(--bg-color5)]">
          Nenhum arquivo ainda. Envie ou crie anotações em uma matéria.
        </p>
      )}

      {arquivos.map((arquivo) => (
        <div
          className="flex items-center justify-between gap-2.5 border-b border-[#f0f0f5] py-3 last-of-type:border-b-0"
          key={arquivo.id}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[13px] font-extrabold text-[var(--bg-color1)] ${arquivo.cor === "roxo"
                ? "bg-[#ede6ff]"
                : arquivo.cor === "azul"
                  ? "bg-[#dbeaff]"
                  : arquivo.cor === "verde"
                    ? "bg-[#d9f7e6]"
                    : arquivo.cor === "laranja"
                      ? "bg-[#ffe9d1]"
                      : "bg-[#dbeaff]"
                }`}
            >
              {arquivo.icone}
            </span>

            <div className="min-w-0">
              <div className="font-bold text-[#333]">{arquivo.nome}</div>

              <div className="text-xs text-[var(--bg-color5)]">
                {arquivo.materia} · {arquivo.data}
              </div>
            </div>
          </div>

          <span className="text-lg text-[var(--bg-color5)]">›</span>
        </div>
      ))}

      <a
        href="/materias"
        className="mt-auto self-start pt-3 text-[13px] font-bold text-[var(--bg-color1)]"
      >
        Ver todas →
      </a>
    </div>
  );
};

export default UltimosArquivos;