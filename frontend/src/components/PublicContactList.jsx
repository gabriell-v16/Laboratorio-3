import {mostrarContactosPublicos} from '../api/contactos/contactosServices.js';
import { useEffect, useState } from 'react';



const PublicContactList = () => {
    const [contactos, setContactos] = useState([]);

    const obtenerContactos = async()=>{
        try {
            const respuesta = await mostrarContactosPublicos();
            setContactos(respuesta);
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        obtenerContactos();
    },[])

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
            </tr>
          </thead>
          <tbody>
            {contactos.map(c=>(
            <tr className="bg-gray-700 hover:bg-gray-600 transition-colors duration-200" key={c._id}>
              <td className="py-3 px-6">{c.nombre}</td>
              <td className="py-3 px-6">{c.apellido}</td>
              <td className="py-3 px-6">{c.email}</td>
              <td className="py-3 px-6"> {c.telefonos === null || c.telefonos.length === 0 
        ? "No hay teléfonos registrados" 
        : c.telefonos.join(", ")}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    
      )
}

export default PublicContactList