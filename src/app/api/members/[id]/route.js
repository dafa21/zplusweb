import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const member = await prisma.member.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: member }));
  } catch (error) {
    console.error("GET Member Error:", error);
    return NextResponse.json(generateResponseError("Failed to fetch member"));
  }
}

export async function PUT(request, { params }) {
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

    const member = await prisma.member.update({
      where: { id: Number(params.id) },
      data: {
        name,
        role,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Member section updated",
        data: member,
      })
    );
  } catch (error) {
    console.error("Save Member Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save member section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const member = await prisma.member.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: member }));
  } catch (error) {
    console.error("GET Member Error:", error);
    return NextResponse.json(generateResponseError("Failed to delete member"));
  }
}
