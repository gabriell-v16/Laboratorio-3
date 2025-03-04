import {Router} from 'express';
import {registroUsuario, loginUsuario} from '../controllers/usuariosController.js';

const router = Router();

// Registrar usuario
router.post("/registro", registroUsuario);


// Iniciar sesión
router.post("/login", loginUsuario);

export default router;