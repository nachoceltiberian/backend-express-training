# Backend con Express y Node.js usando TypeScript

## Instalación

```bash
npm init --y

npm i express typescript cors dotenv multer mongoose express-validator jsonwebtoken bcrypt-ts -S
npm i -D @types/express @types/node @types/cors @types/mongoose @types/multer @types/jsonwebtoken
npm i nodemon -g


npx tsc --init
```

## Ejecución

```bash
npx ts-node app.ts
```

> [!NOTE] 
> Con nodemon podemos usar el siguiente comando, ya que hemos añadido a `package.json` el script `dev` y `start`
> ```bash
> npm run dev
> ```

## Scaffolding (MVC)

```bash
mkdir models routes controllers # MVC

# A lo largo del proyecto vamos a utilizar diferentes configuraciones,
# para la base de datos, algún paquete de terceros, etc.
mkdir config 

# Almanecar funciones 'helpers'
mkdir utils

# Como vamos a poder cargar archivos, vamos a almacenarlos aquí
mkdir storage
```

## Estados HTTP 

Los más usados son:

- **2XX: Success** (la petición realizada fue exitosa)
  - 200 OK
  - 201 Created
- **4XX: Client Error**
  - 404 Not Found
  - 403 Forbidden
  - 401 Unauthorized
- **5XX: Server Error**
  - 500 Internal Server Error
  - 502 Bad Gateway (el enrutador no pudo solucionar tu petición)
  - 503 Service Unavailable
  - 504 Gateway Timeout (se excedió el tiempo límite para esa petición)