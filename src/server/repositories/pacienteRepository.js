const { Pool } = require('pg');
require('dotenv').config();

// Configuración del pool de conexiones a la base de datos
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false } 
});

const obtenerTodos = async () => {
    const resultado = await pool.query('SELECT * FROM pacientes ORDER BY id DESC');
    return resultado.rows;
};

const guardar = async (paciente) => {
    const query = `
        INSERT INTO pacientes (nombre, numero_atencion, especie, edad, diagnostico, foto)
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const valores = [
        paciente.nombre, 
        paciente.numero_atencion, 
        paciente.especie, 
        paciente.edad, 
        paciente.diagnostico, 
        paciente.foto
    ];
    
    const resultado = await pool.query(query, valores);
    return resultado.rows[0];
};

module.exports = { obtenerTodos, guardar };