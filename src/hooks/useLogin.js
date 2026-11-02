import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "./useAuth";

// Lógica do formulário de login (a página só cuida do visual).
export default function useLogin() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const destino = location.state?.de?.pathname ?? "/";

  const [campos, setCampos] = useState({ email: "", senha: "" });
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  // atualizar("email") devolve o onChange do campo
  const atualizar = (nome) => (evento) =>
    setCampos((atual) => ({ ...atual, [nome]: evento.target.value }));

  async function enviar(evento) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await login(campos.email.trim(), campos.senha);
      navigate(destino, { replace: true });
    } catch (e) {
      setErro(e.message);
    } finally {
      setEnviando(false);
    }
  }

  return { campos, atualizar, erro, enviando, enviar };
}
