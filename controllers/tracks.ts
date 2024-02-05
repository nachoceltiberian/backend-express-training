import { Request, Response } from "express"
import models from '../models';
const { trackModel } = models;
import { handleHttpError } from "../utils/handleError";
import { matchedData } from "express-validator";
// import { ITrack } from '../models/no-sql/tracks';


/**
 * Obtener lista para la BD
 * @param req 
 * @param res 
 */
export const getItems = async (req: Request, res: Response) => {
    try {
        const data = await trackModel.find({}).lean().exec();
        res.send({ data });
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
        const body = matchedData(req);
        const { id } = body;
        const data = await trackModel.findById(id);
        res.send({ data });
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
        const body = matchedData(req)
        const data = await trackModel.create(body)
        res.send({ data })
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
        const data = await trackModel.findOneAndUpdate({ _id: id }, body);
        res.send({ data });
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
        const { id } = matchedData(req);
        const data = await trackModel.deleteOne({ _id: id });
        // TODO: soft delete no funciona con el paquete "mongoose-delete"
        // data = await trackModel.delete({ _id: id }); // soft delete
        res.send({ data });
    } catch (err: any) {
        console.error("Error en el delete", err);
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};