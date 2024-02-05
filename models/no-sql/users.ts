import mongoose from "mongoose"

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
            type: String
        },
        role:{
            type: ['user','admin'],
            default: 'user'
        }
    },
    {
        timestamp: true, //TODO createdAt,updatedAt
        versionKey: false
    }
)

export default mongoose.model('users', userSchema)