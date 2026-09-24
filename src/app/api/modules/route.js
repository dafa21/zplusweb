import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const modules = await prisma.module.findMany({
      select: {
        id: true,
        title: true,
        description: true,
        image: true,
        moduleFeatures: {
          select: {
            description: true,
          },
        },
      },
    });

    return NextResponse.json(generateResponseSuccess({ data: modules }));
  } catch (error) {
    console.error("GET List Module Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list module")
    );
  }
}

export async function POST(request) {
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

    const moduleData = await prisma.module.create({
      data: {
        title,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Module added successfully",
        data: moduleData,
      })
    );
  } catch (error) {
    console.error("Add Module Error:", error);
    return NextResponse.json(generateResponseError("Failed to add module"), {
      status: 500,
    });
  }
}
