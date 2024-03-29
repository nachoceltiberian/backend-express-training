// import { Request, Response } from "express";
import express from "express";
import { getItems, getItem, createItem, updateItem, deleteItem } from "../controllers/tracks";
import { validatorCreateItem, validatorGetItem } from "../validators/tracks";
import { authMiddleware } from "../middleware/session";
import { checkRole } from "../middleware/role";
// import { customHeader } from "../middleware/customHeader";

const router = express.Router();

/**
 * Lista los items
 */
router.get("/", authMiddleware, checkRole(["admin"]), getItems);

/**
 * Obtener detalle de item
 */
router.get("/:id", validatorGetItem, getItem);

/**
 * Crear un registro (item)
 */
router.post("/", authMiddleware, checkRole(["admin"]), validatorCreateItem, createItem);

/**
 * Actualizar un registro
 */
router.put("/:id", validatorGetItem, validatorCreateItem, updateItem);

/**
 * Eliminar un registro
 */
router.delete("/:id", validatorGetItem, deleteItem);


export default router;