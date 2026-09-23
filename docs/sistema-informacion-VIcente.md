# Sistema de Información - VetChiloé

**Fecha:** 23 de septiembre de 2026  
**Versión:** 0.0.1 

---

## 1. Descripción del proyecto
VetChiloé es una aplicación web enfocada en apoyar la gestión y el seguimiento visual de pacientes para una clínica veterinaria. El sistema se encuentra en su fase beta inicial, desarrollado con **React** y **Vite**, utilizando por ahora un estado local (`useState`) con datos de prueba.
## 2. Visión del proyecto
Construir una plataforma simple, clara y escalable que permita centralizar historiales clínicos y atenciones veterinarias. A futuro se busca integrar persistencia en base de datos, perfiles de usuario, filtros de búsqueda y generación de reportes clínicos.

## 3. Avances 

### 3.1. Tarjetas interactivas de pacientes (`FlipCard`)-23-09-2026
- **Componente 3D:** Integración del componente animado `FlipCard` con la librería `motion` (React Bits) para listar los pacientes (`Charkicito`, `Mercedes` y `Hannita`).
- **Cara frontal:** Presenta la fotografía del paciente, su nombre destacado y su número de atención.
- **Cara trasera (Ficha clínica):** Despliega al hacer clic los detalles clínicos esenciales: especie, edad y observación/motivo de atención.
- **Efectos dinámicos:** Animación de giro con profundidad 3D, soporte táctil/clic y efectos sutiles de inclinación (*tilt*) y reflejo (*glare*).

### 3.2. Maquetación y distribución visual
- **Estructura flexible:** Contenedor maquetado con Flexbox (`display: flex`, `flexWrap: wrap`) para mantener el diseño centrado y adaptable a distintas resoluciones.
- **Espaciado calibrado:** Implementación de un `gap` modular (60px) entre tarjetas para asegurar una visualización limpia y sin solapamientos.

## 4. Próximos pasos
- Conexión con backend y persistencia definitiva en base de datos.
- Integración de filtros de búsqueda por nombre o número de atención.
- Incorporación del módulo para registrar, editar y dar de alta pacientes.

## 5. Estado de la versión
Versión beta inicial centrada en la experiencia de usuario y la presentación visual interactiva del catálogo de pacientes.