import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Collection from "@/models/Collection";

export async function POST(req: NextRequest) {
    await dbConnect();
    const body = await req.json();
    const collections = await Collection.find({ id: { $in: body.collectionIds } });
        
    if (!collections) return NextResponse.json({ message: "Collections isn't registred" }, { status: 404 });
    return NextResponse.json({ message: "Collections finded" , data: collections }, { status: 201 });
};