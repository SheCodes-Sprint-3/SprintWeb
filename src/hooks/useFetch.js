import { useCallback, useEffect, useState } from "react";
import { request } from "../services/api";

export default function useFetch(caminho) {
  const [dados, setDados] = useState(null);
  const [carregando, setCarregando] = useState(Boolean(caminho));
  const [erro, setErro] = useState(null);

  const buscar = useCallback(async () => {
    if (!caminho) return;
    setCarregando(true);
    setErro(null);
    try {
      setDados(await request(caminho));
    } catch (e) {
      setErro(e.message);
    } finally {
      setCarregando(false);
    }
  }, [caminho]);

  useEffect(() => {
    buscar();
  }, [buscar]);

  return { dados, setDados, carregando, erro, recarregar: buscar };
}
