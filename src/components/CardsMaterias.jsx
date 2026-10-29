
import { useNavigate } from "react-router-dom";

function contarItens(id) {
  try {
    const itens = JSON.parse(localStorage.getItem(`materia:${id}:itens`) || "[]");
    return itens.length;
  } catch {
    return 0;
  }
}

const CardsMaterias = ({ materias, abrirDropdown }) => {
  const navigate = useNavigate();

  function abrirMateria(id, nome) {
    navigate(`/materias/${id}?nome=${encodeURIComponent(nome)}`);
  }

  const corFundo = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    const mix = (c) => Math.round(c * 0.15 + 255 * 0.85);
    return `rgb(${mix(r)}, ${mix(g)}, ${mix(b)})`;
  };

  return (
    <div className="mt-10 flex flex-wrap gap-5">
      {materias.length === 0 ? (
        <p className="mt-5 text-sm text-[#888]">
          Nenhuma matéria cadastrada ainda.
        </p>
      ) : (
        materias.map((materia) => {
          const cor = materia.cor || "#1466ff";
          const bg = corFundo(cor);
          const totalArquivos = contarItens(materia.id);

          return (
            <div
              key={materia.id}
              className="relative w-full cursor-pointer rounded-2xl bg-[var(--bg-color2)] p-5 text-black no-underline shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition duration-200 hover:-translate-y-[3px] hover:shadow-[0_6px_15px_rgba(0,0,0,0.12)] min-[900px]:w-[220px]"
              onClick={() => abrirMateria(materia.id, materia.nome)}
            >
              <div className="flex items-start justify-between">
                <svg
                  className="h-[42px] w-[42px] shrink-0"
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <rect width="48" height="48" rx="12" fill={bg} />
                  <path
                    d="M14 34V16a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v18l-6-3-4 3-4-3-6 3z"
                    fill={cor}
                  />
                </svg>

                <button
                  className="-mr-1.5 -mt-1 cursor-pointer rounded-md border-0 bg-transparent px-1.5 py-1 text-lg leading-none tracking-[1px] text-[var(--bg-color5)] transition-colors duration-200 hover:bg-[#f0f0f5] hover:text-[#333]"
                  title="Opções"
                  aria-label={`Opções da matéria ${materia.nome}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    abrirDropdown(materia.id, e.currentTarget);
                  }}
                >
                  &#8942;
                </button>
              </div>

              <h3 className="mt-[15px] font-bold">{materia.nome}</h3>
              <p className="mt-2 text-sm text-[var(--bg-color5)]">
                {totalArquivos} arquivo(s)
              </p>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CardsMaterias;
