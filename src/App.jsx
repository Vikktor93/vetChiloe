import { useState } from 'react';
import TarjetaPaciente from './components/TarjetaPaciente'; // se importa el componente recién creado 

function App() {
  const [pacientes, setPacientes] = useState([
    { id: 1, nombre: 'Charkicito', numero_atencion: '2026-A1' },
    { id: 2, nombre: 'Mercedes', numero_atencion: '2026-B2' },
    { id: 3, nombre: 'Hannita', numero_atencion: '2026-C3' }
  ]);

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>
        <div className="cuadricula-tarjetas">
          
          {/* en esta parte utilizamos el componente y le pasamos los datos mediante la prop "paciente" */}
          {pacientes.map((pacienteIterado) => (
            <TarjetaPaciente 
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