import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import dbConnect from './config/mongo'
import router from "./routes"

// Le decimos a la aplicación que use las variables de entorno
dotenv.config()

const port = process.env.PORT || 3000

const app = express()
app.use(cors())
app.use(express.json()) // para recibir posts
app.use(express.static("storage"))

console.log("***** INICIANDO APLICACIÓN *****")

// Aquí invocamos a las rutas
//TODO: localhost/api/___________
app.use("/api", router) 


try { 
    dbConnect()
} catch (err) {
    console.error("Error al conectarse a la BD", err)
} finally {
    app.listen(port, () => {
        console.log(`http://localhost:${port}`)
    })
}


export default app