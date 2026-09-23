# Sistema de Información - VetChiloé

**Fecha:** 23 de septiembre de 2026  
**Versión:** 0.0.1 (Beta)

## 1. Descripción del proyecto

VetChiloé es una aplicación web orientada a apoyar la gestión y el seguimiento de pacientes en una clínica veterinaria. El sistema busca centralizar la información de las mascotas, facilitar su consulta y entregar una base para incorporar nuevos procesos clínicos y administrativos.

Actualmente, el proyecto se encuentra en una etapa beta temprana. La interfaz está siendo construida con React y Vite, utilizando datos de prueba mientras se define e implementa la persistencia definitiva de la información.

## 2. Visión del proyecto

La visión de VetChiloé es convertirse en un sistema de información veterinario simple, claro y escalable, que permita administrar en un solo lugar el historial de los pacientes y la información relacionada con sus atenciones.

A futuro, el sistema podría permitir:

- Registrar y consultar pacientes de forma rápida.
- Mantener los datos de cada mascota junto con la información de su tutor o dueño.
- Gestionar fichas clínicas, diagnósticos, tratamientos y antecedentes.
- Registrar atenciones, controles, vacunas y próximas citas.
- Buscar y filtrar pacientes por nombre, especie, dueño o número de atención.
- Incorporar distintos perfiles de usuario, como administradores, veterinarios y personal de recepción.
- Guardar la información en una base de datos para que esté disponible de manera segura y persistente.
- Generar reportes útiles para la gestión de la clínica.

El desarrollo se realizará de forma incremental, priorizando primero una experiencia de uso clara y las funciones esenciales para luego ampliar el sistema según las necesidades de la veterinaria.

## 3. Avances

### 3.1. Tarjetas interactivas de pacientes (FlipCard)

**Fecha de actualización:** 23 de septiembre de 2026

Se implementó el componente `FlipCard` para presentar visualmente a los pacientes registrados. La tarjeta muestra:

- En el frente, la imagen y el nombre del paciente.
- En el reverso, información detallada como especie, raza, edad, dueño y número de atención.
- Una interacción de giro al hacer clic sobre la tarjeta.

Esta funcionalidad permite consultar información relevante sin sobrecargar la vista principal.

### 3.2. Botón y formulario para agregar pacientes

**Fecha de actualización:** 23 de septiembre de 2026

Se implementó el botón **Agregar paciente**, que permite mostrar u ocultar un formulario de registro. El formulario incluye los siguientes campos:

- Nombre del paciente.
- Especie.
- Raza.
- Edad.
- Dueño.
- Imagen del paciente.

Al guardar el formulario, el nuevo paciente se incorpora a la lista visible y se genera un número de atención dentro de los datos actuales de prueba.

## 4. Próximos pasos sugeridos

1. Validar y mejorar los campos del formulario, incluyendo mensajes de error y formatos adecuados.
2. Permitir editar y eliminar pacientes registrados.
3. Incorporar búsqueda y filtros para facilitar la consulta.
4. Separar los componentes principales en módulos reutilizables.
5. Conectar la aplicación a un backend.
6. Implementar una base de datos para conservar la información entre sesiones.
7. Diseñar la ficha clínica y el historial de atenciones.
8. Agregar autenticación y permisos de usuarios.
9. Realizar pruebas de usabilidad, funcionalidad y responsividad.

## 5. Estado de la versión

La versión **0.0.1** corresponde a una beta inicial enfocada en validar la interfaz y las primeras interacciones del sistema. Las funciones actuales utilizan datos locales y todavía no representan una versión lista para producción.
