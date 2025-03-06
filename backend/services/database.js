import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const uri = process.env.MONGO_URI;


const connection = async () => {
    try{
        await mongoose.connect(uri);
        console.log("Conectado a MongoDB");
    }catch(error){
        console.log("Error conectando a MongoDB:", error);
        process.exit(1);
    }
}

export default connection;