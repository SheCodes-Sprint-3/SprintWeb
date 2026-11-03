import useAuth from "./useAuth";
import useLocalStorage from "./useLocalStorage";

export default function usePerfil() {
  const { usuario } = useAuth();
  const chave = `joviclass:perfil:${usuario?.id ?? "visitante"}`;
  const [salvo, setSalvo] = useLocalStorage(chave, {});

  const perfil = {
    nome: salvo.nome ?? usuario?.nome ?? "",
    email: salvo.email ?? usuario?.email ?? "",
    curso: salvo.curso ?? "",
  };

  function salvarPerfil(dados) {
    setSalvo(dados);
  }

  return { perfil, salvarPerfil };
}
