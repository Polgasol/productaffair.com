import express from 'express';
import { authCheck } from '../../middleware/authCheck/authCheck';

// eslint-disable-next-line new-cap
const router = express.Router();

router.get('/', authCheck);

export default router;
