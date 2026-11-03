const pacienteService = require('../services/pacienteService');

// Se añade async/await y un try/catch para manejar errores de base de datos
const getPacientes = async (req, res) => {
    try {
        const pacientes = await pacienteService.obtenerPacientes();
        res.status(200).json(pacientes);
    } catch (error) {
        console.log("ERROR DE BASE DE DATOS:", error);
        res.status(500).json({ mensaje: 'Error al conectar con la base de datos' });
    }
};

const postPaciente = async (req, res) => {
    try {
        const pacienteCreado = await pacienteService.registrarPaciente(req.body);
        res.status(201).json(pacienteCreado);
    } catch (error) {
        res.status(400).json({ mensaje: error.message });
    }
};

module.exports = { getPacientes, postPaciente };