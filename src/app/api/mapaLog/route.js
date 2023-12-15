import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { MapaLog } from "@/models/MapaLog";

export const GET = async () => {
    await connectDB();
    try {
        const result = await MapaLog.find().sort({ timestamp: -1 });
        return NextResponse.json(result);
    } catch (error) {
        return NextResponse.json({error: error.message}, {status: 500});
    }
};

export const POST = async (req) => {
    await connectDB();
    try {
        const body = await req.json();
        const newMapaLog = await MapaLog.create(body);
        return NextResponse.json(newMapaLog, { status: 201 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};