import { Request, Response, NextFunction } from "express";

export const customHeader = (req: Request, res: Response, next: NextFunction) => {
    try {
        const apiKey = req.headers.api_key;
        if (apiKey === "leifer-01") {
            next();
        } else {
            res.status(403);
            res.send({error: "API_KEY_NO_ES_CORRECTA"});
        }
    } catch (err) {
        res.status(403);
        res.send({error: "ALGO_OCURRIÓ_CON_EL_CUSTOM_HEADER"});
    }
}