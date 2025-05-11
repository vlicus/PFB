# Alquiler Seguro - Documentación General

**Alquiler Seguro** es una plataforma web completa diseñada para conectar a propietarios de inmuebles con inquilinos potenciales de forma segura y confiable. La plataforma crea un mecanismo de confianza basado en historial para ayudar a los propietarios a encontrar inquilinos responsables y a los inquilinos a encontrar caseros confiables.

---

## Arquitectura General

```
Cliente (Navegador Web)
│
└── Frontend (React Application)
    ├── React Router
    ├── UI Components
    ├── Authentication Context
    └── API Hooks

Backend (Express Server)
├── API Routes
├── Controllers
├── Services
├── JWT Auth Middleware
└── MySQL Database
    ├── users
    ├── rents
    ├── rental_history
    ├── ratings
    └── rent_images
```

---

## Características Clave

- **Autenticación de Usuario**: Registro e inicio de sesión seguros con verificación por email.
- **Publicación de Propiedades**: Listados detallados con múltiples imágenes y descripciones.
- **Solicitudes de Alquiler**: Flujo estructurado para gestionar solicitudes de alquiler.
- **Sistema de Valoraciones**: Valoración mutua entre propietarios e inquilinos.
- **Panel de Administración**: Herramientas para la gestión administrativa de la plataforma.
- **Diseño Responsivo**: Interfaz adaptada para dispositivos móviles.

---

## Estructura del Proyecto

```
PFB/
├── API_alquiler-seguro/     # Servidor API Backend
├── FRONT_alquiler-seguro/   # Aplicación Frontend React
└── README.md                # Este archivo
```

---

## Stack Tecnológico

### Backend

- **Node.js & Express**: Framework de servidor y API.
- **MySQL**: Base de datos relacional.
- **JWT**: Autenticación basada en tokens.
- **bcryptjs**: Hasheo de contraseñas.
- **express-fileupload & sharp**: Subida y procesamiento de imágenes.
- **nodemailer**: Envío de correos electrónicos.

### Frontend

- **React**: Librería de interfaces.
- **React Router DOM**: Sistema de rutas.
- **React Bootstrap**: Componentes visuales.
- **React Toastify**: Sistema de notificaciones.
- **React Slick**: Carrusel de imágenes.
- **Context API**: Gestión de estado.

---

## Primeros Pasos

### Requisitos Previos

- Node.js (v14 o superior)
- MySQL (v8 o superior)
- npm o yarn

### Configuración del Backend

```bash
cd PFB/API_alquiler-seguro
npm i
# Crear archivo .env a partir de .env.example
# Configurar conexión a base de datos y correo
npm run initDb
npm run dev
```

### Configuración del Frontend

```bash
cd PFB/FRONT_alquiler-seguro
npm i
npm run dev
```

---

## Modelo de Dominio Central

```
USERS ───── owns ─────> RENTS
   │                        │
   └── requests ────> RENTAL_HISTORY <───── is_requested_in
   │                        │
receives <───── RATINGS ─────> gives
   │                        │
   └────────────── has ─────> RENT_IMAGES
```

---

## Solicitudes de Alquiler (status)

```
"Usuario envía una solicitud"
"Propietario rechaza la solicitud"
    "o"
"Propietario aprueba dicha solicitud"
"Pueden hacer una reseña entre ellos"
"Propietario cancela la solicitud una vez la visita ha sido realizada"
    "o"
"Propietario cede las llaves al inquilino"
"Alquiler comienza"
"Cancelación del alquiler"
"Período de alquiler completado"

Estados (solicitud):
- PENDING
- REJECTED
- APPROVED

Estados (alquiler)
- ACTIVE
- CANCELLED
- COMPLETED
```

---

## API - Documentación General

Para más detalles, consultar el README específico del Backend.

### Funcionalidad Principal

#### Gestión de Usuarios

- Registro y validación
- Autenticación
- Gestión de perfil
- Sistema de valoraciones

#### Gestión de Alquileres

- Publicación de inmuebles
- Solicitudes de alquiler
- Flujo de aprobación
- Subida de imágenes

---

## Arquitectura del Frontend

Basado en componentes React. Para detalles adicionales, revisar el README del Frontend.

### Funcionalidades Clave

- Rutas protegidas con autenticación
- Gestión de estado vía Context
- Componentes responsivos
- Carruseles de imágenes
- Sistema de visualización de valoraciones

---

## Guías de Desarrollo

### Estilo de Código

- Backend: ESM, async/await
- Frontend: Componentes funcionales + Hooks
- Formato de código: Prettier

### Flujo de Git

- Ramas por funcionalidad
- Pull requests para revisión de código
- Commits semánticos

---

## Autores

- [@Juanjo Riera](https://github.com/JuanjoRiera)
- [@Samuel Cobas](https://github.com/vlicus)
- [@Carlos "Tuto" Curiel](https://github.com/AuthorGG)
- [@Nicolas Fernandez](https://github.com/nicofernandezdl7)
