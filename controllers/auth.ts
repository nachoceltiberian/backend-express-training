import { Request, Response } from "express";
import { matchedData } from "express-validator";
import { encrypt, comparePasswords } from "../utils/handlePassword";
import models from "../models";
const { userModel } = models;
import { tokenSign } from "../utils/handleJwt";
// import { IUser } from "../models/no-sql/users";


export const registerController = async (req: Request, res: Response) => {
    let body = matchedData(req);
    const password = await encrypt(body.password);
    console.log(`passwordHash=${password}`);
    body = {...req, password};

    const dataUser = await userModel.create(body);
    dataUser.set("password", undefined, { strict: false });

    const data = {
        token: await tokenSign(dataUser),
        data: dataUser
    };

    res.send({ data });
};