import { useState } from 'react';
import './App.css';
import TarjetaPaciente from './components/TarjetaPaciente';
import FormularioPaciente from './components/FormularioPaciente';
import imgFelipe from './assets/pets/Charkicito.webp';
import imgMaxi from './assets/pets/Mercedes.webp';
import imgHannita from './assets/pets/Hannita.webp';

const PACIENTES_INICIALES = [
  {
    id: 1,
    nombre: 'Felipe',
    especie: 'Felino',
    peso: 4.5,
    dueno: '11111111-1',
    telefono: '+56912345678',
    numero_atencion: '2026-A1',
    edad: 5,
    ultima_visita: '2026-01-15',
    imagen: imgFelipe,
  },
  {
    id: 2,
    nombre: 'Maxi',
    especie: 'Felino',
    peso: 3.2,
    dueno: '22222222-2',
    telefono: '+56987654321',
    numero_atencion: '2026-B2',
    edad: 8,
    ultima_visita: '2026-02-20',
    imagen: imgMaxi,
  },
  {
    id: 3,
    nombre: 'Hannita',
    especie: 'Canino',
    peso: 12.0,
    dueno: '33333333-3',
    telefono: '+56922334455',
    numero_atencion: '2026-C3',
    edad: 3,
    ultima_visita: '2026-03-10',
    imagen: imgHannita,
  },
];

function App() {
  const [pacientes, setPacientes] = useState(PACIENTES_INICIALES);
  const [formularioAbierto, setFormularioAbierto] = useState(false);

  const agregarPacientes = (datosPaciente) => {
    setPacientes((previos) => [...previos, { ...datosPaciente, id: Date.now() }]);
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <div className="acciones">
          <button
            type="button"
            className="btn-nuevo-paciente"
            onClick={() => setFormularioAbierto((abierto) => !abierto)}
            aria-expanded={formularioAbierto}
            aria-controls="formulario-paciente"
          >
            {formularioAbierto ? 'Cerrar formulario' : '+ Nuevo Paciente'}
          </button>
        </div>

        {formularioAbierto && (
          <FormularioPaciente onAgregarPacientes={agregarPacientes} />
        )}

        <h2>Lista de Pacientes Registrados</h2>
        <div className="cuadricula-tarjetas">
          {pacientes.map((pacienteIterado) => (
            <TarjetaPaciente
              key={pacienteIterado.id}
              paciente={pacienteIterado}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;
