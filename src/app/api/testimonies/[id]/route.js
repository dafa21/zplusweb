import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const testimony = await prisma.testimony.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: testimony }));
  } catch (error) {
    console.error("GET Testimony Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch testimony")
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const institution = formData.get("institution");
    const file = formData.get("image");

    let imageUrl = null;

    if (file && file.size > 0) {
      const filename = await saveFile(file, "/testimonies");
      imageUrl = `${BASE_URL_UPLOAD}/testimonies/${filename}`;
    }

    const testimony = await prisma.testimony.update({
      where: { id: Number(params.id) },
      data: {
        name,
        description,
        institution,
        ...(imageUrl && { logo: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Testimony section updated",
        data: testimony,
      })
    );
  } catch (error) {
    console.error("Save Testimony Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save testimony section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const testimony = await prisma.testimony.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: testimony }));
  } catch (error) {
    console.error("GET Testimony Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to delete testimony")
    );
  }
}
