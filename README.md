# Sistema de Información: vetChiloé

Una aplicación web moderna y responsiva diseñada para gestionar y realizar el seguimiento de los datos de pacientes en clínicas veterinarias. Este proyecto sirve como base educativa para construir interfaces web escalables utilizando el ecosistema moderno de JavaScript, utilizando React.

Este proyecto se enmarca dentro de la asignatura de **Tecnologías Web y Móviles** de 6to Semestre en la carrera de **Ingeniería Civil en Informática**, de la **Universidad de Los Lagos**.

## 🎯 Propósito del Sistema
El propósito principal de este repositorio es pedagógico. Busca enseñar a los estudiantes de ingeniería la arquitectura web basada en componentes, el manejo unidireccional del estado, y la implementación de interfaces de usuario (UI) y experiencias de usuario (UX) de alto nivel, transitando progresivamente hacia un sistema *Full-Stack*.

## 🚀 Stack Tecnológico

**Frontend (Fase Actual):**
* **Librería Core:** React + Vite
* **Estilos:** CSS3 Nativo (Arquitectura de Co-ubicación)
* **Animaciones:** Framer Motion (para interacciones 3D nativas)

**Backend & Datos (Planificado):**
* **Entorno de Ejecución:** Node.js
* **Framework:** Express.js
* **Base de Datos:** PostgreSQL

## ✨ Funcionalidades Principales (UI/UX)
* **Dashboard Interactivo:** Vista principal con una tabla de datos estructurada y responsiva para el escaneo rápido de pacientes registrados.
* **Gestión de Ingresos:** Formulario controlado superpuesto (Modal) accionado por un Botón Flotante para registrar nuevas mascotas.
* **Carnet Clínico Digital:** Sistema de tarjetas interactivas en 3D (Flip-Card) que permite visualizar la fotografía y datos del paciente en el anverso, y su historial clínico, así como su diagnóstico en el reverso.
* **Renderizado Condicional:** Navegación fluida entre la tabla general y los expedientes individuales sin recargar la página (Single Page Application).

## 📁 Estructura del Proyecto

El proyecto sigue una arquitectura modular basada en componentes:

```text
vetChiloe/
├── src/
│   ├── components/
│   │   ├── FichaClinica.jsx        # Contenedor de la vista de detalle
│   │   ├── FichaClinica.css
│   │   ├── FlipCard.jsx            # Componente reutilizable de animación 3D
│   │   ├── FormularioPaciente.jsx  # Formulario controlado para nuevos ingresos
│   │   ├── FormularioPaciente.css
│   │   ├── TablaPacientes.jsx      # Tabla responsiva del dashboard principal
│   │   └── TablaPacientes.css
│   ├── App.jsx                     # Componente raíz y gestor del estado global
│   ├── App.css                     # Estilos globales y layout principal
│   └── main.jsx                    # Punto de entrada de la aplicación
└── package.json
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
- [x] Fase 1: Configuración inicial (Vite) y componentización estática.
- [x] Fase 2: Integración de bibliotecas (Framer Motion) e interacciones 3D.
- [x] Fase 3: Levantamiento de estado, formularios controlados y renderizado de tablas.
- [ ] Fase 4: Mejoras de UX (Búsqueda en tiempo real, validaciones, Empty States, Skeleton Loaders).
- [ ] Fase 5: Desarrollo de API RESTful con Node.js y Express.
- [ ] Fase 6: Modelado y conexión a base de datos relacional (PostgreSQL).

## 📄 Licencia
Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles.

Nota: Al ser una licencia MIT, los estudiantes son libres de utilizar, modificar y distribuir este código como base para sus futuros proyectos personales o portafolios profesionales.