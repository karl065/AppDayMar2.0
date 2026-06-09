import express from 'express';
import getHandlerCategorias from '../../handlers/handlersCategorias/getHandlerCategoria.js';
import postHandlerCategorias from '../../handlers/handlersCategorias/postHandlerCategoria.js';
import putHandlerCategorias from '../../handlers/handlersCategorias/putHandlerCategoria.js';
import deleteHandlerCategorias from '../../handlers/handlersCategorias/deleteHandlerCategoria.js';

const router = express.Router();

router.get('/', getHandlerCategorias);
router.post('/', postHandlerCategorias);
router.put('/:id', putHandlerCategorias);
router.delete('/:id', deleteHandlerCategorias);

export default router;
