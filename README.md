# SocketIO-Vue3-NestJS-back-end

## Características

Explicar características e implementación (JWT, sockets, mysqlite, oauth2, y bullmq)

Se usa el contenido del JWT para asignar unusuario cuando se crea un elemento y para el logout (saber quien logear pafuera)

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
