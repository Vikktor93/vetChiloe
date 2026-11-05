-- Fase 6
-- Ejecutar en el SQL Editor de Neon / Supabase ANTES de funciones.sql
-- Si la tabla ya existe en tu proyecto, no es necesario volver a ejecutarlo

CREATE TABLE IF NOT EXISTS pacientes (
  id              SERIAL PRIMARY KEY,
  nombre          VARCHAR(100) NOT NULL,
  numero_atencion VARCHAR(20)  UNIQUE NOT NULL,
  especie         VARCHAR(50)  NOT NULL,
  edad            VARCHAR(50),
  diagnostico     TEXT,
  foto            TEXT
);

-- Paciente de prueba (Seed)
INSERT INTO pacientes (nombre, numero_atencion, especie, edad, diagnostico, foto)
VALUES ('Mercedes', '2026-B2', 'Felino', '8 años', 'Tratamiento por otitis leve.',
        'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&q=80')
ON CONFLICT (numero_atencion) DO NOTHING;
