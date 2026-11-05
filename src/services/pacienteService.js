// Capa de servicios del frontend: único archivo que conoce la API
const API_URL = 'https://vetchiloe-2zmz.onrender.com/api/pacientes';

// Lee el mensaje de error que envía el backend ({ mensaje }) si existe
const manejarRespuesta = async (respuesta, mensajePorDefecto) => {
  if (!respuesta.ok) {
    const errorData = await respuesta.json().catch(() => ({}));
    throw new Error(errorData.mensaje || mensajePorDefecto);
  }
  return respuesta.json();
};

export const obtenerPacientes = async () => {
  const respuesta = await fetch(API_URL);
  return manejarRespuesta(respuesta, 'Error al obtener pacientes');
};

// Búsqueda en toda la base de datos: SELECT * FROM buscar_pacientes(texto)
export const buscarPacientes = async (texto) => {
  const respuesta = await fetch(`${API_URL}/buscar?q=${encodeURIComponent(texto)}`);
  return manejarRespuesta(respuesta, 'Error al buscar pacientes');
};

// Estadística: SELECT * FROM resumen_por_especie() → [{ especie, total }]
export const obtenerResumen = async () => {
  const respuesta = await fetch(`${API_URL}/resumen`);
  return manejarRespuesta(respuesta, 'Error al obtener el resumen');
};

// El N° de atención ya no se envía: lo genera la base de datos
export const registrarPaciente = async (nuevoPaciente) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(nuevoPaciente)
  });
  return manejarRespuesta(respuesta, 'Error al registrar el paciente');
};

export const actualizarDiagnostico = async (id, diagnostico) => {
  const respuesta = await fetch(`${API_URL}/${id}/diagnostico`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ diagnostico })
  });
  return manejarRespuesta(respuesta, 'Error al actualizar el diagnóstico');
};
