const QuickAccessButton = ({ icon, text, funcion }) => {
    return (
      <button className="flex flex-col items-center justify-center p-4 bg-gray-700 hover:bg-gold-400 text-white hover:text-gray-900 rounded-xl shadow-md transition-all"
      onClick={funcion}>
        <div className="text-3xl mb-2">{icon}</div>
        <span className="text-sm font-semibold">{text}</span>
      </button>
    );
  };

  export default QuickAccessButton;