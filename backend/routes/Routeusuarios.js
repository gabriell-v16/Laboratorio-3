import {Router} from 'express';
import {registroUsuario, loginUsuario, obtenerUser, actualizarPerfil} from '../controllers/usuariosController.js';
import verificarToken from '../middlewares/authMiddleware.js'

const router = Router();


//ObtenerPerfil
router.get('/usuarios/perfil', verificarToken,  obtenerUser);

// Registrar usuario
router.post("/usuarios/registro", registroUsuario);


// Iniciar sesión
router.post("/usuarios/login", loginUsuario);

router.post('/usuarios/actualizar', verificarToken, actualizarPerfil);


export default router;