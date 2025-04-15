# BACKEND Alquiler Seguro

## Instrucciones para levantar el back de la aplicación Alquiler Seguro.

> [!CAUTION]
> Es importante configurar el .env (.env.example) con los campos correspondientes de la base de datos y del protocolo para el envío de emails.

## Clonar repositorio en local

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

Con este script conseguiremos poner a escuchar a nuestra aplicación en el puerto PORT, configurado previamente en .env:

```bash
  npm run dev
```

## Endpoints (peticiones Postman)

### User Endpoints:

#### Path variables:

> [!IMPORTANT]
> Si en el endpoint extá explícito (rentId o userId) significa que tenemos que configurar las variables de entorno en POSTMAN, dependiendo del caso en concreto y lo que querramos conseguir con la petición:

- Key: userId O rentId
- Value: id del usuario O del alquiler en concreto en la base de datos

1. Endpoint de usuario pendiente de activar (POST)

```bash
/users/register
```

Body (JSON)

```json
{
  "username": "Nombre del usuario",
  "email": "Email del usuario",
  "password": "Contraseña del Usuario que cumpla patrón requerido",
  "bio": "Bio del usuario",
  "phone_number": "número de teléfono del usuario"
}
```

2. Endpoint para validacion de usuario (POST)

```bash
/users/validation
```

- Body (JSON)

```json
{
  "email": "Email del usuario"
}
```

3. Endpoint para login de un usuario registrado (POST)

```bash
/users/login
```

- Body (JSON)

```json
{
  "email": "Email del usuario",
  "password": "Contraseña correspondiente al usuario"
}
```

4. Endpoint para obtener el listado de usuarios (GET)

```bash
/users
```

5. Endpoint para los detalles de un usuario (GET)

```bash
/users/:userId
```

6. Endpoint para detalles de usuario con el histórico de alquileres hechos (GET)

```bash
/users/:userId/history
```

7. Endpoint para enviar un correo de recuperación de contraseña (PUT)

```bash
/users/password/recover
```

- Body (JSON)

```json
{
  "email": "Email del usuario",
  "password": "Contraseña correspondiente al usuario"
}
```

8. Endpoint que permite cambiar la contraseña al usuario (POST)

```bash
/users/password/change
```

- Body (JSON)

```json
{
  "email": "Email del usuario",
  "pass": "Antigua Contraseña",
  "newPass": "Nueva Contraseña"
}
```

9. Endpoint que permite actualizar el perfil del usuario, puede ser modificado los atributos que desee, los que no sean insertados en el form-data, mantendrán su estado previo (PUT)

```bash
/users/password/update
```

- Form-data

```json
   Key: username (text) -> Value: Nombre que queramos asignar
   Key: bio (text) -> Value: Biografía
   Key: phone_number (text) -> Value: Número de teléfono
   Key: first_name (text) -> Value: Nombres
   Key: last_name (text) -> Value: Apellidos
   Key: avatar (file) -> Value: Añadir archivo de imagen
```

10. Endpoint votar entre usuarios

```bash
/user/:userId/votes
```

- Body (JSON)

```json
{
  "rating": 5,
  "comment": "Este tío es un crack que flipas"
}
```

### Rent Endpoints

1. Añadir un nuevo alquiler (POST)

```bash
/rent/register
```

- Body (JSON)

```json
   {
    "address": "Dirección",
    "price": precio(número),
    "num_rooms": habitaciones(número),
    "description": "Descripción de la vivienda"
    }
```

2. Añadir fotos a un alquiler (POST)

```bash
/rent/:rentId/photos
```

- Form-data

```json
   Key: photo (file) -> Value: Añadir archivo de imagen o imágenes (hasta 20)
```

3. Eliminar una foto de un alquiler (DELETE)

```bash
/rent/:rentId/photos/:photoId
```

4. Obtener info de un alquiler concreto (GET)

```bash
/rent/:rentId
```

5. Solicitar visita/alquiler (POST)

```bash
/rent/:rentId/request
```

6. Obtener el listado de las solicitudes de visita/alquiler (GET)

```bash
/rents/requests
```

7. Obtener el listado de alquileres (GET)

```bash
/rents
```

8. Aprobar un alquiler (POST)

```bash
/rent/:rentId/approve
```

9. Cambiar el estado de un alquiler (PUT)

```bash
/rent/:rentId
```

- Body (JSON)

```json
{
  "status": 0
  // 0 = No disponible
  // 1 = Disponible
}
```

10. Modificar estado de visita o disponibilidad

```bash
/rent/:rentId/response/:requestId
```

- Body (JSON)

```json
{
  "status": "APPROVED"
  // Para la visita "APPROVED" OR "REJECTED"
  // Para el alquiler "ACTIVE" OR "CANCELLED"
}
```

## Autores

- [@Juanjo Riera](https://github.com/JuanjoRiera)
- [@Samuel Cobas](https://github.com/vlicus)
- [@Carlos "Tuto" Curiel ](https://github.com/AuthorGG)
- [@Nicolas Fernandez](https://github.com/nicofernandezdl7)
