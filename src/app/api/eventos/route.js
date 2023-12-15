import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Evento } from "@/models/Evento";

export const GET = async (req, res) => {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const codPostal = searchParams.get("codPostal");

    try {
        let result;
        if(codPostal){
            result = await Evento.find({lugar : codPostal});
        } else {
            result = await Evento.find({});
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
        const newEvento = await Evento.create(body);
        return NextResponse.json(newEvento, { status: 201 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};