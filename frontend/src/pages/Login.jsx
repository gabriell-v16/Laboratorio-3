import { useState } from "react";
import { iniciarSesion } from "../api/usuarios/usuariosServices.js";
import {useNavigate} from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";

const Login = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();
  const {login, setFormularioInicio} = useAuth();

  const manejarLogin = async (e) => {
    e.preventDefault();
   try {
      console.log({email, contraseña});
     const respuesta = await iniciarSesion({ email, contraseña });
      localStorage.setItem("token", respuesta.token); 
      await login();
      setEmail("");
      setContraseña("");
      navigate('/home')
    setFormularioInicio(false);
    } catch (error) {
     alert("Error al iniciar sesión." + error);
    }

  };
  const handleRegistro = ()=>{
    navigate("/registro");
  }

  return (
    <div className="h-screen flex justify-center items-center">
  <form onSubmit={manejarLogin} className="bg-white shadow-lg p-6 rounded-lg flex flex-col gap-4 w-80">
    <input type="email" placeholder="Correo" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
    <input type="password" placeholder="Contraseña" className="border p-2 rounded" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
    <button className="bg-blue-500 text-white py-2 rounded">Iniciar Sesión</button>
    <button className="bg-gray-400 text-white py-2 rounded" type="button" onClick={handleRegistro}>Registrarse</button>
  </form>
</div>

  );
};

export default Login;