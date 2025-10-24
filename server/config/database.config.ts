import mongoose from "mongoose";
export const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.DATABASE}` || '');
        console.log('Connected to MongoDB');
    } catch (error) {
        console.log(error);
        console.log('Failed to connect to MongoDB');
    }
}