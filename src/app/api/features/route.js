import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const features = await prisma.feature.findMany();

    return NextResponse.json(generateResponseSuccess({ data: features }));
  } catch (error) {
    console.error("GET List Feature Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list features")
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
      const filename = await saveFile(file, "/features");
      imageUrl = `${BASE_URL_UPLOAD}/features/${filename}`;
    }

    const features = await prisma.feature.create({
      data: {
        title,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Feature added successfully",
        data: features,
      })
    );
  } catch (error) {
    console.error("Add Feature Error:", error);
    return NextResponse.json(generateResponseError("Failed to add features"), {
      status: 500,
    });
  }
}
