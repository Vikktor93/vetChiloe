# vetChiloé - Sistema de Información Veterinaria

Aplicación web *full-stack* para registrar y consultar los pacientes de una clínica veterinaria de Chiloé. Es el **mini proyecto guía** de la asignatura **Tecnologías Web y Móviles** (6 º semestre, Ingeniería Civil en Informática, Universidad de Los Lagos, Sede Chiloé) y se construyó de forma incremental durante la **Unidad I** del curso (agosto-octubre 2026).

En la **Unidad II** la misma API desplegada en Render será consumida por la app móvil **vetChiloé en Terreno** (React Native + Expo).

| Componente | Tecnología | URL de producción |
|---|---|---|
| Frontend (recepción) | React + Vite → Vercel | `https://vet-chiloe-navy.vercel.app/` |
| Backend (API REST) | Node.js + Express → Render | https://vetchiloe-2zmz.onrender.com/api/pacientes |
| Base de datos | PostgreSQL (Supabase) | - (privada, vía `DATABASE_URL`) |

> **Plan gratuito de Render:** si la API lleva ~15 min sin uso, se "colo en pausa". La primera petición puede tardar 30-60 s (responde `503` mientras despierta). Abre la URL de la API en el navegador antes de una demo.

---

## Propósito

**Repositorio pedagógico**: muestra paso a paso la arquitectura web basada en componentes, el manejo del estado en React, principios de UI/UX y la transición a un sistema **N-Capas** con API REST y base de datos relacional en la nube.

## Arquitectura N-Capas

```mermaid
flowchart LR
    U([👩‍⚕️ Usuario<br/>Navegador]) --> P
    M([📱 App móvil<br/>vetChiloé Terreno]) -.Unidad II.-> R

    subgraph FE["Frontend · React + Vite (Vercel)"]
        P["Presentación<br/>App.jsx · TablaPacientes<br/>FichaClinica · FormularioPaciente"] --> SF["Servicios<br/>src/services/pacienteService.js"]
    end

    SF -- "HTTP / JSON" --> R

    subgraph BE["Backend · Express (Render)"]
        R["Rutas<br/>routes/pacienteRoutes.js"] --> C["Controladores<br/>controllers/pacienteController.js"]
        C --> S["Servicios<br/>services/pacienteService.js<br/>(reglas de negocio)"]
        S --> RP["Repositorios<br/>repositories/pacienteRepository.js<br/>(SQL con pg)"]
    end

    RP --> DB[("PostgreSQL<br/>Neon / Supabase<br/>tabla pacientes")]
```

**Recorrido de un registro:** el formulario envía `POST /api/pacientes` → el controlador lee `req.body` → el servicio aplica las reglas (N° de atención) → el repositorio ejecuta `INSERT … RETURNING *` → el paciente creado sube capa por capa hasta React, que actualiza la tabla.

## Stack tecnológico

