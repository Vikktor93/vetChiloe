import { useState } from 'react';
import TarjetaPaciente from './components/TarjetaPaciente'; 
import FichaClinica from './components/FichaClinica'; 
import FormularioPaciente from './components/FormularioPaciente'; 
import './App.css';

function App() {
  // BD hardcodeado con la información médica y fotografías
  const [pacientes, setPacientes] = useState([
    { 
      id: 1, 
      nombre: 'Charkicito', 
      numero_atencion: '2026-A1',
      especie: 'Felino',
      edad: '8 años',
      diagnostico: 'Control sano y vacunas al día.',
      foto: 'https://images.unsplash.com/photo-1790172202932-95d8991d25a3?q=80&w=697&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 2, 
      nombre: 'Mercedes', 
      numero_atencion: '2026-B2',
      especie: 'Felino',
      edad: '8 años',
      diagnostico: 'Tratamiento por otitis leve.',
      foto: 'https://images.unsplash.com/photo-1790171730151-7e0b88bdf614?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    },
    { 
      id: 3, 
      nombre: 'Hannita', 
      numero_atencion: '2026-C3',
      especie: 'Felino',
      edad: '3 años',
      diagnostico: 'Observación por alergia alimentaria.',
      foto: 'https://images.unsplash.com/photo-1790172629627-12f29ca54657?q=80&w=671&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    }
  ]);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);

  // Función Clave: Recibe los datos desde el componente hijo y actualiza la lista
  const agregarNuevoPaciente = (nuevoPaciente) => {
    // Se usa el operador de propagación (...) para mantener la inmutabilidad
    setPacientes([...pacientes, nuevoPaciente]);
  };

  if (pacienteSeleccionado !== null) {
    return (
      <div className="contenedor-principal">
        <header className="cabecera">
          <h1>Ficha Clínica: {pacienteSeleccionado.nombre}</h1>
          <button onClick={() => setPacienteSeleccionado(null)} className="btn-volver">
            ← Volver a la lista
          </button>
        </header>
        <main>
          <FichaClinica paciente={pacienteSeleccionado} />
        </main>
      </div>
    );
  }

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        {/*Se inserta el formulario y se le pasa la función como propiedad (prop) */}
        <FormularioPaciente onAgregarPaciente={agregarNuevoPaciente} />

        <h2>Lista de Pacientes Registrados</h2>
        <div className="cuadricula-tarjetas">
          {pacientes.map((pacienteIterado) => (
            <TarjetaPaciente 
              key={pacienteIterado.id} 
              paciente={pacienteIterado} 
              onVerFicha={() => setPacienteSeleccionado(pacienteIterado)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;