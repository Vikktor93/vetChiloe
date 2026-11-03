const pacienteRepository = require('../repositories/pacienteRepository');

// Agregamos 'async' y 'await'
const obtenerPacientes = async () => {
    return await pacienteRepository.obtenerTodos();
};

const registrarPaciente = async (datosPrevios) => {
    // REGLA DE NEGOCIO: Generar N° de atención
    const numeroAleatorio = Math.floor(Math.random() * 1000);
    const nuevoPaciente = {
        // Se envían los datos puros (incluyendo cualquier especie)
        ...datosPrevios,
        numero_atencion: `2026-${numeroAleatorio}`
    };

    // Esperamos a que el repositorio guarde en la nube
    return await pacienteRepository.guardar(nuevoPaciente);
};

module.exports = { obtenerPacientes, registrarPaciente };