import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function GET(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  await dbConnect();
  const { id } = await context.params;
  const user = await User.findOne({ token: id });

  if (!user) return NextResponse.json({ message: "User isn't registred" }, { status: 404 });
  return NextResponse.json({ message: "User finded" , data: user }, { status: 201 });
};
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    await dbConnect();
    const { collectionId, collectionName } = await req.json();
    const { id } = await params;
    const userToUpdate = await User.findOne({ token: id });

    if (!userToUpdate) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    userToUpdate.collections.id = [...(userToUpdate.collections.id || []), collectionId];
    userToUpdate.collections.name = [...(userToUpdate.collections.name || []), collectionName];
    await userToUpdate.save();
    return NextResponse.json({ message: "okk" }, { status: 201 });
};
