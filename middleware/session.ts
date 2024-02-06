import { Request, Response, NextFunction } from "express"
import { handleHttpError } from "../utils/handleError"
import { verifyToken } from "../utils/handleJwt";
import models from "../models";
const { userModel } = models;


export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    try {
        if (!req.headers.authorization) { 
            handleHttpError(res,"YOU_NEED_SESSION", 401);
            return;
        }
        
        const token = req.headers.authorization.split(' ')[1] // Bearer **<token>**
        if (!token) {
            handleHttpError(res,"NO_TOKEN", 401);
            return;
        }

        console.log({ token });

        const dataToken = await verifyToken(token);

        console.log({ dataToken });

        // La condición de este if es mejorable, pero yo ahora mismo no se
        if (!('_id' in Object(dataToken))) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }
        const id = Object(dataToken)._id;
        const user = await userModel.findById(id);
        Object(req).user = user;

        next();

    } catch (err) {
        handleHttpError(res, "NO_SESSION", 401);
    }
}