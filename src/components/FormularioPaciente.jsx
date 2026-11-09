import { useState } from 'react'
import { buscarDueno } from '../data/pacienteApi.js'

const mostrarErrorObligatorio = evento => {
  evento.currentTarget.setCustomValidity('Completa este campo.');
};

const limpiarError = evento => {
  evento.currentTarget.setCustomValidity('');
};

export default function FormularioPaciente({ onGuardar, onCerrar, botonCerrarRef, errorEnvio }) {
  const [pasoFormulario, setPasoFormulario] = useState(1);
  const [modoEdad, setModoEdad] = useState('manual');
  const [nombreArchivoImagen, setNombreArchivoImagen] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [modoDueno, setModoDueno] = useState('buscar'); // 'buscar' | 'encontrado' | 'nuevo'
  const [rutBusqueda, setRutBusqueda] = useState('');
  const [duenoEncontrado, setDuenoEncontrado] = useState(null);
  const [buscando, setBuscando] = useState(false);
  const [sinResultado, setSinResultado] = useState(false);
  const [errorBusqueda, setErrorBusqueda] = useState('');
  const [formulario, setFormulario] = useState({
    nombre: '',
    especie: '',
    raza: '',
    diagnostico: '',
    edad: '',
    peso: '',
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

    setNombreArchivoImagen(archivo.name);
    const lector = new FileReader();
    lector.onload = () => {
      setFormulario(actual => ({ ...actual, foto: lector.result }));
    };
    lector.readAsDataURL(archivo);
  };

  const avanzarPaso = evento => {
    if (evento.currentTarget.form.reportValidity()) setPasoFormulario(2);
  };

  const buscarPorRut = async () => {
    if (buscando || !rutBusqueda.trim()) return;

    setBuscando(true);
    setErrorBusqueda('');
    setSinResultado(false);
    try {
      const resultado = await buscarDueno(rutBusqueda.trim());
      if (!resultado.ok) {
        setErrorBusqueda(resultado.error.mensaje);
      } else if (resultado.dueno) {
        setDuenoEncontrado(resultado.dueno);
        setModoDueno('encontrado');
      } else {
        setSinResultado(true);
      }
    } catch (error) {
      setErrorBusqueda(error.message);
    } finally {
      setBuscando(false);
    }
  };

  const registrarDuenoNuevo = () => {
    setFormulario(actual => ({ ...actual, dueño: '', rut: rutBusqueda.trim(), telefono: '' }));
    setModoDueno('nuevo');
  };

  const cambiarDueno = () => {
    setDuenoEncontrado(null);
    setSinResultado(false);
    setErrorBusqueda('');
    setFormulario(actual => ({ ...actual, dueño: '', rut: '', telefono: '' }));
    setModoDueno('buscar');
  };

  const manejarEnvio = async evento => {
    evento.preventDefault();
    if (guardando) return;

    setGuardando(true);
    try {
      const datos = { ...formulario, modoEdad };
      if (modoDueno === 'encontrado') datos.dueno_id = duenoEncontrado.id;
      await onGuardar(datos, evento.currentTarget);
    } finally {
      setGuardando(false);
    }
  };

  return (
    <form className="formulario-paciente" onSubmit={manejarEnvio}>
      <div className="encabezado-formulario">
        <h2 id="titulo-modal-formulario">
          {pasoFormulario === 1 ? 'Datos del paciente' : 'Datos del dueño del paciente'}
        </h2>
        <button
          ref={botonCerrarRef}
          className="boton-cerrar-formulario"
          type="button"
          aria-label="Cerrar formulario"
          onClick={onCerrar}
        >
          ×
        </button>
      </div>
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
          <label>
            Diagnóstico (opcional)
            <input name="diagnostico" placeholder="Ej.: Control preventivo" value={formulario.diagnostico} onChange={manejarCambio} />
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
              <span className="campo-con-unidad">
                <input name="edad" type="number" min="0" step="1" placeholder="Ej.: 3" value={formulario.edad} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
                <span aria-hidden="true">años</span>
              </span>
            </label>
          ) : (
            <label>
              Fecha de nacimiento
              <input name="fecha_nacimiento" type="date" max={new Date().toISOString().slice(0, 10)} value={formulario.fecha_nacimiento} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
            </label>
          )}
          <label>
            Peso del paciente
            <span className="campo-con-unidad">
              <input name="peso" type="number" min="0" step="0.1" placeholder="Ej.: 4.5" value={formulario.peso} onChange={manejarCambio} onInput={limpiarError} onInvalid={mostrarErrorObligatorio} required />
              <span aria-hidden="true">kg</span>
            </span>
          </label>
          <label>
            Imagen del paciente
            <span className="selector-archivo">
              <input className="selector-archivo-input" type="file" accept="image/*" aria-label="Seleccionar imagen del paciente" onChange={manejarImagen} />
              <span className="selector-archivo-boton" aria-hidden="true">Seleccionar imagen</span>
              <span className="selector-archivo-nombre" aria-live="polite">
                {nombreArchivoImagen || 'Opcional · se usará una imagen predeterminada'}
              </span>
            </span>
          </label>
        </div>
        <button className="boton-guardar" type="button" onClick={avanzarPaso}>Siguiente</button>
      </fieldset>
      <fieldset className="paso-formulario" hidden={pasoFormulario !== 2} disabled={pasoFormulario !== 2}>
        {errorEnvio && <p className="error-envio-formulario" role="alert">{errorEnvio}</p>}

        {modoDueno === 'buscar' && (
          <div className="campos-formulario">
            <label>
              Buscar dueño por RUT
              <input
                name="rutBusqueda"
                placeholder="Ej.: 12.345.678-5"
                value={rutBusqueda}
                onChange={evento => {
                  setRutBusqueda(evento.target.value);
                  setSinResultado(false);
                  setErrorBusqueda('');
                }}
                onKeyDown={evento => {
                  if (evento.key === 'Enter') {
                    evento.preventDefault();
                    buscarPorRut();
                  }
                }}
              />
            </label>
            <div className="acciones-busqueda">
              <button
                className="boton-buscar"
                type="button"
                onClick={buscarPorRut}
                disabled={buscando || !rutBusqueda.trim()}
              >
                {buscando ? 'Buscando...' : '🔍 Buscar dueño'}
              </button>
              {errorBusqueda && <p className="error-envio-formulario" role="alert">{errorBusqueda}</p>}
              {sinResultado && (
                <div>
                  <p>No encontramos un dueño con ese RUT.</p>
                  <button className="boton-volver" type="button" onClick={registrarDuenoNuevo}>
                    Registrar dueño nuevo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {modoDueno === 'encontrado' && duenoEncontrado && (
          <div className="campos-formulario">
            <p><strong>Dueño:</strong> {duenoEncontrado.nombre}</p>
            <p><strong>RUT:</strong> {duenoEncontrado.rut}</p>
            <p><strong>Teléfono:</strong> {duenoEncontrado.telefono}</p>
            <button className="boton-volver" type="button" onClick={cambiarDueno}>Cambiar dueño</button>
          </div>
        )}

        {modoDueno === 'nuevo' && (
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
            <button className="boton-volver" type="button" onClick={cambiarDueno}>Volver a buscar</button>
          </div>
        )}

        <div className="acciones-formulario">
          <button className="boton-volver" type="button" onClick={() => setPasoFormulario(1)}>Atrás</button>
          {modoDueno !== 'buscar' && (
            <button className="boton-guardar" type="submit" disabled={guardando}>
              {guardando ? 'Guardando...' : 'Guardar paciente'}
            </button>
          )}
        </div>
      </fieldset>
    </form>
  );
}
