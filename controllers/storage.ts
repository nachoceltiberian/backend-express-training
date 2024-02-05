import { Request, Response } from "express"

import models from '../models';
const { storageModel } = models;
const PUBLIC_URL = process.env.PUBLIC_URL


/**
 * Obtener lista para la BD
 * @param req 
 * @param res 
 */
export const getItems = async (req: Request, res: Response) => {
    const data = await storageModel.find({}).lean().exec();
    res.send({ data });
};


/**
 * Obtener un detalle
 * @param req 
 * @param res 
 */
export const getItem = (req: Request, res: Response) => {

};

/**
 * Insertar un registro
 * @param req 
 * @param res 
 */
export const createItem = async (req: Request, res: Response) => { 
    const { body, file } = req
    // console.log(body)
    
    try {
        const fileData = {
            filename: file?.filename,
            url: `${PUBLIC_URL}/${file?.filename}`
        }
        const data = await storageModel.create(fileData)
        res.send({data})
    } catch (err) {
        console.error("Fallo en storage - createItem: ", err)
    }
};


/**
 * Actualizar un registro
 * @param req 
 * @param res 
 */
export const updateItem = (req: Request, res: Response) => {

};

/**
 * Eliminar un registro
 * @param req 
 * @param res 
 */
export const deleteItem = (req: Request, res: Response) => {

};