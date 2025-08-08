import express from 'express';
import postHandlerUsuario from './../../handlers/handlersUsuarios/postHandlerUsuario.js';
import deleteHandlerUsuarios from '../../handlers/handlersUsuarios/deleteHandlerUsuario.js';
import putHandlerUsuario from './../../handlers/handlersUsuarios/putHandlerUsuario.js';
import getHandlerUsuario from './../../handlers/handlersUsuarios/getHandlerUsuario.js';
const router = express.Router();

router.post('/', postHandlerUsuario);
router.delete('/:id', deleteHandlerUsuarios);
router.put('/:id', putHandlerUsuario);
router.get('/', getHandlerUsuario);

export default router;
