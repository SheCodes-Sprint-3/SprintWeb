import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AcessoRapido from "../components/AcessoRapido";
import ProgressoCard from "../components/ProgressoCard";
import ResumoCards from "../components/ResumoCards";
import ProximasProvas from "../components/ProximasProvas";
import UltimosArquivos from "../components/UltimosArquivos";

const Home = () => {
    const [nomeUsuario] = useState(() => {
        try {
            const perfil = JSON.parse(localStorage.getItem("joviclass:perfil") || "{}");
            return perfil.nome?.trim().split(" ")[0] || "Helena";
        } catch {
            return "Helena";
        }
    });

    const [provas] = useState(() => {
        try {
            const eventos = JSON.parse(localStorage.getItem("joviclass:eventos") || "[]");
            const hoje = new Date();
            hoje.setHours(0, 0, 0, 0);
            const cores = ["roxo", "verde", "azul", "laranja"];

            return eventos
                .filter((e) => e.categoria === "Prova")
                .map((e) => ({ ...e, dataObj: new Date(e.data) }))
                .filter((e) => e.dataObj >= hoje)
                .sort((a, b) => a.dataObj - b.dataObj)
                .slice(0, 3)
                .map((e, i) => ({
                    id: e.id,
                    materia: e.titulo,
                    icone: "📝",
                    cor: cores[i % cores.length],
                    data: e.dataObj.toLocaleDateString("pt-BR"),
                    diasRestantes: Math.round((e.dataObj - hoje) / 86400000),
                }));
        } catch {
            return [];
        }
    });

    const [ultimosArquivos] = useState(() => {
        try {
            const materias = JSON.parse(localStorage.getItem("materias") || "[]");
            const todos = [];

            materias.forEach((m) => {
                const itens = JSON.parse(localStorage.getItem(`materia:${m.id}:itens`) || "[]");
                itens.forEach((item) => todos.push({ ...item, nomeMateria: m.nome }));
            });

            const icones = { anotacao: "📝", pdf: "📄", imagem: "🖼️" };
            const cores = { anotacao: "laranja", pdf: "roxo", imagem: "verde" };

            return todos
                .sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm))
                .slice(0, 3)
                .map((item) => {
                    const tipo = item.tipo === "anotacao" ? "anotacao" : item.tipoArquivo;
                    return {
                        id: item.id,
                        nome: item.nome,
                        materia: item.nomeMateria,
                        data: new Date(item.criadoEm).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" }),
                        icone: icones[tipo] || "📁",
                        cor: cores[tipo] || "azul",
                    };
                });
        } catch {
            return [];
        }
    });

    const [tarefas] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem("joviclass:tarefas") || "[]");
        } catch {
            return [];
        }
    });

    const totalTarefas = tarefas.length;
    const tarefasConcluidas = tarefas.filter((t) => t.concluida).length;

    const progresso = {
        valor: totalTarefas === 0 ? 0 : Math.round((tarefasConcluidas / totalTarefas) * 100),
        tarefasConcluidas,
        materiasEstudadas: 2,
        anotacoesFeitas: 12,
    };

    const [contagens] = useState(() => {
        try {
            const materias = JSON.parse(localStorage.getItem("materias") || "[]");
            let arquivos = 0;
            let anotacoes = 0;

            materias.forEach((m) => {
                const itens = JSON.parse(localStorage.getItem(`materia:${m.id}:itens`) || "[]");
                arquivos += itens.filter((i) => i.tipo === "arquivo").length;
                anotacoes += itens.filter((i) => i.tipo === "anotacao").length;
            });

            return { materias: materias.length, arquivos, anotacoes };
        } catch {
            return { materias: 0, arquivos: 0, anotacoes: 0 };
        }
    });

    return (
        <main className="mx-auto w-full max-w-[1100px] flex-1 px-[18px] py-[22px] pb-10 min-[900px]:px-11 min-[900px]:py-10">
            <div className="mb-5">
                <h1 className="mb-0.5 text-[1.7rem] font-extrabold text-[#12142b]">
                    Olá, {nomeUsuario}!
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

            <ResumoCards
                itens={[
                    { label: "Matérias", valor: contagens.materias },
                    { label: "Arquivos", valor: contagens.arquivos },
                    { label: "Anotações", valor: contagens.anotacoes },
                    { label: "Tarefas", valor: totalTarefas },
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
                <ProximasProvas provas={provas} />
                <UltimosArquivos arquivos={ultimosArquivos} />
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

        </main>
    );
};

export default Home;