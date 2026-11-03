const pacienteService = require('../services/pacienteService');

const getPacientes = (req, res) => {
    const pacientes = pacienteService.obtenerPacientes();
    res.status(200).json(pacientes);
};

const postPaciente = (req, res) => {
    try {
        const pacienteCreado = pacienteService.registrarPaciente(req.body);
        res.status(201).json(pacienteCreado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

module.exports = { getPacientes, postPaciente };