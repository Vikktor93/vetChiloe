import { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { PacienteCard } from './components/PacienteCard';
import { FormularioPaciente } from './components/FormularioPaciente';
import './App.css';

const PACIENTES_INICIALES = [
  {
    id: 1,
    nombre: 'Charkicito',
    numero_atencion: '2026-A1',
    especie: 'Canino',
    raza: 'Beagle',
    edad: '3 años',
    edadAnios: 3,
    edadMeses: 0,
    peso: '12 kg',
    nombreDueno: 'Carlos Soto',
    rutDueno: '18.345.678-9',
    foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop',
    motivo: 'Control anual y vacunas al día.'
  },
  {
    id: 2,
    nombre: 'Mercedes',
    numero_atencion: '2026-A2',
    especie: 'Felino',
    raza: 'Europeo común',
    edad: '2 años',
    edadAnios: 2,
    edadMeses: 0,
    peso: '4.2 kg',
    nombreDueno: 'Camila Vera',
    rutDueno: '20.123.456-K',
    foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop',
    motivo: 'Limpieza dental y desparasitación preventiva.'
  },
  {
    id: 3,
    nombre: 'Hannita',
    numero_atencion: '2026-A3',
    especie: 'Canino',
    raza: 'Golden Retriever',
    edad: '5 años',
    edadAnios: 5,
    edadMeses: 0,
    peso: '28 kg',
    nombreDueno: 'Matías Cárdenas',
    rutDueno: '17.987.654-3',
    foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop',
    motivo: 'Revisión preventiva de cadera y estado nutricional.'
  }
];

function App() {
  const [pacientes, setPacientes] = useState(() => {
    const guardados = localStorage.getItem('vetchiloe_pacientes');
    if (guardados) {
      try {
        return JSON.parse(guardados);
      } catch (e) {
        return PACIENTES_INICIALES;
      }
    }
    return PACIENTES_INICIALES;
  });

  // Estado para el modal de confirmación
  const [pacienteAEliminar, setPacienteAEliminar] = useState(null);

  useEffect(() => {
    localStorage.setItem('vetchiloe_pacientes', JSON.stringify(pacientes));
  }, [pacientes]);

  const [vistaActual, setVistaActual] = useState('catalogo');

  const handleAgregarPaciente = (nuevo) => {
    const correlativo = `2026-A${pacientes.length + 1}`;
    const pacienteConCorrelativo = {
      ...nuevo,
      numero_atencion: correlativo
    };

    setPacientes((prev) => [pacienteConCorrelativo, ...prev]);
    setVistaActual('catalogo');
  };

  const handleActualizarPaciente = (actualizado) => {
    setPacientes((prev) =>
      prev.map((p) => (p.id === actualizado.id ? actualizado : p))
    );
  };

  const solicitarEliminarPaciente = (paciente) => {
    setPacienteAEliminar(paciente);
  };

  const confirmarEliminacion = () => {
    if (pacienteAEliminar) {
      setPacientes((prev) => prev.filter((p) => p.id !== pacienteAEliminar.id));
      setPacienteAEliminar(null);
    }
  };

  const handleExportarExcel = () => {
    if (pacientes.length === 0) {
      alert('No hay fichas de pacientes registradas para exportar.');
      return;
    }

    const datosParaExcel = pacientes.map((p, index) => ({
      'N°': index + 1,
      'N° Atención': p.numero_atencion,
      'Nombre Mascota': p.nombre,
      'Especie': p.especie,
      'Raza': p.raza || 'Mestizo',
      'Edad': p.edad,
      'Peso': p.peso || 'No registrado',
      'Tutor / Dueño': p.nombreDueno || 'No informado',
      'RUT Tutor': p.rutDueno || 'No informado',
      'Diagnóstico / Motivo': p.motivo || 'Sin observaciones'
    }));

    const hoja = XLSX.utils.json_to_sheet(datosParaExcel);
    hoja['!cols'] = [
      { wch: 5 }, { wch: 14 }, { wch: 18 }, { wch: 12 }, { wch: 22 },
      { wch: 18 }, { wch: 12 }, { wch: 20 }, { wch: 15 }, { wch: 35 }
    ];

    const libro = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(libro, hoja, 'Pacientes_VetChiloe');

    const fecha = new Date().toISOString().split('T')[0];
    XLSX.writeFile(libro, `Fichas_Clinicas_VetChiloe_${fecha}.xlsx`);
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera-minimal">
        <div className="cabecera-inner">
          <span className="badge-vet">VetChiloé • Sistema Clínico</span>
          <h1>Sistema de Información Veterinaria</h1>
          <p>Plataforma de control, seguimiento y actualización de fichas médicas.</p>

          <div className="cabecera-nav">
            <button
              type="button"
              className={`btn-nav ${vistaActual === 'registro' ? 'activo' : ''}`}
              onClick={() => setVistaActual('registro')}
            >
              + Registrar Pacientes
            </button>

            <button
              type="button"
              className={`btn-nav ${vistaActual === 'catalogo' ? 'activo' : ''}`}
              onClick={() => setVistaActual('catalogo')}
            >
              Fichas de Pacientes ({pacientes.length})
            </button>

            <button
              type="button"
              className="btn-nav btn-excel"
              onClick={handleExportarExcel}
              title="Descargar registro de pacientes en formato Excel (.xlsx)"
            >
              📊 Exportar Excel
            </button>
          </div>
        </div>
      </header>

      {/* Modal Personalizado de Confirmación */}
      {pacienteAEliminar && (
        <div className="modal-backdrop" onClick={() => setPacienteAEliminar(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-icon-badge">🗑️</div>
            <h3>Dar de Alta / Eliminar Ficha</h3>
            <p>
              ¿Estás seguro de que deseas retirar la ficha médica de{' '}
              <strong>{pacienteAEliminar.nombre}</strong> ({pacienteAEliminar.numero_atencion})? Esta acción actualizará los registros clínicos.
            </p>
            <div className="modal-actions">
              <button
                type="button"
                className="btn-modal-cancelar"
                onClick={() => setPacienteAEliminar(null)}
              >
                Cancelar
              </button>
              <button
                type="button"
                className="btn-modal-confirmar"
                onClick={confirmarEliminacion}
              >
                Confirmar y Dar de Alta
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Vista de Registro */}
      {vistaActual === 'registro' && (
        <main className="vista-contenedor">
          <FormularioPaciente 
            onAgregarPaciente={handleAgregarPaciente}
            onCancelar={() => setVistaActual('catalogo')}
          />
        </main>
      )}

      {/* Vista de Catálogo */}
      {vistaActual === 'catalogo' && (
        <main className="seccion-catalogo">
          <div className="titulo-seccion">
            <h2>Lista de Pacientes Registrados</h2>
            <p>Presiona <strong>"Ver Ficha Clínica"</strong> para consultar, actualizar o dar de alta al paciente.</p>
          </div>

          <div className="cuadricula-tarjetas">
            {pacientes.map((paciente) => (
              <PacienteCard 
                key={paciente.id} 
                paciente={paciente}
                onActualizarPaciente={handleActualizarPaciente}
                onSolicitarEliminar={solicitarEliminarPaciente}
              />
            ))}
          </div>
        </main>
      )}
    </div>
  );
}

export default App;