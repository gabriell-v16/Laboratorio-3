import { useNavigate } from "react-router-dom"
import { useAuth } from "../hooks/AuthProvider";
import { useEffect, useState } from "react";
import { obtenerPerfil } from "../api/usuarios/usuariosServices";

const Navbar = () => {

    const { autenticado, formularioInicio, setFormularioInicio, logout, perfil } = useAuth();
    const navigate = useNavigate();
    const [nombre, setNombre] = useState('');

    const handleLogin = () => {
        navigate("/login");
        setFormularioInicio(true);  
    }

    const handleRegister = () => {
        navigate("/registro");
        setFormularioInicio(true); 
    }

    const handleLogout = () => {
        logout();
    }
   

    const handlePerfil = ()=>{
        navigate('/profile')
    }

    return (
        <nav className="bg-gray-800 text-white p-4 flex justify-between items-center">
            <h1 className="text-xl font-bold">Gestor de Contactos</h1>
            <div className="flex items-center gap-4">
                {/* Aquí se muestra el formulario de login/registro solo si formularioInicio es false */}
                {!formularioInicio && autenticado === true ? (
                    <>
                    <button className="bg-red-700 text-white py-2 px-5 rounded cursor-pointer" onClick={handleLogout}>Cerrar Sesión</button>
                    <h2 className="text-xl font-bold cursor-pointer" onClick={handlePerfil}>
                            {perfil ? perfil.nombre : "Cargando..."}
                        </h2>
                    </>
                ) : (
                    <>
                        {/* Mostrar botones de ingresar y registrarse solo si formularioInicio es false */}
                        {!formularioInicio && (
                            <>
                                <button className="bg-green-700 text-white py-2 px-5 rounded cursor-pointer" onClick={handleLogin}>Ingresar</button>
                                <button className="bg-gray-700 text-white py-2 px-5 rounded cursor-pointer" onClick={handleRegister}>Registrarse</button>
                            </>
                        )}
                    </>
                )}
            </div>
        </nav>
    )
}

export default Navbar;
