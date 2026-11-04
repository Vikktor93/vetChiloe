const API_URL = 'https://vetchiloe-2zmz.onrender.com';

export const obtenerPacientes = async () => {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) throw new Error('Error al obtener pacientes');
  return await respuesta.json();
};

export const registrarPaciente = async (nuevoPaciente) => {
  const respuesta = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(nuevoPaciente)
  });
  
  if (!respuesta.ok) {
    const errorData = await respuesta.json();
    throw new Error(errorData.mensaje);
  }
  
  return await respuesta.json();
};