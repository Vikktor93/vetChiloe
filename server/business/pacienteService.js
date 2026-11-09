import {
  buscarDuenoPorId,
  buscarDuenoPorRut,
  existeRut,
  insertarPaciente,
  obtenerPacientePorId as buscarPacientePorId,
  obtenerPacientes
} from '../data/pacienteRepository.js'

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

const conEdadActual = paciente => (
  paciente && paciente.fecha_nacimiento
    ? { ...paciente, edad: calcularEdad(paciente.fecha_nacimiento) }
    : paciente
);

const fechaNacimientoValida = fecha => {
  if (typeof fecha !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(fecha)) return false;

  const fechaParseada = new Date(`${fecha}T00:00:00.000Z`);
  return !Number.isNaN(fechaParseada.getTime())
    && fechaParseada.toISOString().slice(0, 10) === fecha;
};



let registroEnCurso = Promise.resolve();

const registrarPacienteEnOrden = async datosFormulario => {
  if (!datosFormulario || typeof datosFormulario !== 'object' || Array.isArray(datosFormulario)) {
    return {
      ok: false,
      status: 400,
      error: { campo: 'formulario', mensaje: 'Los datos del paciente no son válidos.' }
    };
  }

  const duenoId = datosFormulario.dueno_id === undefined
    || datosFormulario.dueno_id === null
    || datosFormulario.dueno_id === ''
    ? null
    : Number(datosFormulario.dueno_id);
  const usaDuenoExistente = duenoId !== null;

  const camposObligatorios = usaDuenoExistente
    ? ['nombre', 'especie', 'raza']
    : ['nombre', 'especie', 'raza', 'dueño', 'rut', 'telefono'];
  
  const campoVacio = camposObligatorios.find(campo => (
    typeof datosFormulario[campo] !== 'string' || !datosFormulario[campo].trim()
  ));
  if (campoVacio) {
    return {
      ok: false,
      status: 422,
      error: { campo: campoVacio, mensaje: 'Completa este campo.' }
    };
  }

  if (datosFormulario.diagnostico !== undefined && typeof datosFormulario.diagnostico !== 'string') {
    return {
      ok: false,
      status: 422,
      error: { campo: 'diagnostico', mensaje: 'El diagnóstico no es válido.' }
    };
  }

  if (!['Canino', 'Felino', 'Ave', 'Roedor', 'Reptil', 'Pez', 'Otro'].includes(datosFormulario.especie)) {
    return {
      ok: false,
      status: 422,
      error: { campo: 'especie', mensaje: 'Selecciona una especie válida.' }
    };
  }

  if (!['manual', 'fecha'].includes(datosFormulario.modoEdad)) {
    return {
      ok: false,
      status: 422,
      error: { campo: 'edad', mensaje: 'Selecciona cómo ingresar la edad.' }
    };
  }

  const edadManual = datosFormulario.edad === '' || datosFormulario.edad === undefined
    ? Number.NaN
    : Number(datosFormulario.edad);
  const peso = datosFormulario.peso === '' || datosFormulario.peso === undefined
    ? Number.NaN
    : Number(datosFormulario.peso);
  const fechaNacimiento = datosFormulario.fecha_nacimiento;
  if (datosFormulario.modoEdad === 'manual' && (!Number.isInteger(edadManual) || edadManual < 0)) {
    return {
      ok: false,
      status: 422,
      error: { campo: 'edad', mensaje: 'La edad debe ser un número entero mayor o igual a cero.' }
    };
  }
  if (!Number.isFinite(peso) || peso < 0) {
    return {
      ok: false,
      status: 422,
      error: { campo: 'peso', mensaje: 'El peso debe ser un número mayor o igual a cero.' }
    };
  }
  if (datosFormulario.modoEdad === 'fecha' && (
    !fechaNacimientoValida(fechaNacimiento)
    || fechaNacimiento > new Date().toISOString().slice(0, 10)
  )) {
    return {
      ok: false,
      status: 422,
      error: { campo: 'fecha_nacimiento', mensaje: 'Ingresa una fecha de nacimiento válida.' }
    };
  }

  let datosDueno;

  if (usaDuenoExistente) {
    const duenoValido = Number.isInteger(duenoId) && duenoId > 0 && duenoId <= 2147483647;
    const duenoExistente = duenoValido ? await buscarDuenoPorId(duenoId) : null;
    if (!duenoExistente) {
      return {
        ok: false,
        status: 422,
        error: { campo: 'rut', mensaje: 'El dueño seleccionado no existe. Búscalo de nuevo por su RUT.' }
      };
    }
    datosDueno = { dueno_id: duenoExistente.id };
  } else {
    const rutIngresado = normalizarRut(datosFormulario.rut);
    if (!rutValido(datosFormulario.rut)) {
      return {
        ok: false,
        status: 422,
        error: { campo: 'rut', mensaje: 'Ingresa un RUT válido, por ejemplo 12.345.678-5.' }
      };
    }

    const rut = `${rutIngresado.slice(0, -1)}-${rutIngresado.slice(-1)}`;
    if (await existeRut(rut)) {
      return {
        ok: false,
        status: 409,
        error: { campo: 'rut', mensaje: 'Este RUT ya está registrado. Búscalo para agregarle una mascota.' }
      };
    }

    datosDueno = { dueño: datosFormulario.dueño, rut, telefono: datosFormulario.telefono };
  }

  const { modoEdad } = datosFormulario;
  const paciente = {
    nombre: datosFormulario.nombre,
    especie: datosFormulario.especie,
    raza: datosFormulario.raza,
    foto: datosFormulario.foto || 'sin-foto.svg',
    edad: modoEdad === 'fecha' ? null : edadManual,
    peso,
    diagnostico: datosFormulario.diagnostico?.trim() || '',
    fecha_nacimiento: modoEdad === 'fecha' ? datosFormulario.fecha_nacimiento : '',
    ...datosDueno
  };

  const pacienteGuardado = await insertarPaciente(paciente);
  return { ok: true, paciente: conEdadActual(pacienteGuardado) };
};

export const listarPacientes = async () => (await obtenerPacientes()).map(conEdadActual);
export const obtenerPacientePorId = async id => conEdadActual(await buscarPacientePorId(id));
export const registrarPaciente = datosFormulario => {
  const siguienteRegistro = registroEnCurso.then(
    () => registrarPacienteEnOrden(datosFormulario)
  );
  registroEnCurso = siguienteRegistro.then(() => undefined, () => undefined);
  return siguienteRegistro;
};
export const buscarDueno = async rutIngresado => {
  if (typeof rutIngresado !== 'string' || !rutValido(rutIngresado)) {
    return {
      ok: false,
      status: 422,
      error: { campo: 'rut', mensaje: 'Ingresa un RUT válido, por ejemplo 12.345.678-5.' }
    };
  }

  const normalizado = normalizarRut(rutIngresado);
  const rut = `${normalizado.slice(0, -1)}-${normalizado.slice(-1)}`;
  const dueno = await buscarDuenoPorRut(rut);
  return { ok: true, dueno };
};