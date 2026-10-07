// Un componente en React es una función que retorna JSX
// `props` (propiedades) es un objeto que contiene los datos del componentes

function TarjetaPaciente(props) {
  const { paciente, onVerFicha } = props;   // se extrae el paciente y la función onVerFicha de las props
  return (
    <div className="tarjeta">
      <h3>{paciente.nombre}</h3>
      <p><strong>Número Paciente:</strong> {paciente.numero_atencion}</p>
      
      {/* se conecta el evento onClick a la función */}
      <button onClick={onVerFicha} className="btn-detalle">
        Ver Ficha Clínica
      </button>
    </div>
  );
}

export default TarjetaPaciente;
