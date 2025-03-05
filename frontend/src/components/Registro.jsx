import { useState } from "react";
import { registrarUsuario } from "../api/servicios";

const Registro = () => {
  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const manejarRegistro = async (e) => {
    e.preventDefault();
    try {
      const respuesta = await registrarUsuario({ nombre, email, password });
      alert("Registro exitoso. Ahora puedes iniciar sesión.");
      setNombre("");
      setEmail("");
      setPassword("");
    } catch (error) {
      alert("Error al registrar usuario.");
    }
  };

  return (
    <form onSubmit={manejarRegistro}>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">Registrarse</button>
    </form>
  );
};

export default Registro;