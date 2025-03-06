
import {Router} from "express";
import verificarToken from '../middlewares/authMiddleware.js'
import {getContactos, crearContacto, actualizarContacto, eliminarContacto, ocultarContacto, contactosPublicos, getContactosAdmin, mostrarContactos} from "../controllers/contactosController.js";
const router = Router();

// Obtener todos los contactos públicos
router.get("/contactos/obtener", verificarToken, getContactos);

router.get('/contactos/publicos', verificarToken, contactosPublicos);

router.get('/contactos/admin', verificarToken,getContactosAdmin);

// Crear un nuevo contacto
router.post("/contactos/crear", verificarToken, crearContacto);

// Actualizar un contacto
router.put("/contactos/actualizar/:id", verificarToken, actualizarContacto);

router.put('/contactos/ocultar/:id', verificarToken, ocultarContacto);

router.put('/contactos/mostrar/:id', verificarToken, mostrarContactos);

// Eliminar un contacto
router.delete("/contactos/eliminar/:id", verificarToken, eliminarContacto);

export default router;