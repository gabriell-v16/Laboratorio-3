import API from "../api";

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
      const respuesta = await API.post("/contactos/crear", datos);
      return respuesta.data;
    } catch (error) {
      console.error("Error al crear contacto:", error);
      throw error;
    }
  };

  export const actualizarContacto = async(id, datos)=>{
    try {
      const respuesta = await API.put(`/contactos/actualizar/${id}`, datos);
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  }

  export const eliminarContacto= async(id)=>{
    try {
      const respuesta = await API.delete(`/contactos/eliminar/${id}`);
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  }

  export const ocultarContactos = async(id)=>{
    try {
      const respuesta = await API.put(`/contactos/ocultar/${id}`);
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  }

  export const mostrarContactosPublicos = async()=>{
    try {
      const respuesta = await API.get('/contactos/publicos');
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  }

  export const mostrarTodosContactos = async()=>{
    try {
      const respuesta = await API.get('/contactos/admin');
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  }
  export const mostrarContactos = async(id)=>{
    try {
      const respuesta = await API.put(`/contactos/mostrar/${id}`)
      return respuesta.data;
    } catch (error) {
      console.log(error);
    }
  }
  