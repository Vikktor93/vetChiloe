import React from 'react';

function Home({ pacientes = [], hospitalizados = [] }) {
  // Generamos la agenda a partir de los pacientes reales registrados
  // Si tienes al menos 1 paciente, asignamos horarios a tus mascotas reales
  const agendaHoy = pacientes.slice(0, 4).map((paciente, index) => {
    const horarios = ["09:00 horas", "10:30 horas", "12:00 horas", "15:00 horas"];
    const motivos = [
      "Control post-cirugía",
      "Vacunación anual",
      "Revisión de peso y dieta",
      "Chequeo general"
    ];

    return {
      id: paciente.id,
      hora: horarios[index] || `${9 + index}:00 horas`,
      paciente: paciente.nombre,
      especie: paciente.especie || 'Mascota',
      motivo: motivos[index % motivos.length]
    };
  });

  return (
    <div className="home-dashboard">
      
      {/* TABLA 1: AGENDA DE HOY */}
      <section className="bloque-dashboard">
        <div className="cabecera-bloque">
          <h2>Agenda de Hoy</h2>
          <span className="badge-fecha">{agendaHoy.length} Consultas</span>
        </div>

        <div className="tabla-responsive">
          <table className="tabla-dashboard">
            <thead>
              <tr>
                <th>Horario</th>
                <th>Paciente</th>
                <th>Especie</th>
                <th>Motivo de Consulta</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {agendaHoy.length > 0 ? (
                agendaHoy.map((cita) => (
                  <tr key={cita.id}>
                    <td className="col-destacada"><strong>{cita.hora}</strong></td>
                    <td className="nombre-paciente">{cita.paciente}</td>
                    <td><span className="especie-tag">{cita.especie}</span></td>
                    <td>{cita.motivo}</td>
                    <td>
                      <button className="btn-historial">
                        Historial Clínico
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', color: '#8c7a82' }}>
                    No hay pacientes agendados para hoy.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* TABLA 2: PACIENTES HOSPITALIZADOS */}
      <section className="bloque-dashboard">
        <div className="cabecera-bloque">
          <h2>Pacientes Hospitalizados</h2>
          <span className="badge-total">{hospitalizados.length} Pacientes</span>
        </div>

        <div className="tabla-responsive">
          <table className="tabla-dashboard">
            <thead>
              <tr>
                <th>Paciente</th>
                <th>Especie</th>
                <th>Tutor / Contacto</th>
                <th>Estado</th>
                <th>Última Revisión</th>
                <th>Cuidados Especiales</th>
              </tr>
            </thead>
            <tbody>
              {hospitalizados.length > 0 ? (
                hospitalizados.map((hosp) => (
                  <tr key={hosp.id}>
                    <td className="nombre-paciente">{hosp.paciente}</td>
                    <td><span className="especie-tag">{hosp.especie}</span></td>
                    <td>
                      <div><strong>{hosp.tutor}</strong></div>
                      <small className="texto-contacto">{hosp.contacto}</small>
                    </td>
                    <td>
                      <span className="badge-estado">{hosp.estado}</span>
                    </td>
                    <td className="tiempo-texto">{hosp.ultimaRevision}</td>
                    <td className="cuidados-texto">{hosp.cuidados}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', color: '#8c7a82' }}>
                    No hay pacientes actualmente en hospitalización.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

    </div>
  );
}

export default Home;