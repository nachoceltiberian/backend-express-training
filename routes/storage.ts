import express from "express";
import uploadMiddleware from "../utils/handleStorage";
import { createItem, getItems, getItem, deleteItem } from "../controllers/storage";
import { validatorGetItem } from "../validators/storage";
//TODO: http://localhost:3000/api/storage

const router = express.Router();

/**
 * Lista de items
 */
router.get("/", getItems);

/**
 * Detalle de item
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Eliminar item
 */
router.delete("/:id", validatorGetItem, deleteItem);

/**
 * Crear item
 */
router.post("/", uploadMiddleware.single("myfile"), createItem);

export default router;