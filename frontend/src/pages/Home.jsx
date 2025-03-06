import QuickAccessButton from '../components/QuickAccessButton'
import Input from '../components/Input'
import Button from '../components/Button';
import {FaUserPlus} from 'react-icons/fa'
import { PiEyeClosedDuotone  } from "react-icons/pi";
import { PiEyeBold } from "react-icons/pi";
import {useState} from "react";
import ContactsList from '../components/ContactsList';
import {  useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthProvider';
import PublicContactList from '../components/PublicContactList';
import ContactAdminList from '../components/ContactAdminList';

const Home = () => {
  const navigate = useNavigate();
  const [ocultos, setOcultos] = useState(false);
  const { setContactosPublicos, contactosPublicos, admin } = useAuth();

  const handleCrear = () => {
    navigate('/create');
  };

  const handlePublicos = () => {
    setOcultos(true);
    setContactosPublicos(true);
  };

  const handlePrivado = () => {
    setOcultos(false);
    setContactosPublicos(false);
  };
  console.log(admin);

  return (
    <div className="p-6 bg-gray-200 text-white min-h-screen">

      <div className="bg-gray-800 p-4 rounded-xl shadow-lg col-span-2 flex gap-4 justify-center">
        {/* Si NO es admin, se muestran los botones */}
        {!admin && (
          <>
            <QuickAccessButton icon={<FaUserPlus />} text="Nuevo Contacto" funcion={handleCrear} />

            {ocultos === false ? (
              <QuickAccessButton icon={<PiEyeBold />} text="Ver contactos públicos" funcion={handlePublicos} />
            ) : (
              <QuickAccessButton icon={<PiEyeClosedDuotone />} text="Ver contactos privados" funcion={handlePrivado} />
            )}
          </>
        )}
       { admin &&  <h2 className="text-2xl font-bold text-yellow-400 mb-6">Pestaña de administrador</h2>}
      </div>
      <br />

      {/* Si es admin, muestra solo ContactAdminList, si no, lo demás */}
      {admin ? <ContactAdminList /> : contactosPublicos ? <PublicContactList /> : <ContactsList />}
    </div>
  );
};

export default Home;
