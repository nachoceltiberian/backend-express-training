import mongoose from "mongoose";

const trackSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        album:{
            type: String
        },
        cover:{
            type: String,
            validate:{
                validator: (req: string | undefined | null) => {
                    return true
                },
                message: "ERROR_URL"
            }
        },
        artist:{
            name:{
                type: String
            },
            nickname:{
                type: String
            },
            nationality:{
                type: String
            }
        },
        duration:{
            start:{
                type: Number
            },
            end:{
                type: Number
            }
        },
        mediaId:{
            type: mongoose.Schema.Types.ObjectId // anteriormente mongoose.Schema.ObjectId
        },
        deleted:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true, // createdAt, updatedAt
        versionKey: false
    }
);

export default mongoose.model('tracks', trackSchema);