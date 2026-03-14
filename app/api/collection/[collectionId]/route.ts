import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Collection from "@/models/Collection";
import uid2 from "uid2";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        const idCollection = uid2(32);
        await Collection.create({
            id: idCollection,
            name: body.name,
            pageListUnchecked: [],
            pageListChecked: [],
        });
        return NextResponse.json({ message: "Collection successfully created !", id: idCollection }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", error: err }, { status: 400 });
    };
};
export async function GET(req: NextRequest, context: { params: Promise<{ collectionId: string }> }) {
    await dbConnect();
    const { collectionId } = await context.params;
    const collection = await Collection.findOne({ id: collectionId });
    
    if (!collection) return NextResponse.json({ message: "Collection isn't registred" }, { status: 404 });
    return NextResponse.json({ message: "Collection finded" , data: collection }, { status: 201 });
};
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ collectionId: string }> }) {
    await dbConnect();
    const { check, uncheck } = await req.json();
    const { collectionId } = await params;
    const taskToUpdate = await Collection.findOne({ id: collectionId });

    if (!taskToUpdate) {
        return NextResponse.json({ error: "Collection not found" }, { status: 404 });
    }
    taskToUpdate.pageListChecked = check;
    taskToUpdate.pageListUnchecked = uncheck;
    await taskToUpdate.save();
    return NextResponse.json({ message: "Task added" }, { status: 201 });
};
