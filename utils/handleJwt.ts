import jwt, { JwtPayload } from "jsonwebtoken";
import models from "../models/";

const JWT_SECRET = process.env.JWT_SECRET || "falta JWT";

type UserTokenData = { _id: string, role: string };

export type JwtPayloadCustom = ((string | JwtPayload ) & UserTokenData) | null;

/**
 * Debes de pasar el objeto del usuario
 * @param user 
 */
                                // TODO: Esto debería de hacerse de otra forma
export const tokenSign = async (user: UserTokenData) => {
    const sign = jwt.sign(
        {
            _id: user._id,
            role: user.role
        },
        JWT_SECRET,
        {
            expiresIn: "2h"
        }
    );
    

    return sign;
};


/**
 * Debes de pasar el token de sesión (el JWT)
 */
export const verifyToken = async (tokenJwt: string) => {
    try {
        return jwt.verify(tokenJwt, JWT_SECRET) as JwtPayloadCustom;
    } catch (err) {
        return null;
    }
};