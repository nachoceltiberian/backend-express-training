import fs from "fs";
import { Request, Response } from "express";
import models from '../models';
import { handleHttpError } from "../utils/handleError";
import { matchedData } from "express-validator";
import { IStorage } from "../models/no-sql/storage";

const { storageModel } = models;
const PUBLIC_URL = process.env.PUBLIC_URL;
const MEDIA_PATH = `${__dirname}/../storage`;

/**
 * Obtener lista para la BD
 * @param req 
 * @param res 
 */
export const getItems = async (req: Request, res: Response) => {
    try{
        const data = await storageModel.find({}).lean().exec();
        res.send({ data });
    } catch (err) {
        console.error("Error en GET_ITEMS", err);
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
        const file = await storageModel.findById(id);
        console.log({file});

        if (!file) {
            // return res.status(404).send({ error: 'Archivo no encontrado.' });

            const errorMessage = "FILE_NOTE_FOUND"
            handleHttpError(res, errorMessage, 404);
            return;
        }

        // Verifica si el documento ya ha sido eliminado
        if (file.deleted) {
            // return res.status(401).send({ error: 'Este archivo ha sido eliminado suavemente.' });
            const errorMessage = "ALREADY_SOFT_DELETED"
            handleHttpError(res, errorMessage, 401);
            return;
        }
        res.send({ file });
    } catch (err) {
        console.error("Error en GET_ITEM", err);
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
        const { body, file } = req;
        // console.log(body)

        if (!file) {
            const errorMessage = "FILE_NOTE_FOUND"
            handleHttpError(res, errorMessage, 404);
            return;
        }

        const fileData = {
            filename: file.filename,
            url: `${PUBLIC_URL}/${file.filename}`
        }

        const data = await storageModel.create(fileData);
        res.send({data});
    } catch (err) {
        console.error("Error en CREATE_ITEM", err);
        handleHttpError(res, "ERROR_CREATE_ITEM");
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
        
        const file = await storageModel.findById(id) as IStorage;
        console.log({file});

        const { filename } = file;

        const filePath = `${MEDIA_PATH}/${filename}`;

        if (!file) {
            //return res.status(404).send({ error: 'Elemento no encontrado.' });

            const errorMessage = "FILE_NOT_FOUND"
            handleHttpError(res, errorMessage, 404);
            return;
        }

        let data = {};

        if (req.query.hard === "true") {
            data = await storageModel.deleteOne({ _id: id });
            fs.unlinkSync(filePath);
        } else {
            if (file.deleted) {
                // return res.status(401).send({ error: 'Este elemento ya ha sido eliminado suavemente.' });

                const errorMessage = "ALREADY_SOFT_DELETED"
                handleHttpError(res, errorMessage, 401);
                return;
            }
            data = await file.updateOne({ deleted: true});    
        }
    
        res.send({ data });
    } catch (err) {
        console.error("Error en DELETE_ITEM", err);
        handleHttpError(res, "ERROR_DELETE_ITEM");
    }
};