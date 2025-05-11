# Alquiler Seguro – Frontend

**Alquiler Seguro** es una aplicación web moderna para el alquiler seguro de propiedades. Este repositorio contiene el frontend desarrollado con React, utilizando una arquitectura modular y diversas librerías para la interfaz, el enrutamiento, la gestión de estado y la autenticación.

---

## 🛠️ Tecnologías Utilizadas

| Tecnología       | Propósito                      |
| ---------------- | ------------------------------ |
| React            | Librería principal de UI       |
| React Router DOM | Enrutamiento de la aplicación  |
| React Bootstrap  | Framework de componentes de UI |
| React Toastify   | Sistema de notificaciones      |
| React Slick      | Carrusel de imágenes           |
| JWT Decode       | Manejo de tokens               |

---

## 🏗️ Estructura de la Aplicación

La aplicación está organizada en módulos y basada en componentes funcionales con Hooks de React para manejar el estado y los efectos secundarios.

### Archivos y Componentes Principales

- `main.jsx`: Punto de entrada de la aplicación
- `App.jsx`: Componente raíz con rutas y providers
- `BrowserRouter`: Wrapper del router para comportamiento SPA
- `ToastContainer`: Contenedor global de notificaciones
- `ErrorBoundary`: Componente para manejo de errores globales
- `AuthContext.Provider`: Proveedor del estado de autenticación

---

## 🧩 Descripción de Componentes

### Componentes de Layout

- `Header.jsx`
- `FooterComponent.jsx`
- `Nav.jsx`

### Páginas

- `Home.jsx`
- `Login.jsx`
- `Profile.jsx`
- `RentDetails.jsx`

### Componentes Reutilizables

- `RentCard.jsx`
- `ApiImage.jsx`
- `ReviewCard.jsx`

---

## 🧭 Sistema de Enrutamiento

El enrutamiento se implementa con **React Router DOM** y distingue entre rutas públicas y protegidas.

### Rutas Públicas

- `/`
- `/login`
- `/register`
- `/profile/:userId`
- `/rent/:rentId`

### Rutas Protegidas

- `/profile`
- `/rent/new`
- `/rent/requests`

### Configuración de Rutas

- El hook `useAuth()` valida el token JWT
- Renderizado condicional según existencia del token
- Componentes `ProtectedRoute` y `PublicRoute` para controlar acceso

---

## 🔐 Sistema de Autenticación

La autenticación se gestiona con **Context API** y **JWT (JSON Web Tokens)**.

### Archivos y Hooks

- `AuthContext.jsx`: Define el contexto y estado de autenticación
- `AuthProvider`: Provee el contexto a la app
- Hook `useAuth()`: Accede al estado y métodos de autenticación
- Hook `useLogin.js`: Lógica de inicio de sesión

### Estado de Autenticación

- `token`
- `myUsername`
- `myId`

### Métodos de Autenticación

- `login(data)`
- `logout()`

---

## 👤 Sistema de Perfiles de Usuario

Gestiona vistas **privadas** y **públicas** del perfil de usuario, mostrando información según el rol o si es el propio perfil.

### Perfil Privado

- Renderizado en `Profile.jsx`
- Usa el hook `useUser()`
- Diferencia entre usuario regular y administrador

### Perfil Público

- Renderizado en `PublicProfile.jsx`
- Obtiene `userId` desde la URL
- Muestra información de perfil y valoraciones

---

## ⭐ Sistema de Valoraciones

Muestra valoraciones de usuarios mediante componentes personalizados y peticiones a la API:

- `UserOwnerRatings`
- `UserRenterRatings`
- `ReviewCard`

### Props y Estado

- `userId`
- `ratings` (array)
- `loading` (boolean)

---

## 📩 Sistema de Solicitudes de Alquiler

Implementa un **patrón de máquina de estados** para gestionar solicitudes de alquiler con transiciones según el rol y la acción.

### Estados de Solicitud

- `PENDING`
- `APPROVED`
- `REJECTED`
- `ACTIVE`
- `CANCELLED`
- `COMPLETED`

### Acciones

- El usuario crea una solicitud
- El propietario aprueba o rechaza
- El propietario entrega llaves, cancela o completa

---

## 🖼️ Manejo de Imágenes

Las imágenes se manejan con:

- `React Slick` para carruseles
- Componente `ApiImage` para obtener imágenes del backend

Usado, por ejemplo, en `RentCard.jsx`.

---

## 🔔 Sistema de Notificaciones

**React Toastify** se utiliza para notificaciones en tiempo real.

### Implementación

- `ToastContainer` montado en `main.jsx`
- Uso de `toast.success()` y `toast.error()` en hooks y componentes

---

## ⚠️ Manejo de Errores

El manejo de errores incluye:

- Componente `ErrorBoundary`
- Validación de formularios
- Notificaciones Toast para feedback del usuario

---

## 📁 Estructura del Proyecto

```bash
src/
├── components/
│   ├── Header.jsx
│   ├── FooterComponent.jsx
│   ├── Nav.jsx
│   ├── RentCard.jsx
│   ├── ApiImage.jsx
│   ├── ReviewCard.jsx
├── pages/
│   ├── Home.jsx
│   ├── Login.jsx
│   ├── Profile.jsx
│   ├── RentDetails.jsx
│   ├── PublicProfile.jsx
├── context/
│   └── AuthContext.jsx
├── hooks/
│   ├── useAuth.js
│   └── useLogin.js
├── App.jsx
├── main.jsx
```
