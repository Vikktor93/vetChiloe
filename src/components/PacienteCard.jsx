import { useState } from 'react';
import FlipCard from './FlipCard';
import './PacienteCard.css';

export function PacienteCard({ paciente, onActualizarPaciente, onSolicitarEliminar }) {
  const [estaVolteada, setEstaVolteada] = useState(false);
  const [editando, setEditando] = useState(false);

  const [edadAnios, setEdadAnios] = useState(paciente.edadAnios ?? 0);
  const [edadMeses, setEdadMeses] = useState(paciente.edadMeses ?? 0);
  const [peso, setPeso] = useState(paciente.peso || '');
  const [motivo, setMotivo] = useState(paciente.motivo || '');

  const formatearEdad = (a, m) => {
    const anios = parseInt(a, 10) || 0;
    const meses = parseInt(m, 10) || 0;
    if (anios === 0 && meses === 0) return 'Recién nacido';
    if (anios === 0) return `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
    if (meses === 0) return `${anios} ${anios === 1 ? 'año' : 'años'}`;
    return `${anios} ${anios === 1 ? 'año' : 'años'} y ${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  };

  const guardarCambios = (e) => {
    e.stopPropagation();
    onActualizarPaciente({
      ...paciente,
      edad: formatearEdad(edadAnios, edadMeses),
      edadAnios: parseInt(edadAnios, 10) || 0,
      edadMeses: parseInt(edadMeses, 10) || 0,
      peso: peso.includes('kg') ? peso : `${peso} kg`,
      motivo
    });
    setEditando(false);
  };

  const frontContent = (
    <div className="card-front-content">
      <div className="card-image-wrapper">
        <img src={paciente.foto} alt={paciente.nombre} className="card-avatar" />
        <div className="card-gradient-overlay" />
      </div>
      <div className="card-front-info">
        <h3 className="paciente-nombre">{paciente.nombre}</h3>
        <p className="paciente-numero">N° de Atención: <strong>{paciente.numero_atencion}</strong></p>
        
        <button 
          type="button"
          className="btn-ver-ficha"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setEstaVolteada(true);
          }}
        >
          Ver Ficha Clínica
        </button>
      </div>
    </div>
  );

  const backContent = (
    <div className="card-back-content">
      <div className="back-header">
        <span className="badge-ficha">{paciente.especie} • {paciente.raza || 'Mestizo'}</span>
        <h3>Ficha Clínica</h3>
      </div>

      <div className="ficha-detalles">
        <div className="detalle-item">
          <strong>Paciente:</strong>
          <span>{paciente.nombre} ({paciente.numero_atencion})</span>
        </div>

        <div className="detalle-item">
          <strong>Tutor / RUT:</strong>
          <span>{paciente.nombreDueno || 'No registrado'} {paciente.rutDueno ? `(${paciente.rutDueno})` : ''}</span>
        </div>

        <div className="detalle-item">
          <strong>Edad:</strong>
          {editando ? (
            <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
              <input 
                type="number" 
                min="0"
                max="30"
                className="input-inline"
                style={{ width: '45px', textAlign: 'center' }}
                value={edadAnios} 
                onPointerDown={(e) => e.stopPropagation()}
                onChange={(e) => setEdadAnios(Math.max(0, e.target.value))}
              />
              <span style={{ fontSize: '0.75rem', color: '#bad3ed' }}>a</span>
              <input 
                type="number" 
                min="0"
                max="11"
                className="input-inline"
                style={{ width: '45px', textAlign: 'center' }}
                value={edadMeses} 
                onPointerDown={(e) => e.stopPropagation()}
                onChange={(e) => setEdadMeses(Math.min(11, Math.max(0, e.target.value)))}
              />
              <span style={{ fontSize: '0.75rem', color: '#bad3ed' }}>m</span>
            </div>
          ) : (
            <span>{paciente.edad}</span>
          )}
        </div>

        <div className="detalle-item">
          <strong>Peso:</strong>
          {editando ? (
            <input 
              type="text" 
              className="input-inline"
              value={peso} 
              onPointerDown={(e) => e.stopPropagation()}
              onChange={(e) => setPeso(e.target.value)}
            />
          ) : (
            <span>{paciente.peso || 'No registrado'}</span>
          )}
        </div>

        <div className="detalle-observacion">
          <strong>Diagnóstico / Motivo:</strong>
          {editando ? (
            <textarea
              className="textarea-inline"
              rows="3"
              value={motivo}
              onPointerDown={(e) => e.stopPropagation()}
              onChange={(e) => setMotivo(e.target.value)}
            />
          ) : (
            <p>{paciente.motivo || 'Sin observaciones registradas.'}</p>
          )}
        </div>
      </div>

      <div className="back-actions">
        {editando ? (
          <button 
            type="button" 
            className="btn-save-inline" 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={guardarCambios}
          >
            ✓ Guardar Cambios
          </button>
        ) : (
          <button 
            type="button" 
            className="btn-edit-inline" 
            onPointerDown={(e) => e.stopPropagation()}
            onClick={(e) => { e.stopPropagation(); setEditando(true); }}
          >
            ✎ Actualizar Ficha
          </button>
        )}

        <button 
          type="button" 
          className="btn-eliminar-inline"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onSolicitarEliminar(paciente);
          }}
        >
          🗑 Dar de Alta / Eliminar
        </button>

        <button 
          type="button"
          className="btn-volver"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            setEditando(false);
            setEstaVolteada(false);
          }}
        >
          ← Volver a la foto
        </button>
      </div>
    </div>
  );

  return (
    <div className="paciente-card-wrapper">
      <FlipCard
        front={frontContent}
        back={backContent}
        flipped={estaVolteada}
        flipOnClick={false}
        draggable={false}
        width={310}
        height={490}
        radius={22}
        background="#0c2d52"
        shadowColor="#071b32"
        shadowOpacity={0.35}
      />
    </div>
  );
}