import { useState, useEffect } from 'react';
import TablaPacientes from './components/TablaPacientes';
import FichaClinica from './components/FichaClinica'; 
import FormularioPaciente from './components/FormularioPaciente'; // se importa la capa de servicios
import { obtenerPacientes, registrarPaciente } from './services/pacienteService'; 
import './App.css'; 

function App() {
  // El estado inicia vacío, simulando que esperamos datos del servidor
  const [pacientes, setPacientes] = useState([]);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Efecto secundario: Carga inicial de datos al montar la aplicación
  useEffect(() => {
    obtenerPacientes().then((datos) => {
      setPacientes(datos);
    });
  }, []); // El arreglo vacío [] asegura que esto solo ocurra una vez al cargar la página

  // Se delega la lógica de registro al servicio antes de actualizar la UI
  const agregarNuevoPaciente = (nuevoPaciente) => {
    registrarPaciente(nuevoPaciente).then((pacienteGuardado) => {
      setPacientes([...pacientes, pacienteGuardado]);
      setMostrarFormulario(false);
    });
  };

  // Vista de Ficha Clínica (Carnet)
  if (pacienteSeleccionado !== null) {
    return (
      <div className="contenedor-principal">
        <header className="cabecera">
          <h1>Carnet Clínico: {pacienteSeleccionado.nombre}</h1>
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

  // Vista Principal (Tabla de Pacientes)
  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Pacientes Registrados</h2>
        
        {/* Aquí se renderiza la tabla y le pasamos los props */}
        <TablaPacientes 
          pacientes={pacientes} 
          onVerFicha={setPacienteSeleccionado} 
        />
        
      </main>

      {/* Renderizado condicional del formulario modal */}
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

      {/* Botón flotante extendido */}
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