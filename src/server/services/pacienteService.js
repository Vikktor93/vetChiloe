const pacienteRepository = require('../repositories/pacienteRepository');

const obtenerPacientes = () => {
    return pacienteRepository.obtenerTodos();
};

const registrarPaciente = (datosPrevios) => {
    // REGLA DE NEGOCIO: Validar Especie
    if (datosPrevios.especie !== 'Felino' && datosPrevios.especie !== 'Canino') {
        throw new Error('Especie inválida. Solo se permite Felino o Canino.');
    }

    // REGLA DE NEGOCIO: Generar N° de atención
    const numeroAleatorio = Math.floor(Math.random() * 1000);
    const nuevoPaciente = {
        id: Date.now(),
        ...datosPrevios,
        numero_atencion: `2026-${numeroAleatorio}`
    };

    return pacienteRepository.guardar(nuevoPaciente);
};

module.exports = { obtenerPacientes, registrarPaciente };