require('dotenv').config();
const express = require('express');
const cors = require('cors');
const pacienteRoutes = require('./routes/pacienteRoutes');

const app = express();
app.use(cors()); // Permite peticiones desde el frontend en React
app.use(express.json()); // Permite leer JSON en el body

// Rutas
app.use('/api/pacientes', pacienteRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});