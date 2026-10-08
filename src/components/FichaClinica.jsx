import FlipCard from './FlipCard'; // este es el componente de animación
import FotoMascota from './FotoMascota';
import './FichaClinica.css'; 

function FichaClinica({ paciente }) {
  // lo que se verá en la parte frontal
  const vistaFrontal = (
    <div className="tarjeta-cara frontal">
      <FotoMascota
        src={paciente.foto}
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
        <p><strong>Peso:</strong> {paciente.peso ? `${paciente.peso} kg` : 'Sin registro'}</p>
        <hr />
        <p><strong>Diagnóstico:</strong></p>
        <p className="texto-diagnostico">{paciente.diagnostico}</p>
        <hr />
        <h3>Datos del dueño</h3>
        <p><strong>Nombre:</strong> {paciente.dueno?.nombre || 'Sin registro'}</p>
        <p><strong>RUT:</strong> {paciente.dueno?.rut || 'Sin registro'}</p>
        <p><strong>Teléfono:</strong> {paciente.dueno?.telefono || 'Sin registro'}</p>
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