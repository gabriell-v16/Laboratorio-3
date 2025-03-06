const Info = () => {
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 p-6 flex flex-col items-center">
        <div className="max-w-3xl bg-white shadow-lg rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center text-gray-600 mb-6">
            Información sobre la App de Contactos
          </h1>
          <p className="text-gray-700 text-lg text-center">
            Guarda, organiza y gestiona tus contactos fácilmente. Puedes mantenerlos privados o hacerlos públicos según tu necesidad.
          </p>
  
          <div className="mt-8 space-y-6">
            <div className="bg-blue-50 p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold text-blue-600">📌 Contactos Privados</h2>
              <p className="text-gray-600">Tus contactos personales, solo accesibles para ti.</p>
            </div>
  
            <div className="bg-green-50 p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold text-green-600">🌍 Contactos Públicos</h2>
              <p className="text-gray-600">Comparte contactos con otros usuarios de la app.</p>
            </div>
  
            <div className="bg-yellow-50 p-4 rounded-md shadow">
              <h2 className="text-xl font-semibold text-yellow-600">⚙️ Administración de Contactos (ABM)</h2>
              <p className="text-gray-600">Agrega, edita o elimina contactos de forma sencilla.</p>
            </div>
          </div>
  
          
        </div>
      </div>
    );
  };
  

  export default Info;
