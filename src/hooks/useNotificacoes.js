import { request } from "../services/api";
import useFetch from "./useFetch";

// Estado e regras das notificações, fora do App.
// Espera na API: /notificacoes  ->  { id, texto, lida }
export default function useNotificacoes() {
  const { dados, setDados, carregando, erro } = useFetch("/notificacoes");
  const notificacoes = dados ?? [];

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  async function marcarTodasComoLidas() {
    const pendentes = notificacoes.filter((n) => !n.lida);
    // Atualiza a tela na hora...
    setDados((atual) => (atual ?? []).map((n) => ({ ...n, lida: true })));
    // ...e sincroniza com a API.
    try {
      await Promise.all(
        pendentes.map((n) =>
          request(`/notificacoes/${n.id}`, {
            method: "PUT",
            body: JSON.stringify({ ...n, lida: true }),
          })
        )
      );
    } catch (e) {
      console.error("Falha ao sincronizar notificações:", e.message);
    }
  }

  return { notificacoes, naoLidas, carregando, erro, marcarTodasComoLidas };
}
