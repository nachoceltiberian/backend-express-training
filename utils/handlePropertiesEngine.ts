import dotenv from "dotenv";
dotenv.config();


const ENGINE_DB = process.env.ENGINE_DB;

export const getProperties = () => {
    if (!ENGINE_DB) {
        throw new Error ("ENGINE_DB no definido en el archivo .env");
    }
    const data: { [key: string]: { id: string } } = {
        "nosql": {
            id: "_id"
        },
        "mysql": {
            id: "id"
        },
    }

    return data[ENGINE_DB];
};