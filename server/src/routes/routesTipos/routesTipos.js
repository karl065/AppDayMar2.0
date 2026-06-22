import express from 'express';
import getHandlerTipos from './../../handlers/handlersTipos/getHandlerTipo.js';
import postHandlerTipos from './../../handlers/handlersTipos/postHandlerTipo.js';
import putHandlerTipos from './../../handlers/handlersTipos/putHandlerTipo.js';
import deleteHandlerTipos from './../../handlers/handlersTipos/deleteHandlerTipo.js';

const router = express.Router();

router.get('/', getHandlerTipos);
router.post('/', postHandlerTipos);
router.put('/:id', putHandlerTipos);
router.delete('/:id', deleteHandlerTipos);

export default router;
