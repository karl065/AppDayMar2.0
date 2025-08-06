import { Router } from 'express';

import roles from './routesRoles/routesRoles.js';

const router = Router();

router.use('/roles', roles);

export default router;
