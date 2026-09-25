import { useState } from 'react';
// import TarjetaPaciente from './components/TarjetaPaciente'; // se importa el componente recién creado 
import FichaClinica from './components/FichaClinica';


function App() {
  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nombre: 'Charkicito',
      numero_atencion: '2026-A1',
      especie: 'Perro',
      raza: 'Mestizo',
      edad: '4 años',
      motivo: 'Revisión anual',
      imagen : "https://imgs.search.brave.com/JqFelmM7aCm571qUn9l93tAK2mAG4derF8T-BEIXT4Q/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTgy/NjY2NTgxL2VzL2Zv/dG8vcGVycm8tY29u/LXBhc2Fwb3J0ZS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/VkJ6aDNpX1JlbEho/Y2JyZzdKNUFWaHkt/RU9HaHFBU3ZTZm10/cU5aclRGaz0"
    },
    {
      id: 2,
      nombre: 'Mercedes',
      numero_atencion: '2026-B2',
      especie: 'Gato',
      raza: 'Siames',
      edad: '2 años',
      motivo: 'Control digestivo',
      imagen : "https://imgs.search.brave.com/OGmOh-r0Rh9qBID84p73jwIn2oUl60AdwdlRCGI139k/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/cGl4YWJheS5jb20v/cGhvdG8vMjAxMy8w/NS8zMC8xOC8yMS9j/YXQtMTE0NzgyX18z/NDAuanBn"
    },
    {
      id: 3,
      nombre: 'Hannita',
      numero_atencion: '2026-C3',
      especie: 'Conejo',
      raza: 'Calicó',
      edad: '1 año',
      motivo: 'Consulta general',
      imagen : "https://imgs.search.brave.com/MHP8yj9RqypjMB5SNcsaHE9PViESptOSAxoKH4lDoc0/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/Zm90by1ncmF0aXMv/aGVybW9zby1jb25l/am8tZ3Jpcy1ncmFj/aW9zby12ZXJkZS1u/YXR1cmFsXzc4NDky/LTM4MDMuanBnP3Nl/bXQ9YWlzX2h5YnJp/ZCZ3PTc0MA"
    }
  ]);

  return (
    <div >
      <header >
        <h1>Sistema de Información - Veterinaria Chiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>
        <div className=" mt-52 w-full gap-4 justify-center items-center flex flex-row">
          
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