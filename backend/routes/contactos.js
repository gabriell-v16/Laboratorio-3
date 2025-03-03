const express = require("express");
const router = express.Router();
const Contacto = require("../models/Contacto");
const verificarToken = require("../middlewares/authMiddleware");

// Obtener todos los contactos públicos
router.get("/", async (req, res) => {
  try {
    const contactos = await Contacto.find({ esPublico: true, esVisible: true }).populate("propietario", "nombre email");
    res.json(contactos);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

// Crear un nuevo contacto
router.post("/", verificarToken, async (req, res) => {
  try {
    const nuevoContacto = new Contacto({
      ...req.body,
      propietario: req.usuario.id,
    });
    await nuevoContacto.save();
    res.status(201).json(nuevoContacto);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

// Actualizar un contacto
router.put("/:id", verificarToken, async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id);
    if (!contacto) return res.status(404).json({ mensaje: "Contacto no encontrado" });

    if (contacto.propietario.toString() !== req.usuario.id && !req.usuario.esAdmin) {
      return res.status(403).json({ mensaje: "No tienes permiso para actualizar este contacto" });
    }

    const contactoActualizado = await Contacto.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(contactoActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

// Eliminar un contacto
router.delete("/:id", verificarToken, async (req, res) => {
  try {
    const contacto = await Contacto.findById(req.params.id);
    if (!contacto) return res.status(404).json({ mensaje: "Contacto no encontrado" });

    if (contacto.propietario.toString() !== req.usuario.id && !req.usuario.esAdmin) {
      return res.status(403).json({ mensaje: "No tienes permiso para eliminar este contacto" });
    }

    await Contacto.findByIdAndDelete(req.params.id);
    res.json({ mensaje: "Contacto eliminado exitosamente" });
  } catch (error) {
    res.status(500).json({ mensaje: "Error en el servidor", error });
  }
});

module.exports = router;