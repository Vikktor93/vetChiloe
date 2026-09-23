import { useState } from 'react';
import './FichaClinica.css';
import ReactCardFlipModule from 'react-card-flip';
const ReactCardFlip = ReactCardFlipModule.default ?? ReactCardFlipModule;
import TarjetaPaciente from './TarjetaPaciente';

function FichaClinica(props) {
  const { paciente } = props;
  const [volteada, setVolteada] = useState(false);

  const girar = () => {
    setVolteada(!volteada);
  };

  return (
    <ReactCardFlip isFlipped={volteada} flipDirection="horizontal">
      <TarjetaPaciente paciente={paciente} onVerFicha={girar} />

    <div className="ficha-reverso">
    <h3>Ficha clínica de {paciente.nombre}</h3>

    <h4>Diagnóstico</h4>
    <p>{paciente.diagnostico}</p>

    <h4>Historial</h4>
    <ul>
        {paciente.historial.map((atencion, indice) => (
        <li key={indice}>
            <strong>{atencion.fecha}</strong> - {atencion.motivo}: {atencion.detalle}
        </li>
        ))}
    </ul>

    <button onClick={girar}>Volver</button>
    </div>
    </ReactCardFlip>
  );
}

export default FichaClinica;