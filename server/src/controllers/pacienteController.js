import * as pacienteService from '../services/pacienteService.js';

export function listarPacientes(req, res) {
  res.json(pacienteService.obtenerPacientes());
}

export function crearPaciente(req, res) {
  const paciente = pacienteService.registrarPaciente(req.body);
  res.status(201).json(paciente);
}
