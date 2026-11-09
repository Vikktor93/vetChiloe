import { buscarDueno } from '../business/pacienteService.js'

export const buscarDuenoPorRut = async (req, res) => {
  const resultado = await buscarDueno(req.query.rut);
  if (!resultado.ok) {
    res.status(resultado.status).json(resultado);
    return;
  }
  res.json(resultado);
};