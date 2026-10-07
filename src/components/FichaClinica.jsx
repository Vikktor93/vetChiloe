import { useState } from 'react';
import './FichaClinica.css';
import ReactCardFlipModule from 'react-card-flip';
const ReactCardFlip = ReactCardFlipModule.default ?? ReactCardFlipModule;
import TarjetaPaciente from './TarjetaPaciente';

function FichaClinica(props) {
  const { paciente, onEliminar } = props;
  const [volteada, setVolteada] = useState(false);

  const girar = () => {
    setVolteada(!volteada);
  };

  return (
    <ReactCardFlip isFlipped={volteada} flipDirection="horizontal">
      <TarjetaPaciente paciente={paciente} onVerFicha={girar} />

      <div className="ficha-reverso">
        <h3>Ficha clínica de {paciente.nombre}</h3>
        <p><strong>N° atención:</strong> {paciente.numero_atencion}</p>
        <p><strong>Especie:</strong> {paciente.especie} ({paciente.raza})</p>

        <h4>Diagnóstico</h4>
        <p>{paciente.diagnostico}</p>

        <h4>Dueño</h4>
        {/* algunos pacientes pueden no tener dueño registrado */}
        {paciente.dueno ? (
          <>
            <p>{paciente.dueno.nombre}</p>
            <p>{paciente.dueno.telefono}</p>
            <p>{paciente.dueno.correo}</p>
          </>
        ) : (
          <p>Sin dueño registrado</p>
        )}

        <h4>Historial</h4>
        <ul>
          {paciente.historial.map((atencion, indice) => (
            <li key={indice}>
              <strong>{atencion.fecha}</strong> - {atencion.motivo}: {atencion.detalle}
            </li>
          ))}
        </ul>

        <button onClick={girar}>Volver</button>
        <button className="boton-eliminar" onClick={() => onEliminar(paciente)}>
          Eliminar paciente
        </button>
      </div>
    </ReactCardFlip>
  );
}

export default FichaClinica;