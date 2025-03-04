import jwt from "jsonwebtoken";

const verificarToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ mensaje: "Acceso denegado. No hay token." });
  }

  try {
    // Verifica el token y extrae los datos del usuario
    const verificado = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
    req.usuario = verificado; // Guarda los datos del usuario en el objeto `req`
    next(); // Continúa con la siguiente función (controlador)
  } catch (error) {
    res.status(400).json({ mensaje: "Token no válido." });
  }
};

export default verificarToken;