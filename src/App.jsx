import { useEffect, useMemo, useState } from 'react';
import TablaPacientes from './components/TablaPacientes';
import FichaClinica from './components/FichaClinica';
import FormularioPaciente from './components/FormularioPaciente';
import EditorPaciente from './components/EditorPaciente';
import './App.css';

const pacientesIniciales = [
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

function Icon({ name }) {
  const paths = {
    paw: (
      <>
        <path d="M8.2 10.3c-1.3 0-2.4 1.4-2.4 3.1 0 1.4.8 2.4 1.9 2.4.8 0 1.4-.6 2.1-.6s1.3.6 2.1.6c1.1 0 1.9-1 1.9-2.4 0-1.7-1.1-3.1-2.4-3.1-.8 0-1.2.5-1.6.5s-.8-.5-1.6-.5Z" />
        <ellipse cx="5.3" cy="7.4" rx="1.3" ry="1.8" transform="rotate(-25 5.3 7.4)" />
        <ellipse cx="9" cy="5.7" rx="1.3" ry="1.8" />
        <ellipse cx="12.7" cy="7.4" rx="1.3" ry="1.8" transform="rotate(25 12.7 7.4)" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" />
      </>
    ),
    moon: <path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z" />,
    plus: <path d="M12 5v14m-7-7h14" />,
    search: (
      <>
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" />
      </>
    ),
    pets: (
      <>
        <path d="M8.2 10.3c-1.3 0-2.4 1.4-2.4 3.1 0 1.4.8 2.4 1.9 2.4.8 0 1.4-.6 2.1-.6s1.3.6 2.1.6c1.1 0 1.9-1 1.9-2.4 0-1.7-1.1-3.1-2.4-3.1-.8 0-1.2.5-1.6.5s-.8-.5-1.6-.5Z" />
        <ellipse cx="5.3" cy="7.4" rx="1.3" ry="1.8" transform="rotate(-25 5.3 7.4)" />
        <ellipse cx="9" cy="5.7" rx="1.3" ry="1.8" />
        <ellipse cx="12.7" cy="7.4" rx="1.3" ry="1.8" transform="rotate(25 12.7 7.4)" />
      </>
    ),
    dog: (
      <>
        <path d="M5 10 3.5 7 6 5l2 2h4l2-2 2.5 2-1.5 3v6a2 2 0 0 1-2 2h-6a2 2 0 0 1-2-2v-6Z" />
        <path d="M8 12h.01M12 12h.01M8 15c1.3 1 2.7 1 4 0" />
      </>
    ),
    cat: (
      <>
        <path d="m4 10 1-5 4 3h6l4-3 1 5v5a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4v-5Z" />
        <path d="M8 13h.01M16 13h.01M10 16h4m-2-3v1" />
      </>
    ),
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
        <path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20M8 7h8" />
      </>
    ),
    arrowLeft: (
      <>
        <path d="m12 19-7-7 7-7" />
        <path d="M5 12h14" />
      </>
    )
  };

  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  );
}

