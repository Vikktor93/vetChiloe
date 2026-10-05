import { useState } from 'react';
import './FormularioPaciente.css';

//  funcion que nos entrega App
function FormularioPaciente({ onAgregar }) {
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [diagnostico, setDiagnostico] = useState('');

  // la funcion que se ejecuta al enviar
  const manejarEnvio = (e) => {
    // evita que el navegador recargue la pagina
    e.preventDefault();

    onAgregar({
      nombre: nombre,
      especie: especie,
      raza: raza || 'Sin especificar',
      edad: Number(edad),
      foto: '/pacientes/default.jpg',
      diagnostico: diagnostico,
      historial: []
    });

    // limpia el formulario para el siguiente registro
    setNombre('');
    setEspecie('');
    setRaza('');
    setEdad('');
    setDiagnostico('');
  };

  return (
    // se conecta la funcion al formulario
    <form className="formulario-paciente" onSubmit={manejarEnvio}>
      <h2>Registrar nuevo paciente</h2>

      {/* required en cada campo */}
      <label>
        Nombre
        <input
          type="text"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </label>

      <label>
        Especie
        <input
          type="text"
          value={especie}
          onChange={(e) => setEspecie(e.target.value)}
          required
        />
      </label>

      <label>
        Raza
        <input
        type="text"
        value={raza}
        onChange={(e) => setRaza(e.target.value)}
        />
      </label>

      <label>
        Edad
        <input
          type="number"
          value={edad}
          onChange={(e) => setEdad(e.target.value)}
          required
        />
      </label>

      <label>
        Diagnóstico
        <textarea
          value={diagnostico}
          onChange={(e) => setDiagnostico(e.target.value)}
          required
        />
      </label>

      <button type="submit">Registrar paciente</button>
    </form>
  );
}

export default FormularioPaciente;