# ROADMAP - vetChiloé

Hoja de ruta del mini proyecto de **Tecnologías Web y Móviles** (ULagos, Sede Chiloé - 6º semestre 2026).
Cada fase corresponde a un avance trabajado en clases.   
**Leyenda:** ✅ completado - 🚧 en curso - 🔜 pendiente.

---

## Unidad I - Arquitectura, Diseño y Desarrollo Moderno Web

### ✅ Fase 1 - Configuración inicial y componentización (septiembre)
- [x] Proyecto React + Vite y estructura de carpetas
- [x] Primer componente reutilizable `TarjetaPaciente` (props y eventos)
- [x] Flujo de ramas `estudiante/nombre-apellido` (Feature Branch Workflow)

### ✅ Fase 2 - Bibliotecas externas e interacción 3D (septiembre)
- [x] Instalación de Motion (Framer Motion)
- [x] Componente `FlipCard` y vista `FichaClinica` (anverso: foto y datos · reverso: historial)
- [x] Renderizado condicional entre lista y carnet con `useState`

### ✅ Fase 3 - Formularios, modal y tabla (octubre)
- [x] `FormularioPaciente` como componente controlado con `e.preventDefault()`
- [x] Levantamiento de estado hacia `App.jsx` respetando inmutabilidad (*spread operator*)
- [x] Botón flotante + modal (`mostrarFormulario`) con cierre controlado
- [x] `TablaPacientes` responsiva (NOMBRE, N° ATENCIÓN, ESPECIE, EDAD, DIAGNÓSTICO, ACCIÓN) con badges por especie

### ✅ Fase 4 - N-Capas en el frontend (octubre)
- [x] Capa de datos: `src/data/pacientesMock.js`
- [x] Capa de servicios: `src/services/pacienteService.js` (`obtenerPacientes`, `registrarPaciente`)
- [x] Carga inicial con `useEffect`; componentes reciben todo por props

### ✅ Fase 5 - API REST en N-Capas (octubre)
- [x] Backend Express en `src/server/` con `routes/`, `controllers/`, `services/`, `repositories/`
- [x] `GET /api/pacientes` → 200 · `POST /api/pacientes` → 201
- [x] El frontend cambia solo `pacienteService.js` para usar `fetch`

### ✅ Fase 6 - Base de datos en la nube y despliegue (octubre – noviembre)
- [x] Tabla `pacientes` en PostgreSQL (Neon / Supabase) + paciente *seed*
- [x] Repositorio con `pg` y `DATABASE_URL` en `.env`
- [x] API desplegada en Render: `https://vetchiloe-2zmz.onrender.com/api/pacientes`
- [ ] Frontend desplegado en Vercel y URL publicada en el README

### 🔜 Fase 7 - Complejización de la base de datos (tarea multiasignatura)
- [ ] `BuscadorPaciente.jsx` (input controlado `type="search"`) integrado a la tabla
- [ ] Contador "X de Y pacientes" y mensaje "No se encontraron pacientes"
- [ ] `sql/funciones.sql` con `buscar_pacientes()`, `generar_numero_atencion()` (secuencia `2026-0001`), `registrar_paciente()` y `resumen_por_especie()`
- [ ] Endpoints `GET /api/pacientes/buscar?q=` y `GET /api/pacientes/resumen` (declarados antes de `/:id`)
- [ ] Repositorio registra con `SELECT * FROM registrar_paciente(...)` (se elimina el N° aleatorio)
- [ ] Etiquetas de resumen por especie sobre la tabla, con los colores de los badges
- [ ] *Desafío opcional:* `historial_diagnosticos` + `PUT /api/pacientes/:id/diagnostico`
- [ ] `docs/bitacora-ia.md` (mín. 4 entradas + reflexión)

### 🔜 Fase 8 - API lista para móvil y pulido UI/UX
**Backend**
- [ ] `GET /api/health` (despertar Render antes de usar la app)
- [ ] `GET /api/pacientes/:id` con `404` si no existe
- [ ] Validación en el servicio (nombre obligatorio, especie permitida) → `400` con `{ mensaje }`
- [ ] Respuesta JSON `404` para rutas inexistentes y manejador de errores global
- [ ] Script `"start": "node index.js"` y `.env.example` en `src/server/`

**Frontend**
- [ ] Estados de carga (skeleton), error con botón "Reintentar" y vacío diferenciados
- [ ] Manejo de errores en el registro (el modal no se cierra si falla) y botón "Guardando…"
- [ ] Modal accesible (Esc, clic fuera, `role="dialog"`, foco inicial) y FlipCard operable con teclado
- [ ] Limpieza de estilos heredados de la plantilla de Vite y paleta unificada
- [ ] `index.html` en español, título y favicon propios

---

## Unidad II - Desarrollo Móvil Híbrido y Escalable con React Native y NoSQL

App **vetChiloé en Terreno**: el veterinario consulta fichas, registra visitas sin señal, toma fotos y guarda la ubicación del predio. Reutiliza **la misma API de Render**.

| # | Tópico | Hito en vetChiloé Terreno |
|---|---|---|
| 01 | Arquitectura de React Native y Expo | Kickoff: historias de usuario, proyecto Expo, `TarjetaPaciente.tsx` con `pacientesMock` |
| 02 | Componentes nativos, estilos y Expo Router | Pantallas lista de pacientes y detalle (`FlatList`, `Image`, `Pressable`) |
| 03 | Ergonomía móvil y diseño nativo | Zonas táctiles, tipografía y paleta coherente con la web |
| 04 | Consumo de APIs REST y estado asíncrono | `GET /api/pacientes`, búsqueda y registro contra Render |
| 05 | Persistencia NoSQL y BaaS | Colección de **visitas en terreno** |
| 06 | Almacenamiento local y modo offline | Cola de visitas pendientes y sincronización |
| 07 | Hardware y sensores (Expo SDK) | Cámara (foto del animal) y GPS (ubicación del predio) |
| 08 | Seguridad y rendimiento móvil | Variables de entorno, manejo de errores y caché |
| 09 | Build y despliegue nativo (EAS) | Development Build / APK de vetChiloé Terreno |
