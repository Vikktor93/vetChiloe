import { useState } from 'react'
import './App.css'
import FlipCard from './components/FlipCard.jsx'
import charkicitoImage from './assets/images/charkicito.jpg'
import mercedesImage from './assets/images/mercedes.jpg'
import hannitaImage from './assets/images/hannita.jpg'

const normalizarRut = rut => rut.replace(/[.\s-]/g, '').toUpperCase();

const rutValido = rut => {
  const rutNormalizado = normalizarRut(rut);
  const coincidencia = rutNormalizado.match(/^(\d{1,8})([\dK])$/);
  if (!coincidencia) return false;

  const [, cuerpo, digitoIngresado] = coincidencia;
  let suma = 0;
  let factor = 2;
  for (let indice = cuerpo.length - 1; indice >= 0; indice -= 1) {
    suma += Number(cuerpo[indice]) * factor;
    factor = factor === 7 ? 2 : factor + 1;
  }
  const resultado = 11 - (suma % 11);
  const digitoEsperado = resultado === 11 ? '0' : resultado === 10 ? 'K' : String(resultado);
  return digitoIngresado === digitoEsperado;
};

const mostrarErrorObligatorio = evento => {
  evento.currentTarget.setCustomValidity('Completa este campo.');
};

const limpiarError = evento => {
  evento.currentTarget.setCustomValidity('');
};

const calcularEdad = fecha => {
  const [anioNacimiento, mesNacimiento, diaNacimiento] = fecha.split('-').map(Number);
  const hoy = new Date();
  let anios = hoy.getFullYear() - anioNacimiento;
  let meses = hoy.getMonth() + 1 - mesNacimiento;

  if (hoy.getDate() < diaNacimiento) meses -= 1;
  if (meses < 0) {
    anios -= 1;
    meses += 12;
  }
  if (anios === 0) return meses === 0 ? 'Menos de 1 mes' : `${meses} ${meses === 1 ? 'mes' : 'meses'}`;
  return `${anios} ${anios === 1 ? 'año' : 'años'}`;
};

