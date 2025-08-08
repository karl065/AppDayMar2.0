import { Router } from 'express';

import roles from './routesRoles/routesRoles.js';
import usuarios from './routesUsuarios/routesUsuarios.js';

const router = Router();

router.use('/roles', roles);
router.use('/usuarios', usuarios);

export default router;
