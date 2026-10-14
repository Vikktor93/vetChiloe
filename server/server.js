import cors from 'cors';
import express from 'express';
import pacienteRoutes from './src/routes/pacienteRoutes.js';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/api/pacientes', pacienteRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada.' });
});

app.use((error, req, res, next) => {
  if (res.headersSent) {
    next(error);
    return;
  }

  console.error('Error en la API:', error);
  res.status(error.status || 500).json({
    error: error.status ? error.message : 'Error interno del servidor.'
  });
});

app.listen(port, () => {
  console.log(`API vetChiloé escuchando en http://localhost:${port}`);
});
