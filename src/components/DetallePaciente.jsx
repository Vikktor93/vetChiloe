import './DetallePaciente.css';

function DetallePaciente({ paciente, onCerrar }) {
  // busca en el historial todas las veces que el paciente ha ingresado
  const ingresos = paciente.historial.filter((registro) => registro.motivo === 'Ingreso');
  // busca el registro del alta para sacar la fecha
  const registroAlta = paciente.historial.findLast((registro) => registro.motivo === 'Alta');

  return (
    <div className="fondo-ventana">
      <div className="detalle con-scroll">
        <button className="boton-cerrar" onClick={onCerrar}>✕</button>

        <h3>Detalle de {paciente.nombre}</h3>
        <p className="detalle-numero">N° atención {paciente.numero_atencion}</p>

        {/* muestra si el paciente sigue en tratamiento o ya fue dado de alta */}
        {paciente.alta ? (
          <p className="etiqueta estado-alta">
            Dado de alta{registroAlta && ` el ${registroAlta.fecha}`}
          </p>
        ) : (
          <p className="etiqueta estado-tratamiento">En tratamiento</p>
        )}

        <h4>Datos del paciente</h4>
        <p><strong>Especie:</strong> {paciente.especie}</p>
        <p><strong>Raza:</strong> {paciente.raza}</p>
        <p><strong>Edad:</strong> {paciente.edad} años</p>
        <p><strong>Peso:</strong> {paciente.peso} kg</p>

        <h4>Ingresos</h4>
        <p>
          {ingresos.length > 1
            ? `Ha ingresado ${ingresos.length} veces a la clínica.`
            : 'Este es su primer ingreso.'}
        </p>

        <h4>Diagnóstico actual</h4>
        <p>{paciente.diagnostico}</p>

        <h4>Enfermedades o antecedentes</h4>
        <p>{paciente.antecedentes || 'Sin antecedentes registrados.'}</p>

        <h4>Dueño</h4>
        {/* algunos pacientes pueden no tener dueño registrado */}
        {paciente.dueno ? (
          <>
            <p><strong>Nombre:</strong> {paciente.dueno.nombre}</p>
            <p><strong>Teléfono:</strong> {paciente.dueno.telefono}</p>
            <p><strong>Correo:</strong> {paciente.dueno.correo}</p>
          </>
        ) : (
          <p>Sin dueño registrado.</p>
        )}

        <h4>Historial</h4>
        <ul>
          {paciente.historial.map((atencion, indice) => (
            <li key={indice}>
              <strong>{atencion.fecha}</strong> - {atencion.motivo}: {atencion.detalle}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DetallePaciente;