import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const feature = await prisma.feature.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: feature }));
  } catch (error) {
    console.error("GET Feature Error:", error);
    return NextResponse.json(generateResponseError("Failed to fetch feature"));
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
      const filename = await saveFile(file, "/features");
      imageUrl = `${BASE_URL_UPLOAD}/features/${filename}`;
    }

    const feature = await prisma.feature.update({
      where: { id: Number(params.id) },
      data: {
        title,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "feature section updated",
        data: feature,
      })
    );
  } catch (error) {
    console.error("Save Feature Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save feature section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const feature = await prisma.feature.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: feature }));
  } catch (error) {
    console.error("GET Feature Error:", error);
    return NextResponse.json(generateResponseError("Failed to delete feature"));
  }
}
