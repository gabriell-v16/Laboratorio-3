import { Outlet } from "react-router-dom"
import { useAuth } from "../hooks/AuthProvider"
import { Navigate } from "react-router-dom";

const ProtetectedRoutes = () => {

    const {autenticado} = useAuth();
    console.log(autenticado);
    if (autenticado === null) {
        return <p>Cargando...</p>; 
    }

    return autenticado ? <Outlet /> : <Navigate to="/" />;
}

export default ProtetectedRoutes