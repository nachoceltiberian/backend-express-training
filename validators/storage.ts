import { Request, Response, NextFunction } from "express"
import { check, validationResult } from "express-validator"
import { validateResults }  from "../utils/handleValidator"

// No lo necesitamos porque estamos haciendo uso del middleware de multer
// export const validatorCreateItem = [ ];

export const validatorGetItem = [    
    check("id")
        .exists()
        .notEmpty()
        .isMongoId(),
    (req: Request, res: Response, next: NextFunction) => {
        return validateResults(req, res, next)
    }
];