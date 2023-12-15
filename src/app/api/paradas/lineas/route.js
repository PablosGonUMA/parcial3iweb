import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Parada } from "@/models/Parada";

export const GET = async (req, res) => {
    await connectDB();
    try {
        const result = await Parada.find({},'linea');
        return NextResponse.json(result.map((parada) => parada.linea), {status: 200});
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};
