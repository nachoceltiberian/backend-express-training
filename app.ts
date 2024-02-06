import express, { Express, Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnectNoSql } from './config/mongo'
import router from "./routes"
import { dbConnectMySql } from './config/mysql'

// Le decimos a la aplicación que use las variables de entorno
dotenv.config()

const PORT = process.env.PORT || 3000
const ENGINE_DB = process.env.ENGINE_DB || "ENGINE_DB"

const app = express()
app.use(cors())
app.use(express.json()) // para recibir posts
app.use(express.static("storage"))

console.log("***** INICIANDO APLICACIÓN *****")

// Aquí invocamos a las rutas
//TODO: localhost/api/___________
app.use("/api", router) 


try { 
    if (ENGINE_DB === "nosql"){
        dbConnectNoSql();
    } else {
        dbConnectMySql();
    }
} catch (err) {
    console.error("Error al conectarse a la BD", err)
} finally {
    app.listen(PORT, () => {
        console.log(`http://localhost:${PORT}`)
    })
}


export default app