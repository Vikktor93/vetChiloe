import React from 'react';
import './ListaPacientes.css';

function ListaPacientes({ pacientes = [] }) {
  return (
    <div className="contenedor-lista-pacientes">
      <p className="subtitulo-instruccion">
        Pasa el mouse sobre la foto de cada paciente para ver sus datos clínicos.
      </p>

      <div className="cuadricula-tarjetas">
        {pacientes.map((p) => (
          <div key={p.id} className="tarjeta-contenedor-fijo">
            <div className="tarjeta-inner">
              
              {/* LADO FRONTAL (FOTO) */}
              <div className="tarjeta-front">
                <img 
                  src={p.foto || 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=400&auto=format&fit=crop'} 
                  alt={p.nombre} 
                  className="foto-completa" 
                />
              </div>

              {/* LADO TRASERO (INFORMACIÓN Y FICHA) */}
              <div className="tarjeta-back">
                <h3>{p.nombre}</h3>
                <p><strong>Especie:</strong> {p.especie}</p>
                <p><strong>N° Atención:</strong> {p.numero_atencion}</p>
                {p.edad && <p><strong>Edad:</strong> {p.edad}</p>}
                {p.nombre_dueno && <p><strong>Tutor:</strong> {p.nombre_dueno}</p>}
                
                <button className="btn-detalle">
                  Ver Ficha Clínica
                </button>
              </div>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaPacientes;