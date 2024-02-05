import { Response } from "express";

export const handleHttpError = (res: Response, message = "Algo sucedió", code = 403) => {
    res.status(code);
    res.send({ error: message });
};