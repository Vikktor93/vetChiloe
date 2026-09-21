import { useState } from 'react'
import './App.css'

// Esta función muestra el estado del componente para almacenar
// la lista de pacientes de la veterinaria
function App() {
  // Simulación de datos que en el futuro llegarán desde una BD
  const [pacientes, setPacientes] = useState([
    {id: 1, nombre: 'Charkicito', numero_atencion: '2026-A1'},
    {id: 2, nombre: 'Mercedes', numero_atencion: '2026-A2'},
    {id: 3, nombre: 'Hannita', numero_atencion: '2026-A3'}
  ]);

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - VetChiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>

        {/* Aquí se renderizará la lista de pacientes (JSX) */}
        <div className='cuadricula-tarjetas'>
          {pacientes.map(paciente => (
            <div key={paciente.id} className='tarjeta'>
              <h3>{paciente.nombre}</h3>
              <p>Número de Atención: {paciente.numero_atencion}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;