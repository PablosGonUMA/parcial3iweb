import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Pago } from "@/models/Pago";

export const GET = async (request, { params }) => {
    await connectDB();
    const id = params.id;
    try {
        const result = await Pago.findById(id);
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado una parada con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
  };

export const DELETE = async (request, { params }) => {
    await connectDB();
    const id = params.id;
    try {
        const result = await Pago.findByIdAndDelete(id);
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado una parada con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    await connectDB();
    const id = params.id;
    const body = await request.json();
    try {
        const result = await Pago.findByIdAndUpdate(id, { $set: { ...body } }, { new: true })
        if (!result) {
            return NextResponse.json(
                { message: `No se ha encontrado una parada con ID ${id}.` },
                { status: 404 }
            );
        }
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json(null, { status: 500 });
    }
};