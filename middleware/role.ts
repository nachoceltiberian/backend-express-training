import { Request, Response, NextFunction } from "express";
import { handleHttpError } from "../utils/handleError";



/**
 * 
 * @param roles Array con los roles permitidos
 * @returns 
 */
export const checkRole = (roles: string[]) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = res.locals;
        console.log({ user });
        const rolesByUser = user.role; // Por defecto: ["user"]
        
        // Si al menos uno de los roles que le hemos pasado a "checkRoles" es el del usuario
        const checkValueRole = roles.some((roleSingle) => rolesByUser.includes(roleSingle));
        if (!checkValueRole) {
            handleHttpError(res, "USER_DOESNT_HAVE_PERMISSIONS", 403);
            return;
        }

        next();
    } catch (err) {
        console.error("Error en checkRole - ", err);
        handleHttpError(res, "ERROR_PERMISSIONS", 403);
    }
};