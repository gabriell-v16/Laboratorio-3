import API from "../api";

export const registrarUsuario = async (datos) => {
    try {
      const respuesta = await API.post("/usuarios/registro", datos);
      return respuesta.data;
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      throw error;
    }
  };
  
  
  // Función para iniciar sesión
  export const iniciarSesion = async (credenciales) => {
    try {
      const respuesta = await API.post("/usuarios/login", credenciales);
      return respuesta.data;
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      throw error;
    }
  };

  export const obtenerPerfil = async()=>{
    try {
      const respuesta = await API.get('/usuarios/perfil');
      console.log(respuesta.data);
      return respuesta.data;
    } catch (error) {
      console.error('Error al obtener el perfil: ', error);
    }
  }

  export const actualizarPerfil = async(data)=>{
    try {
      const respuesta = await API.post('/usuarios/actualizar', data);
      return respuesta.data;
    } catch (error) {
      console.error('Error al actualizar el perfil: ' + error);
    }
  }