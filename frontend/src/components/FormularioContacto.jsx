import { useState, useEffect } from "react";
import { crearContacto, actualizarContacto } from '../api/contactos/contactosServices.js'
import { useAuth } from "../hooks/AuthProvider";
import {errorNotification, successNotification} from '../utils/notifications.js'
import { useNavigate } from "react-router-dom";

const FormularioContacto = () => {
  const {contactoEditado, setContactoEditado} = useAuth()
  const [nombre, setNombre] = useState(contactoEditado?.nombre || "");
  const [apellido, setApellido] = useState(contactoEditado?.apellido || "");
  const [telefonos, setTelefono] = useState(contactoEditado?.telefonos?.[0] || "");
  const [email, setEmail] = useState(contactoEditado?.email || "");
  const [privacidad, setPrivacidad] = useState('privacidad');
  const [esPublico, setEsPublico] = useState(contactoEditado?.esPublico || false);
  const navigate = useNavigate();

  useEffect(() => {
    if (contactoEditado) {
      setNombre(contactoEditado.nombre);
      setApellido(contactoEditado.apellido);
      setTelefono(contactoEditado.telefonos);
      setEmail(contactoEditado.email);
      // Convierte el booleano a string
      setPrivacidad(contactoEditado.esPublico ? "publico" : "privado");
    }
  }, [contactoEditado]);

  const manejarEnvio = async (e) => {
    e.preventDefault();
    try {
      // Convertí el string a booleano
      const nuevoEstadoPublico = privacidad === "publico"; 
      console.log("Enviando esPublico =", nuevoEstadoPublico);
      
      if (contactoEditado) {
        await actualizarContacto(contactoEditado._id, { nombre, apellido, telefonos, email, esPublico: nuevoEstadoPublico });
        setContactoEditado(null); 
        successNotification('Contacto editado con éxito');
      } else {
        await crearContacto({ nombre, apellido, telefonos, email, esPublico: nuevoEstadoPublico });
        successNotification('Contacto agregado con éxito');
      }
    } catch (error) {
      console.error("Error al guardar contacto:", error);
      errorNotification('Error en guardar contacto ' + error);
    }
  };
  


  const handleRegresar = async()=>{
    setContactoEditado(null); 
    navigate('/home');
  }


  return (
    <div className="p-6 bg-gray-200 text-white min-h-screen">
      <h2 className="text-2xl font-bold text-black mb-6">Agregar Nuevo Contacto</h2>

      <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <form className="space-y-6" onSubmit={manejarEnvio}>
          {/* Nombre */}
          <div>
            <label htmlFor="nombre" className="block text-sm font-semibold text-white mb-2">Nombre Completo</label>
            <input 
              type="text" 
              id="nombre" 
              className="w-full px-4 py-3 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Nombre..."
              value={nombre}
              onChange={(e) => setNombre(e.target.value)} />
          </div>

          {/* Apellido */}
          <div>
            <label htmlFor="apellido" className="block text-sm font-semibold text-white mb-2">Apellido</label>
            <input 
              type="text" 
              id="apellido" 
              className="w-full px-4 py-3 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="Apellido..."
              value={apellido}
              onChange={(e) => setApellido(e.target.value)} />
          </div>

          {/* Correo */}
          <div>
            <label htmlFor="correo" className="block text-sm font-semibold text-white mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              id="correo" 
              className="w-full px-4 py-3 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="correo@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)} />
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm font-semibold text-white mb-2">Número de Teléfono</label>
            <input 
              type="tel" 
              id="telefono" 
              className="w-full px-4 py-3 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              placeholder="(+54) 1234-5678"
              value={telefonos}
              onChange={(e) => setTelefono(e.target.value)} />
          </div>

          {/* Selección de Privacidad */}
          <div>
            <label htmlFor="privacidad" className="block text-sm font-semibold text-white mb-2">Privacidad</label>
            <select
              id="privacidad"
              className="w-full px-4 py-3 text-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-600"
              onChange={(e) => setPrivacidad(e.target.value)}
              value={privacidad}
            >
              <option value="publico">Público</option>
              <option value="privado">Privado</option>
            </select>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all">
              {contactoEditado ? "Actualizar Contacto" : "GuardarContacto"}
            </button>
            <button type="reset" className="w-full py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 transition-all"
            onClick={handleRegresar}
            >
              Regresar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormularioContacto;
