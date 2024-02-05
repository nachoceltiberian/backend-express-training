// import { Request, Response } from "express";
import express from "express";
//import { getItems, getItem, createItem, updateItem, deleteItem } from "../controllers/auth";
import { validatorLogin, validatorRegister } from "../validators/auth";
import { registerController } from "../controllers/auth";


// import { customHeader } from "../middleware/customHeader";

const router = express.Router();

/**
 * Crear un registro (item)
 * 
 * localhost:3000/api/auth/login
 * localhost:3000/api/auth/register
 */
router.post("/register", validatorRegister, registerController);


router.post("/login", validatorLogin, (req:any, res:any) => {

});


export default router;