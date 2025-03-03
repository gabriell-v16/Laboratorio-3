const mongoose = require("mongoose");

const ContactoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  empresa: { type: String },
  domicilio: { type: String },
  telefonos: { type: [String] }, // Lista de teléfonos
  email: { type: String, required: true },
  propietario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true }, // Relación con Usuario
  esPublico: { type: Boolean, default: false }, // Define si el contacto es público o privado
  esVisible: { type: Boolean, default: true }, // Define si el admin permite que sea visible
});

module.exports = mongoose.model("Contacto", ContactoSchema);