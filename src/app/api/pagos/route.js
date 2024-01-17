import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Pago } from "@/models/Pago";

export const GET = async (req, res) => {
    await connectDB();

    const { searchParams } = new URL(req.url);

    try {
        const result = await Pago.find().sort({timestamp: -1});
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};

export const POST = async (req) => {
    await connectDB();
    try {
        const body = await req.json();
        const newPago = await Pago.create(body);
        return NextResponse.json(newPago, { status: 201 });
    } catch (error) {
        console.log(error)
        return NextResponse.json(null, { status: 500 });
    }
};