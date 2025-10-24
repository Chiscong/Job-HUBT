import mongoose from "mongoose";
const Schema = new mongoose.Schema(
    {
        name: String,
    }
);
const City = mongoose.model('City', Schema, "cities");

export default City;