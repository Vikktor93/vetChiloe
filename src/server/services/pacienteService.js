const pacienteRepository = require('../repositories/pacienteRepository');

// Capa de reglas de negocio de la veterinaria
const ESPECIES = ['Canino', 'Felino', 'Exótico'];

// Error con código HTTP para que el controlador responda el status correcto
const errorNegocio = (mensaje, status = 400) => {
    const error = new Error(mensaje);
    error.status = status;
    return error;
};

// Acepta "canino", "FELINO", "exotico", etc. y devuelve el nombre oficial
const normalizarEspecie = (especie = '') => {
    const limpio = especie.trim().toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
    return ESPECIES.find(
        (e) => e.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '') === limpio
    );
};

const obtenerPacientes = async () => {
    return await pacienteRepository.obtenerTodos();
};

const buscarPacientes = async (texto = '') => {
    return await pacienteRepository.buscar(String(texto).trim());
};

const registrarPaciente = async (datos = {}) => {
    if (!datos.nombre || String(datos.nombre).trim() === '') {
        throw errorNegocio('El nombre del paciente es obligatorio');
    }
    const especie = normalizarEspecie(datos.especie);
    if (!especie) {
        throw errorNegocio(`Especie no válida. Valores permitidos: ${ESPECIES.join(', ')}`);
    }

    // El N° de atención ya no se genera aquí: lo asigna PostgreSQL
    // con generar_numero_atencion() dentro de registrar_paciente()
    return await pacienteRepository.guardar({ ...datos, especie });
};

const obtenerResumen = async () => {
    const filas = await pacienteRepository.resumenPorEspecie();
    // pg entrega BIGINT (COUNT) como texto: se convierte a número
    return filas.map((fila) => ({ especie: fila.especie, total: Number(fila.total) }));
};

const actualizarDiagnostico = async (id, diagnostico) => {
    const idNumerico = Number(id);
    if (!Number.isInteger(idNumerico) || idNumerico <= 0) {
        throw errorNegocio('El id debe ser un número entero positivo');
    }
    if (!diagnostico || String(diagnostico).trim() === '') {
        throw errorNegocio('El diagnóstico es obligatorio');
    }
    const paciente = await pacienteRepository.actualizarDiagnostico(idNumerico, diagnostico);
    if (!paciente) {
        throw errorNegocio('Paciente no encontrado', 404);
    }
    return paciente;
};

module.exports = {
    ESPECIES,
    obtenerPacientes,
    buscarPacientes,
    registrarPaciente,
    obtenerResumen,
    actualizarDiagnostico
};
