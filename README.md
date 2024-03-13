# SocketIO-Vue3-NestJS-back-end

## Características

BackEnd implementado con NestJS, TypeORM, Socket-io, BullMQ, NodeMailer y JWT.

El servidor se lanza en http://localhost:3001.

Se han definido 4 módulos de NestJS, `auth`, `elements`, `email` y `users` .

* `auth`: Este módulo se encarga de gestionar el proceso de autenticación de usuarios. Expone un endpoint para peticiones `POST` en `auth/login`. Cuando se recibe una petición, se comprueba si el usuario ya ha iniciado sesión, en ese caso lanza una excepción; en caso contrario inicia sesión al usuario y hace uso de la biblioteca `@nest/jwt` para generar un token identificativo de cada usuario que será usado para identificar al usuario en el resto de peticiones que este va a realizar (se incluyen los eventos enviados a los sockets); este token se envia al cliente para que este lo almacene de manera adecuada. Adicionalmente, añade a la cola de BullMQ una tarea para notificar a los usuarios activos de este inicio de sesión.

* `elements`: Este módulo implementa una "lista" de elementos. Cada elemento se almacena en una BBDD local `mysql` declarada con `TypeORM`. Para interactuar con la lista, el cliente deberá enviar eventos a través de `Socket-io`. Los eventos permiten al cliente solicitar el listado de todos los elementos, actualizar un elemento, eliminar un elemento y añadir un elemento nuevo. A su vez, el servidor emitirá eventos siempre que se realice un cambio en este listado para que el resto de clientes estén al tanto del estado de la lista.

* `email`: Este módulo implementa la funcionalidad de envio de correos. Hace uso de `OAuth2` para iniciar sesión con la cuenta de google que enviará los correos

* `users`: Este módulo se utiliza para monitorizar que usuarios están conectados actualmente, hace uso de los sockets para emitir cuando un usuario se conecta o se desconecta en tiempo real.

## Ejecución

PreRequisitos:
Docker instalado

### 1º Instalar dependencias

Se debe ejecutar el siguiente comando para instalar las dependencias de nodeJS

```
npm i
```

Acto seguido se debe ejecutar abrir otro terminal y ejecutar

```
docker compose up
```

Para configurar y lanzar el container en el que correrá redis (puerto 6379)

### 2º Variables de entorno

Se debe definir el fichero .env con los credenciales pertinentes, se adjunta en el correo.

### 3º Ejecutar el servidor

Con el siguiente comando se ejecuta el servidor

```
npm run start
```
