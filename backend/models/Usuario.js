import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  esAdmin: { type: Boolean, default: false }, // Para identificar administradores
});

export const Usuario = mongoose.model("Usuario", UsuarioSchema);