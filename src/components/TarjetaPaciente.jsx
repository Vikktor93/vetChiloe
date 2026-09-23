// Un componente en React es una función que retorna JSX
// `props` (propiedades) es un objeto que contiene los datos del componentes

function TarjetaPaciente(props) {
  const { paciente, onVerFicha } = props;  // aquí extraemos la información del paciente desde las props
  return (
  <div className="tarjeta">
    {paciente.foto ? (
      <img src={paciente.foto} alt={`Foto de ${paciente.nombre}`} className="tarjeta-foto" />
    ) : (
      <div className="tarjeta-foto">🐧</div>
    )}

    <h3>{paciente.nombre}</h3>
    <p><strong>Número Paciente:</strong> {paciente.numero_atencion}</p>
    <p><strong>Especie:</strong> {paciente.especie} ({paciente.raza})</p>
    <p><strong>Edad:</strong> {paciente.edad} años</p>

    <button className="btn-detalle" onClick={onVerFicha}>Ver Ficha Clínica</button>
  </div>
);
}
export default TarjetaPaciente;
