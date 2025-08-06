import express from 'express';
import postHandlerRoles from '../../handlers/handlersRoles/postHandlerRoles.js';
import deleteHandlerRoles from '../../handlers/handlersRoles/deleteHandlerRoles.js';
import putHandlerRoles from './../../handlers/handlersRoles/putHandlerRoles.js';
import getHandlerRoles from '../../handlers/handlersRoles/getHandlerRoles.js';
const router = express.Router();

router.post('/', postHandlerRoles);
router.delete('/:id', deleteHandlerRoles);
router.put('/:id', putHandlerRoles);
router.get('/', getHandlerRoles);

export default router;
