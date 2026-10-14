import * as pacienteRepository from '../repositories/pacienteRepository.js';

const especiesPermitidas = new Set(['Canino', 'Felino', 'Exótico']);

export function obtenerPacientes() {
  return pacienteRepository.listarTodos();
}

export function registrarPaciente(datos) {
  if (!datos || typeof datos !== 'object' || Array.isArray(datos)) {
    throw Object.assign(new Error('El cuerpo de la solicitud debe ser un objeto JSON.'), { status: 400 });
  }

  const nombre = typeof datos.nombre === 'string' ? datos.nombre.trim() : '';
  const especie = typeof datos.especie === 'string' ? datos.especie : '';
  const edad = typeof datos.edad === 'string' ? datos.edad.trim() : '';
  const diagnostico = typeof datos.diagnostico === 'string' ? datos.diagnostico.trim() : '';
  const peso = datos.peso === '' || datos.peso == null ? '' : Number(datos.peso);

  if (!nombre || !edad || !diagnostico) {
    throw Object.assign(new Error('Nombre, edad y diagnóstico son obligatorios.'), { status: 400 });
  }

  if (!especiesPermitidas.has(especie)) {
    throw Object.assign(new Error('La especie debe ser Canino, Felino o Exótico.'), { status: 400 });
  }

  if (peso !== '' && (!Number.isFinite(peso) || peso <= 0)) {
    throw Object.assign(new Error('El peso debe ser un número mayor que cero.'), { status: 400 });
  }

  const id = pacienteRepository.siguienteId();
  const dueno = datos.dueno && typeof datos.dueno === 'object' && !Array.isArray(datos.dueno)
    ? {
        nombre: typeof datos.dueno.nombre === 'string' ? datos.dueno.nombre.trim() : '',
        rut: typeof datos.dueno.rut === 'string' ? datos.dueno.rut.trim() : '',
        telefono: typeof datos.dueno.telefono === 'string' ? datos.dueno.telefono.trim() : ''
      }
    : undefined;

  return pacienteRepository.agregar({
    id,
    nombre,
    numero_atencion: `${new Date().getFullYear()}-N${id}`,
    especie,
    edad,
    peso,
    diagnostico,
    foto: typeof datos.foto === 'string' ? datos.foto : '',
    ...(dueno ? { dueno } : {})
  });
}
