import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../assets/logo.png";

const HeaderPagina = ({ notificacoes, marcarTodasComoLidas }) => {
    const [menuAberto, setMenuAberto] = useState(false);
    const [notifAberto, setNotifAberto] = useState(false);
    const { pathname } = useLocation();

    const naoLidas = notificacoes.filter((n) => !n.lida).length;

    const linkClass = (rota) =>
        `rounded-xl px-[18px] py-[13px] text-sm font-semibold text-center text-white backdrop-blur-[6px] shadow-[0_4px_10px_rgba(0,0,0,0.15)] transition-all duration-200 hover:translate-x-1 hover:bg-[rgba(255,255,255,0.28)] ${pathname === rota
            ? "bg-[linear-gradient(135deg,var(--bg-color4),#4da3ff)] shadow-[0_6px_18px_rgba(20,102,255,0.4)]"
            : "bg-[var(--bg-color3)]"
        }`;

    return (
        <header className="relative  sticky top-0 z-30 flex flex-col bg-[linear-gradient(135deg,var(--grad-inicio)_0%,var(--grad-fim)_100%)] px-5 py-[18px] text-white shadow-[0_4px_20px_rgba(0,0,0,0.15)] min-[900px]:max-h-screen min-[900px]:min-h-screen min-[900px]:w-[280px] min-[900px]:shrink-0 min-[900px]:self-start min-[900px]:overflow-y-auto min-[900px]:px-[22px] min-[900px]:py-[30px]">
            <div className="flex items-center justify-between min-[900px]:flex-col min-[900px]:gap-[14px]">
                <div className="flex items-center gap-3 min-[900px]:flex-col">
                    <img
                        src={logo}
                        alt="Logo JoviClass"
                        className="h-auto w-10 rounded-[10px] min-[900px]:w-16"
                    />
                    <h2 className="m-0 text-2xl font-extrabold tracking-[-0.3px] text-white min-[900px]:text-center">
                        JoviClass
                    </h2>
                </div>

                <div className="flex items-center gap-[14px] min-[900px]:flex-col-reverse min-[900px]:gap-2.5">
                    <div className="relative">
                        <button
                            type="button"
                            id="notifBtn"
                            aria-label="Notificações"
                            aria-haspopup="true"
                            aria-expanded={notifAberto}
                            onClick={() => setNotifAberto((aberto) => !aberto)}
                            className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-0 bg-[var(--bg-color3)] text-white"
                        >
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                            >
                                <path
                                    d="M12 3a6 6 0 0 0-6 6v3.586l-1.707 1.707A1 1 0 0 0 5 16h14a1 1 0 0 0 .707-1.707L18 12.586V9a6 6 0 0 0-6-6Z"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M9.5 19a2.5 2.5 0 0 0 5 0"
                                    stroke="currentColor"
                                    strokeWidth="1.7"
                                    strokeLinecap="round"
                                />
                            </svg>

                            {naoLidas > 0 && (
                                <span
                                    id="notifDot"
                                    className="absolute -right-1 -top-1 flex h-[17px] w-[17px] items-center justify-center rounded-full border-2 border-[var(--grad-fim)] bg-[#ff4d6d] text-[10px] font-extrabold text-white"
                                >
                                    {naoLidas}
                                </span>
                            )}
                        </button>

                        {notifAberto && (
                            <div
                                id="notifPanel"
                                className="z-[60] overflow-hidden rounded-2xl bg-white text-[#12142b] shadow-[var(--sombra-forte)] max-[899px]:fixed max-[899px]:left-3 max-[899px]:right-3 max-[899px]:top-[84px] min-[900px]:absolute min-[900px]:left-1/2 min-[900px]:top-[calc(100%+12px)] min-[900px]:w-[252px] min-[900px]:-translate-x-1/2"                            >
                                <div className="flex items-center justify-between gap-2 border-b border-[#eef0f5] px-4 py-[14px]">
                                    <strong className="text-sm">Notificações</strong>
                                    <button
                                        type="button"
                                        id="notifMarcarLidas"
                                        className="cursor-pointer border-0 bg-transparent text-[11.5px] font-bold text-[var(--bg-color1)]"
                                        onClick={marcarTodasComoLidas}
                                    >
                                        Marcar todas como lidas
                                    </button>
                                </div>

                                <div id="notifLista" className="max-h-[340px] overflow-y-auto">
                                    {notificacoes.length === 0 ? (
                                        <p className="px-4 py-6 text-center text-[13px] text-[var(--bg-color5)]">
                                            Nenhuma notificação.
                                        </p>
                                    ) : (
                                        notificacoes.map((n) => (
                                            <div
                                                key={n.id}
                                                className={`cursor-pointer border-b border-[#f5f5fa] px-4 py-3 last:border-b-0 ${!n.lida ? "bg-[#f6f7ff]" : "bg-white"
                                                    }`}
                                            >
                                                <span className="text-[13px] text-[#12142b]">
                                                    {n.texto}
                                                </span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        type="button"
                        id="hamburger"
                        aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
                        aria-expanded={menuAberto}
                        onClick={() => setMenuAberto((aberto) => !aberto)}
                        className="flex cursor-pointer flex-col gap-[5px] border-0 bg-transparent p-[6px] min-[900px]:hidden"
                    >
                        <span className="h-[3px] w-6 rounded-[3px] bg-white transition-all duration-300" />
                        <span className="h-[3px] w-6 rounded-[3px] bg-white transition-all duration-300" />
                        <span className="h-[3px] w-6 rounded-[3px] bg-white transition-all duration-300" />
                    </button>
                </div>
            </div>

            <nav
                id="menuLinks"
                className={`${menuAberto ? "flex" : "hidden"} mt-5 w-full flex-col gap-2.5 min-[900px]:mt-10 min-[900px]:flex`}
            >
                <Link
                    to="/"
                    className={linkClass("/")}
                    onClick={() => setMenuAberto(false)}
                >
                    Início
                </Link>

                <Link
                    to="/perfil"
                    className={linkClass("/perfil")}
                    onClick={() => setMenuAberto(false)}
                >
                    Perfil
                </Link>

                <Link
                    to="/materias"
                    className={linkClass("/materias")}
                    onClick={() => setMenuAberto(false)}
                >
                    Matérias
                </Link>

                <Link
                    to="/calendario"
                    className={linkClass("/calendario")}
                    onClick={() => setMenuAberto(false)}
                >
                    Calendário
                </Link>

                <Link
                    to="/comunidades"
                    className={linkClass("/comunidades")}
                    onClick={() => setMenuAberto(false)}
                >
                    Comunidades
                </Link>

                <Link
                    to="/camera"
                    className={linkClass("/camera")}
                    onClick={() => setMenuAberto(false)}
                >
                    Voltar a câmera ↩
                </Link>
            </nav>
        </header>
    );
};

export default HeaderPagina;