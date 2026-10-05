import React, { useState, useEffect } from 'react';
import './HistorialClinico.css';

function HistorialClinico({ pacientes, historiales = [], agregarHistorial, pacienteInicialId, limpiarPacienteInicial }) {
  // Si viene un ID desde la agenda del Home, iniciamos directamente en la vista 'buscar'
  const [vistaActual, setVistaActual] = useState(pacienteInicialId ? 'buscar' : null);
  
  // Estados para Ingresar
  const [pacienteIngresoId, setPacienteIngresoId] = useState(pacientes[0]?.id || '');
  const [tipoConsulta, setTipoConsulta] = useState('Consulta General');
  const [peso, setPeso] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [tratamiento, setTratamiento] = useState('');

  // Estados para Búsqueda y Gestión (se precarga la ID del paciente si viene desde Home)
  const [pacienteBusquedaId, setPacienteBusquedaId] = useState(pacienteInicialId || pacientes[0]?.id || '');

  useEffect(() => {
    if (pacienteInicialId) {
      setVistaActual('buscar');
      setPacienteBusquedaId(pacienteInicialId);
    }
  }, [pacienteInicialId]);

  const pacienteIngresoActual = pacientes.find(p => p.id === Number(pacienteIngresoId));
  const pacienteBusquedaActual = pacientes.find(p => p.id === Number(pacienteBusquedaId));

  const historialesPacienteBusqueda = historiales.filter(
    h => h.pacienteId === Number(pacienteBusquedaId)
  );

  const handleAutoResize = (e, setter) => {
    setter(e.target.value);
    e.target.style.height = '48px';
    if (e.target.scrollHeight > 48) {
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const handleVolverMenu = () => {
    setVistaActual(null);
    if (limpiarPacienteInicial) limpiarPacienteInicial();
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!pacienteIngresoActual) return;

    if (peso !== '' && Number(peso) < 0) {
      alert('El peso no puede ser un valor negativo.');
      return;
    }

    const nuevaAtencion = {
      id: Date.now(),
      pacienteId: pacienteIngresoActual.id,
      pacienteNombre: pacienteIngresoActual.nombre,
      tipoConsulta,
      peso: peso ? `${peso} kg` : 'No registrado',
      diagnostico: diagnostico.trim() || 'Sin observaciones.',
      tratamiento: tratamiento.trim() || 'Sin indicaciones.',
      fecha: new Date().toLocaleDateString('es-CL')
    };

    agregarHistorial(nuevaAtencion);
    setDiagnostico('');
    setTratamiento('');
    setPeso('');
    alert(`Historial clínico guardado correctamente para ${pacienteIngresoActual.nombre}.`);
  };

  const handleExportarPDF = () => {
    window.print();
  };

  return (
    <div className="historial-contenedor-seccion">
      
      {/* VISTA INICIAL: MENÚ DE 2 BOTONES ROSADOS */}
      {vistaActual === null && (
        <div className="menu-opciones-historial">
          <button 
            className="btn-opcion-historial"
            onClick={() => setVistaActual('ingresar')}
          >
            <h3>Ingresar Historial Clínico</h3>
            <p>Registra una nueva atención médica, control de peso, vacuna o revisión clínica.</p>
          </button>

          <button 
            className="btn-opcion-historial"
            onClick={() => setVistaActual('buscar')}
          >
            <h3>Búsqueda y Gestión de Historial Clínico</h3>
            <p>Consulta las atenciones anteriores de cualquier paciente y exporta su reporte en PDF.</p>
          </button>
        </div>
      )}

      {/* MÓDULO 1: INGRESAR HISTORIAL */}
      {vistaActual === 'ingresar' && (
        <div className="bloque-dashboard">
          <div className="cabecera-modulo-historial">
            <h2>Ingresar Historial Clínico</h2>
            <button className="btn-volver-historial" onClick={handleVolverMenu}>
              Volver
            </button>
          </div>

          <form onSubmit={handleSubmit} className="form-completo">
            <div className="campo">
              <label htmlFor="pacienteIngreso">Seleccionar Paciente *</label>
              <select 
                id="pacienteIngreso"
                value={pacienteIngresoId} 
                onChange={(e) => setPacienteIngresoId(e.target.value)}
              >
                {pacientes.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.nombre} ({p.especie}) — Ficha: {p.numero_atencion}
                  </option>
                ))}
              </select>
            </div>

            <div className="campo">
              <label>Tipo de Atención</label>
              <select value={tipoConsulta} onChange={(e) => setTipoConsulta(e.target.value)}>
                <option value="Consulta General">Consulta General</option>
                <option value="Vacunación / Desparasitación">Vacunación / Desparasitación</option>
                <option value="Control de Peso / Nutrición">Control de Peso / Nutrición</option>
                <option value="Control Post-Cirugía">Control Post-Cirugía</option>
                <option value="Urgencia">Urgencia</option>
              </select>
            </div>

            <div className="campo">
              <label>Peso real (kg)</label>
              <input 
                type="number" 
                step="0.1" 
                min="0"
                placeholder="Ej: 12.5" 
                value={peso} 
                onChange={(e) => setPeso(e.target.value)} 
              />
            </div>

            <div className="campo">
              <label>Anamnesis / Observaciones *</label>
              <textarea 
                rows="1" 
                className="input-limpio-historial textarea-autogrow"
                placeholder="Escribe el motivo de la visita o revisión física..." 
                value={diagnostico} 
                onChange={(e) => handleAutoResize(e, setDiagnostico)} 
                required 
              />
            </div>

            <div className="campo">
              <label>Tratamiento / Indicaciones</label>
              <textarea 
                rows="1" 
                className="input-limpio-historial textarea-autogrow"
                placeholder="Indicaciones médicas, dosis o próxima vacuna..." 
                value={tratamiento} 
                onChange={(e) => handleAutoResize(e, setTratamiento)} 
              />
            </div>

            <div className="acciones-form">
              <button type="button" className="btn-cancelar" onClick={handleVolverMenu}>
                Cancelar
              </button>
              <button type="submit" className="btn-guardar-paciente">
                Guardar Registro Clínico
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MÓDULO 2: BÚSQUEDA Y GESTIÓN DE PACIENTE ESPECÍFICO */}
      {vistaActual === 'buscar' && (
        <div className="bloque-dashboard area-impresion-pdf">
          <div className="cabecera-modulo-historial no-imprimir">
            <h2>Búsqueda y Gestión de Historial Clínico</h2>
            <button className="btn-volver-historial" onClick={handleVolverMenu}>
              Volver
            </button>
          </div>

          <div className="selector-paciente-box no-imprimir">
            <label htmlFor="selectorMascota">Buscar Mascota:</label>
            <select 
              id="selectorMascota"
              value={pacienteBusquedaId}
              onChange={(e) => setPacienteBusquedaId(e.target.value)}
            >
              {pacientes.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.nombre} ({p.especie}) — Ficha: {p.numero_atencion}
                </option>
              ))}
            </select>

            {historialesPacienteBusqueda.length > 0 && (
              <button className="btn-guardar-paciente" onClick={handleExportarPDF}>
                Exportar a PDF / Imprimir
              </button>
            )}
          </div>

          <div className="documento-historial-clinico">
            <div className="encabezado-pdf-clinico">
              <h3>Ficha e Historial Clínico - VetChiloé</h3>
              <p><strong>Paciente:</strong> {pacienteBusquedaActual?.nombre} ({pacienteBusquedaActual?.especie})</p>
              <p><strong>N° Atención:</strong> {pacienteBusquedaActual?.numero_atencion}</p>
              <p><strong>Tutor:</strong> {pacienteBusquedaActual?.nombre_dueno || 'No registrado'}</p>
            </div>

            {historialesPacienteBusqueda.length > 0 ? (
              <div className="lista-atenciones">
                {historialesPacienteBusqueda.map((atencion) => (
                  <div key={atencion.id} className="tarjeta-atencion">
                    <div className="atencion-header">
                      <strong>{atencion.tipoConsulta}</strong>
                      <span className="fecha-tag">Fecha: {atencion.fecha}</span>
                    </div>
                    <p><strong>Peso:</strong> {atencion.peso}</p>
                    <p><strong>Observaciones:</strong> {atencion.diagnostico}</p>
                    <p><strong>Tratamiento:</strong> {atencion.tratamiento}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="texto-vacio">No existen registros de historial clínico guardados para este paciente.</p>
            )}
          </div>
        </div>
      )}

    </div>
  );
}

export default HistorialClinico;