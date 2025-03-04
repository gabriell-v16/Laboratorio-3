import {Router} from "express";
import verificarToken from '../middlewares/authMiddleware.js'
import {getContactos, crearContacto, actualizarContacto, eliminarContacto} from "../controllers/contactosController.js";
const router = Router();

// Obtener todos los contactos públicos
router.get("/obtener", getContactos);

// Crear un nuevo contacto
router.post("/crear", verificarToken, crearContacto);

// Actualizar un contacto
router.put("/actualizar/:id", verificarToken, actualizarContacto);

// Eliminar un contacto
router.delete("/eliminar/:id", verificarToken, eliminarContacto);

export default router;