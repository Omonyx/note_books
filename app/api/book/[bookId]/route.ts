import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import Book from "@/models/Book";
import uid2 from "uid2";

export async function POST(req: NextRequest) {
    await dbConnect();
    try {
        const body = await req.json();
        await Book.create({
            id: uid2(32),
            name: body.name,
            checkList: [],
        });
        return NextResponse.json({ message: "Book successfully created !" }, { status: 201 });
    } catch (err) {
        return NextResponse.json({ message: "Error", error: err }, { status: 400 });
    };
};
export async function GET(req: NextRequest, context: { params: Promise<{ bookId: string }> }) {
    await dbConnect();
    const { bookId } = await context.params;
    const book = await Book.findOne({ id: bookId });
    
    if (!book) return NextResponse.json({ message: "Book isn't registred" }, { status: 404 });
    return NextResponse.json({ message: "Book finded" , data: book }, { status: 201 });
};
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ bookId: string }> }) {
    await dbConnect();
    const { task } = await req.json();
    const { bookId } = await params;
    const taskToUpdate = await Book.findOne({ id: bookId });

    if (!taskToUpdate) {
        return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }
    taskToUpdate.checkList = [...(taskToUpdate.checkList || []), task];
    await taskToUpdate.save();
    return NextResponse.json({ message: "okk" }, { status: 201 });
};
