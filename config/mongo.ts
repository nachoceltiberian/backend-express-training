import mongoose, { ConnectOptions } from 'mongoose'

const dbConnect = async () => {
    const DB_URI = 'mongodb+srv://nacho:H2EJO2B5LzJRHIGM@cluster0.fgjnhvc.mongodb.net/?retryWrites=true&w=majority'
    const clientOptions: ConnectOptions = {}

    try {
        await mongoose.connect(DB_URI, clientOptions)
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error("Fallo al conectarse a la base de datos", err)
    }
}

export default dbConnect