import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const { idFeature } = await params;
    const featureData = await prisma.moduleFeature.findUnique({
      where: { id: Number(idFeature) },
    });

    return NextResponse.json(generateResponseSuccess({ data: featureData }));
  } catch (error) {
    console.error("GET Feature Error:", error);
    return NextResponse.json(generateResponseError("Failed to fetch module"));
  }
}

export async function PUT(request, { params }) {
  try {
    const { idFeature } = await params;
    const formData = await request.formData();

    const description = formData.get("description");
    const file = formData.get("image");

    let imageUrl = null;

    if (file && file.size > 0) {
      const filename = await saveFile(file, "/modules/features");
      imageUrl = `${BASE_URL_UPLOAD}/modules/features/${filename}`;
    }

    const featureData = await prisma.moduleFeature.update({
      where: { id: Number(idFeature) },
      data: {
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Feature section updated",
        data: featureData,
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
    const { idFeature } = await params;
    const featureData = await prisma.moduleFeature.delete({
      where: { id: Number(idFeature) },
    });

    return NextResponse.json(generateResponseSuccess({ data: featureData }));
  } catch (error) {
    console.error("GET Feature Error:", error);
    return NextResponse.json(generateResponseError("Failed to delete feature"));
  }
}
