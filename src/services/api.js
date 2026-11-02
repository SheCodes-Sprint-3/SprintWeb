// Cliente simples para a API (MockAPI, json-server ou outra).
// Defina VITE_API_URL no .env (local) e nas variáveis de ambiente da Vercel.
// Ex.: VITE_API_URL=https://SEU_ID.mockapi.io/api/v1
export const API_URL = import.meta.env.VITE_API_URL;

export async function request(caminho, opcoes = {}) {
  if (!API_URL) {
    throw new Error("VITE_API_URL não definida. Crie um arquivo .env na raiz.");
  }

  const resposta = await fetch(`${API_URL}${caminho}`, {
    headers: { "Content-Type": "application/json" },
    ...opcoes,
  });

  if (!resposta.ok) {
    const erro = new Error(`Erro ${resposta.status} ao acessar ${caminho}`);
    erro.status = resposta.status;
    throw erro;
  }

  return resposta.json();
}
