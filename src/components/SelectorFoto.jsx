import { useRef, useState } from 'react';
import FotoMascota from './FotoMascota';

const TAMANO_MAXIMO = 5 * 1024 * 1024;

function SelectorFoto({ foto, onChange }) {
  const inputRef = useRef(null);
  const [error, setError] = useState('');

  const seleccionarFoto = (event) => {
    const archivo = event.target.files?.[0];
    if (!archivo) return;

    if (!archivo.type.startsWith('image/')) {
      setError('Selecciona un archivo de imagen válido.');
      event.target.value = '';
      return;
    }

    if (archivo.size > TAMANO_MAXIMO) {
      setError('La imagen debe pesar menos de 5 MB.');
      event.target.value = '';
      return;
    }

    const lector = new FileReader();
    lector.onload = () => {
      if (typeof lector.result !== 'string') {
        setError('No se pudo leer la imagen seleccionada.');
        return;
      }
      setError('');
      onChange(lector.result);
    };
    lector.onerror = () => setError('No se pudo leer la imagen seleccionada.');
    lector.readAsDataURL(archivo);
    event.target.value = '';
  };

  const quitarFoto = () => {
    onChange('');
    setError('');
    if (inputRef.current) inputRef.current.value = '';
  };

  return (
    <div className="selector-foto">
      <div className="selector-foto-preview">
        <FotoMascota src={foto} alt={foto ? 'Vista previa de la mascota' : 'Sin foto'} className="foto-preview" />
      </div>
      <div className="selector-foto-controles">
        <span className="selector-foto-titulo">{foto ? 'Foto seleccionada' : 'Sin foto'}</span>
        <span className="selector-foto-ayuda">JPG, PNG o WebP · máximo 5 MB</span>
        <div className="selector-foto-acciones">
          <button
            type="button"
            className="btn-secundario selector-foto-boton"
            onClick={() => inputRef.current?.click()}
          >
            {foto ? 'Cambiar foto' : 'Agregar foto'}
          </button>
          {foto && (
            <button type="button" className="btn-quitar-foto" onClick={quitarFoto}>
              Quitar
            </button>
          )}
        </div>
        {error && <span className="selector-foto-error" role="alert">{error}</span>}
        <input
          ref={inputRef}
          className="selector-foto-input"
          type="file"
          accept="image/*"
          onChange={seleccionarFoto}
          aria-label="Seleccionar foto de la mascota"
        />
      </div>
    </div>
  );
}

export default SelectorFoto;
