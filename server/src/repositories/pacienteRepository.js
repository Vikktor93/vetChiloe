const pacientes = [
  {
    id: 1,
    nombre: 'Charkicito',
    numero_atencion: '2026-A1',
    especie: 'Felino',
    edad: '8 años',
    diagnostico: 'Control sano y vacunas al día.',
    foto: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 2,
    nombre: 'Mercedes',
    numero_atencion: '2026-B2',
    especie: 'Felino',
    edad: '8 años',
    diagnostico: 'Tratamiento por otitis leve.',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 3,
    nombre: 'Hannita',
    numero_atencion: '2026-C3',
    especie: 'Felino',
    edad: '3 años',
    diagnostico: 'Observación por alergia alimentaria.',
    foto: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=300&q=80'
  },
  {
    id: 4,
    nombre: 'Pelusa',
    numero_atencion: '2026-D4',
    especie: 'Canino',
    edad: '12 años',
    diagnostico: 'Tratamiento por artritis.',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80'
  }
];

export function listarTodos() {
  return pacientes.map((paciente) => ({ ...paciente }));
}

export function agregar(paciente) {
  pacientes.push(paciente);
  return { ...paciente };
}

export function siguienteId() {
  return pacientes.reduce((mayor, paciente) => Math.max(mayor, paciente.id), 0) + 1;
}
