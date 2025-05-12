# 🏠 Backend - Alquiler Seguro

## ⚙️ Instrucciones para iniciar el backend

> ⚠️ **IMPORTANTE:** Asegúrate de configurar el archivo `.env` (usa `.env.example` como referencia) con los valores necesarios para la conexión a la base de datos y el protocolo de envío de emails. Al iniciar la base de datos con el comando ` npm run initDb` se crearán unos perfiles predeterminados para tener más información en la landing page. Como esto es así, hemos proporcionado un fichero llamado uploads_example copy que debemos renombrar, en exactamente la misma ruta que se encuentra, a uploads

### 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
cd PFB/API_alquiler-seguro
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Inicializar la base de datos

Esto eliminará la base de datos anterior (si existe) y creará una nueva con sus tablas correspondientes:

```bash
npm run initDb
```

### 4. Iniciar la aplicación

Este comando inicia el servidor en el puerto especificado en el archivo `.env`:

```bash
npm run dev
```

---

## 📮 Endpoints (Postman)

### 📌 Notas sobre variables de ruta

> ⚠️ Si el endpoint incluye `:userId` o `:rentId`, debes definir estas variables en Postman:
>
> - **Key:** `userId` o `rentId`
> - **Value:** ID correspondiente en la base de datos

---

## 👤 Endpoints de Usuario

### 1. Registro de usuario

`POST /users/register`

```json
{
  "username": "Nombre del usuario",
  "email": "correo@ejemplo.com",
  "password": "ContraseñaSegura123!",
  "bio": "Descripción breve",
  "phone_number": "123456789"
}
```

### 2. Validación de usuario

`GET /validation/:regcode`

```json
{
  "email": "correo@ejemplo.com"
}
```

### 3. Login

`POST /users/login`

```json
{
  "email": "correo@ejemplo.com",
  "password": "ContraseñaSegura123!"
}
```

### 4. Listar todos los usuarios

`GET /users/list`

### 5. Obtener detalles de un usuario

`GET /users/:userId`

### 6. Obtener historial de alquileres de un usuario

`GET /users/:userId/history`

### 7. Enviar correo para recuperación de contraseña

`PUT /users/password/recover`

```json
{
  "email": "correo@ejemplo.com"
}
```

### 8. Cambiar contraseña

`POST /users/password/change`

```json
{
  "email": "correo@ejemplo.com",
  "pass": "ContraseñaAnterior123!",
  "newPass": "NuevaContraseña456!"
}
```

### 9. Actualizar perfil de usuario

`PUT /users/update`

**Formato `form-data`:**

- `username` (text)
- `bio` (text)
- `phone_number` (text)
- `first_name` (text)
- `last_name` (text)
- `avatar` (file)

### 10. Valorar a otro usuario

`POST /user/:userId/:rentHistoryId/votes`

```json
{
  "rating": 5,
  "comment": "Gran experiencia de alquiler"
}
```

### 11. Obtener perfil del usuario autenticado

`GET /users`

Recupera el perfil privado del usuario autenticado.

---

### 12. Obtener valoraciones de un usuario

`GET /users/:userId/ratings`

Obtiene todas las valoraciones (ratings) de un usuario específico.

---

### 13. Cambiar contraseña con código de recuperación

`PUT /users/password`

````json
{
  "email": "correo@ejemplo.com",
  "regcode": "código_de_recuperación",
  "newPass": "NuevaContraseña456!"
}
````
---

## 🏘️ Endpoints de Alquiler (Rent)

### 1. Registrar nuevo alquiler

`POST /rent/register`

```json
{
  "address": "Dirección del inmueble",
  "price": 800,
  "num_rooms": 3,
  "description": "Piso céntrico y luminoso"
}
````

### 2. Subir fotos a un alquiler

`POST /rent/:rentId/photos`

**form-data:**

- `photo` (file) → Hasta 20 imágenes

### 3. Eliminar una foto de un alquiler

`DELETE /rent/:rentId/photos/:photoId`

### 4. Obtener detalles de un alquiler

`GET /rent/:rentId`

### 5. Solicitar visita/alquiler

`POST /rent/:rentId/request`

### 6. Obtener solicitudes de alquiler

`GET /rents/requests`

### 7. Listar todos los alquileres

`GET /rents`

### 8. Aprobar alquiler

`POST /rent/:rentId/approve`

### 9. Cambiar estado de disponibilidad del alquiler

`PUT /rent/:rentId`

```json
{
  "status": 1
}
```

### 10. Cambiar estado de solicitud de alquiler

`PUT /rent/:rentId/response/:requestId`

```json
{
  "status": "APPROVED"
}
```

---

## 👨‍💻 Autores

- [@Juanjo Riera](https://github.com/JuanjoRiera)
- [@Samuel Cobas](https://github.com/vlicus)
- [@Carlos "Tuto" Curiel](https://github.com/AuthorGG)
- [@Nicolas Fernandez](https://github.com/nicofernandezdl7)
