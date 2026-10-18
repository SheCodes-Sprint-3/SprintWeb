import { Link } from "react-router-dom";

const HeaderMateria = ({ nomeMateria, busca, setBusca }) => {
  return (
    <>
      <section className="flex flex-col items-stretch gap-[18px] max-[699px]:gap-[17px] min-[900px]:max-w-[980px]">
        <Link to="/materias" className="inline-flex w-fit items-center gap-1 text-[14px] font-bold text-[#145cff] no-underline transition-opacity duration-200 hover:opacity-70">← Voltar</Link>

        <div className="flex flex-col gap-[20px]">
            <h1 className="m-0 text-[clamp(32px,5vw,46px)] leading-none font-extrabold tracking-[-1.4px] text-[#101b4d] max-[699px]:text-[38px]">{nomeMateria}</h1>

            <div className="mt-[30px] flex h-[56px] w-full items-center overflow-hidden rounded-2xl border border-[#e3e6ef] bg-white shadow-[0_4px_14px_rgba(15,36,90,0.04)] max-[699px]:h-[52px] max-[699px]:rounded-[15px] min-[900px]:max-w-[620px]">
                <span className="flex items-center justify-center ml-[18px] text-[#66718b]" aria-hidden="true">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </span>

                <input type="text" placeholder="Buscar Arquivos..." value={busca} onChange={(e) => setBusca(e.target.value)} className="h-full w-full flex-1 border-0 px-[14px] text-[16px] text-[#101b4d] outline-none placeholder:text-[#7d8496]" />

                <button aria-label="Buscar" type="button" className="flex h-[56px] w-[58px] shrink-0 cursor-pointer items-center justify-center border-0 bg-[linear-gradient(135deg,#1466ff,#0c51dd)] text-white max-[699px]:h-[52px] max-[699px]:w-[54px]">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                </button>
            </div>
        </div>
      </section>
    </>
  )
}

export default HeaderMateria
