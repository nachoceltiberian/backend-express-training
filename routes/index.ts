import express, { Router } from "express"
import fs from "fs" // filesystem
const router = express.Router()

const PATH_ROUTES = __dirname 

const removeExtension = (fileName: string): string | undefined => {
    return fileName.split('.')[0]
}
fs.readdirSync(PATH_ROUTES).filter(async (file) => {
    const name = removeExtension(file)
    if (name !== "index") {
        console.log(`Cargando ruta ${name}`)
        //// router.use(`/${name}`,  require(`./${file}`)) //! el `require` me está dando problemas
        const route: Router = (await import(`./${file}`)).default // Importación dinámica
        router.use(`/${name}`, route)
    }
})

export default router