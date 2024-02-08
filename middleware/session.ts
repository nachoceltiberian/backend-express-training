import { Request, Response, NextFunction } from "express"
import { handleHttpError } from "../utils/handleError"
import { JwtPayloadCustom, verifyToken } from "../utils/handleJwt";
import modelsFactory from "../models";

import { getProperties } from "../utils/handlePropertiesEngine";

const propertiesKey = getProperties();

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
        
        const query = {
            [propertiesKey.id]: dataToken[propertiesKey.id]
        };

        const { userModel } = await modelsFactory();
        const user = await userModel.findOne(query);
        // const user = await userModel.findById(dataToken[ID_KEY]);
        // Object(req).user = user;

        res.locals.user = user;


        next();

    } catch (err) {
        handleHttpError(res, "NO_SESSION", 401);
    }
}