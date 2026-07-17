import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
  try {
    const {name, email, password} = await req.json();

     if (!name || !email || !password)
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });

     connectDB();

     const existing = await User.findOne({email});
     if (existing)
      return NextResponse.json({ error: "Email already in use" }, { status: 409 });

     const hashedPassword = await bcrypt.hash(password, 12);

     await User.create({name, email, password: hashedPassword});

     return NextResponse.json({message: "Account Created", status: 201});
  } catch (error) {
        return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}