import useFetch from "./useFetch";

export function useMaterias() {
  const { dados, carregando, erro, recarregar } = useFetch("/materias");
  return { materias: dados ?? [], carregando, erro, recarregar };
}

export function useMateria(id) {
  const { dados, carregando, erro } = useFetch(id ? `/materias/${id}` : null);
  return { materia: dados, carregando, erro };
}
