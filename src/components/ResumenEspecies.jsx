import { claseEspecie } from '../utils/especies';
import './ResumenEspecies.css';

// Muestra el resultado de resumen_por_especie() con los colores de los badges
function ResumenEspecies({ resumen }) {
  if (resumen.length === 0) return null;

  return (
    <ul className="resumen-especies" aria-label="Pacientes por especie">
      {resumen.map(({ especie, total }) => (
        <li key={especie} className={`badge-especie ${claseEspecie(especie)}`}>
          {especie}: <strong>{total}</strong>
        </li>
      ))}
    </ul>
  );
}

export default ResumenEspecies;
