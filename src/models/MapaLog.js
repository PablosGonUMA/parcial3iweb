import mongoose from "mongoose";

const mapaLogSchema = new mongoose.Schema({
    user: { type: String, required: true },
    accion: { type: String },
}, {
    timestamps: true,
    versionKey:false
});

export const MapaLog = mongoose?.models?.mapaLog || mongoose.model("mapaLog", mapaLogSchema)