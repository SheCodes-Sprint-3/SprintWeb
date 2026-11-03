import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthProvider";
import RotaPrivada from "./components/RotaPrivada";
import HeaderPagina from "./components/HeaderPagina";
import Footer from "./components/Footer";
import useNotificacoes from "./hooks/useNotificacoes";
import Home from "./pages/Home";
import Materias from "./pages/Materias";
import PaginaMateria from "./pages/PaginaMateria";
import Comunidades from "./pages/Comunidades";
import Calendario from "./pages/Calendario";
import Camera from "./pages/Camera";
import Perfil from "./pages/Perfil";
import Login from "./pages/Login";
import LandingPage from "./pages/LandingPage";
import "./index.css";

function Layout() {
  const { notificacoes, marcarTodasComoLidas } = useNotificacoes();

  return (
    <div className="flex min-h-screen flex-col min-[900px]:flex-row">
      <HeaderPagina
        notificacoes={notificacoes}
        marcarTodasComoLidas={marcarTodasComoLidas}
      />
      <div className="flex min-w-0 flex-1 flex-col">
        <main className="w-full flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

const App = () => (
  <BrowserRouter>
    <AuthProvider>
      <Routes>
        
        <Route path="/" element={<LandingPage rotaApp="/home" />} />
        <Route path="/login" element={<Login />} />
        <Route element={<RotaPrivada />}>
          <Route element={<Layout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/materias" element={<Materias />} />
            <Route path="/materias/:id" element={<PaginaMateria />} />
            <Route path="/calendario" element={<Calendario />} />
            <Route path="/comunidades" element={<Comunidades />} />
            <Route path="/perfil" element={<Perfil />} />
          </Route>
          <Route path="/camera" element={<Camera />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  </BrowserRouter>
);

export default App;
