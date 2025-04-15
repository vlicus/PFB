# BACKEND Alquiler Seguro

## Instrucciones para levantar el back de la aplicación Alquiler Seguro.

Es importante configurar el .env (.env.example) con los campos correspondientes de la base de datos y del protocolo para el envío de emails.

## Clonar repositorio en local

Clonar el proyecto

```bash
  git clone https://github.com/vlicus/PFB
```

Acceder al directorio del back:

```bash
  cd PFB/API_alquiler-seguro
```

Instalar las dependencias:

```bash
  npm i
```

Crear la base de datos (aunque exista previamente, la elimina y la crea de nuevo) y las tablas correspondientes con el siguiente script:

```bash
  npm run initDb
```

Con este comando conseguiremos abrir el puerto PORT, previamente configurado en .env, donde nuestra aplicación escuchará las peticiones:

```bash
  npm run dev
```

## Endpoints (peticiones Postman)

### User Endpoints:

Usuario pendiente de activar (POST)

```bash
/users/register
```

Endpoint para validacion de usuario (POST)

```bash
/users/validation
```

Endpoint para login de un usuario registrado (POST)

```bash
/users/login
```

Endpoint para obtener el listado de usuarios (GET)

```bash
/users
```

Endpoint para los detalles de un usuario (GET)

```bash
/users/:userId
```

Endpoint para detalles de usuario con el histórico de alquileres hechos (GET)

```bash
/users/:userId/history
```

Endpoint para enviar un correo de recuperación de contraseña (PUT)

```bash
/users/password/recover
```

Endpoint que permite cambiar la contraseña al usuario (POST)

```bash
/users/password/change
```

### Rent Endpoints

Añadir fotos a un alquiler (POST)

```bash
/rent/:rentId/photos
```

Insertar un nuevo alquiler (POST)

```bash
/rent/register
```

Votar un alquiler (POST)

```bash
/rent/:rentId/votes
```

Eliminar una foto de un alquiler (DELETE)

```bash
/rent/:rentId/photos/:photoId
```

Obtener info de un alquiler concreto (GET)

```bash
/rent/:rentId
```

Solicitar visita/alquiler (POST)

```bash
/rent/:rentId/request
```

Obtener el listado de las solicitudes de visita/alquiler (GET)

```bash
/rents/requests
```

Obtener el listado de alquileres (GET)

```bash
/rents
```

Aprobar un alquiler (POST)

```bash
/rent/:rentId/approve
```

Cambiar el estado de un alquiler (PUT)

```bash
/rent/:rentId
```

## Autores

- [@Juanjo Riera](https://github.com/JuanjoRiera)
- [@Samuel Cobas](https://github.com/vlicus)
- [@Carlos "Tuto" Curiel ](https://github.com/AuthorGG)
- [@Nicolas Fernandez](https://github.com/nicofernandezdl7)
