# Kuepa CRM - Lead Management System

Este repositorio contiene la solución a la prueba técnica para el rol de desarrollador Full Stack en Kuepa. Se implementó un módulo CRM completo para la gestión y seguimiento de prospectos (leads) interesados en programas académicos.

## 🚀 Características Principales

A lo largo del desarrollo no solo se cumplieron los requerimientos básicos, sino que se implementaron mejoras de arquitectura y escalabilidad estructurales:

### Backend (Node.js + Express + Mongoose)
- **Paginación en la API**: Se implementó paginación a nivel de base de datos (`skip`, `limit`) junto a métricas de metadatos (`total`, `pages`), preparando el sistema para escalar a millones de registros de manera eficiente.
- **Corrección de Deuda Técnica / Modelos**: Se analizó la arquitectura base y se corrigió el `StrictPopulateError` fantasma del campo `contact` que rompía la aplicación, alineando el código al verdadero esquema de Mongoose.
- **Manejo Responsable de Errores**: Se ajustaron las capturas `try/catch` para serializar y devolver excepciones controladas hacia el frontend en lugar de silenciarlas (500 genéricos).
- **Twelve-Factor App**: Se reestructuró `config.ts` para aceptar variables de entorno (`process.env.MONGO_URI`), asegurando compatibilidad nativa con flujos CI/CD y Contenedores.

### Frontend (React + TypeScript + Tailwind + Shadcn)
- **Arquitectura Limpia (Separation of Concerns)**: Se implementó un patrón avanzado de *Smart & Dumb Components*.
  - `useLeads.ts` (Custom Hook): Centraliza todo el estado (state), fetch, memoization de búsquedas y lógica pesada.
  - `lead-table.tsx` (Componente Presentacional): Exclusivo para renderizado puro.
- **Buscador en Tiempo Real (Reactivo)**: Filtrado instantáneo (con memoización) por nombre completo, correo electrónico o número de ticket, sin trabar el Event Loop.
- **Prevención de `CastError`**: Normalización del payload (JSON) antes del envío, detectando IDs nulos y evadiendo cuelgues (crashes) en el motor de MongoDB.
- **UI/UX Premium**: Modales accesibles, notificaciones asíncronas de éxito/error (Toasts) e indicadores de estado de carga visuales.

## 🛠️ Tecnologías Implementadas
- **Frontend:** React 18, TypeScript, Tailwind CSS, Shadcn UI, Nanostores.
- **Backend:** Node.js (v18), Express, Mongoose (MongoDB).
- **Infraestructura y DevOps:** Docker, Docker Compose.

## 📦 Guía de Instalación y Ejecución

Tienes dos formas de probar el entorno: de forma local nativa o usando contenedores Docker (Recomendado).

### Opción A: Usando Docker (Modo Recomendado)
No necesitas tener Node.js ni MongoDB instalados, solo tener **Docker** abierto.

1. Abre tu terminal en la raíz del proyecto (`prueba-kuepa`).
2. Asegúrate de no tener servidores locales ocupando los puertos 7001, 5173 o 27017.
3. Construye y levanta el clúster:
   ```bash
   docker-compose up --build
   ```
4. Ingresa a `http://localhost:5173` y disfruta del CRM.

### Opción B: Ejecución Manual Local
Requiere Node.js 18+ y MongoDB ejecutándose localmente en el puerto 27017.

**1. Levantar el Backend**
```bash
cd back
npm install
npm run dev
```

**2. Levantar el Frontend**
```bash
cd front
npm install
npm run dev
```

## 🧑‍💻 Población de la Base de Datos (Seeder)
Para popular la base de datos con el usuario administrador y los datos base (ejecutar desde la carpeta `back/`):

```bash
npm run cli -- --seeder initSeeder -f
```

*(Nota de Desarrollo: El script del seeder original fue actualizado para inyectar automáticamente el catálogo de **Programas Académicos** a la base de datos, garantizando que el formulario de creación de leads funcione de inmediato "out-of-the-box" sin configuraciones extra).*

---
**Desarrollado con pasión y dedicación para la prueba técnica de Kuepa.**
