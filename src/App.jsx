import { useState } from 'react';
import FichaClinica from './components/FichaClinica';
import FormularioPaciente from './components/FormularioPaciente';

function App() {
  const [pacientes, setPacientes] = useState([

  {
    id: 1,
    nombre: 'Poi',
    numero_atencion: '2026-A1',
    especie: 'Pingüino',
    raza: 'Humboldt',
    edad: 4,
    foto: '/pacientes/Humboldt.jpg',   // Poi,
    diagnostico: 'Herida en aleta derecha.',
    historial: [
      { fecha: '20-09-2026', motivo: 'Ingreso', detalle: 'Rescatado en playa de Ancud.' },
      { fecha: '21-09-2026', motivo: 'Curación', detalle: 'Limpieza y vendaje de aleta.' }
    ]
  },
  { id: 2,
    nombre: 'Abeguin',
    numero_atencion: '2026-B2',
    especie: 'Pingüino',
    raza: 'Adelia',
    edad: 2,
    foto: '/pacientes/Adelia.jpg',     // Abeguin,
    diagnostico: 'Herida en aleta izquierda.',
    historial: [
      { fecha: '18-09-2026', motivo: 'Ingreso', detalle: 'Rescatado en Pinguineras de Puñihuil.' },
      { fecha: '21-09-2026', motivo: 'Curación', detalle: 'Limpieza.' }
    ]
  },
  { id: 3,
    nombre: 'Raneguin',
    numero_atencion: '2026-C3',
    especie: 'Pingüino',
    raza: 'Barbijo',
    edad: 6,
    foto: '/pacientes/Barbijo.jpg',    // Raneguin,
    diagnostico: 'Herido en ojo derecho.',
    historial: [
      { fecha: '23-08-2026', motivo: 'Ingreso', detalle: 'Rescatado en Pinguineras de Puñihuil.' },
      { fecha: '21-09-2026', motivo: 'Curación', detalle: 'Desinfectacion.' }
    ]
  }  
]);
 // controla si el formulario se ve o no
  const [mostrarFormulario, setMostrarFormulario] = useState(false);

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
  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - VetPenguin</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>
          {/* cambia entre mostrar y ocultar el formulario */}
          <button
            className="boton-agregar"
            onClick={() => setMostrarFormulario(!mostrarFormulario)}
          >
            {mostrarFormulario ? 'Cancelar' : 'Agregar paciente'}
          </button>

          {/* el formulario solo se dibuja si mostrarFormulario es true */}
          {mostrarFormulario && <FormularioPaciente onAgregar={agregarPaciente} />}

        <div className="cuadricula-tarjetas">
          
          {/* en esta parte utilizamos el componente y le pasamos los datos mediante la prop "paciente" */}
          {pacientes.map((pacienteIterado) => (
            <FichaClinica 
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