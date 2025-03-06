import { mostrarTodosContactos, ocultarContactos, mostrarContactos } from "../api/contactos/contactosServices";
import { useEffect, useState } from "react";

const ContactAdminList = () => {
  const [contactos, setContactos] = useState([]);

  const obtenerContactos = async () => {
    const respuesta = await mostrarTodosContactos(); // Traemos todos los contactos, incluso los ocultos
    setContactos(respuesta);
  };

  const manejarOcultar = async (id) => {
    try {
      const respuesta = await ocultarContactos(id);
      if (respuesta?.success === true) {
        // Si la respuesta es exitosa, actualizamos el estado
        setContactos(contactos.map(c => 
          c._id === id ? { ...c, esVisible: false } : c
        ));
      }
    } catch (error) {
      console.error("Error al ocultar el contacto:", error);
    }
  };

  const manejarMostrar = async (id) => {
    try {
      const respuesta = await mostrarContactos(id);  // Aquí llamamos a la función que vuelve visible el contacto
      if (respuesta?.success === true) {
        // Si la respuesta es exitosa, actualizamos el estado
        setContactos(contactos.map(c => 
          c._id === id ? { ...c, esVisible: true } : c
        ));
      }
    } catch (error) {
      console.error("Error al mostrar el contacto:", error);
    }
  };

  useEffect(() => {
    obtenerContactos();
  }, []);

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-yellow-400 mb-6">Lista de Contactos</h2>

      <div className="overflow-x-auto bg-gray-800 rounded-xl shadow-lg">
        <table className="min-w-full table-auto">
          <thead className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
            <tr>
              <th className="py-3 px-6 text-left">Nombre</th>
              <th className="py-3 px-6 text-left">Apellido</th>
              <th className="py-3 px-6 text-left">Correo</th>
              <th className="py-3 px-6 text-left">Teléfono</th>
              <th className="py-3 px-6 text-left">Estado</th>
              <th className="py-3 px-6 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {contactos.map((c) => (
              <tr className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200" key={c._id}>
                <td className="py-3 px-6">{c.nombre}</td>
                <td className="py-3 px-6">{c.apellido}</td>
                <td className="py-3 px-6">{c.email}</td>
                <td className="py-3 px-6">
                  {c.telefonos === null || c.telefonos.length === 0
                    ? "No hay teléfonos registrados"
                    : c.telefonos.join(", ")}
                </td>
                <td className="py-3 px-6">
                  {c.esVisible ? (
                    <span className="text-green-500">Visible</span>
                  ) : (
                    <span className="text-red-500">Oculto</span>
                  )}
                </td>
                <td className="py-3 px-6 flex gap-3 justify-center">
                  {c.esVisible ? (
                    <button
                      className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500 transition-all cursor-pointer"
                      onClick={() => manejarOcultar(c._id)}
                    >
                      Ocultar
                    </button>
                  ) : (
                    <button
                      className="bg-green-500 text-white py-1 px-3 rounded cursor-pointer"
                      onClick={() => manejarMostrar(c._id)} // Botón para mostrar
                    >
                      Mostrar
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};


export default ContactAdminList;
