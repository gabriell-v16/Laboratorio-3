import { useState } from "react";
import { crearContacto } from "../api/servicios";

const FormularioContacto = ({ actualizarLista }) => {
  const [nombre, setNombre] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [esPublico, setEsPublico] = useState(true);
  const token = localStorage.getItem("token"); // Asumiendo que el token está guardado en localStorage

  const manejarEnvio = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Debes iniciar sesión para agregar contactos.");
      return;
    }

    try {
      await crearContacto({ nombre, telefono, email, esPublico }, token);
      actualizarLista(); // Llamar a la función para refrescar la lista
      setNombre("");
      setTelefono("");
      setEmail("");
      setEsPublico(true);
    } catch (error) {
      console.error("Error al crear contacto:", error);
    }
  };

  return (
    <form onSubmit={manejarEnvio}>
      <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
      <input type="text" placeholder="Teléfono" value={telefono} onChange={(e) => setTelefono(e.target.value)} required />
      <input type="email" placeholder="Correo" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <label>
        Público:
        <input type="checkbox" checked={esPublico} onChange={() => setEsPublico(!esPublico)} />
      </label>
      <button type="submit">Agregar Contacto</button>
    </form>
  );
};

export default FormularioContacto;