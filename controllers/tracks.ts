import { Request, Response } from "express"
import models from '../models';
import modelsFactory from "../models";
import { handleHttpError } from "../utils/handleError";
import { matchedData } from "express-validator";
import { ITrack } from "../models/no-sql/tracks";
// import { ITrack } from '../models/no-sql/tracks';


/**
 * Obtener lista para la BD
 * @param req 
 * @param res 
 */
export const getItems = async (req: Request, res: Response) => {
    try {
        const { user } = Object(req);
        const { trackModel } = await modelsFactory();
        const tracks = await trackModel.find({}).lean().exec();
        res.send({ tracks, user });
    } catch (err: any) {
        handleHttpError(res, "ERROR_GET_ITEMS");
    }
};


/**
 * Obtener un detalle
 * @param req 
 * @param res 
 */
export const getItem = async (req: Request, res: Response) => {
    try {
        const { id } = matchedData(req);
        const { trackModel } = await modelsFactory();
        const track = await trackModel.findOne({ id: id }) as ITrack;

        if (!track) {
            return res.status(404).send({ error: 'Track no encontrado.' });
        }

        // Verifica si el documento ya ha sido eliminado
        if (track.deleted) {
            return res.status(401).send({ error: 'Este track ha sido eliminado suavemente.' });
        }
        res.send({ track });
    } catch (err) {
        handleHttpError(res, "ERROR_GET_ITEM");
    }
};

/**
 * Insertar un registro
 * @param req 
 * @param res 
 */
export const createItem = async (req: Request, res: Response) => {
    try {
        const body = matchedData(req);
        const { trackModel } = await modelsFactory();
        const track = await trackModel.create(body) as ITrack
        res.send({ track })
    } catch (err: any) {
        handleHttpError(res, "ERROR_CREATE_ITEMS");
    }
};


/**
 * Actualizar un registro
 * @param req 
 * @param res 
 */
export const updateItem = async (req: Request, res: Response) => {
    try {
        const { id, ...body } = matchedData(req);
        const { trackModel } = await modelsFactory();
        const track = await trackModel.findOneAndUpdate({ _id: id }, body);
        res.send({ track });
    } catch (err: any) {
        console.error("Error en el update", err);
        handleHttpError(res, "ERROR_UPDATE_ITEM");
    }
};

/**
 * Eliminar un registro
 * @param req 
 * @param res 
 */
export const deleteItem = async (req: Request, res: Response) => {
    try {
        const body = matchedData(req);
        const { id, deleted } = body;
        
        const { trackModel } = await modelsFactory();
        const track = await trackModel.findById(id);

        if (!track) {
            return res.status(404).send({ error: 'Elemento no encontrado.' });
        }

        let data = {};

        if (req.query.hard === "true") {
            data = await trackModel.deleteOne({ _id: id });
        } else {
            if (track.deleted) {
                return res.status(401).send({ error: 'Este elemento ya ha sido eliminado suavemente.' });
            }
            data = await track.updateOne({ deleted: true});    
        }
    
        res.send({ data });
    } catch (err: any) {
        console.error("Error en el delete", err);
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};