

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UsuarioClass } from '../services/methods/usuario.class.js';

export const registroUsuario = async (req, res) => {
  try {
     const { nombre, email, contraseña } = req.body;

     console.log('Datos al registrar usuario: ', nombre, email, contraseña)
 
     // Verificar si el usuario ya existe
     const usuarioExistente = await UsuarioClass.encontrarUsuario(email)
     if (usuarioExistente) return res.status(400).json({ mensaje: "El usuario ya existe" });
 
     // Hashear contraseña
     const salt = await bcrypt.genSalt(10);
     const contraseñaHasheada = await bcrypt.hash(contraseña, salt);
 
     // Crear usuario
     const nuevoUsuario = {
       nombre,
       email,
       contraseña: contraseñaHasheada
     };
 
     // Guardar usuario en la base de datos
     await UsuarioClass.añadirUsuario(nuevoUsuario);
     res.status(201).json({ mensaje: "Usuario registrado exitosamente" });
   } catch (error) {
     res.status(500).json({ mensaje: "Error en el servidor", error });
   }
}

export const loginUsuario = async (req, res) => {
    try {
        const { email, contraseña } = req.body;
        console.log(email, contraseña);
        // Verificar si el usuario existe
        const usuario = await UsuarioClass.encontrarUsuario(email);
        if (!usuario) return res.status(400).json({ mensaje: "Usuario no encontrado" });
    
        // Verificar la contraseña
        const contraseñaValida = await bcrypt.compare(contraseña, usuario.contraseña);
        if (!contraseñaValida) return res.status(400).json({ mensaje: "Contraseña incorrecta" });
    
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

export const obtenerUser = async(req,res)=>{
  try {
    const id = req.usuario.id
    const perfil = await UsuarioClass.obtenerUsuarioPerfil(id);
    console.log(perfil)
    res.status(200).json(perfil);
  } catch (error) {
    res.status(500).json({message:'Error interno del servidor: ' + error});
  }
}

export const actualizarPerfil = async(req,res)=>{
  try {
    const id = req.usuario.id;
    const {nombre, email, contraseña} = req.body;
    const salt = await bcrypt.genSalt(10);
    const contraseñaHasheada = await bcrypt.hash(contraseña, salt);
    const usuarioActualizado = {
      nombre,
      email,
      contraseña: contraseñaHasheada
    }

    const perfil = await UsuarioClass.editarUsuario(id, usuarioActualizado); 
    res.status(200).json({success:true, message:'Perfil actualizado con éxito'});
  } catch (error) {
    res.status(500).json({message:'Error interno del servidor: ' + error});
  }
}
