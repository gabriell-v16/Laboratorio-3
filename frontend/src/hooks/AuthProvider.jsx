import { createContext, useContext, useEffect, useState } from 'react'
import { verify } from '../api/auth/auth';
import { obtenerPerfil } from '../api/usuarios/usuariosServices';

const AuthContext = createContext();


export const AuthProvider = ({children}) => {
    const [autenticado, setAutenticado] = useState(null)
    const [formularioInicio, setFormularioInicio] = useState(false)
    const [contactoEditado, setContactoEditado] = useState(null);
    const [contactosPublicos, setContactosPublicos] = useState(false); 
    const [perfil, setPefil] = useState(null);
    const [admin, setAdmin] =useState(false);
    useEffect(()=>{
        const checkVerify = async () => {
            try {
                const check = await verify();
                console.log("Respuesta de verify:", check);
                setAutenticado(true);
                const usuario = await obtenerPerfil();
                console.log('Obtener usuario: ', usuario)
                setAdmin(usuario.esAdmin);
                setPefil(usuario);
            } catch (error) {
                console.error("Error al verificar sesión:", error.response?.data || error.message);
                setAutenticado(false);
                setPefil(null);
                setAdmin(false);
            }
        };
        
       checkVerify();
    },[]);
    const login = async() => {
        try {
            const response = await verify();
            console.log("Resultado de login:", response);
            setAutenticado(true);
            const usuario = await obtenerPerfil();
            setPefil(usuario);
            setAdmin(usuario.esAdmin);
        } catch (error) {
            console.error("Error al verificar sesión:", error);
            setAutenticado(false);
            setPefil(null);
            setAdmin(false);
        }
    }
    const logout = () => {
        localStorage.removeItem('token');
        setAutenticado(false)
        setPefil(null);
        setAdmin(null);
    }


  return (
    <AuthContext.Provider value={{autenticado, login, logout, setAutenticado, formularioInicio, setFormularioInicio, contactoEditado, setContactoEditado,
        setContactosPublicos,  contactosPublicos, perfil, admin
    }}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
    return useContext(AuthContext)
}