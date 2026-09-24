import { prisma } from "@/lib/prisma";
import jwt from "jsonwebtoken";
import { verifyPassword } from "@/lib/auth";
import { NextResponse } from "next/server";

const SECRET = process.env.JWT_SECRET;

export async function POST(request) {
  const data = await request.json();
  const { username, password } = data;

  // find user in database
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 400 });
  }

  const isMatch = await verifyPassword(password, user.password);
  if (!isMatch) {
    return NextResponse.json(
      { message: "Invalid credentials" },
      { status: 400 }
    );
  }

  const token = jwt.sign({ id: user.id, email: user.email }, SECRET, {
    expiresIn: "1d",
  });

  return NextResponse.json({ token });
}
