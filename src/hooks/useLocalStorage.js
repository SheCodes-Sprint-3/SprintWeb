import { useState } from "react";

// Igual ao useState, mas persiste o valor no localStorage.
export default function useLocalStorage(chave, valorInicial) {
  const [valor, setValor] = useState(() => {
    try {
      const salvo = localStorage.getItem(chave);
      return salvo !== null ? JSON.parse(salvo) : valorInicial;
    } catch {
      return valorInicial;
    }
  });

  function definirValor(novo) {
    setValor((atual) => {
      const resultado = typeof novo === "function" ? novo(atual) : novo;
      try {
        if (resultado === null || resultado === undefined) {
          localStorage.removeItem(chave);
        } else {
          localStorage.setItem(chave, JSON.stringify(resultado));
        }
      } catch {
        // localStorage indisponível: segue só em memória
      }
      return resultado;
    });
  }

  return [valor, definirValor];
}
