import mongoose from "mongoose";

const paradaSchema = new mongoose.Schema(
    {
        linea:{
            type: String,
            required: [true]
        },
        sentido:{
            type: Number,
            required: [true]
        },
        nombreParada:{
            type: String,
            required: [true]
        },
        lon:{
            type: String,
            required: [true]
        },
        lat:{
            type: String,
            required: [true]
        }
    },
    {
        timestamps: false,
        versionKey:false
    }
)

export const Parada = 
    mongoose?.models?.paradas || 
    mongoose.model("paradas", paradaSchema)