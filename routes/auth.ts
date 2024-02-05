// import { Request, Response } from "express";
import express from "express";
//import { getItems, getItem, createItem, updateItem, deleteItem } from "../controllers/auth";
import { validatorLogin, validatorRegister } from "../validators/auth";
import { matchedData } from "express-validator";
import { encrypt, comparePasswords } from "../utils/handlePassword";
import models from "../models";
const { userModel } = models;
import { IUser } from "../models/no-sql/users";

// import { customHeader } from "../middleware/customHeader";

const router = express.Router();

/**
 * Crear un registro (item)
 * 
 * localhost:3000/api/auth/login
 * localhost:3000/api/auth/register
 */
router.post("/register", validatorRegister, async (req:any, res:any) => {
    req = matchedData(req);
    const password = await encrypt(req.password);
    console.log(`passwordHash=${password}`);
    const body = {...req, password};
    const data = await userModel.create(body);
    data.set("password", undefined, { strict: false });
    res.send({ data });
});


router.post("/login", validatorLogin, (req:any, res:any) => {

});


export default router;