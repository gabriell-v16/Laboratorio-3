import {Usuario} from '../models/Usuario.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registroUsuario = async (req, res) => {
  try {
     const { nombre, email, contraseña } = req.body;
 
     // Verificar si el usuario ya existe
     const usuarioExistente = await Usuario.findOne({ email });
     if (usuarioExistente) return res.status(400).json({ mensaje: "El usuario ya existe" });
 
     // Hashear contraseña
     const salt = await bcrypt.genSalt(10);
     const contraseñaHasheada = await bcrypt.hash(contraseña, salt);
 
     // Crear usuario
     const nuevoUsuario = new Usuario({
       nombre,
       email,
       contraseña: contraseñaHasheada
     });
 
     // Guardar usuario en la base de datos
     await nuevoUsuario.save();
     res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
   } catch (error) {
     res.status(500).json({ mensaje: "Error en el servidor", error });
   }
}

export const loginUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
    
        // Verificar si el usuario existe
        const usuario = await Usuario.findOne({ email });
        if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });
    
        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    
        // Generar token JWT
        const token = jwt.sign(
          { id: usuario._id, esAdmin: usuario.esAdmin },
          process.env.JWT_SECRET,
          { expiresIn: "1h" }
        );
    
        res.json({ mensaje: "Inicio de sesión exitoso", token, usuario: { nombre: usuario.nombre, email: usuario.email, esAdmin: usuario.esAdmin } });
      } catch (error) {
        res.status(500).json({ mensaje: "Error en el servidor", error });
      }
}