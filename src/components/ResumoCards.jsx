const ResumoCards = ({ itens }) => {
  return (
    <>
      <h2 className="mb-3 mt-[22px] text-[1.05rem] font-extrabold text-[#12142b]">
        Seu resumo
      </h2>

      <div className="grid grid-cols-2 gap-[14px] min-[900px]:grid-cols-4">
        {itens.map((item) => (
          <div
            className="rounded-[var(--raio)] bg-[var(--bg-color2)] p-[18px] text-center shadow-[var(--sombra)]"
            key={item.label}
          >
            <span className="text-xs font-semibold text-[var(--bg-color5)]">
              {item.label}
            </span>
            <p className="mt-[6px] text-[1.7rem] font-extrabold text-[var(--bg-color1)]">
              {item.valor}
            </p>
          </div>
        ))}
      </div>
    </>
  );
};

export default ResumoCards;