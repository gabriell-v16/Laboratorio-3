import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import App from "./App";
import Registro from "./components/Registro";
import Login from "./components/Login";

const AppRouter = () => {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Lista de Contactos</Link></li>
          <li><Link to="/registro">Registro</Link></li>
          <li><Link to="/login">Iniciar Sesión</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/registro" element={<Registro />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default AppRouter;