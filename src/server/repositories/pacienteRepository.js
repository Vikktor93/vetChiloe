const { Pool } = require('pg');
require('dotenv').config();

// Configuración del pool de conexiones a la bd
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // Neon/Supabase exigen SSL. Para un PostgreSQL local sin SSL: DB_SSL=false en el .env
    ssl: process.env.DB_SSL === 'false' ? false : { rejectUnauthorized: false }
});

// Capa de acceso a datos: único archivo que habla con PostgreSQL
// Desde la Fase 7 la lógica vive en funciones de la BD (sql/funciones.sql).

const obtenerTodos = async () => {
    const resultado = await pool.query('SELECT * FROM pacientes ORDER BY id DESC');
    return resultado.rows;
};

// Función de consulta: buscar_pacientes(texto)
const buscar = async (texto) => {
    const resultado = await pool.query('SELECT * FROM buscar_pacientes($1)', [texto]);
    return resultado.rows;
};

// Función de registro: la BD genera el N° de atención y normaliza los datos
const guardar = async (paciente) => {
    const resultado = await pool.query(
        'SELECT * FROM registrar_paciente($1, $2, $3, $4, $5)',
        [paciente.nombre, paciente.especie, paciente.edad, paciente.diagnostico, paciente.foto]
    );
    return resultado.rows[0];
};

// Función de estadística: resumen_por_especie()
const resumenPorEspecie = async () => {
    const resultado = await pool.query('SELECT * FROM resumen_por_especie()');
    return resultado.rows;
};

const actualizarDiagnostico = async (id, diagnostico) => {
    const resultado = await pool.query(
        'SELECT * FROM actualizar_diagnostico($1, $2) WHERE id IS NOT NULL',
        [id, diagnostico]
    );
    return resultado.rows[0] || null;
};

module.exports = { obtenerTodos, buscar, guardar, resumenPorEspecie, actualizarDiagnostico };
