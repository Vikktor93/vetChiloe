import { useState } from 'react';
import TarjetaPaciente from './components/TarjetaPaciente'; 
import FichaClinica from './components/FichaClinica'; 
import FormularioPaciente from './components/FormularioPaciente'; 
import './App.css'; 

function App() {
  const [pacientes, setPacientes] = useState([
    { 
      id: 1, 
      nombre: 'Charkicito', 
      numero_atencion: '2026-A1',
      especie: 'Canino',
      edad: '3 años',
      diagnostico: 'Control sano y vacunas al día.',
      foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 2, 
      nombre: 'Mercedes', 
      numero_atencion: '2026-B2',
      especie: 'Felino',
      edad: '5 años',
      diagnostico: 'Tratamiento por otitis leve.',
      foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80'
    },
    { 
      id: 3, 
      nombre: 'Hannita', 
      numero_atencion: '2026-C3',
      especie: 'Canino',
      edad: '1 año',
      diagnostico: 'Observación por alergia alimentaria.',
      foto: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=300&q=80'
    }
  ]);

  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  
  // Nuevo Estado: Controla la visibilidad del formulario modal
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  const agregarNuevoPaciente = (nuevoPaciente) => {
    setPacientes([...pacientes, nuevoPaciente]);
    // Una vez que se guarda el paciente, se cierra el modal automáticamente
    setMostrarFormulario(false);
  };

  // Vista de Ficha Clínica
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

  // Vista Principal (Lista de Pacientes)
  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
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

      {/* Renderizado condicional del modal */}
      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button 
              className="btn-cerrar-modal" 
              onClick={() => setMostrarFormulario(false)}
            >
              ✖
            </button>
            <FormularioPaciente onAgregarPaciente={agregarNuevoPaciente} />
          </div>
        </div>
      )}

      {/* Botón flotante: Cambia el estado para mostrar el formulario */}
      <button 
        className="btn-flotante" 
        onClick={() => setMostrarFormulario(true)}
      >
        <span className="icono-mas">+</span> Agregar Nuevo Paciente
      </button> 
    </div>
  );
}

export default App;