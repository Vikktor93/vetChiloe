import FlipCard from './FlipCard';
import './FichaClinica.css';

// Imagen por defecto cuando el paciente no tiene foto (foto = null en la BD)
const FOTO_POR_DEFECTO =
  'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&w=300&q=80';

function FichaClinica({ paciente }) {
  // lo que se verá en la parte frontal
  const vistaFrontal = (
    <div className="tarjeta-cara frontal">
      <img 
        src={paciente.foto || FOTO_POR_DEFECTO}
        alt={`Foto de ${paciente.nombre}`} 
        className="foto-paciente" 
      />
      <h2>{paciente.nombre}</h2>
      <span className="etiqueta-especie">{paciente.especie}</span>
    </div>
  );

  // lo que se verá en la parte trasera
  const vistaTrasera = (
    <div className="tarjeta-cara trasera">
      <h2>Historial Médico</h2>
      <div className="datos-lista">
        <p><strong>N° Atención:</strong> {paciente.numero_atencion}</p>
        <p><strong>Edad:</strong> {paciente.edad}</p>
        <hr />
        <p><strong>Diagnóstico:</strong></p>
        <p className="texto-diagnostico">{paciente.diagnostico}</p>
      </div>
    </div>
  );

  return (
    <div className="contenedor-ficha-centrado">
      <p className="instruccion">Haz clic en la tarjeta para ver los datos clínicos</p>
      
      {/* componente estilo React Bits donde se pasa las dos vistas */}
      <FlipCard 
        frontContent={vistaFrontal} 
        backContent={vistaTrasera} 
      />
    </div>
  );
}

export default FichaClinica;