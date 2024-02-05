import { Request, Response, NextFunction } from "express"
import { check, validationResult } from "express-validator"
import { validateResults }  from "../utils/handleValidator"

export const validatorCreateItem = [
    check("name")
        .exists()
        .notEmpty(),

    check("album")
        .exists()
        .notEmpty(),

    check("cover")
        .exists()
        .notEmpty(),

    check("artist")
        .exists()
        .notEmpty(),

    check("artist.name")
        .exists()
        .notEmpty(),

    check("artist.nickname")
        .exists()
        .notEmpty(),

    check("artist.nationality")
        .exists()
        .notEmpty(),
        
    check("duration")
        .exists()
        .notEmpty(),
        
    check("duration.start")
        .exists()
        .notEmpty(),
        
    check("duration.end")
        .exists()
        .notEmpty(),
        
    check("mediaId")
        .exists()
        .notEmpty()
        .isMongoId(),

    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next)
    }
];

export const validatorGetItem = [    
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next)
    }
];