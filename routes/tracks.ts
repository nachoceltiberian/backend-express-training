// import { Request, Response } from "express";
import express from "express";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../controllers/tracks";
import { validatorCreateItem, validatorGetItem } from "../validators/tracks";
import { authMiddleware } from "../middleware/session";
// import { customHeader } from "../middleware/customHeader";

const router = express.Router();

/**
 * Lista los items
 */
router.get("/", authMiddleware, getItems);

/**
 * Obtener detalle de item
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Crear un registro (item)
 */
router.post("/", validatorCreateItem, createItem);

/**
 * Actualizar un registro
 */
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);

/**
 * Eliminar un registro
 */
router.delete("/:id", validatorGetItem, deleteItem);


export default router;