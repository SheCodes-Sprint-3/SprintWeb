import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HeaderPagina from "./components/HeaderPagina";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import PaginaMateria from "./pages/PaginaMateria";
import Comunidades from "./pages/Comunidades";
import Calendario from "./pages/Calendario";
import Camera from "./pages/Camera";
import Perfil from "./pages/Perfil";
import "./index.css";

const notificacoesIniciais = [
  { id: 1, texto: "Sua prova de Cálculo I é em 10 dias.", lida: false },
  { id: 2, texto: "Nova anotação adicionada em Física II.", lida: false },
  { id: 3, texto: "Você completou 3 tarefas hoje. Parabéns!", lida: true },
];

function Layout({ children, notificacoes, marcarTodasComoLidas }) {
  return (
    <div className="flex min-h-screen flex-col min-[900px]:flex-row">
      <HeaderPagina
        notificacoes={notificacoes}
        marcarTodasComoLidas={marcarTodasComoLidas}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="w-full flex-1">
          {children}
        </main>
        <Footer />
      </div>
    </div>
  );
}

const App = () => {
  const [notificacoes, setNotificacoes] = useState(notificacoesIniciais);

  function marcarTodasComoLidas() {
    setNotificacoes((atual) =>
      atual.map((notificacao) => ({ ...notificacao, lida: true }))
    );
  }

  const pagina = (componente) => (
    <Layout
      notificacoes={notificacoes}
      marcarTodasComoLidas={marcarTodasComoLidas}
    >
      {componente}
    </Layout>
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={pagina(<Home />)} />
        <Route path="/materias" element={pagina(<Materias />)} />
        <Route path="/materias/:id" element={pagina(<PaginaMateria />)} />
        <Route path="/calendario" element={pagina(<Calendario />)} />
        <Route path="/comunidades" element={pagina(<Comunidades />)} />
        <Route path="/perfil" element={pagina(<Perfil />)} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;