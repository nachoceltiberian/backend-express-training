import { Sequelize } from "sequelize";
import dotenv from "dotenv"
dotenv.config()

const database = process.env.MYSQL_DATABASE;
const username = process.env.MYSQL_USER;
const password = process.env.MYSQL_PASSWORD;
const host     = process.env.MYSQL_HOST;

if (!database || !username || !password || !host) {
    console.log({ database }, { username }, { password }, { host });
    throw new Error("Error en alguno de los parámetros de inicialización de la instancia Sequelize");
}

export const sequelize = new Sequelize(
    database,
    username,
    password,
    {
        host,
        dialect:"mysql"
    }
);

export const dbConnectMySql = async () => {
    try {
        await sequelize.authenticate();
        console.log("MYSQL Conexión correcta");
    } catch (err) {
        console.error("MySQL Error de conexión - ", err);
    }
};