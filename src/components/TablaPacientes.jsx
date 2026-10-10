import './TablaPacientes.css';

// devuelve la clase del badge segun la especie
function claseEspecie(especie) {
  const texto = especie.toLowerCase();
  if (texto.includes('felino') || texto.includes('gato')) return 'badge badge-felino';
  if (texto.includes('canino') || texto.includes('perro')) return 'badge badge-canino';
  if (texto.includes('ave') || texto.includes('ping')) return 'badge badge-ave';
  return 'badge badge-otro';
}

function TablaPacientes({ pacientes, onVerFicha }) {
  return (
    <div className="contenedor-tabla">
      <table className="tabla-pacientes">
        <thead>
          <tr>
            <th>NOMBRE</th>
            <th>N° ATENCIÓN</th>
            <th>ESPECIE</th>
            <th>EDAD</th>
            <th>DIAGNÓSTICO</th>
            <th>ACCIÓN</th>
          </tr>
        </thead>
        <tbody>
          {/* una fila por cada paciente */}
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>{paciente.nombre}</td>
              <td>{paciente.numero_atencion}</td>
              <td>
                <span className={claseEspecie(paciente.especie)}>
                  {paciente.especie}
                </span>
              </td>
              <td>{paciente.edad}</td>
              <td>{paciente.diagnostico}</td>
              <td>
                <button className="boton-carnet" onClick={() => onVerFicha(paciente)}>
                  Ver Carnet
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPacientes;