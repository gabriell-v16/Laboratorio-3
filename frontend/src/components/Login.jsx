import { useState } from "react";
import { iniciarSesion } from "../api/servicios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarLogin = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await iniciarSesion({ email, password });
      localStorage.setItem("token", respuesta.token); // Guarda el token en localStorage
      alert("Inicio de sesión exitoso.");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error al iniciar sesión.");
    }
  };

  return (
    <form onSubmit={manejarLogin}>
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  );
};

export default Login;