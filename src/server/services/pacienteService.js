const pacienteRepository = require('../repositories/pacienteRepository');

// Agregamos 'async' y 'await'
const obtenerPacientes = async () => {
    return await pacienteRepository.obtenerTodos();
};

const registrarPaciente = async (datosPrevios) => {
    // REGLA DE NEGOCIO: Validar Especie
    if (datosPrevios.especie !== 'Felino' && datosPrevios.especie !== 'Canino') {
        throw new Error('Especie inválida. Solo se permite Felino o Canino.');
    }

    // REGLA DE NEGOCIO: Generar N° de atención
    const numeroAleatorio = Math.floor(Math.random() * 1000);
    const nuevoPaciente = {
        // Eliminamos el id: Date.now() porque ahora PostgreSQL lo autogenera
        ...datosPrevios,
        numero_atencion: `2026-${numeroAleatorio}`
    };

    // Esperamos a que el repositorio guarde en la nube
    return await pacienteRepository.guardar(nuevoPaciente);
};

module.exports = { obtenerPacientes, registrarPaciente };