const CONOCIDAS = ['canino', 'felino', 'exotico'];
// Convierte "Exótico" a "exotico" para usarlo como clase CSS del badge. Una especie desconocida (o vacía) recibe el estilo neutro "otra"
export const claseEspecie = (especie = '') => {
  const clase = (especie || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '');
  return CONOCIDAS.includes(clase) ? clase : 'otra';
};