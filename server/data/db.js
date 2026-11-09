import 'dotenv/config'
import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
})

pool.on('error', error => {
  console.error('Error en una conexión inactiva de la base de datos:', error.message)
})