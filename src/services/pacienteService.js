async function solicitar(url, opciones) {
  const respuesta = await fetch(url, opciones);
  const datos = await respuesta.json();

  if (!respuesta.ok) {
    throw new Error(datos.error || `Error al comunicarse con el servidor (${respuesta.status}).`);
  }

  return datos;
}

export function obtenerPacientes() {
  return solicitar('/api/pacientes');
}

export function registrarPaciente(paciente) {
  return solicitar('/api/pacientes', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(paciente)
  });
}
