import { Request, Response, NextFunction } from "express"
import { handleHttpError } from "../utils/handleError"
import { JwtPayloadCustom, verifyToken } from "../utils/handleJwt";
import models from "../models";
import { JwtPayload } from "jsonwebtoken";
const { userModel } = models;

// interface RequestWithUser extends Request {
//     user: any;
// }

// TODO: Hacer que a la petición se le pueda añadir un atributo "user"
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

        const dataToken: JwtPayloadCustom = await verifyToken(token);

        console.log({ dataToken });

        if (!dataToken) {
            handleHttpError(res, "ERROR_TOKEN", 401);
            return;
        }

        if (!dataToken._id) {
            handleHttpError(res, "ERROR_ID_TOKEN", 401);
            return;
        }
        
        const user = await userModel.findById(dataToken._id);
        Object(req).user = user;

        next();

    } catch (err) {
        handleHttpError(res, "NO_SESSION", 401);
    }
}