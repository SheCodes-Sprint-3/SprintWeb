const ProgressoCard = ({ valor, tarefasConcluidas, materiasEstudadas, anotacoesFeitas }) => {
    const totalBarrinhas = 13;
    const barrinhasAtivas = Math.round((valor / 100) * totalBarrinhas);

    return (
        <section className="flex flex-wrap items-center gap-[22px] rounded-[22px] bg-[linear-gradient(135deg,var(--grad-inicio),var(--bg-color4)_120%)] p-6 text-white shadow-[var(--sombra-forte)]">
            <div className="relative h-[108px] w-[108px] shrink-0">
                <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90">
                    <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="rgba(255,255,255,0.22)"
                        strokeWidth="10"
                    />
                    <circle
                        cx="60"
                        cy="60"
                        r="52"
                        fill="none"
                        stroke="var(--acento-menta-clara)"
                        strokeWidth="10"
                        strokeLinecap="round"
                        strokeDasharray="326.7"
                        strokeDashoffset={`calc(326.7 - (326.7 * ${valor}) / 100)`}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-2xl font-extrabold">
                    {valor}%
                </div>
            </div>

            <div className="min-w-[210px] flex-1">
                <span className="text-[13px] font-bold opacity-90">✦ Seu progresso hoje</span>

                <div className="my-3 flex flex-wrap gap-[5px]" aria-hidden="true">
                    {Array.from({ length: totalBarrinhas }).map((_, i) => {
                        const ativa = i < barrinhasAtivas;
                        const ultimaAtiva = i === barrinhasAtivas - 1;

                        return (
                            <span
                                key={i}
                                className={`h-[7px] w-5 rounded-[4px] ${ultimaAtiva
                                        ? "bg-[var(--acento-menta-clara)]"
                                        : ativa
                                            ? "bg-[var(--acento-menta)]"
                                            : "bg-[rgba(255,255,255,0.25)]"
                                    }`}
                            />
                        );
                    })}
                </div>

                <div className="flex flex-wrap gap-[22px]">
                    <div className="flex flex-col">
                        <strong className="text-[1.2rem] font-extrabold">{tarefasConcluidas}</strong>
                        <span className="text-[11.5px] opacity-[0.85]">tarefas concluídas</span>
                    </div>

                    <div className="flex flex-col">
                        <strong className="text-[1.2rem] font-extrabold">{materiasEstudadas}</strong>
                        <span className="text-[11.5px] opacity-[0.85]">matérias estudadas</span>
                    </div>

                    <div className="flex flex-col">
                        <strong className="text-[1.2rem] font-extrabold">{anotacoesFeitas}</strong>
                        <span className="text-[11.5px] opacity-[0.85]">anotações feitas</span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProgressoCard;