import { useEffect, useState } from "react";
import { obtenerContactos } from "./api/servicios";
import FormularioContacto from "./components/FormularioContacto";

function App() {
  const [contactos, setContactos] = useState([]);

  const cargarContactos = async () => {
    try {
      const datos = await obtenerContactos();
      setContactos(datos);
    } catch (error) {
      console.error("Error al cargar los contactos:", error);
    }
  };

  useEffect(() => {
    cargarContactos();
  }, []);

  return (
    <div>
      <h1>Lista de Contactos</h1>

      <FormularioContacto actualizarLista={cargarContactos} />

      <ul>
        {contactos.map((contacto) => (
          <li key={contacto._id}>{contacto.nombre} - {contacto.email}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;