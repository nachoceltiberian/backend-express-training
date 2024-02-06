import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { encrypt, comparePasswords } from "../utils/handlePassword";
import models from "../models";
const { userModel } = models;
import { tokenSign } from "../utils/handleJwt";
import { handleHttpError } from "../utils/handleError";
// import { IUser } from "../models/no-sql/users";

/**
 * Este controlador es el encargado de registar un usuario
 * @param req 
 * @param res 
 */
export const registerController = async (req: Request, res: Response) => {
    try {
        let body = matchedData(req);
        console.log({ req });
        console.log({ body });
        const password = await encrypt(body.password);
        console.log(`passwordHash=${password}`);
        body = {...body, password};

        console.log({ body });

        const dataUser = await userModel.create(body);
        dataUser.set("password", undefined, { strict: false });

        const data = {
            token: await tokenSign(Object(dataUser)),
            data: dataUser
        };

        res.send({ data });
    } catch (err) {
        console.error("Error en registerController - ", err);
        handleHttpError(res, "ERROR_REGISTER_USER");
    }
};

/**
 * Este controlador es el encargado de logear a una persona
 * @param req 
 * @param res 
 */
export const loginController = async (req: Request, res: Response) => { 
    try{
        let body = matchedData(req);
        const user = await userModel.findOne({ email: body.email }).select("password");
        console.log({body})
        console.log({user})

        const users = await userModel.find({}).lean().exec();
        console.log({ users });
        
        if (!user) {
            handleHttpError(res, "USER_DOESNT_EXIST", 404);
            return;
        }

        const hashPassword = user.password;
        const check = await comparePasswords(body.password, hashPassword);

        if (!check) {
            handleHttpError(res, "INVALID_PASSWORD", 401);
            return;
        }

        user.set("password", undefined, {strict:false});

        const data = {
            token: await tokenSign(Object(user)), //min 4:23:38 
            user
        };

        res.send({ data });

    } catch (err) {
        console.error("Error en loginController - ", err);
        handleHttpError(res, "ERROR_LOGIN_USER");
    }
};