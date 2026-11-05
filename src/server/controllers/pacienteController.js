const pacienteService = require('../services/pacienteService');

// Capa de controladores: traduce HTTP (req/res) y delega en el servicio
const responderError = (res, error) => {
    if (error.status) {
        return res.status(error.status).json({ mensaje: error.message });
    }
    console.error('ERROR DE BASE DE DATOS:', error);
    return res.status(500).json({ mensaje: 'Error al conectar con la base de datos' });
};

const getPacientes = async (req, res) => {
    try {
        res.status(200).json(await pacienteService.obtenerPacientes());
    } catch (error) {
        responderError(res, error);
    }
};

// GET /api/pacientes/buscar?q=texto
const buscarPacientes = async (req, res) => {
    try {
        const texto = req.query.q || '';
        res.status(200).json(await pacienteService.buscarPacientes(texto));
    } catch (error) {
        responderError(res, error);
    }
};

// GET /api/pacientes/resumen
const getResumen = async (req, res) => {
    try {
        res.status(200).json(await pacienteService.obtenerResumen());
    } catch (error) {
        responderError(res, error);
    }
};

// POST /api/pacientes
const postPaciente = async (req, res) => {
    try {
        const pacienteCreado = await pacienteService.registrarPaciente(req.body);
        res.status(201).json(pacienteCreado);
    } catch (error) {
        responderError(res, error);
    }
};

// PUT /api/pacientes/:id/diagnostico
const putDiagnostico = async (req, res) => {
    try {
        const paciente = await pacienteService.actualizarDiagnostico(
            req.params.id,
            req.body?.diagnostico
        );
        res.status(200).json(paciente);
    } catch (error) {
        responderError(res, error);
    }
};

module.exports = { getPacientes, buscarPacientes, getResumen, postPaciente, putDiagnostico };
