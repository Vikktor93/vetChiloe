import { useState } from 'react';
import './FormularioPaciente.css';

function FormularioPaciente({ onAgregar }) {
  // datos del paciente
  const [nombre, setNombre] = useState('');
  const [especie, setEspecie] = useState('');
  const [raza, setRaza] = useState('');
  const [edad, setEdad] = useState('');
  const [peso, setPeso] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [foto, setFoto] = useState('');
  const [nombreFoto, setNombreFoto] = useState('');

  // datos del dueño
  const [nombreDueno, setNombreDueno] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');

  // crea una direccion temporal para poder mostrar la foto elegida
  const manejarFoto = (e) => {
    const archivo = e.target.files[0];
    if (archivo) {
      setFoto(URL.createObjectURL(archivo));
      setNombreFoto(archivo.name);
    }
    // permite volver a elegir la misma foto despues de quitarla
    e.target.value = '';
  };

  const quitarFoto = () => {
    setFoto('');
    setNombreFoto('');
  };

  const manejarEnvio = (e) => {
    e.preventDefault();

    onAgregar({
      nombre: nombre,
      especie: especie,
      raza: raza || 'Sin especificar',
      edad: Number(edad),
      peso: Number(peso),
      // si no se subio foto se usa la de por defecto
      foto: foto || '/pacientes/default.jpg',
      diagnostico: diagnostico,
      dueno: {
        nombre: nombreDueno,
        telefono: telefono,
        correo: correo || 'Sin correo'
      },
      historial: []
    });
  };

  return (
    <form className="formulario-paciente" onSubmit={manejarEnvio}>
      <div className="encabezado-formulario">
        <span className="etiqueta-superior">Nuevo ingreso</span>
        <h2>Registrar paciente</h2>
        <p>Completa los datos de la mascota y de su dueño.</p>
      </div>

      <h3 className="titulo-seccion">Datos del paciente</h3>
      <div className="campos">
        <label>
          Nombre
          <input
            type="text"
            placeholder="Ej: Poi"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
        </label>

        <label>
          Especie
          <input
            type="text"
            placeholder="Ej: Pingüino"
            value={especie}
            onChange={(e) => setEspecie(e.target.value)}
            required
          />
        </label>

        <label>
          Raza
          <input
            type="text"
            placeholder="Ej: Humboldt"
            value={raza}
            onChange={(e) => setRaza(e.target.value)}
          />
        </label>

        <label>
          Edad (años)
          <input
            type="number"
            min="0"
            max="100"
            placeholder="Ej: 2"
            value={edad}
            onChange={(e) => setEdad(e.target.value)}
            required
          />
        </label>

        <label className="campo-ancho">
          Peso (kg)
          <input
            type="number"
            min="0"
            max="1000"
            step="0.1"
            placeholder="Ej: 4.5"
            value={peso}
            onChange={(e) => setPeso(e.target.value)}
            required
          />
        </label>

        <div className="campo-ancho">
          <span className="nombre-campo">Foto del paciente</span>
          {/* el input real esta oculto, se abre al hacer clic en la zona */}
          <input
            id="foto"
            className="foto-oculta"
            type="file"
            accept="image/*"
            onChange={manejarFoto}
          />

          {foto === '' ? (
            <label htmlFor="foto" className="subir-foto">
              <span>Haz clic para elegir una foto</span>
              <small>Formatos JPG o PNG</small>
            </label>
          ) : (
            <div className="vista-previa">
              <img src={foto} alt="Foto del paciente" />
              <span>{nombreFoto}</span>
              <button type="button" className="boton-quitar" onClick={quitarFoto}>
                Quitar
              </button>
            </div>
          )}
        </div>

        <label className="campo-ancho">
          Diagnóstico
          <textarea
            placeholder="Motivo de la consulta o estado del paciente"
            value={diagnostico}
            onChange={(e) => setDiagnostico(e.target.value)}
            required
          />
        </label>
      </div>

      <h3 className="titulo-seccion">Datos del dueño</h3>
      <div className="campos">
        <label>
          Nombre del dueño
          <input
            type="text"
            placeholder="Ej: Camila Soto"
            value={nombreDueno}
            onChange={(e) => setNombreDueno(e.target.value)}
            required
          />
        </label>

        <label>
          Teléfono
          <input
            type="tel"
            placeholder="Ej: 9 1234 5678"
            value={telefono}
            onChange={(e) => setTelefono(e.target.value)}
            required
          />
        </label>

        <label className="campo-ancho">
          Correo
          <input
            type="email"
            placeholder="Ej: camila@correo.cl"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
          />
        </label>
      </div>

      <button type="submit" className="boton-registrar">
        Registrar paciente
      </button>
    </form>
  );
}

export default FormularioPaciente;