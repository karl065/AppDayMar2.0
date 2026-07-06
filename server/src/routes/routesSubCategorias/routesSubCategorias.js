import express from 'express';
import postHandlerSubCategorias from './../../handlers/handlerSubCategorias/postHandlerSubCategoria.js';
import getHandlerSubCategorias from './../../handlers/handlerSubCategorias/getHandlerSubCategoria.js';
import putHandlerSubCategorias from './../../handlers/handlerSubCategorias/putHandlerSubCategoria.js';
import deleteHandlerSubCategorias from '../../handlers/handlerSubCategorias/deleteHandlerSubCategoria.js';

const router = express.Router();

router.get('/', getHandlerSubCategorias);
router.post('/', postHandlerSubCategorias);
router.put('/:id', putHandlerSubCategorias);
router.delete('/:id', deleteHandlerSubCategorias);

export default router;
