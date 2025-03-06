import { useState } from "react";
import { registrarUsuario } from "../api/usuarios/usuariosServices.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthProvider";
import { successNotification, errorNotification } from "../utils/notifications.js";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const navigate = useNavigate();
  const {setFormularioInicio} = useAuth();

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await registrarUsuario({ nombre, email, contraseña });
      successNotification("Registro exitoso. Ahora puedes iniciar sesión.");
      setNombre("");
      setEmail("");
      setContraseña("");
    } catch (error) {
      errorNotification("Error al registrar usuario. Revisar credenciales");
    }
  };
  const handleLogin = () => {
    navigate("/login");
  }


  return (
    <div className="h-screen flex justify-center items-center">
    <form onSubmit={manejarRegistro} className="bg-white shadow-lg p-6 rounded-lg flex flex-col gap-4 w-80">
      <input type="text" placeholder="Nombre" className="border p-2 rounded" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="email" placeholder="Correo" className="border p-2 rounded" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" className="border p-2 rounded" value={contraseña} onChange={(e) => setContraseña(e.target.value)} required />
      <button type="submit" className="bg-blue-500 text-white py-2 rounded">Registrarse</button>
      <button type="button" onClick={handleLogin} className="bg-gray-500 text-white py-2 rounded">Iniciar Sesión</button>
    </form>
    </div>
  );
};


export default Registro;
