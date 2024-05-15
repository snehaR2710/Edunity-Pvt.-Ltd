import mongoose from "mongoose";

mongoose.set('strictQuery', false);

const connectToDb = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URL}`);
        console.log(`\n MongoDB connected !! DB Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("Mongodb connection Faild", error);
        process.exit(1);
    }
};

export {connectToDb};