import mongoose from "mongoose";

const pagoSchema = new mongoose.Schema(
    {
        concepto:{
            type: String
        },
        importe:{
            type: Number
        },
        email:{
            type: String
        },
        token:{
            type: String
        },
        imagen:{
            type: String
        },
        codPostal:{
            type: String
        },
        lat:{
            type: Number
        },
        lon:{
            type: Number
        }
    },
    {
        timestamps: true,
        versionKey:false
    }
)

export const Pago = 
    mongoose?.models?.pagos || 
    mongoose.model("pagos", pagoSchema)