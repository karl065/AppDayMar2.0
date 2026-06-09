import express from 'express';
import getHandlerTipos from './../../handlers/handlersTipos/getHandlerTipo.js';
import postHandlerTipos from './../../handlers/handlersTipos/postHandlerTipo';
import putHandlerTipos from './../../handlers/handlersTipos/putHandlerTipo';
import deleteHandlerTipos from './../../handlers/handlersTipos/deleteHandlerTipo';

const router = express.Router();

router.get('/', getHandlerTipos);
router.post('/', postHandlerTipos);
router.put('/:id', putHandlerTipos);
router.delete('/:id', deleteHandlerTipos);

export default router;
