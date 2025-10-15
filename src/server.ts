import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import pino from 'pino';
import pinoHttp from 'pino-http';
import { router } from './routes/index';

const logger = pino({ level: process.env.LOG_LEVEL || 'info' });

const app = express();
app.use(cors());
app.use(express.json());
app.use(pinoHttp({ logger }));

app.use('/api', router);

const port = Number(process.env.PORT || 3000);
app.listen(port, () => {
  logger.info({ port }, 'Servidor iniciado');
});
