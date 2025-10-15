import { Router } from 'express';
import { http } from '../services/http';
import { z } from 'zod';

export const externalRouter = Router();

const querySchema = z.object({
  q: z.string().min(1),
});

externalRouter.get('/search', async (req, res) => {
  const parsed = querySchema.safeParse(req.query);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }

  const { q } = parsed.data;
  const response = await http.get('/search', { params: { q } });
  return res.json(response.data);
});


