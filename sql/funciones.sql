-- Fase 7: Complejización de la BD
-- Funciones en PostgreSQL (búsqueda, registro y estadística)

-- Cómo usarlo: copiar todo el archivo en el SQL Editor de Neon / Supabase
-- y ejecutarlo. Gracias a CREATE OR REPLACE / IF NOT EXISTS se puede
-- ejecutar varias veces sin errores.

-- Función de consulta: buscar_pacientes(texto)
CREATE OR REPLACE FUNCTION buscar_pacientes(p_texto TEXT)
RETURNS SETOF pacientes AS $$
  SELECT *
  FROM pacientes
  WHERE nombre  ILIKE '%' || COALESCE(TRIM(p_texto), '') || '%'
     OR especie ILIKE '%' || COALESCE(TRIM(p_texto), '') || '%'
  ORDER BY nombre;
$$ LANGUAGE sql STABLE;

-- Prueba:
-- SELECT * FROM buscar_pacientes('mer');


-- Función generadora: N° de atención automático
CREATE SEQUENCE IF NOT EXISTS seq_atencion START 1;

CREATE OR REPLACE FUNCTION generar_numero_atencion()
RETURNS TEXT AS $$
  SELECT EXTRACT(YEAR FROM CURRENT_DATE)::TEXT
         || '-' || LPAD(nextval('seq_atencion')::TEXT, 4, '0');
$$ LANGUAGE sql VOLATILE;

-- Prueba (consume un número de la secuencia):
-- SELECT generar_numero_atencion();


-- Función de registro: registrar_paciente(...)
CREATE OR REPLACE FUNCTION registrar_paciente(
  p_nombre TEXT, p_especie TEXT, p_edad TEXT,
  p_diagnostico TEXT, p_foto TEXT
) RETURNS pacientes AS $$
  INSERT INTO pacientes (nombre, numero_atencion, especie, edad, diagnostico, foto)
  VALUES (
    TRIM(p_nombre),
    generar_numero_atencion(),
    INITCAP(TRIM(p_especie)),
    NULLIF(TRIM(p_edad), ''),
    NULLIF(TRIM(p_diagnostico), ''),
    NULLIF(TRIM(p_foto), '')
  )
  RETURNING *;
$$ LANGUAGE sql;

-- Prueba: nombre con espacios y especie en minusculas
-- SELECT * FROM registrar_paciente(' Charkicito ', 'canino', '3 años', 'Control sano.', NULL);

-- Función de estadística: resumen_por_especie()
CREATE OR REPLACE FUNCTION resumen_por_especie()
RETURNS TABLE (especie VARCHAR, total BIGINT) AS $$
  SELECT p.especie, COUNT(*)
  FROM pacientes p
  GROUP BY p.especie
  ORDER BY 2 DESC, 1;
$$ LANGUAGE sql STABLE;

-- Prueba:
-- SELECT * FROM resumen_por_especie();

-- Desafio Extra (opcional) - Historial de diagnósticos
CREATE TABLE IF NOT EXISTS historial_diagnosticos (
  id                   SERIAL PRIMARY KEY,
  paciente_id          INT REFERENCES pacientes(id) ON DELETE CASCADE,
  diagnostico_anterior TEXT,
  fecha                TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION actualizar_diagnostico(p_id INT, p_nuevo TEXT)
RETURNS pacientes AS $$
  INSERT INTO historial_diagnosticos (paciente_id, diagnostico_anterior)
  SELECT id, diagnostico FROM pacientes WHERE id = p_id;

  UPDATE pacientes SET diagnostico = TRIM(p_nuevo)
  WHERE id = p_id
  RETURNING *;
$$ LANGUAGE sql;

-- Prueba:
-- SELECT * FROM actualizar_diagnostico(1, 'Alta médica.);
-- SELECT * FROM historial_diagnosticos;
