
import { Router } from "express";
import verificarToken from "../middlewares/authMiddleware.js";
import { verify } from "../controllers/verifyController.js";

const router = Router();


router.get('/verify', verificarToken, verify);

export default router;