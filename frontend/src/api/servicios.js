import API from "./api";

// Función para registrar un usuario
export const registrarUsuario = async (datos) => {
  try {
    const respuesta = await API.post("/usuarios/registro", datos);
    return respuesta.data;
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw error;
  }
};

// Función para obtener los contactos
export const obtenerContactos = async () => {
  try {
    const respuesta = await API.get("/contactos/obtener");
    return respuesta.data;
  } catch (error) {
    console.error("Error al obtener contactos:", error);
    throw error;
  }
};

export const crearContacto = async (datos, token) => {
  try {
    const respuesta = await API.post("/contactos/crear", datos, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return respuesta.data;
  } catch (error) {
    console.error("Error al crear contacto:", error);
    throw error;
  }
};
