import Login from "./pages/Login";
import Registro from "./pages/Registro";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import {AuthProvider} from "./hooks/AuthProvider";
import Navbar from "./components/Navbar";
import Info from "./components/Info";
import ProtetectedRoutes from "./components/ProtetectedRoutes";
import FormularioContacto from "./components/FormularioContacto";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/ReactToastify.css';
import PublicContactList from "./components/PublicContactList";
import Porfile from './components/Porfile'

function App() {
 
  return (
    <div>
      <ToastContainer/>
      <AuthProvider>
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Info/>} />
          <Route path="/registro" element={<Registro/>} />
          <Route path="/login" element={<Login/>} />
          <Route element={<ProtetectedRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/create" element={<FormularioContacto/>}/>
            <Route path="/profile" element={<Porfile/>}/>
          </Route>
        </Routes>
      </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
