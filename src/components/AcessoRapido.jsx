import { Link } from "react-router-dom"

const AcessoRapido = ({itens}) => {
  return (
    <>
      <div className="flex items-baseline justify-between">
        <h2 className="mb-3 mt-[22px] text-[1.05rem] font-extrabold text-[#12142b]">Acesso rápido</h2>
        <Link to="/materias" className="mt-3 inline-block text-[13px] font-bold text-[#000fb0]">
          Ver todos
        </Link>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {itens.map((item) => (
          <Link to={item.link} className="flex flex-col items-center gap-2 rounded-2xl bg-white px-2 py-4 text-[12.5px] font-bold text-[#333] shadow-[var(--sombra)] transition-transform duration-200 ease-in-out hover:-translate-y-[3px]" key={item.id}>
            <span className={`flex h-[42px] w-[42px] items-center justify-center rounded-xl text-[20px] ${item.cor}`}>{item.icone}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </>
  )
}

export default AcessoRapido