import mongoose from "mongoose"

export interface IUser extends Document {
    name: string;
    age: number;
    email: string;
    password: string;
    role: 'user' | 'admin';
};

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String
        },
        age:{
            type: Number
        },
        email:{
            type: String,
            unique: true
        },
        password:{
            type: String,
            select: false
        },
        role:{
            type: ['user','admin'],
            default: 'user'
        },
        deleted:{
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true, //TODO createdAt,updatedAt
        versionKey: false
    }
)

export default mongoose.model<IUser>('users', userSchema)