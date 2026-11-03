import { useState } from 'react';
import './FormularioPaciente.css';

function FormularioPaciente({ onAgregarPaciente }) {
  // Estados individuales para cada campo del formulario
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('Canino'); 
  const [edad, setEdad] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [foto, setFoto] = useState(''); // Nuevo estado para la URL de la foto

  const manejarEnvio = (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validación básica (ahora incluye la foto)
    if (nombre.trim() === '' || edad.trim() === '' || diagnostico.trim() === '' || foto.trim() === '') {
      alert('Por favor, completa todos los campos del paciente, incluyendo la URL de la foto.');
      return;
    }

    // Creación del objeto paciente. Ya no se genera el ID ni N° de Atención aquí.
    // El frontend solo envía los datos puros y el backend se encarga del resto.
    const nuevoPaciente = {
      nombre: nombre,
      especie: especie,
      edad: edad,
      diagnostico: diagnostico,
      foto: foto 
    };

    onAgregarPaciente(nuevoPaciente);

    setNombre('');
    setEspecie('Canino');
    setEdad('');
    setDiagnostico('');
    setFoto('');
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

        {/* Nuevo Input para la URL de la imagen */}
        <div className="grupo-input">
          <label>Fotografía (URL)</label>
          <input 
            type="url" 
            placeholder="Ej: https://images.unsplash.com/photo-..."
            value={foto}
            onChange={(e) => setFoto(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-guardar">
          Guardar Ficha
        </button>
      </form>
    </div>
  );
}

export default FormularioPaciente;