import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import dohiRoutes from './src/routes/dohi_routes';

dotenv.config();

const app = express();

const PORT = Number(process.env.PORT) || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/dohi/health', (_req, res) => {
  res.json({
    success: true,
    message: 'Servidor de Dohi funcionando correctamente',
  });
});

app.use('/api/dohi', dohiRoutes);

app.listen(PORT, '0.0.0.0', () => {
  console.log(
    `🤖 Dohi Server ejecutándose en el puerto ${PORT}`,
  );
});