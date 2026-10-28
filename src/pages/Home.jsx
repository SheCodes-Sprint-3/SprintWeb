import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AcessoRapido from "../components/AcessoRapido";
import ProgressoCard from "../components/ProgressoCard";
import ResumoCards from "../components/ResumoCards";
import Overlay from "../components/Overlay";
import ProximasProvas from "../components/ProximasProvas";
import UltimosArquivos from "../components/UltimosArquivos";

const Home = () => {
    const [overlayAberto, setOverlayAberto] = useState(false);

    const [progresso, setProgresso] = useState(() => {
        const salvo = localStorage.getItem("joviclass:progresso");
        return salvo
            ? JSON.parse(salvo)
            : {
                valor: 78,
                tarefasConcluidas: 3,
                materiasEstudadas: 2,
                anotacoesFeitas: 12,
            };
    });

    useEffect(() => {
        localStorage.setItem("joviclass:progresso", JSON.stringify(progresso));
    }, [progresso]);

    function confirmarAcao() {
        setProgresso((atual) => ({
            ...atual,
            tarefasConcluidas: atual.tarefasConcluidas + 1,
            valor: Math.min(100, atual.valor + Math.round(100 / 13)),
        }));
        setOverlayAberto(false);
    }

    return (
        <main className="mx-auto w-full max-w-[1100px] flex-1 px-[18px] py-[22px] pb-10 min-[900px]:px-11 min-[900px]:py-10">
            <div className="mb-5">
                <h1 className="mb-0.5 text-[1.7rem] font-extrabold text-[#12142b]">
                    Olá, Helena!
                </h1>
                <p className="mb-5 text-sm text-[var(--bg-color5)]">
                    Vamos continuar seus estudos?
                </p>
            </div>

            <ProgressoCard
                valor={progresso.valor}
                tarefasConcluidas={progresso.tarefasConcluidas}
                materiasEstudadas={progresso.materiasEstudadas}
                anotacoesFeitas={progresso.anotacoesFeitas}
            />

            <button
                type="button"
                className="mt-3 inline-block cursor-pointer rounded-xl border-0 bg-[var(--bg-color1)] px-[18px] py-[11px] text-[13.5px] font-bold text-white"
                onClick={() => setOverlayAberto(true)}
            >
                Marcar tarefa como concluída
            </button>

            <ResumoCards
                itens={[
                    { label: "Matérias", valor: 6 },
                    { label: "Arquivos", valor: 24 },
                    { label: "Anotações", valor: 136 },
                    { label: "Tarefas", valor: 8 },
                ]}
            />

            <AcessoRapido
                itens={[
                    { id: "materias", label: "Matérias", icone: "📘", cor: "bg-[#ede6ff]", link: "/materias" },
                    { id: "arquivos", label: "Arquivos", icone: "🗂️", cor: "bg-[#dbeaff]", link: "/materias" },
                    { id: "anotacoes", label: "Anotações", icone: "✏️", cor: "bg-[#ffe9d1]", link: "/materias" },
                    { id: "tarefas", label: "Tarefas", icone: "✅", cor: "bg-[#d9f7e6]", link: "/calendario" },
                ]}
            />

            <div className="mt-[22px] flex flex-col gap-4 min-[900px]:flex-row">
                <ProximasProvas
                    provas={[
                        { id: 1, materia: "Cálculo I", icone: "ƒ(x)", cor: "roxo", data: "25/05/2024", progresso: 65, diasRestantes: 10 },
                        { id: 2, materia: "Física II", icone: "⚛️", cor: "verde", data: "02/06/2024", progresso: 40, diasRestantes: 18 },
                        { id: 3, materia: "Economia", icone: "💹", cor: "azul", data: "10/06/2024", progresso: 20, diasRestantes: 26 },
                    ]}
                />

                <UltimosArquivos
                    arquivos={[
                        { id: 1, nome: "Funções de 2° grau", materia: "Matemática", data: "20/05", icone: "📄", cor: "laranja" },
                        { id: 2, nome: "Leis de Newton", materia: "Física", data: "19/05", icone: "📄", cor: "verde" },
                        { id: 3, nome: "Demanda e Oferta", materia: "Economia", data: "18/05", icone: "📄", cor: "azul" },
                    ]}
                />
            </div>

            <section className="mt-[22px] flex items-center justify-between gap-4 rounded-[var(--raio)] border border-[var(--lilas-borda)] bg-[var(--lilas-suave)] p-[22px]">
                <div>
                    <span className="text-[13px] font-extrabold text-[var(--bg-color1)]">
                        ✦ Sugestão para hoje
                    </span>
                    <p className="my-2 mb-[14px] max-w-[40ch] text-sm text-[#444]">
                        Você tem uma prova de Cálculo em 10 dias. Que tal revisar derivadas por 30 minutos?
                    </p>
                    <Link
                        to="/materias"
                        className="inline-block rounded-xl bg-[var(--bg-color1)] px-[18px] py-[11px] text-[13.5px] font-bold text-white"
                    >
                        Começar revisão
                    </Link>
                </div>
            </section>

            {overlayAberto && (
                <Overlay
                    cancelar={() => setOverlayAberto(false)}
                    confirmar={confirmarAcao}
                />
            )}
        </main>
    );
};

export default Home;