function getSavedTheme() {
  try {
    return localStorage.getItem('vetchiloe-theme') === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function normalizarBusqueda(valor = '') {
  return valor.toLocaleLowerCase('es').replace(/[.\-\s]/g, '');
}

function App() {
  const [pacientes, setPacientes] = useState(pacientesIniciales);
  const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
  const [pacienteEditando, setPacienteEditando] = useState(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [busqueda, setBusqueda] = useState('');
  const [theme, setTheme] = useState(getSavedTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem('vetchiloe-theme', theme);
    } catch {
      // El modo seleccionado sigue funcionando aunque el navegador no permita guardarlo.
    }
  }, [theme]);

  const pacientesFiltrados = useMemo(() => {
    const consulta = busqueda.trim().toLocaleLowerCase('es');
    const consultaNormalizada = normalizarBusqueda(consulta);
    if (!consulta) return pacientes;

    return pacientes.filter((paciente) =>
      [
        paciente.nombre,
        paciente.numero_atencion,
        paciente.especie,
        paciente.edad,
        paciente.diagnostico,
        paciente.peso,
        paciente.dueno?.nombre,
        paciente.dueno?.rut,
        paciente.dueno?.telefono
      ].some((dato) => dato && (
        dato.toLocaleLowerCase('es').includes(consulta)
        || normalizarBusqueda(dato).includes(consultaNormalizada)
      ))
    );
  }, [busqueda, pacientes]);

  const agregarNuevoPaciente = (nuevoPaciente) => {
    setPacientes((actuales) => [...actuales, nuevoPaciente]);
    setMostrarFormulario(false);
  };

  const guardarCambiosPaciente = (pacienteActualizado) => {
    setPacientes((actuales) => actuales.map((paciente) =>
      paciente.id === pacienteActualizado.id ? pacienteActualizado : paciente
    ));
    setPacienteSeleccionado((actual) =>
      actual?.id === pacienteActualizado.id ? pacienteActualizado : actual
    );
    setPacienteEditando(null);
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="topbar-inner">
          <div className="brand">
            <span className="brand-mark"><Icon name="paw" /></span>
            <div>
              <div className="brand-name">Veterinaria Chiloé</div>
              <div className="brand-caption">Cuidado que acompaña</div>
            </div>
          </div>
          <div className="topbar-actions">
            <span className="clinic-status"><span className="status-dot" /> Clínica activa</span>
            <button
              className="theme-toggle"
              type="button"
              onClick={() => setTheme((actual) => actual === 'light' ? 'dark' : 'light')}
              aria-label={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
              title={theme === 'light' ? 'Activar modo oscuro' : 'Activar modo claro'}
            >
              <Icon name={theme === 'light' ? 'moon' : 'sun'} />
            </button>
          </div>
        </div>
      </header>

      <main className="page-content">
        {pacienteSeleccionado ? (
          <section className="carnet-page">
            <div className="carnet-heading">
              <button
                className="back-button"
                type="button"
                onClick={() => setPacienteSeleccionado(null)}
              >
                <Icon name="arrowLeft" /> Volver a pacientes
              </button>
              <div>
                <div className="eyebrow">Ficha médica digital</div>
                <div className="carnet-title">Carnet de {pacienteSeleccionado.nombre}</div>
              </div>
            </div>
            <FichaClinica paciente={pacienteSeleccionado} />
          </section>
        ) : (
          <>
            <section className="page-heading">
              <div>
                <div className="eyebrow">Panel de gestión</div>
                <h1>Pacientes</h1>
                <p>Administra y consulta la información de tus pacientes.</p>
              </div>
              <button
                className="primary-button"
                type="button"
                onClick={() => setMostrarFormulario(true)}
              >
                <Icon name="plus" /> Registrar paciente
              </button>
            </section>

            <section className="overview-grid" aria-label="Resumen de pacientes">
              <article className="overview-card">
                <span className="overview-icon primary"><Icon name="pets" /></span>
                <div>
                  <div className="overview-label">Pacientes registrados</div>
                  <div className="overview-value">{pacientes.length}</div>
                </div>
              </article>
              <article className="overview-card">
                <span className="overview-icon blue"><Icon name="dog" /></span>
                <div>
                  <div className="overview-label">Caninos</div>
                  <div className="overview-value">
                    {pacientes.filter((paciente) => paciente.especie.toLowerCase() === 'canino').length}
                  </div>
                </div>
              </article>
              <article className="overview-card">
                <span className="overview-icon orange"><Icon name="cat" /></span>
                <div>
                  <div className="overview-label">Felinos</div>
                  <div className="overview-value">
                    {pacientes.filter((paciente) => paciente.especie.toLowerCase() === 'felino').length}
                  </div>
                </div>
              </article>
            </section>

            <section className="patient-panel">
              <div className="panel-heading">
                <div>
                  <div className="panel-title">Todos los pacientes</div>
                  <div className="panel-subtitle">
                    {busqueda.trim()
                      ? `${pacientesFiltrados.length} ${pacientesFiltrados.length === 1 ? 'paciente encontrado' : 'pacientes encontrados'}`
                      : `${pacientesFiltrados.length} ${pacientesFiltrados.length === 1 ? 'paciente' : 'pacientes'} en tu registro`}
                  </div>
                </div>
                <label className="search-field">
                  <Icon name="search" />
                  <input
                    type="search"
                    value={busqueda}
                    onChange={(event) => setBusqueda(event.target.value)}
                    placeholder="Buscar mascota o RUT del dueño..."
                    aria-label="Buscar pacientes"
                  />
                </label>
              </div>
              <TablaPacientes
                pacientes={pacientesFiltrados}
                onVerFicha={setPacienteSeleccionado}
                onEditar={setPacienteEditando}
                emptyMessage={busqueda.trim()
                  ? 'No encontramos pacientes que coincidan con la búsqueda.'
                  : 'Aún no hay pacientes registrados.'}
              />
            </section>
          </>
        )}
      </main>

      {mostrarFormulario && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setMostrarFormulario(false);
          }}
        >
          <div className="modal-contenido">
            <button
              className="btn-cerrar-modal"
              type="button"
              onClick={() => setMostrarFormulario(false)}
              aria-label="Cerrar formulario"
            >
              ×
            </button>
            <FormularioPaciente onAgregarPaciente={agregarNuevoPaciente} />
          </div>
        </div>
      )}

      {pacienteEditando && (
        <div
          className="modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setPacienteEditando(null);
          }}
        >
          <div className="modal-contenido modal-editor">
            <button
              className="btn-cerrar-modal"
              type="button"
              onClick={() => setPacienteEditando(null)}
              aria-label="Cerrar editor"
            >
              ×
            </button>
            <EditorPaciente
              paciente={pacienteEditando}
              onGuardar={guardarCambiosPaciente}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