const formatearFecha = fecha => fecha.split('-').reverse().join('/');


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
  const [pasoFormulario, setPasoFormulario] = useState(1);
  const [modoEdad, setModoEdad] = useState('manual');
  const [formulario, setFormulario] = useState({
    nombre: '',
    especie: '',
    raza: '',
    edad: '',
    fecha_nacimiento: '',
    dueño: '',
    rut: '',
    telefono: '',
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

  const avanzarPaso = evento => {
    if (evento.currentTarget.form.reportValidity()) setPasoFormulario(2);
  };

  const agregarPaciente = evento => {
    evento.preventDefault();
    const rutInput = evento.currentTarget.elements.rut;
    const rutIngresado = normalizarRut(formulario.rut);
    const rutFormateado = `${rutIngresado.slice(0, -1)}-${rutIngresado.slice(-1)}`;

    if (!rutValido(formulario.rut)) {
      rutInput.setCustomValidity('Ingresa un RUT válido, por ejemplo 12.345.678-5.');
      rutInput.reportValidity();
      return;
    }

    const rutDuplicado = pacientes.some(paciente => paciente.rut && normalizarRut(paciente.rut) === rutIngresado);
    if (rutDuplicado) {
      rutInput.setCustomValidity('Ya existe un paciente registrado con el RUT de este dueño.');
      rutInput.reportValidity();
      return;
    }

    setPacientes(actuales => [
      ...actuales,
      {
        ...formulario,
        edad: modoEdad === 'fecha' ? calcularEdad(formulario.fecha_nacimiento) : formulario.edad,
        fecha_nacimiento: modoEdad === 'fecha' ? formulario.fecha_nacimiento : '',
        rut: rutFormateado,
        id: Date.now(),
        numero_atencion: `2026-A${actuales.length + 1}`
      }
    ]);
    setFormulario({ nombre: '', especie: '', raza: '', edad: '', fecha_nacimiento: '', dueño: '', rut: '', telefono: '', foto: '' });
    setModoEdad('manual');
    setPasoFormulario(1);
    setMostrarFormulario(false);
  };

  return (
    <div className="contenedor-principal">
      <header className="cabecera">
        <h1 className='TituloPagina'>Sistema de Información - VetChiloé</h1>
        <p>Plataforma de control y seguimiento de pacientes</p>
      </header>

      <main>
        <button className="boton-agregar" type="button" onClick={() => {
          setMostrarFormulario(actual => !actual);
          setPasoFormulario(1);
        }}>
          {mostrarFormulario ? 'Cerrar formulario' : 'Agregar paciente'}
        </button>

        {mostrarFormulario && (
          <form className="formulario-paciente" onSubmit={agregarPaciente}>
            <h2>{pasoFormulario === 1 ? 'Datos del paciente' : 'Datos del dueño del paciente'}</h2>
            <fieldset className="paso-formulario" hidden={pasoFormulario !== 1} disabled={pasoFormulario !== 1}>
              <div className="campos-formulario">
                <label>
                  Nombre del paciente
                  <input name="nombre" placeholder="Ej.: Luna" value={formulario.nombre} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
                <label>
                  Especie
                  <select name="especie" value={formulario.especie} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required>
                    <option value="">Selecciona una especie</option>
                    <option value="Canino">Canino</option>
                    <option value="Felino">Felino</option>
                    <option value="Ave">Ave</option>
                    <option value="Roedor">Roedor</option>
                    <option value="Reptil">Reptil</option>
                    <option value="Pez">Pez</option>
                    <option value="Otro">Otro</option>
                  </select>
                </label>
                <label>
                  Raza
                  <input name="raza" placeholder="Ej.: Mestizo" value={formulario.raza} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
                <fieldset className="selector-edad">
                  <legend>Cómo ingresar la edad</legend>
                  <label>
                    <input type="radio" name="modoEdad" value="manual" checked={modoEdad === 'manual'} onChange={() => setModoEdad('manual')} />
                    Edad aproximada
                  </label>
                  <label>
                    <input type="radio" name="modoEdad" value="fecha" checked={modoEdad === 'fecha'} onChange={() => setModoEdad('fecha')} />
                    Fecha de nacimiento
                  </label>
                </fieldset>
                {modoEdad === 'manual' ? (
                  <label>
                    Edad del paciente
                    <input name="edad" placeholder="Ej.: 3 años" value={formulario.edad} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                  </label>
                ) : (
                  <label>
                    Fecha de nacimiento
                    <input name="fecha_nacimiento" type="date" max={new Date().toISOString().slice(0, 10)} value={formulario.fecha_nacimiento} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                  </label>
                )}
                <label>
                  Imagen del paciente
                  <input type="file" accept="image/*" onChange={manejarImagen} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
              </div>
              <button className="boton-guardar" type="button" onClick={avanzarPaso}>Siguiente</button>
            </fieldset>
            <fieldset className="paso-formulario" hidden={pasoFormulario !== 2} disabled={pasoFormulario !== 2}>
              <div className="campos-formulario">
                <label>
                  Nombre del dueño
                  <input name="dueño" placeholder="Nombre y apellido" value={formulario.dueño} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
                <label>
                  RUT del dueño
                  <input name="rut" placeholder="Ej.: 12.345.678-5" value={formulario.rut} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
                <label>
                  Teléfono del dueño
                  <input name="telefono" type="tel" placeholder="Ej.: +56 9 1234 5678" value={formulario.telefono} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                </label>
              </div>
              <div className="acciones-formulario">
                <button className="boton-volver" type="button" onClick={() => setPasoFormulario(1)}>Atrás</button>
                <button className="boton-guardar" type="submit">Guardar paciente</button>
              </div>
            </fieldset>
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
              axis="y"
              flipOnClick={true}
              respectReducedMotion={false}
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
                  {paciente.fecha_nacimiento && <p>Fecha de nacimiento: {formatearFecha(paciente.fecha_nacimiento)}</p>}
                  <p>Dueño: {paciente.dueño}</p>
                  {paciente.rut && <p>RUT: {paciente.rut}</p>}
                  {paciente.telefono && <p>Teléfono: {paciente.telefono}</p>}
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