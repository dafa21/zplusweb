import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const moduleData = await prisma.module.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: moduleData }));
  } catch (error) {
    console.error("GET Module Error:", error);
    return NextResponse.json(generateResponseError("Failed to fetch module"));
  }
}

export async function PUT(request, { params }) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const file = formData.get("image");

    let imageUrl = null;

    if (file && file.size > 0) {
      const filename = await saveFile(file, "/modules");
      imageUrl = `${BASE_URL_UPLOAD}/modules/${filename}`;
    }

    const moduleData = await prisma.module.update({
      where: { id: Number(params.id) },
      data: {
        title,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Module section updated",
        data: moduleData,
      })
    );
  } catch (error) {
    console.error("Save Module Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save module section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const moduleData = await prisma.module.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: moduleData }));
  } catch (error) {
    console.error("GET Module Error:", error);
    return NextResponse.json(generateResponseError("Failed to delete module"));
  }
}
