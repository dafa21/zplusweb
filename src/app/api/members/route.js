import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const members = await prisma.member.findMany();

    return NextResponse.json(generateResponseSuccess({ data: members }));
  } catch (error) {
    console.error("GET List Member Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list member")
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const role = formData.get("role");
    const file = formData.get("image");

    let imageUrl = null;

    if (file && file.size > 0) {
      const filename = await saveFile(file, "/members");
      imageUrl = `${BASE_URL_UPLOAD}/members/${filename}`;
    }

    const member = await prisma.member.create({
      data: {
        name,
        role,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Member added successfully",
        data: member,
      })
    );
  } catch (error) {
    console.error("Add Member Error:", error);
    return NextResponse.json(generateResponseError("Failed to add member"), {
      status: 500,
    });
  }
}
