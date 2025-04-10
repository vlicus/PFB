# Alquiler Seguro

Portal de búsqueda de alquileres, con información histórica de los usuarios basada en la valoración de sus alquileres anteriores. Con esta plataforma los caseros encontrarán el inquilino perfecto y el inquilino el casero ideal.

## Clonar repositorio en local

Clonar el proyecto

```bash
  git clone https://github.com/vlicus/PFB
```

Acceder al directorio del back

```bash
  cd PFB/API_alquiler-seguro
```

Instalar las dependencias

```bash
  npm install
```

Levantar el servidor

```bash
  npm run initDb
```

## Endpoints (peticiones Postman)

Usuario pendiente de activar

```bash
/users/register
```

Endpoint para validacion de usuario

```bash
/users/validation
```

Endpoint para login de un usuario registrado

```bash
/users/login
```

Endpoint para obtener el listado de usuarios.

```bash
/users
```

Endpoint para los detalles de un usuario

```bash
/user/:id
```

Endpoint para detalles de usuario con el histórico de alquileres hechos

```bash
/user/history/:id
```

Endpoint para enviar un correo de recuperación de contraseña.

```bash
/users/password/recover
```

Endpoint que permite cambiar la contraseña al usuario

```bash
/users/password/change
```

## Autores

- [@Juanjo Riera](https://github.com/JuanjoRiera)
- [@Samuel Cobas](https://github.com/vlicus)
- [@Carlos "Tuto" Curiel ](https://github.com/AuthorGG)
- [@Nicolas Fernandez](https://github.com/nicofernandezdl7)
