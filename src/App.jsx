import { useState, useEffect } from 'react';
import './App.css';
import FichaClinica from './components/FichaClinica';
import FormularioPaciente from './components/FormularioPaciente';
import DetallePaciente from './components/DetallePaciente';
import TablaPacientes from './components/TablaPacientes';

function App() {
  // carga los pacientes guardados en el navegador, si no hay parte vacio
  const [pacientes, setPacientes] = useState(() => {
    const guardados = localStorage.getItem('pacientes');
    return guardados ? JSON.parse(guardados) : [];
  });

  // controla si el formulario se ve o no
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  // guarda el paciente que se quiere eliminar, null si no hay ninguno
  const [pacientePorEliminar, setPacientePorEliminar] = useState(null);
  // guarda el paciente del que se esta viendo el detalle
  const [pacienteDetalle, setPacienteDetalle] = useState(null);
  // guarda el paciente del que se esta viendo el carnet
  const [pacienteCarnet, setPacienteCarnet] = useState(null);

  // cada vez que cambia la lista se vuelve a guardar
  useEffect(() => {
    try {
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    } catch (error) {
      alert('No queda espacio para guardar. Elimina pacientes o usa fotos mas livianas.');
    }
  }, [pacientes]);

  const agregarPaciente = (datosPaciente) => {
    // fecha de hoy
    const hoy = new Date().toLocaleDateString('es-CL');

    const nuevoPaciente = {
      ...datosPaciente,
      id: Date.now(),
      numero_atencion: `2026-D${pacientes.length + 1}`,
      historial: [
        { fecha: hoy, motivo: 'Ingreso', detalle: 'Registrado en la clínica.' }
      ]
    };

    setPacientes([...pacientes, nuevoPaciente]);
    // oculta el formulario despues de registrar
    setMostrarFormulario(false);
  };

  const confirmarEliminar = () => {
    // deja en la lista a todos menos al paciente elegido
    setPacientes(pacientes.filter((paciente) => paciente.id !== pacientePorEliminar.id));
    setPacientePorEliminar(null);
  };

  const darDeAlta = (pacienteAlta) => {
    const hoy = new Date().toLocaleDateString('es-CL');

    // recorre la lista y solo cambia al paciente elegido
    setPacientes(pacientes.map((paciente) =>
      paciente.id === pacienteAlta.id
        ? {
            ...paciente,
            alta: true,
            historial: [
              ...paciente.historial,
              { fecha: hoy, motivo: 'Alta', detalle: 'Paciente dado de alta.' }
            ]
          }
        : paciente
    ));
    setPacienteCarnet(null);
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - VetPenguin</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>
        <button
          className="boton-flotante"
          onClick={() => setMostrarFormulario(true)}
          title="Agregar paciente"
        >
          +
        </button>

        {/* el formulario se abre como ventana encima de la pagina */}
        {mostrarFormulario && (
          <div className="fondo-ventana">
            <div className="ventana-formulario con-scroll">
              <button
                className="boton-cerrar"
                onClick={() => setMostrarFormulario(false)}
              >
                ✕
              </button>
              <FormularioPaciente onAgregar={agregarPaciente} />
            </div>
          </div>
        )}

        {/* mensaje para cuando todavia no hay nadie registrado */}
        {pacientes.length === 0 && (
          <p className="sin-pacientes">Aún no hay pacientes registrados.</p>
        )}

        {/* la tabla solo aparece si hay pacientes */}
        {pacientes.length > 0 && (
          <TablaPacientes
            pacientes={pacientes}
            onVerFicha={setPacienteCarnet}
            onVerDetalle={setPacienteDetalle}
            onEliminar={setPacientePorEliminar}
          />
        )}
      </main>

      {/* ventana con el carnet giratorio del paciente */}
      {pacienteCarnet && (
        <div className="fondo-ventana">
          <div className="ventana-carnet">
            <button className="boton-cerrar" onClick={() => setPacienteCarnet(null)}>
              ✕
            </button>
            <FichaClinica
              paciente={pacienteCarnet}
              onDarDeAlta={darDeAlta}
            />
          </div>
        </div>
      )}

      {/* ventana con el detalle completo del paciente */}
      {pacienteDetalle && (
        <DetallePaciente
          paciente={pacienteDetalle}
          onCerrar={() => setPacienteDetalle(null)}
        />
      )}

      {/* ventana de confirmacion, solo aparece si hay un paciente por eliminar */}
      {pacientePorEliminar && (
        <div className="fondo-ventana">
          <div className="ventana">
            <h3>Eliminar paciente</h3>
            <p>
              ¿Seguro que quieres eliminar a <strong>{pacientePorEliminar.nombre}</strong>?
              Esta acción no se puede deshacer.
            </p>
            <div className="ventana-botones">
              <button className="boton-cancelar" onClick={() => setPacientePorEliminar(null)}>
                Cancelar
              </button>
              <button className="boton-confirmar" onClick={confirmarEliminar}>
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;