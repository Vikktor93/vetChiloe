import { useState } from 'react';
import SelectorFoto from './SelectorFoto';
import './FormularioPaciente.css';

function EditorPaciente({ paciente, onGuardar }) {
  const [datos, setDatos] = useState({
    nombre: paciente.nombre,
    especie: paciente.especie,
    edad: paciente.edad,
    peso: paciente.peso || '',
    diagnostico: paciente.diagnostico,
    foto: paciente.foto || '',
    duenoNombre: paciente.dueno?.nombre || '',
    duenoRut: paciente.dueno?.rut || '',
    duenoTelefono: paciente.dueno?.telefono || ''
  });

  const actualizarCampo = (event) => {
    setDatos((actuales) => ({ ...actuales, [event.target.name]: event.target.value }));
  };

  const guardarCambios = (event) => {
    event.preventDefault();
    onGuardar({
      ...paciente,
      nombre: datos.nombre.trim(),
      especie: datos.especie,
      edad: datos.edad.trim(),
      peso: datos.peso,
      diagnostico: datos.diagnostico.trim(),
      foto: datos.foto,
      dueno: {
        nombre: datos.duenoNombre.trim(),
        rut: datos.duenoRut.trim(),
        telefono: datos.duenoTelefono.trim()
      }
    });
  };

  return (
    <div className="contenedor-formulario">
      <h2>Editar paciente</h2>
      <p className="formulario-descripcion">Actualiza la información y agrega o cambia su foto.</p>
      <form className="formulario-vet" onSubmit={guardarCambios}>
        <SelectorFoto
          foto={datos.foto}
          onChange={(foto) => setDatos((actuales) => ({ ...actuales, foto }))}
        />

        <div className="grupo-input">
          <label htmlFor="editar-mascota-nombre">Nombre de la mascota</label>
          <input id="editar-mascota-nombre" name="nombre" value={datos.nombre} onChange={actualizarCampo} required />
        </div>

        <div className="formulario-fila">
          <div className="grupo-input">
            <label htmlFor="editar-mascota-especie">Especie</label>
            <select id="editar-mascota-especie" name="especie" value={datos.especie} onChange={actualizarCampo}>
              <option value="Canino">Canino</option>
              <option value="Felino">Felino</option>
            </select>
          </div>
          <div className="grupo-input">
            <label htmlFor="editar-mascota-edad">Edad</label>
            <input id="editar-mascota-edad" name="edad" value={datos.edad} onChange={actualizarCampo} required />
          </div>
        </div>

        <div className="grupo-input">
          <label htmlFor="editar-mascota-peso">Peso (kg)</label>
          <input
            id="editar-mascota-peso"
            name="peso"
            type="number"
            min="0.01"
            step="0.01"
            inputMode="decimal"
            value={datos.peso}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="grupo-input">
          <label htmlFor="editar-mascota-diagnostico">Motivo de consulta / diagnóstico</label>
          <textarea
            id="editar-mascota-diagnostico"
            name="diagnostico"
            rows="3"
            value={datos.diagnostico}
            onChange={actualizarCampo}
            required
          />
        </div>

        <div className="editor-dueno-heading">Datos del dueño</div>
        <div className="grupo-input">
          <label htmlFor="editar-dueno-nombre">Nombre completo</label>
          <input id="editar-dueno-nombre" name="duenoNombre" value={datos.duenoNombre} onChange={actualizarCampo} />
        </div>
        <div className="formulario-fila">
          <div className="grupo-input">
            <label htmlFor="editar-dueno-rut">RUT</label>
            <input id="editar-dueno-rut" name="duenoRut" value={datos.duenoRut} onChange={actualizarCampo} />
          </div>
          <div className="grupo-input">
            <label htmlFor="editar-dueno-telefono">Teléfono</label>
            <input id="editar-dueno-telefono" name="duenoTelefono" type="tel" value={datos.duenoTelefono} onChange={actualizarCampo} />
          </div>
        </div>

        <button type="submit" className="btn-guardar">Guardar cambios</button>
      </form>
    </div>
  );
}

export default EditorPaciente;
