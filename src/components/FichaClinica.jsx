import { useState } from 'react';
import './FichaClinica.css';
import ReactCardFlipModule from 'react-card-flip';
const ReactCardFlip = ReactCardFlipModule.default ?? ReactCardFlipModule;
import TarjetaPaciente from './TarjetaPaciente';

function FichaClinica(props) {
  const { paciente, onEliminar, onDarDeAlta } = props;
  const [volteada, setVolteada] = useState(false);

  const girar = () => {
    setVolteada(!volteada);
  };

  return (
    <ReactCardFlip isFlipped={volteada} flipDirection="horizontal">
      <TarjetaPaciente paciente={paciente} onVerFicha={girar} />

      <div className="ficha-reverso">
        <h3>Ficha de {paciente.nombre}</h3>

        <p><strong>N° atención:</strong> {paciente.numero_atencion}</p>
        <p><strong>Especie:</strong> {paciente.especie}</p>
        <p><strong>Raza:</strong> {paciente.raza}</p>

        <h4>Dueño</h4>
        {/* algunos pacientes pueden no tener dueño registrado */}
        {paciente.dueno ? (
          <>
            <p>{paciente.dueno.nombre}</p>
            <p>{paciente.dueno.telefono}</p>
          </>
        ) : (
          <p>Sin dueño registrado</p>
        )}

        {/* si ya fue dado de alta el boton queda desactivado */}
        <button
          className="boton-ver-detalle"
          onClick={() => onDarDeAlta(paciente)}
          disabled={paciente.alta}
        >
          {paciente.alta ? 'Dado de alta' : 'Dar de alta'}
        </button>
        <button onClick={girar}>Volver</button>
        <button className="boton-eliminar" onClick={() => onEliminar(paciente)}>
          Eliminar paciente
        </button>
      </div>
    </ReactCardFlip>
  );
}

export default FichaClinica;