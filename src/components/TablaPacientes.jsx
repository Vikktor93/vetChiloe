import FotoMascota from './FotoMascota';

function TablaPacientes({ pacientes, onVerFicha, onEditar, emptyMessage }) {
  if (pacientes.length === 0) {
    return <div className="tabla-vacia">{emptyMessage}</div>;
  }

  return (
    <div className="table-scroll">
      <table className="tabla-vet">
        <thead>
          <tr>
            <th>Paciente</th>
            <th>N° atención</th>
            <th>Especie</th>
            <th>Edad</th>
            <th>Peso</th>
            <th>Último registro</th>
            <th aria-label="Acciones" />
          </tr>
        </thead>
        <tbody>
          {pacientes.map((paciente) => (
            <tr key={paciente.id}>
              <td>
                <div className="paciente-identidad">
                  <FotoMascota
                    className="paciente-avatar"
                    src={paciente.foto}
                    alt={`Foto de ${paciente.nombre}`}
                  />
                  <div>
                    <div className="paciente-nombre">{paciente.nombre}</div>
                    <div className="paciente-subtipo">
                      {paciente.dueno?.nombre || 'Dueño no registrado'}
                    </div>
                  </div>
                </div>
              </td>
              <td><span className="numero-atencion">{paciente.numero_atencion}</span></td>
              <td>
                <span className={`badge-especie ${paciente.especie.toLowerCase()}`}>
                  {paciente.especie}
                </span>
              </td>
              <td>{paciente.edad}</td>
              <td>{paciente.peso ? `${paciente.peso} kg` : '—'}</td>
              <td className="celda-diagnostico" title={paciente.diagnostico}>
                {paciente.diagnostico}
              </td>
              <td>
                <div className="acciones-paciente">
                  <button
                    className="btn-carnet"
                    type="button"
                    onClick={() => onVerFicha(paciente)}
                    title={`Ver carnet clínico de ${paciente.nombre}`}
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21V5.5Z" />
                      <path d="M4 17a2.5 2.5 0 0 1 2.5-2.5H20M8 7h8" />
                    </svg>
                    Ver carnet
                  </button>
                  <button
                    className="btn-editar-paciente"
                    type="button"
                    onClick={() => onEditar(paciente)}
                    aria-label={`Editar ${paciente.nombre}`}
                    title={`Editar ${paciente.nombre}`}
                  >
                    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="m15 5 4 4M4 20l4-.8L19 8a2.1 2.1 0 0 0-3-3L5 16l-1 4Z" />
                    </svg>
                    Editar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TablaPacientes;
