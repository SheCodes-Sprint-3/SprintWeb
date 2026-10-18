
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
    <>
      <HeaderPagina
        notificacoes={notificacoes}
        marcarTodasComoLidas={marcarTodasComoLidas}
      />
      <div className="area-principal">
        {children}
        <Footer />
      </div>
    </>
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
        <Route path="/" element={pagina(<main className="conteudo"><Home /></main>)} />
        <Route path="/materias" element={pagina(<main className="conteudo"><Materias /></main>)} />
        <Route path="/materias/:id" element={pagina(<main className="conteudo"><PaginaMateria /></main>)} />
        <Route path="/calendario" element={pagina(<main className="conteudo"><Calendario /></main>)} />
        <Route path="/comunidades" element={pagina(<main className="conteudo"><Comunidades /></main>)} />
        <Route path="/perfil" element={pagina(<main className="conteudo"><Perfil /></main>)} />
        <Route path="/camera" element={<Camera />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
