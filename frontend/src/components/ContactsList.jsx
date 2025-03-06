import { useState, useEffect } from "react";
import { obtenerContactos, eliminarContacto } from "../api/contactos/contactosServices";
import {useNavigate} from 'react-router-dom';
import { useAuth } from "../hooks/AuthProvider";
import {successNotification} from '../utils/notifications.js';


const ContactsList = () => {
  const [contactos, setContactos] = useState([]);
  const navigate = useNavigate();
  const {setContactoEditado} = useAuth();

  const getContactos = async()=>{
    try {
      const contactos = await obtenerContactos();
      console.log(contactos);
      setContactos(contactos);
    } catch (error) {
      console.log(error);
    }
  }
const handleEliminar = async(id)=>{
  await eliminarContacto(id);
  setContactos((prevContactos) => prevContactos.filter(c => c._id !== id));
  await getContactos();
}
const handleEditar = (contacto) => {
  setContactoEditado(contacto);
  navigate('/create')
};

useEffect(()=>{
  getContactos();
},[]);




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
          <th className="py-3 px-6 text-left">Acciones</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {contactos.filter(c=>c.esVisible).map(c=>(
        <tr className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200" key={c._id}>
          <td className="py-3 px-6">{c.nombre}</td>
          <td className="py-3 px-6">{c.apellido}</td>
          <td className="py-3 px-6">{c.email}</td>
          <td className="py-3 px-6"> {c.telefonos === null || c.telefonos.length === 0 
    ? "No hay teléfonos registrados" 
    : c.telefonos.join(", ")}</td>
          <td className="py-3 px-6 flex gap-3 justify-center">
            <button className="bg-yellow-500 text-white py-1 px-3 rounded hover:bg-yellow-400 transition-all" onClick={()=>handleEditar(c)}>Editar</button>
            <button className="bg-red-600 text-white py-1 px-3 rounded hover:bg-red-500 transition-all" onClick={()=>handleEliminar(c._id)}>Eliminar</button>
         </td>
        </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

  )
}

export default ContactsList