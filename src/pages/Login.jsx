import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import useAuth from "../hooks/useAuth";
import useLogin from "../hooks/useLogin";
import logo from "../assets/logo.png"; 


const classeRotulo = "text-xs font-bold text-[#333]";
const classeInput =
  "h-12 w-full rounded-xl border border-[#e0e4ff] bg-[#fafaff] px-[15px] " +
  "text-[13.5px] text-[#12142b] placeholder:text-[#aaa] outline-none transition " +
  "focus:border-[#1466ff] focus:bg-white focus:ring-[3px] focus:ring-[#1466ff]/10";

export default function Login() {
  const { autenticado } = useAuth();
  const { campos, atualizar, erro, enviando, enviar } = useLogin();
  const [mostrarSenha, setMostrarSenha] = useState(false);

  if (autenticado) return <Navigate to="/home" replace />;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[linear-gradient(135deg,#0015d6_0%,#000fb0_55%,#07147d_100%)] p-4 font-[Manrope,Arial,sans-serif] min-[651px]:items-center sm:p-5">
      <div className="w-full max-w-[430px] rounded-[20px] bg-white px-[22px] pb-[25px] pt-[30px] text-center shadow-[0_25px_60px_rgba(0,0,0,0.25),0_8px_25px_rgba(0,15,176,0.18)] sm:rounded-3xl sm:px-[34px] sm:pb-8 sm:pt-[38px]">
        <div className="mb-[18px] flex flex-col items-center gap-2">
          <img
            src={logo}
            alt="Logo JoviClass"
            className="h-[54px] w-[54px] rounded-[14px] object-cover shadow-[0_8px_20px_rgba(0,15,176,0.2)] sm:h-16 sm:w-16 sm:rounded-2xl"
          />
          <span className="text-[1.1rem] font-extrabold tracking-tight text-[#12142b]">
            JoviClass
          </span>
        </div>

        <div className="mb-[22px]">
          <h1 className="text-[1.3rem] font-extrabold tracking-tight text-[#12142b] sm:text-2xl">
            Falta pouco para começar
          </h1>
          <p className="mx-auto mt-2 max-w-[330px] text-[12.5px] leading-relaxed text-[#888] sm:text-[13.5px]">
            Entre na sua conta para continuar seus estudos.
          </p>
        </div>

        <form onSubmit={enviar} className="flex flex-col gap-4 text-left">
          <div className="flex flex-col gap-1.5">
            <label htmlFor="loginEmail" className={classeRotulo}>
              E-mail
            </label>
            <input
              id="loginEmail"
              type="email"
              placeholder="seuemail@email.com"
              autoComplete="email"
              required
              value={campos.email}
              onChange={atualizar("email")}
              className={classeInput}
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="loginSenha" className={classeRotulo}>
              Senha
            </label>
            <div className="relative flex items-center">
              <input
                id="loginSenha"
                type={mostrarSenha ? "text" : "password"}
                placeholder="Digite sua senha"
                autoComplete="current-password"
                required
                value={campos.senha}
                onChange={atualizar("senha")}
                className={`${classeInput} pr-11`}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha((v) => !v)}
                aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                className={`absolute right-1.5 flex h-[34px] w-[34px] items-center justify-center rounded-lg transition hover:bg-[#eef0ff] hover:text-[#000fb0] ${
                  mostrarSenha ? "text-[#000fb0]" : "text-[#888]"
                }`}
              >
                {mostrarSenha ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={enviando}
            className="mt-1 min-h-12 w-full rounded-xl bg-[linear-gradient(135deg,#0015d6,#1466ff)] text-sm font-extrabold text-white shadow-[0_7px_18px_rgba(0,15,176,0.25)] transition hover:-translate-y-0.5 hover:shadow-[0_10px_24px_rgba(0,15,176,0.32)] active:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0"
          >
            {enviando ? "Aguarde..." : "Continuar"}
          </button>
        </form>

        {erro && (
          <p
            role="alert"
            className="mt-3.5 rounded-[10px] border border-[#ffc5cc] bg-[#ffe8eb] px-[13px] py-[11px] text-xs font-bold leading-normal text-[#d92d4f]"
          >
            {erro}
          </p>
        )}

        {/* Privacidade */}
        <p className="mt-[22px] text-[10.5px] leading-normal text-[#999]">
          🔒 Seus dados são utilizados apenas para autenticação e
          funcionamento do JoviClass.
        </p>
      </div>
    </div>
  );
}