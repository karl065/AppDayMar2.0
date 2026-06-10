import { Router } from 'express';
import loginHandler from './../../handlers/auth/loginHandler.js';
import handlerAutenticado from './../../handlers/auth/usuarioAutenticadoHandler.js';
import logoutHandler from './../../handlers/auth/logoutHandler.js';
import authMiddle from './../../middlewares/auth/authMiddle.js';

const router = Router();

router.post('/login', loginHandler);

// 🔥 Nueva ruta: Revalidar token (relogin)
router.get('/relogin', authMiddle, handlerAutenticado);

// Logout
router.put('/logout/:id', logoutHandler);

export default router;
