import mongoose, { Document } from "mongoose";

export interface IStorage extends Document {
    url: string;
    filename: string;
    deleted: boolean;
};

const storageSchema = new mongoose.Schema(
    {
        url:{
            type: String
        },
        filename:{
            type: String
        },
        deleted:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true, //TODO createdAt, updatedAt
        versionKey: false
    }
)

export default mongoose.model<IStorage>('storages', storageSchema);
