import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema(
    {
        nombre:{
            type: String,
            required: [true]
        },
        lugar:{
            type: Number,
            required: [true]
        },
        lon:{
            type: Number,
            required: [true]
        },
        lat:{
            type: Number,
            required: [true]
        },
        organizador:{
            type: String,
            required: [true]
        },
        imagen:{
            type: String,
            required: [true]
        }
    },
    {
        timestamps: true,
        versionKey:false
    }
)

export const Evento = 
    mongoose?.models?.eventos || 
    mongoose.model("eventos", eventoSchema)