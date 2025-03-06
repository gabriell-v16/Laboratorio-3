const Button = ({ children, className = "", ...props }) => {
    return (
      <button
        className={`bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };
  
  export default Button;
  