import express from 'express';
import getHandlerProductos from '../../handlers/handlersProductos/getHandlerProductos.js';
import postHandlerProductos from '../../handlers/handlersProductos/postHandlerProductos.js';
import putHandlerProductos from '../../handlers/handlersProductos/putHandlerProductos.js';
import deleteHandlerProductos from '../../handlers/handlersProductos/deleteHandlerProductos.js';

const router = express.Router();

router.get('/', getHandlerProductos);
router.post('/', postHandlerProductos);
router.put('/:id', putHandlerProductos);
router.delete('/:id', deleteHandlerProductos);

export default router;
