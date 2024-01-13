import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import { Evento } from "@/models/Evento";

export const GET = async (req, res) => {
    await connectDB();

    const { searchParams } = new URL(req.url);

    const latitude = searchParams.get("lat")
    const longitude = searchParams.get("lon")

    try {
        let result;
        if(latitude){
            result = await Evento.find({$expr: 
                {
                    $lt: [
                        {
                            $abs: {
                                $substract: [{$toDouble: "$lat"}, { $toDouble: latitude }]
                            }
                        }
                    , 0.2]
                }
            , $expr: 
            {
                $lt: [
                    {
                        $abs: {
                            $subtract: [{$toDouble: "$lon"}, { $toDouble: longitude }]
                        }
                    }
                , 0.2]
            }
        })
        console.log("Aquí estamos mi gente")
        } else {
            console.log("Aquí no estamos mi gente")

            result = await Evento.find();
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