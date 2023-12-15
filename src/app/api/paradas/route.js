import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Parada } from "@/models/Parada";

export const GET = async (req, res) => {
    await connectDB();
    const { searchParams } = new URL(req.url);

    const linea = searchParams.get("linea");
    const sentido = searchParams.get("sentido");
    const nombre = searchParams.get("nombre");

    try {
        let result;
        if (!sentido && !linea && !nombre) {
            console.log("QUE PASA")
            result = await Parada.find();
        } else if (sentido && !linea && !nombre) {
            result = await Parada.find({sentido: sentido});
        } else if (linea && !sentido && !nombre) {
            result = await Parada.find({linea: linea});
        } else if(nombre){
            console.log("NO HOLA")
            result = await Parada.find({nombre: nombre});
        } else {
            console.log("Hola")
            result = await Parada.find({linea: linea, sentido: sentido});
        }
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};

export const POST = async (req) => {
    await connectDB();
    try {
        const body = await req.json();
        const newParada = await Parada.create(body);
        return NextResponse.json(newParada, { status: 201 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};