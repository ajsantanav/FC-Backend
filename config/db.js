import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI)
        mongoose.connection.once("open", () => {
            console.log("Connected to MongoDB")
        });
    }
    catch (err) {
        console.log(`Cannot connect to the DB ${err}` )
    }
}
export default connect;