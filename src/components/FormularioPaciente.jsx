import { useState } from 'react';
import SelectorFoto from './SelectorFoto';
import './FormularioPaciente.css';

function FormularioPaciente({ onAgregarPaciente }) {
  const [paso, setPaso] = useState(1);
  const [mascota, setMascota] = useState({
    nombre: '',
    especie: 'Canino',
    edad: '',
    peso: '',
    diagnostico: '',
    foto: ''
  });
  const [dueno, setDueno] = useState({
    nombre: '',
    rut: '',
    telefono: ''
  });

  const actualizarMascota = (event) => {
    setMascota((actual) => ({ ...actual, [event.target.name]: event.target.value }));
  };

  const actualizarDueno = (event) => {
    setDueno((actual) => ({ ...actual, [event.target.name]: event.target.value }));
  };

  const avanzarADatosDueno = (event) => {
    event.preventDefault();
    setPaso(2);
  };

  const guardarPaciente = (event) => {
    event.preventDefault();
    onAgregarPaciente({
      id: Date.now(),
      nombre: mascota.nombre.trim(),
      numero_atencion: `${new Date().getFullYear()}-N${Math.floor(Math.random() * 100)}`,
      especie: mascota.especie,
      edad: mascota.edad.trim(),
      peso: mascota.peso,
      diagnostico: mascota.diagnostico.trim(),
      foto: mascota.foto,
      dueno: {
        nombre: dueno.nombre.trim(),
        rut: dueno.rut.trim(),
        telefono: dueno.telefono.trim()
      }
    });
  };

  return (
    <div className="contenedor-formulario">
      <div className="formulario-progreso" aria-label={`Paso ${paso} de 2`}>
        <span className={`progreso-paso ${paso === 1 ? 'activo' : 'completo'}`}>
          <span>1</span> Mascota
        </span>
        <span className="progreso-linea" />
        <span className={`progreso-paso ${paso === 2 ? 'activo' : ''}`}>
          <span>2</span> Dueño
        </span>
      </div>

      {paso === 1 ? (
        <>
          <h2>Registrar nueva mascota</h2>
          <p className="formulario-descripcion">Ingresa los datos del paciente para comenzar.</p>
          <form onSubmit={avanzarADatosDueno} className="formulario-vet">
            <div className="grupo-input">
              <label htmlFor="mascota-nombre">Nombre de la mascota</label>
              <input
                id="mascota-nombre"
                name="nombre"
                type="text"
                placeholder="Ej: Firulais"
                value={mascota.nombre}
                onChange={actualizarMascota}
                autoComplete="off"
                required
              />
            </div>

            <div className="formulario-fila">
              <div className="grupo-input">
                <label htmlFor="mascota-especie">Especie</label>
                <select
                  id="mascota-especie"
                  name="especie"
                  value={mascota.especie}
                  onChange={actualizarMascota}
                >
                  <option value="Canino">Canino</option>
                  <option value="Felino">Felino</option>
                  <option value="Exótico">Exótico</option>
                </select>
              </div>
              <div className="grupo-input">
                <label htmlFor="mascota-edad">Edad</label>
                <input
                  id="mascota-edad"
                  name="edad"
                  type="text"
                  placeholder="Ej: 2 años"
                  value={mascota.edad}
                  onChange={actualizarMascota}
                  required
                />
              </div>
            </div>

            <SelectorFoto
              foto={mascota.foto}
              onChange={(foto) => setMascota((actual) => ({ ...actual, foto }))}
            />

            <div className="grupo-input">
              <label htmlFor="mascota-peso">Peso (kg)</label>
              <input
                id="mascota-peso"
                name="peso"
                type="number"
                min="0.01"
                step="0.01"
                inputMode="decimal"
                placeholder="Ej: 8.5"
                value={mascota.peso}
                onChange={actualizarMascota}
                required
              />
            </div>

            <div className="grupo-input">
              <label htmlFor="mascota-diagnostico">Motivo de consulta / diagnóstico</label>
              <textarea
                id="mascota-diagnostico"
                name="diagnostico"
                placeholder="Describe los síntomas o el motivo del control..."
                value={mascota.diagnostico}
                onChange={actualizarMascota}
                rows="3"
                required
              />
            </div>

            <button type="submit" className="btn-guardar">
              Agregar paciente
            </button>
          </form>
        </>
      ) : (
        <>
          <h2>Datos del dueño</h2>
          <p className="formulario-descripcion">
            Completa los datos de contacto para terminar el registro de {mascota.nombre.trim()}.
          </p>
          <form onSubmit={guardarPaciente} className="formulario-vet">
            <div className="grupo-input">
              <label htmlFor="dueno-nombre">Nombre completo del dueño</label>
              <input
                id="dueno-nombre"
                name="nombre"
                type="text"
                placeholder="Ej: María González"
                value={dueno.nombre}
                onChange={actualizarDueno}
                autoComplete="name"
                required
              />
            </div>

            <div className="grupo-input">
              <label htmlFor="dueno-rut">RUT</label>
              <input
                id="dueno-rut"
                name="rut"
                type="text"
                placeholder="Ej: 12.345.678-9"
                value={dueno.rut}
                onChange={actualizarDueno}
                autoComplete="off"
                inputMode="text"
                required
              />
            </div>

            <div className="grupo-input">
              <label htmlFor="dueno-telefono">Número telefónico</label>
              <input
                id="dueno-telefono"
                name="telefono"
                type="tel"
                placeholder="Ej: +56 9 1234 5678"
                value={dueno.telefono}
                onChange={actualizarDueno}
                autoComplete="tel"
                required
              />
            </div>

            <div className="formulario-acciones">
              <button
                type="button"
                className="btn-secundario"
                onClick={() => setPaso(1)}
              >
                Volver
              </button>
              <button type="submit" className="btn-guardar">
                Guardar paciente
              </button>
            </div>
          </form>
        </>
      )}
    </div>
  );
}

export default FormularioPaciente;
