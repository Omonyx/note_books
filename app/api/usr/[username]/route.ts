import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto-js";
import uid2 from "uid2";

export async function POST(req: NextRequest) {
  await dbConnect();
  try {
    const body = await req.json()
    const token = uid2(64);
    const salt = uid2(32);
    const hash = crypto.SHA256(salt + body.password).toString(crypto.enc.Base64);
    await User.create({
        username: body.username,
        email: body.email,
        collections: { id: [], name: [] },
        token,
        salt,
        hash,
    });
    return NextResponse.json({ message: "User successfully created !" }, { status: 201 });
  } catch (err) {
    return NextResponse.json({ message: "Username or email is alredy used !", error: err }, { status: 400 });
  };
};
export async function GET(req: NextRequest, context: { params: Promise<{ username: string }> }) {
  await dbConnect();
  const { username } = await context.params;
  const user = await User.findOne({ username: username });

  if (!user) return NextResponse.json({ message: "User isn't registred" }, { status: 404 });
  return NextResponse.json({ message: "User finded" , data: user }, { status: 201 });
};
