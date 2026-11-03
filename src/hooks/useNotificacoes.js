import useLocalStorage from "./useLocalStorage";

const agora = Date.now();
const minutosAtras = (min) => new Date(agora - min * 60 * 1000).toISOString();

// Notificações fictícias: só entram no localStorage na primeira vez
const NOTIFICACOES_INICIAIS = [
  {
    id: 1,
    titulo: "Prova de Literatura",
    mensagem: "Sua prova é amanhã. Que tal revisar suas anotações?",
    data: minutosAtras(20),
    lida: false,
  },
  {
    id: 2,
    titulo: "Nova entrega",
    mensagem: "Trabalho de Filosofia vence em 3 dias.",
    data: minutosAtras(180),
    lida: false,
  },
  {
    id: 3,
    titulo: "Arquivo salvo",
    mensagem: "Sua foto foi adicionada à matéria Língua Portuguesa.",
    data: minutosAtras(60 * 26),
    lida: true,
  },
];

export default function useNotificacoes() {
  const [notificacoes, setNotificacoes] = useLocalStorage(
    "notificacoes",
    NOTIFICACOES_INICIAIS
  );

  const naoLidas = notificacoes.filter((n) => !n.lida).length;

  function marcarTodasComoLidas() {
    setNotificacoes((atuais) => atuais.map((n) => ({ ...n, lida: true })));
  }

  // carregando e erro continuam no retorno para não quebrar quem já os usa
  return {
    notificacoes,
    naoLidas,
    carregando: false,
    erro: null,
    marcarTodasComoLidas,
  };
}