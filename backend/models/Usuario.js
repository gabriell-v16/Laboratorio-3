const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  esAdmin: { type: Boolean, default: false }, // Para identificar administradores
});

module.exports = mongoose.model("Usuario", UsuarioSchema);