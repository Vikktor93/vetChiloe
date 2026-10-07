# Sistema de Información: vetChiloé

Una aplicación web moderna y responsiva diseñada para gestionar y realizar el seguimiento de los datos de pacientes en clínicas veterinarias. Este proyecto sirve como base educativa para construir interfaces web escalables utilizando el ecosistema moderno de JavaScript, utilizando React.

Este proyecto se enmarca dentro de la asignatura de **Tecnologías Web y Móviles** de 6to Semestre en la carrera de **Ingeniería Civil en Informática**, de la **Universidad de Los Lagos**.

## 🎯 Propósito del Sistema
El propósito principal de este repositorio es pedagógico. Busca enseñar a los estudiantes de ingeniería la arquitectura web basada en componentes, el manejo unidireccional del estado, y la implementación de interfaces de usuario (UI) y experiencias de usuario (UX) de alto nivel, transitando progresivamente hacia un sistema *Full-Stack*.

## 🚀 Stack Tecnológico

**Frontend (Fase Actual):**
* **Librería Core:** [React](https://es.react.dev/) + [Vite](https://vite.dev/)
* **Estilos:** CSS3 Nativo (Arquitectura de Co-ubicación)
* **Animaciones:** [Framer Motion](https://motion.dev/) (para interacciones 3D nativas)

**Backend & Datos (Planificado):**
* **Entorno de Ejecución:** [Node.js](https://nodejs.org/en)
* **Framework:** [Express.js](https://expressjs.com/)
* **Base de Datos:** [PostgreSQL](https://www.postgresql.org/)

## ✨ Funcionalidades Principales (UI/UX)
* **Dashboard Interactivo:** Vista principal con una tabla de datos estructurada y responsiva para el escaneo rápido de pacientes registrados.
* **Gestión de Ingresos:** Formulario controlado superpuesto (Modal) accionado por un Botón Flotante para registrar nuevas mascotas.
* **Carnet Clínico Digital:** Sistema de tarjetas interactivas en 3D (Flip-Card) que permite visualizar la fotografía y datos del paciente en el anverso, y su historial clínico, así como su diagnóstico en el reverso.
* **Renderizado Condicional:** Navegación fluida entre la tabla general y los expedientes individuales sin recargar la página (Single Page Application).


## 📁 Estructura del Proyecto
El proyecto sigue una arquitectura modular basada en componentes

```text
vetChiloe/
├── docs/                       # Documentación adicional del proyecto
├── public/                     # Archivos estáticos públicos
├── src/
│   ├── assets/                 # Imágenes, iconos y recursos multimedia
│   ├── components/             # Componentes modulares de React
│   │   ├── FichaClinica.css
│   │   ├── FichaClinica.jsx        # Vista de detalle (Carnet clínico)
│   │   ├── FlipCard.jsx            # Lógica de animación 3D (Framer Motion)
│   │   ├── FormularioPaciente.css
│   │   ├── FormularioPaciente.jsx  # Modal controlado para nuevos ingresos
│   │   ├── TablaPacientes.css
│   │   ├── TablaPacientes.jsx      # Tabla responsiva del dashboard principal
│   │   └── TarjetaPaciente.jsx     # Componente de lista (Fase UI anterior)
│   ├── App.css                 # Estilos estructurales y globales
│   ├── App.jsx                 # Componente raíz y gestor del estado global
│   ├── index.css               # Reset y variables CSS globales
│   └── main.jsx                # Punto de entrada y montaje de React
├── .gitignore                  # Reglas de exclusión para GitHub
├── eslint.config.js            # Configuración de reglas de código limpio
├── index.html                  # Plantilla HTML principal
├── LICENSE                     # Licencia del código fuente (MIT)
├── package-lock.json           # Árbol de versiones exactas de dependencias
├── package.json                # Dependencias y scripts del proyecto (npm)
├── README.md                   # Documentación principal del repositorio
└── vite.config.js              # Configuración del empaquetador de Vite
```

## 👥 Flujo de Trabajo Colaborativo (Para Estudiantes)
Este proyecto utiliza la metodología Feature Branch Workflow. Está estrictamente prohibido hacer commits directos a la rama `main`.
Cada estudiante debe clonar el repositorio y crear su propia rama de trabajo utilizando la nomenclatura: `estudiante/nombre-apellido`. Las integraciones se evaluarán mediante *Pull Requests*.

## ⚙️ Requisitos Previos
- Node.js (incluye npm) instalado en tu computadora local.
- Git instalado en tu entorno de desarrollo.

## 🛠️ Instalación y Configuración
1. Clona el repositorio:

```bash
git clone https://github.com/Vikktor93/vetChiloe
```

2. Accede al directorio del proyecto:

```bash
cd vetChiloe
```

3. Instala las dependencias necesarias:

```bash
npm install
```

4. Levanta el servidor de desarrollo:
```bash
npm run dev
```

## 🗺️ Roadmap del Proyecto
- [x] Fase 1: Configuración inicial ([Vite](https://vite.dev/)) y componentización estática.
- [x] Fase 2: Integración de bibliotecas ( [Framer Motion](https://motion.dev/)) e interacciones 3D.
- [x] Fase 3: Levantamiento de estado, formularios controlados y renderizado de tablas.
- [ ] Fase 4: Mejoras de UX (Búsqueda en tiempo real, validaciones, Empty States, Skeleton Loaders).
- [ ] Fase 5: Desarrollo de API RESTful con [Node.js](https://nodejs.org/en) y [Express.js](https://expressjs.com/).
- [ ] Fase 6: Modelado y conexión a base de datos relacional ([PostgreSQL](https://www.postgresql.org/)).

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

Nota: Al ser una licencia MIT, los estudiantes son libres de utilizar, modificar y distribuir este código como base para sus futuros proyectos personales o portafolios profesionales.