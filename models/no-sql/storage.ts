import mongoose from "mongoose"

const storageSchema = new mongoose.Schema(
    {
        url:{
            type: String
        },
        filename:{
            type: String
        },
    },
    {
        timestamp: true, //TODO createdAt, updatedAt
        versionKey: false
    }
)

export default mongoose.model('storages', storageSchema)