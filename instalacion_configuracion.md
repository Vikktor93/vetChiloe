## 🛠️ Instalación y configuración

1. Clona el repositorio y entra a la carpeta:

```bash
git clone https://github.com/Vikktor93/vetChiloe
cd vetChiloe
npm install
```

2. Crea tu archivo `.env` a partir del ejemplo y completa la cadena de conexión de la base de datos (Supabase, *Session pooler*):

```bash
cp .env.example .env
```

El archivo `.env` está en `.gitignore`: **nunca lo subas al repositorio**.

## ▶️ Cómo ejecutar

| Comando | Qué hace |
|---|---|
| `npm run dev` | Desarrollo (frontend + API) |
| `npm run build` | Compila el frontend en `dist/` |
| `npm run preview` | Sirve app + API en modo producción |
| `npm run lint` | Revisa el código con ESLint |

## ☁️ Despliegue

La aplicación completa (frontend + API) está desplegada en Render como un único Web Service:
https://vetchiloe-j6ly.onrender.com

- Build Command: `npm install && npm run build`
- Start Command: `node server/apiServer.js --production`
- Variables de entorno: `DATABASE_URL`, `NODE_VERSION`

> En el plan gratuito, el servicio se "duerme" tras un rato sin visitas, por lo que la primera carga puede tardar cerca de un minuto.

## 🗄️ Base de datos (PostgreSQL en Supabase)

Dos tablas: `duenos` y `pacientes` (un dueño puede tener muchos pacientes).

```sql
CREATE TABLE duenos (
  id       INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre   TEXT NOT NULL,
  rut      TEXT NOT NULL UNIQUE,
  telefono TEXT
);

CREATE SEQUENCE numero_atencion_seq;

CREATE TABLE pacientes (
  id               INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  nombre           TEXT NOT NULL,
  especie          TEXT NOT NULL,
  raza             TEXT,
  diagnostico      TEXT,
  edad             SMALLINT,
  peso             NUMERIC(5,2),
  fecha_nacimiento DATE,
  foto             TEXT NOT NULL DEFAULT 'sin-foto.svg',
  numero_atencion  TEXT NOT NULL UNIQUE
    DEFAULT to_char(now() AT TIME ZONE 'America/Santiago', 'YYYY')
            || '-A' || nextval('numero_atencion_seq'),
  dueno_id         INTEGER NOT NULL REFERENCES duenos(id)
);

ALTER TABLE duenos    ENABLE ROW LEVEL SECURITY;
ALTER TABLE pacientes ENABLE ROW LEVEL SECURITY;
```

## 🧱 Arquitectura del servidor

```
routes → controllers → business → data (PostgreSQL)
```

- `routes`: define las URLs de la API.
- `controllers`: recibe la petición y arma la respuesta HTTP.
- `business`: validaciones y reglas (RUT, edad, peso...).
- `data`: consultas SQL a la base de datos.