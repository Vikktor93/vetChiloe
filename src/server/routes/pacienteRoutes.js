const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/pacienteController');

// Las rutas fijas (/buscar, /resumen) se declaran antes de cualquier ruta con
// parámetro (/:id) si no, Express interpretaría "buscar" como un id
router.get('/buscar', pacienteController.buscarPacientes);
router.get('/resumen', pacienteController.getResumen);

router.get('/', pacienteController.getPacientes);
router.post('/', pacienteController.postPaciente);

router.put('/:id/diagnostico', pacienteController.putDiagnostico);

module.exports = router;
