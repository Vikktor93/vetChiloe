import { useState } from 'react'
import './App.css'
import FlipCard from './components/FlipCard.jsx'
import charkicitoImage from './assets/images/charkicito.jpg'
import mercedesImage from './assets/images/mercedes.jpg'
import hannitaImage from './assets/images/hannita.jpg'


// Esta función muestra el estado del componente para almacenar
// la lista de pacientes de la veterinaria
function App() {
  // Simulación de datos que en el futuro llegarán desde una BD
  const [pacientes, setPacientes] = useState([
    { 
      id: 1, 
      nombre: 'Charkicito', 
      numero_atencion: '2026-A1',
      foto: charkicitoImage,
      especie:"Perro",
      raza:"Mestizo",
      edad:"3 años",
      dueño:"Juan Peréz",
    },
    { 
      id: 2, 
      nombre: 'Mercedes', 
      numero_atencion: '2026-A2',
      foto: mercedesImage, // Por ahora el placeholder, luego se debe remplazar con la ruta de la imagen del paciente
      especie:"Gato",
      raza:"siamés",
      edad:"1 año",
      dueño:"Benjamin Concha",
    },
    {
        id: 3,
        nombre: 'Hannita', 
        numero_atencion: '2026-A3',
        foto: hannitaImage, // Por ahora el placeholder, luego se debe remplazar con la ruta de la imagen del paciente
        especie:"Hamster",
        raza:"Sirio",
        edad:"2 años",
        dueño:"Hernán Díaz",
    }
  ]);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [formulario, setFormulario] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    dueño: '',
    foto: ''
  });

  const manejarCambio = evento => {
    const { name, value } = evento.target;
    setFormulario(actual => ({ ...actual, [name]: value }));
  };

  const manejarImagen = evento => {
    const archivo = evento.target.files[0];
    if (!archivo) return;

    const lector = new FileReader();
    lector.onload = () => {
      setFormulario(actual => ({ ...actual, foto: lector.result }));
    };
    lector.readAsDataURL(archivo);
  };

  const agregarPaciente = evento => {
    evento.preventDefault();
    setPacientes(actuales => [
      ...actuales,
      {
        ...formulario,
        id: Date.now(),
        numero_atencion: `2026-A${actuales.length + 1}`
      }
    ]);
    setFormulario({ nombre: '', especie: '', raza: '', edad: '', dueño: '', foto: '' });
    setMostrarFormulario(false);
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1 className='TituloPagina'>Sistema de Información - VetChiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <button className="boton-agregar" type="button" onClick={() => setMostrarFormulario(actual => !actual)}>
          {mostrarFormulario ? 'Cerrar formulario' : 'Agregar paciente'}
        </button>

        {mostrarFormulario && (
          <form className="formulario-paciente" onSubmit={agregarPaciente}>
            <h2>Nuevo paciente</h2>
            <div className="campos-formulario">
              <label>
                Nombre
                <input name="nombre" value={formulario.nombre} onChange={manejarCambio} required />
              </label>
              <label>
                Especie
                <input name="especie" value={formulario.especie} onChange={manejarCambio} required />
              </label>
              <label>
                Raza
                <input name="raza" value={formulario.raza} onChange={manejarCambio} required />
              </label>
              <label>
                Edad
                <input name="edad" value={formulario.edad} onChange={manejarCambio} required />
              </label>
              <label>
                Dueño
                <input name="dueño" value={formulario.dueño} onChange={manejarCambio} required />
              </label>
              <label>
                Imagen
                <input type="file" accept="image/*" onChange={manejarImagen} required />
              </label>
            </div>
            <button className="boton-guardar" type="submit">Guardar paciente</button>
          </form>
        )}

        <h2>Lista de Pacientes Registrados</h2>

        {/* Aquí se renderizará la lista de pacientes (JSX) */}
        <div className='cuadricula-tarjetas'>
          {pacientes.map(paciente => (
            <FlipCard
              key={paciente.id}
              width={220}
              height={300}
              front={
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                  <img
                    src={paciente.foto}
                    alt={paciente.nombre}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0,
                    background: 'rgba(0,0,0,0.6)', color: '#fff', padding: '8px 12px'
                  }}>
                    <h3 style={{ margin: 0 }}>{paciente.nombre}</h3>
                  </div>
                </div>
              }
              back={
                <div style={{ padding: 24, textAlign: 'left' }}>
                  <h3>{paciente.nombre}</h3>
                  <p>Especie: {paciente.especie}</p>
                  <p>Raza: {paciente.raza}</p>
                  <p>Edad: {paciente.edad}</p>
                  <p>Dueño: {paciente.dueño}</p>
                  <p>N° Atención: {paciente.numero_atencion}</p>
                </div>
              }
            />
          ))}
        </div>
      </main>
    </div>
  );
}

export default App;