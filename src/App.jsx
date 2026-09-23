import { useState } from 'react'
import FlipCard from './components/FlipCard' // Asegúrate de que FlipCard.jsx esté dentro de src/components/
import './App.css'

// Esta función muestra el estado del componente para almacenar
// la lista de pacientes de la veterinaria
function App() {
  // Simulación de datos que en el futuro llegarán desde una BD
  const [pacientes, setPacientes] = useState([
    {
      id: 1,
      nombre: 'Charkicito',
      numero_atencion: '2026-A1',
      especie: 'Perro (Mestizo)',
      edad: '3 años',
      foto: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?w=500&auto=format&fit=crop',
      motivo: 'Control anual y vacunas al día.'
    },
    {
      id: 2,
      nombre: 'Mercedes',
      numero_atencion: '2026-A2',
      especie: 'Gato (Europeo)',
      edad: '2 años',
      foto: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=500&auto=format&fit=crop',
      motivo: 'Limpieza dental y desparasitación.'
    },
    {
      id: 3,
      nombre: 'Hannita',
      numero_atencion: '2026-A3',
      especie: 'Perro (Golden)',
      edad: '5 años',
      foto: 'https://images.unsplash.com/photo-1552053831-71594a27632d?w=500&auto=format&fit=crop',
      motivo: 'Revisión general preventiva.'
    }
  ]);

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1>Sistema de Información - VetChiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <h2>Lista de Pacientes Registrados</h2>

        {/* Aquí se renderiza la lista de pacientes interactiva con FlipCard */}
        <div className="cuadricula-tarjetas" style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '60px' }}>
          {pacientes.map(paciente => (
            <FlipCard
              key={paciente.id}
              front={
                <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={paciente.foto}
                    alt={paciente.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
                    color: '#fff',
                    padding: '16px 12px',
                    boxSizing: 'border-box',
                    textAlign: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{paciente.nombre}</h3>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: '#cbd5e1' }}>
                      N° de Atención: <strong>{paciente.numero_atencion}</strong>
                    </p>
                  </div>
                </div>
              }
              back={
                <div style={{
                  padding: '24px 20px',
                  height: '100%',
                  boxSizing: 'border-box',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  textAlign: 'left'
                }}>
                  <h3 style={{ color: '#38bdf8', marginTop: 0, marginBottom: '14px', borderBottom: '1px solid #3f3f46', paddingBottom: '6px' }}>
                    Ficha de Paciente
                  </h3>
                  <p style={{ margin: '6px 0' }}><strong>Nombre:</strong> {paciente.nombre}</p>
                  <p style={{ margin: '6px 0' }}><strong>N° Atención:</strong> {paciente.numero_atencion}</p>
                  <p style={{ margin: '6px 0' }}><strong>Especie:</strong> {paciente.especie}</p>
                  <p style={{ margin: '6px 0' }}><strong>Edad:</strong> {paciente.edad}</p>
                  <p style={{ margin: '10px 0 0 0', fontSize: '0.9rem', color: '#a1a1aa' }}>
                    <strong>Observación:</strong> {paciente.motivo}
                  </p>
                </div>
              }
              axis="y"
              flipOnClick
              draggable
              dragDistance={0}
              tilt
              tiltMax={12}
              glare
              glareOpacity={0.22}
              hoverScale={1.03}
              perspective={1100}
              stiffness={170}
              damping={20}
              width={280}
              height={380}
              radius={20}
              background="#1e293b"
              color="#f8fafc"
              shadow
              shadowColor="#000000"
              shadowOpacity={0.35}
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;