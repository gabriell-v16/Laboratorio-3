import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { actualizarPerfil } from "../api/usuarios/usuariosServices";
import { errorNotification, successNotification } from "../utils/notifications";
import { useAuth } from "../hooks/AuthProvider";


export default function Profile() {
  
  const {perfil} = useAuth();

  if(!perfil){
    return <h1>Cargando Pefil...</h1>
  }

  const [profile, setProfile] = useState({ nombre: perfil.nombre || "", email: perfil.email || "", contraseña: "" });
  const navigate = useNavigate();



  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleHome = ()=>{
    navigate('/home')
  }

  const handleGuardar = async ()=>{
    const respuesta = await actualizarPerfil(profile);
    if(respuesta.success){
      successNotification(respuesta.message)
    }
    else{
      errorNotification(respuesta.message);
    }
  }



  return (
    <div className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6">
      <h2 className="text-2xl font-bold text-center mb-4">Perfil de Usuario</h2>
      <div className="mt-4">
        <label htmlFor="nombre" className="block font-semibold">Nombre</label>
        <input
          type="text"
          name="nombre"
          value={profile.nombre}
          onChange={handleChange}
          className="w-full border-b-2 p-2 text-lg focus:outline-none"
        />
        <label htmlFor="email" className="block mt-4 font-semibold">Email</label>
        <input
          type="email"
          name="email"
          value={profile.email}
          onChange={handleChange}
          className="w-full border-b-2 p-2 mt-2 focus:outline-none"
        />
        <label htmlFor="contraseña" className="block mt-4 font-semibold">Contraseña</label>
        <input
          type="password"
          name="contraseña"
          value={profile.contraseña}
          onChange={handleChange}
          className="w-full border p-2 mt-2 rounded focus:outline-none"
        />
      </div>
      <div className="flex justify-between mt-6">
        <button className="bg-blue-500 text-white px-6 py-2 rounded font-semibold hover:bg-blue-600 transition cursor-pointer"
        onClick={handleGuardar}
        >
          Guardar
        </button>
        <button className="bg-gray-400 text-white px-6 py-2 rounded font-semibold hover:bg-gray-500 transition cursor-pointer"
        onClick={handleHome}
        >
          Regresar
        </button>
      </div>
    </div>
  );
}
