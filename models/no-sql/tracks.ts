import mongoose from "mongoose";

export interface ITrack extends Document {
    name: string;
    album: string;
    cover: string;
    artist: {
        name: string;
        nickname: string;
        nationality: string;
    };
    duration: {
        start: number;
        end: number;
    };
    mediaId: mongoose.Schema.Types.ObjectId;
    deleted: boolean;
};

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

export default mongoose.model<ITrack>('tracks', trackSchema);