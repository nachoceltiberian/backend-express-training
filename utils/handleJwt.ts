import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
import { getProperties } from "./handlePropertiesEngine";

const propertiesKey = getProperties();
const JWT_SECRET = process.env.JWT_SECRET || "falta JWT";
const ID_KEY = (propertiesKey.id); // ?Preguntar



type UserTokenData = { 
    [key: string]: string | undefined, 
    role: string 
};

export type JwtPayloadCustom = ((string | JwtPayload ) & UserTokenData) | null;

/**
 * Debes de pasar el objeto del usuario
 * @param user 
 */                           
export const tokenSign = async (user: UserTokenData) => {
    const sign = jwt.sign(
        {
            [ID_KEY]: user[ID_KEY],
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