const ProximasProvas = ({ provas }) => {
  return (
    <div className="flex-1 rounded-[var(--raio)] bg-[var(--bg-color2)] p-[18px] shadow-[var(--sombra)]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-extrabold text-[#12142b]">
          Próximas provas
        </h3>
      </div>

      {provas.map((prova) => (
        <div
          className="flex items-center justify-between gap-2.5 border-b border-[#f0f0f5] py-3 last-of-type:border-b-0"
          key={prova.id}
        >
          <div className="flex min-w-0 items-center gap-3">
            <span
              className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[10px] text-[13px] font-extrabold text-[var(--bg-color1)] ${prova.cor === "roxo"
                  ? "bg-[#ede6ff]"
                  : prova.cor === "azul"
                    ? "bg-[#dbeaff]"
                    : prova.cor === "verde"
                      ? "bg-[#d9f7e6]"
                      : prova.cor === "laranja"
                        ? "bg-[#ffe9d1]"
                        : "bg-[#dbeaff]"
                }`}
            >
              {prova.icone}
            </span>

            <div className="min-w-0">
              <div className="font-bold text-[#333]">{prova.materia}</div>

              <div className="text-xs text-[var(--bg-color5)]">
                {prova.data}
              </div>

              <div className="mt-[6px] h-[5px] w-[130px] max-w-[40vw] overflow-hidden rounded bg-[#eef0f5]">
                <span
                  className="block h-full rounded bg-[linear-gradient(90deg,var(--bg-color4),var(--acento-menta))]"
                  style={{ width: `${prova.progresso}%` }}
                />
              </div>
            </div>
          </div>

          <span className="whitespace-nowrap rounded-full bg-[var(--lilas-suave)] px-3 py-[5px] text-xs font-bold text-[var(--bg-color1)]">
            10 dias
          </span>
        </div>
      ))}

      <a
        href="/calendario"
        className="mt-3 inline-block text-[13px] font-bold text-[var(--bg-color1)]"
      >
        Ver todas →
      </a>
    </div>
  );
};

export default ProximasProvas;