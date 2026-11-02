import { AuthContext } from "./AuthContext";
import useLocalStorage from "../hooks/useLocalStorage";
import { request } from "../services/api";

export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useLocalStorage("usuario", null);

  async function login(email, senha) {
    const lista = await request("/usuario");

    const encontrado = (Array.isArray(lista) ? lista : []).find(
      (u) =>
        String(u.email ?? "").trim().toLowerCase() === email.toLowerCase() &&
        String(u.senha ?? "") === senha
    );
    if (!encontrado) throw new Error("E-mail ou senha inválidos.");

    const { senha: _senha, ...semSenha } = encontrado;
    setUsuario(semSenha);
  }

  function logout() {
    setUsuario(null);
  }

  return (
    <AuthContext.Provider
      value={{ usuario, autenticado: Boolean(usuario), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}