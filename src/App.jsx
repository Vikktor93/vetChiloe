import { useState } from 'react';
import FichaClinica from './components/FichaClinica';
import FormularioPaciente from './components/FormularioPaciente';

function App() {
  const [pacientes, setPacientes] = useState(null);

  return (
    <div >
      <header >
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>
        <div className="mt-52 w-full gap-4 justify-center items-center flex flex-row">
          {pacientes === null ? (
            <FormularioPaciente onSubmit={(paciente) => setPacientes([paciente])} />
          ) : (
            pacientes.map((paciente, index) => (
              <FichaClinica
                key={`${paciente.nombre}-${index}`}
                paciente={{ ...paciente, numero_atencion: index + 1 }}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}

export default App;