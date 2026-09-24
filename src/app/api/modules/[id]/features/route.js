import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const { id } = await params;
    const features = await prisma.module.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        moduleFeatures: true,
      },
    });

    return NextResponse.json(
      generateResponseSuccess({ data: features.moduleFeatures })
    );
  } catch (error) {
    console.error("GET List Feature Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list module")
    );
  }
}

export async function POST(request, { params }) {
  try {
    const { id } = await params;
    const formData = await request.formData();

    const description = formData.get("description");
    const file = formData.get("image");

    let imageUrl = null;

    if (file && file.size > 0) {
      const filename = await saveFile(file, "/modules/features");
      imageUrl = `${BASE_URL_UPLOAD}/modules/features/${filename}`;
    }

    const moduleData = await prisma.module.update({
      where: { id: Number(id) },
      data: {
        moduleFeatures: {
          create: {
            description,
            ...(imageUrl && { image: imageUrl }),
          },
        },
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Feature added successfully",
        data: moduleData,
      })
    );
  } catch (error) {
    console.error("Add Feature Error:", error);
    return NextResponse.json(generateResponseError("Failed to add module"), {
      status: 500,
    });
  }
}
