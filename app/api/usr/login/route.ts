import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";
import crypto from "crypto-js";

export async function POST(req: NextRequest) {
    await dbConnect();
    const body = await req.json();
    const user = await User.findOne({ username: body.username });

    if (!user) return NextResponse.json({ message: "User isn't registred" }, { status: 404 });
    if (crypto.SHA256(user.salt + body.password).toString(crypto.enc.Base64) === user.hash) {
        return NextResponse.json({ message: "User finded", data: user }, { status: 201 });
    } else {
        return NextResponse.json({ message: "Wrong password !" }, { status: 401 });
    };
};
