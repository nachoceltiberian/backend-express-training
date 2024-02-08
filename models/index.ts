import dotenv from "dotenv";
dotenv.config();
const { ENGINE_DB } = process.env;

const modelsFactory = async () => ({
    userModel: await import((ENGINE_DB === "nosql") ? "./no-sql/users" : "./mysql/users"),
    trackModel: await import((ENGINE_DB === "nosql") ? "./no-sql/tracks" : "./mysql/tracks"),
    storageModel: await import((ENGINE_DB === "nosql") ? "./no-sql/storage" : "./mysql/storage")
});

export default modelsFactory;