import mongoose from "mongoose";

type connectionObject = {
    isConnected ?: number
}

const connection: connectionObject = {};

async function dbConnect(): Promise<void> {
    if(connection.isConnected) console.log("Already Connected To DB");
    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || "");
        connection.isConnected = db.connections[0].readyState;
        console.log("DB Connected Successfully.");
    } catch (error) {
        console.log("Connection Failed : ",error);
        process.exit();
    }
    
}
export default dbConnect;