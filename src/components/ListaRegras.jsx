const ListaRegras = ({ regras }) => {
  return (
    <ul className="flex flex-col gap-2.5">
      {regras.map((regra) => (
        <li
          key={regra}
          className="flex items-start gap-3 rounded-xl border border-[#e0e4ff] bg-[#eef0ff] py-3 pl-3 pr-3.5 text-[13.5px] leading-[1.55] text-[#333]"
        >
          <span className="mt-px flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#34d399] text-xs font-extrabold text-[#043b2a]">
            ✓
          </span>
          {regra}
        </li>
      ))}
    </ul>
  );
}

export default ListaRegras