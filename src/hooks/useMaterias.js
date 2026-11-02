import useFetch from "./useFetch";

// Lista de matérias. Espera na API: /materias
export function useMaterias() {
  const { dados, carregando, erro, recarregar } = useFetch("/materias");
  return { materias: dados ?? [], carregando, erro, recarregar };
}

// Uma matéria pelo id (usado em /materias/:id).
export function useMateria(id) {
  const { dados, carregando, erro } = useFetch(id ? `/materias/${id}` : null);
  return { materia: dados, carregando, erro };
}
