import './BarraPestanas.css';

// lista de pestañas de la pagina
const pestanas = [
  { id: 'inicio', texto: 'Inicio' },
  { id: 'pacientes', texto: 'Pacientes' },
  { id: 'altas', texto: 'Dados de alta' }
];

function BarraPestanas({ pestanaActiva, onCambiar }) {
  return (
    <nav className="barra-pestanas">
      {pestanas.map((pestana) => (
        <button
          key={pestana.id}
          className={pestana.id === pestanaActiva ? 'pestana pestana-activa' : 'pestana'}
          onClick={() => onCambiar(pestana.id)}
        >
          {pestana.texto}
        </button>
      ))}
    </nav>
  );
}

export default BarraPestanas;