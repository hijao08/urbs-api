import { Router } from 'express';
import { externalRouter } from './public';

export const router = Router();

router.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

router.use('/v1', externalRouter);
