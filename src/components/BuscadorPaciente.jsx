import './BuscadorPaciente.css';

// Componente controlado: el texto vive en el estado del padre (App.jsx). Cada tecla actualiza la vista sin recargar la página
function BuscadorPaciente({ texto, onCambiar }) {
  return (
    <div className="buscador-paciente">
      <label htmlFor="buscador-pacientes" className="sr-only">
        Buscar pacientes por nombre o especie
      </label>
      <span className="buscador-icono" aria-hidden="true">🔍</span>
      <input
        id="buscador-pacientes"
        type="search"
        value={texto}
        placeholder="Buscar por nombre o especie…"
        autoComplete="off"
        onChange={(e) => onCambiar(e.target.value)}
      />
    </div>
  );
}

export default BuscadorPaciente;
