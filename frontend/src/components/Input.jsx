const Input = ({ type = "text", placeholder = "", className = "", ...props }) => {
    return (
      <input
        type={type}
        placeholder={placeholder}
        className={`border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
        {...props}
      />
    );
  };
  
  export default Input;
  