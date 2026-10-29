const ProximasProvas = ({ provas }) => {
  return (
    <div className="flex flex-1 flex-col rounded-[var(--raio)] bg-[var(--bg-color2)] p-[18px] shadow-[var(--sombra)]">
      <div className="flex items-baseline justify-between">
        <h3 className="text-base font-extrabold text-[#12142b]">
          Próximas provas
        </h3>
      </div>

      {provas.length === 0 && (
        <p className="flex flex-1 items-center justify-center py-6 text-center text-[13px] text-[var(--bg-color5)]">
          Nenhuma prova agendada. Adicione no calendário.
        </p>
      )}

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

              {prova.progresso != null && (
                <div className="mt-[6px] h-[5px] w-[130px] max-w-[40vw] overflow-hidden rounded bg-[#eef0f5]">
                  <span
                    className="block h-full rounded bg-[linear-gradient(90deg,var(--bg-color4),var(--acento-menta))]"
                    style={{ width: `${prova.progresso}%` }}
                  />
                </div>
              )}
            </div>
          </div>

          <span className="whitespace-nowrap rounded-full bg-[var(--lilas-suave)] px-3 py-[5px] text-xs font-bold text-[var(--bg-color1)]">
            {prova.diasRestantes === 0
              ? "Hoje"
              : prova.diasRestantes === 1
                ? "Amanhã"
                : `${prova.diasRestantes} dias`}          </span>
        </div>
      ))}

      <a
        href="/calendario"
        className="mt-auto self-start pt-3 text-[13px] font-bold text-[var(--bg-color1)]"
      >
        Ver todas →
      </a>
    </div>
  );
};

export default ProximasProvas;