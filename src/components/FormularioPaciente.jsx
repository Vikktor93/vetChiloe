import { useState } from 'react';
import './FormularioPaciente.css';

function FormularioPaciente({ onAgregarPaciente }) {
  // Estados individuales para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('Canino'); 
  const [edad, setEdad] = useState('');
  const [diagnostico, setDiagnostico] = useState('');

  const manejarEnvio = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validación básica
    if (nombre.trim() === '' || edad.trim() === '' || diagnostico.trim() === '') {
      alert('Por favor, completa todos los campos del paciente.');
      return;
    }

    // Creación del objeto paciente con los datos del formulario
    const nuevoPaciente = {
      id: Date.now(), // Genera un ID único basado en la fecha exacta
      nombre: nombre,
      numero_atencion: `2026-N${Math.floor(Math.random() * 100)}`, // Genera un número aleatorio
      especie: especie,
      edad: edad,
      diagnostico: diagnostico,
      // Asignación de una foto genérica temporal
      foto: 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=300&q=80'
    };

    //  Se envia el objeto al componente padre (App.jsx)
    onAgregarPaciente(nuevoPaciente);

    // Se limpia los campos del formulario para el siguiente ingreso
    setNombre('');
    setEspecie('Canino');
    setEdad('');
    setDiagnostico('');
  };

  return (
    <div className="contenedor-formulario">
      <h2>Registrar Nuevo Paciente</h2>
      
      <form onSubmit={manejarEnvio} className="formulario-vet">
        <div className="grupo-input">
          <label>Nombre de la Mascota</label>
          <input 
            type="text" 
            placeholder="Ej: Firulais"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        </div>

        <div className="grupo-input">
          <label>Especie</label>
          <select value={especie} onChange={(e) => setEspecie(e.target.value)}>
            <option value="Canino">Canino</option>
            <option value="Felino">Felino</option>
            <option value="Exótico">Exótico</option>
          </select>
        </div>

        <div className="grupo-input">
          <label>Edad</label>
          <input 
            type="text" 
            placeholder="Ej: 2 años, 6 meses..."
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
          />
        </div>

        <div className="grupo-input">
          <label>Motivo de Consulta / Diagnóstico</label>
          <textarea 
            placeholder="Describe los síntomas o el motivo del control..."
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="btn-guardar">
          Guardar Ficha
        </button>
      </form>
    </div>
  );
}

export default FormularioPaciente;