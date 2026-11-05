import { useState, useEffect } from 'react';
import TablaPacientes from './components/TablaPacientes';
import FichaClinica from './components/FichaClinica';
import FormularioPaciente from './components/FormularioPaciente';
import BuscadorPaciente from './components/BuscadorPaciente';
import ResumenEspecies from './components/ResumenEspecies';
import { obtenerPacientes, registrarPaciente, obtenerResumen } from './services/pacienteService'; // Capa de servicios: único punto de contacto con la API
import './App.css';

// minúsculas y sin tildes "Exótico" y "exotico" coinciden
const normalizar = (texto = '') =>
  texto.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');

function App() {
  // El estado inicia vacío, simulando que esperamos datos del servidor
  const [pacientes, setPacientes] = useState([]);
  const [resumen, setResumen] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

  // Resumen por especie calculado por la BD: resumen_por_especie()
  const cargarResumen = () => {
    obtenerResumen()
      .then(setResumen)
      .catch((error) => console.error(error.message));
  };

  useEffect(() => {
    obtenerPacientes()
      .then(setPacientes)
      .catch((error) => console.error(error.message));
    cargarResumen();
  }, []);

  // Filtro se recalcula en cada render a partir del texto de búsqueda
  const filtrados = pacientes.filter((p) =>
    normalizar(`${p.nombre} ${p.especie}`).includes(normalizar(busqueda.trim()))
  );

  // Se delega la lógica de registro al servicio antes de actualizar la UI.
  const agregarNuevoPaciente = (nuevoPaciente) => {
    registrarPaciente(nuevoPaciente)
      .then((pacienteGuardado) => {
        // la API entrega los pacientes del más reciente al más antiguo
        setPacientes((anteriores) => [pacienteGuardado, ...anteriores]);
        setMostrarFormulario(false);
        cargarResumen();
      })
      .catch((error) => alert(`No se pudo registrar el paciente: ${error.message}`));
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

        {/* Resumen por especie con los mismos colores de los badges */}
        <ResumenEspecies resumen={resumen} />

        {/* Barra de búsqueda + contador en vivo */}
        <div className="barra-herramientas">
          <BuscadorPaciente texto={busqueda} onCambiar={setBusqueda} />
          <p className="contador-pacientes" aria-live="polite">
            {filtrados.length} de {pacientes.length} pacientes
          </p>
        </div>

        <TablaPacientes
          pacientes={filtrados}
          onVerFicha={setPacienteSeleccionado}
          mensajeVacio={
            busqueda.trim() !== '' && pacientes.length > 0
              ? 'No se encontraron pacientes'
              : undefined
          }
        />
      </main>

      {/* Renderizado condicional del formulario modal */}
      {mostrarFormulario && (
        <div className="modal-overlay">
          <div className="modal-contenido">
            <button
              className="btn-cerrar-modal"
              onClick={() => setMostrarFormulario(false)}
              aria-label="Cerrar formulario"
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
