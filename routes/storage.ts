import express from "express"
import uploadMiddleware from "../utils/handleStorage"
import { createItem } from "../controllers/storage"
//TODO: http://localhost:3000/api/storage

const router = express.Router()

router.post("/", uploadMiddleware.single("myfile") ,createItem)

export default router