**Frontend**
- [React 19](https://es.react.dev/) + [Vite](https://vite.dev/)
- CSS nativo con co-ubicación (cada componente con su `.css`)
- [Motion / Framer Motion](https://motion.dev/) para la tarjeta giratoria 3D

**Backend y datos**
- [Node.js](https://nodejs.org/) + [Express 5](https://expressjs.com/)
- [`pg`](https://node-postgres.com/) (node-postgres), `cors`, `dotenv`
- [PostgreSQL](https://www.postgresql.org/) como DBaaS ([Neon](https://neon.tech/) o [Supabase](https://supabase.com/))

**Despliegue:** Render (API) y Vercel (frontend)

## Funcionalidades

- **Dashboard con tabla responsiva** de pacientes con badges de color por especie.
- **Registro en modal** abierto desde un botón flotante (formulario controlado).
- **Carnet clínico digital** (Flip Card 3D): foto y datos en el anverso; N° de atención, edad y diagnóstico en el reverso.
- **SPA con renderizado condicional** entre la tabla y el carnet, sin recargar la página.
- **Persistencia real**: los datos viven en PostgreSQL y se consumen por API REST.

## API REST

Base URL: `https://vetchiloe-2zmz.onrender.com`

| Método | Endpoint | Descripción | Respuestas | Estado |
|---|---|---|---|---|
| `GET` | `/api/pacientes` | Lista todos los pacientes (más recientes primero) | `200` arreglo - `500` | ✅ |
| `POST` | `/api/pacientes` | Registra un paciente; el N° de atención lo genera el sistema | `201` paciente creado - `400` | ✅ |
| `GET` | `/api/pacientes/buscar?q=texto` | Busca por nombre o especie (`buscar_pacientes()`) | `200` | 🔜 Fase 7 |
| `GET` | `/api/pacientes/resumen` | Total por especie (`resumen_por_especie()`) | `200` | 🔜 Fase 7 |
| `GET` | `/api/pacientes/:id` | Detalle de un paciente | `200` - `404` | 🔜 Fase 8 |
| `PUT` | `/api/pacientes/:id/diagnostico` | Actualiza diagnóstico y guarda historial | `200` - `404` | 🔜 Desafío |
| `GET` | `/api/health` | Verifica que la API esté despierta | `200` | 🔜 Fase 8 |

**Modelo `Paciente`**

```json
{
  "id": 1,
  "nombre": "Mercedes",
  "numero_atencion": "2026-B2",
  "especie": "Felino",
  "edad": "8 años",
  "diagnostico": "Tratamiento por otitis leve.",
  "foto": "https://images.unsplash.com/..."
}
```

**Ejemplo de registro**

```bash
curl -X POST https://vetchiloe-2zmz.onrender.com/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nombre":"Charkicito","especie":"Felino","edad":"3 años","diagnostico":"Control sano.","foto":""}'
```

Los errores se responden como JSON: `{ "mensaje": "Descripción del error" }`.

## Base de datos

```sql
CREATE TABLE pacientes (
  id              SERIAL PRIMARY KEY,
  nombre          VARCHAR(100) NOT NULL,
  numero_atencion VARCHAR(20)  UNIQUE NOT NULL,
  especie         VARCHAR(50)  NOT NULL,
  edad            VARCHAR(50),
  diagnostico     TEXT,
  foto            TEXT
);
```

Los scripts (tabla, *seed* y funciones) se versionan en `sql/` *(ver Fase 7 del [ROADMAP](ROADMAP.md))*.

## Estructura del proyecto

```text
vetChiloe/
├── public/                         # Archivos estáticos (favicon, íconos)
├── src/
│   ├── assets/                     # Imágenes del frontend
│   ├── components/                 # Capa de presentación (un .jsx + .css por componente)
│   │   ├── FichaClinica.jsx/.css   # Carnet clínico (vista de detalle)
│   │   ├── FlipCard.jsx            # Animación 3D reutilizable (Motion)
│   │   ├── FormularioPaciente.jsx/.css  # Formulario controlado (modal)
│   │   ├── TablaPacientes.jsx/.css # Tabla responsiva del dashboard
│   │   └── TarjetaPaciente.jsx     # Tarjeta de la 1.ª fase (base para la app móvil)
│   ├── data/
│   │   └── pacientesMock.js        # Datos de ejemplo (también los usa la app móvil)
│   ├── services/
│   │   └── pacienteService.js      # Capa de servicios: único archivo que llama a la API
│   ├── server/                     # Backend Express en N-Capas (proyecto Node independiente)
│   │   ├── routes/                 # URLs y verbos HTTP
│   │   ├── controllers/            # Traducen req/res
│   │   ├── services/               # Reglas de negocio
│   │   ├── repositories/           # Únicos archivos que hablan con PostgreSQL
│   │   ├── index.js                # Punto de entrada del servidor
│   │   └── package.json
│   ├── App.jsx / App.css           # Componente raíz y estado global
│   ├── index.css                   # Variables y estilos globales
│   └── main.jsx                    # Montaje de React
├── index.html
├── vite.config.js
├── eslint.config.js
├── ROADMAP.md                      # Fases del proyecto (web y móvil)
├── LICENSE
└── README.md
```

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 LTS o superior (incluye npm)
- [Git](https://git-scm.com/)
- Una base PostgreSQL en Neon o Supabase (solo para levantar el backend propio)

## Instalación y ejecución local

### 1. Frontend

```bash
git clone https://github.com/Vikktor93/vetChiloe
cd vetChiloe
npm install
npm run dev          # http://localhost:5173
```

Por defecto el frontend consume la API de producción en Render. Para usar tu backend local, cambia `API_URL` en `src/services/pacienteService.js` a `http://localhost:3000/api/pacientes`.

### 2. Backend (opcional)

```bash
cd src/server
npm install
```

Crea `src/server/.env` (**nunca** se sube a GitHub):

```env
DATABASE_URL=postgresql://usuario:password@host/vetchiloe?sslmode=require
PORT=3000
```

```bash
node index.js        # Servidor backend corriendo en el puerto 3000
```

## Despliegue

| Servicio | Configuración |
|---|---|
| **Render** (Web Service) | Root Directory: `src/server` - Build: `npm install` - Start: `node index.js` - Variable: `DATABASE_URL` |
| **Vercel** | Framework: Vite (detección automática) - Root Directory: raíz del repositorio |

## Flujo de trabajo colaborativo (estudiantes)

Se usa **Feature Branch Workflow**: no se hacen commits directos a `main`.

1. Crea tu rama con el formato `estudiante/nombre-apellido` (ejemplo: `git checkout -b estudiante/pedro-perez`).
2. Haz commits pequeños y descriptivos (idealmente uno por capa o funcionalidad).
3. Sube tu rama (`git push -u origin estudiante/nombre-apellido`) y entrega el enlace por la plataforma institucional de la Universidad.

## Roadmap

Resumen (detalle completo en **[ROADMAP.md](ROADMAP.md)**):

- [x] **Fase 1** - Configuración con Vite y componentización estática
- [x] **Fase 2** - Bibliotecas externas: Flip Card 3D con Motion
- [x] **Fase 3** - Formulario controlado, modal con botón flotante y tabla responsiva
- [x] **Fase 4** - N-Capas en el frontend: capa de datos (mock) y capa de servicios
- [x] **Fase 5** - API REST en N-Capas con Node.js + Express
- [x] **Fase 6** - PostgreSQL en la nube y despliegue (Render + Vercel)
- [ ] **Fase 7** - Complejización de la BD: buscador reactivo, funciones SQL y resumen por especie
- [ ] **Fase 8** - Preparación de la API para la app móvil y mejoras UI/UX
- [ ] **Unidad II** - App móvil **vetChiloé en Terreno** (React Native + Expo) consumiendo esta API

## Uso de IA generativa (IAG)

El uso de IAG está permitido y su declaración es obligatoria. Las entregas documentan su uso en `docs/bitacora-ia.md` (herramienta, prompt, resultado, verificación, etc).

## Licencia

Proyecto bajo licencia **MIT** - ver [LICENSE](LICENSE). Puedes usar, modificar y distribuir este código como base para tus proyectos personales o portafolio.

---

**Académico Responsable:** Víctor Saldivia Vera - Departamento de Ciencias de la Ingeniería - Universidad de Los Lagos
