import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const testimonies = await prisma.testimony.findMany();

    return NextResponse.json(generateResponseSuccess({ data: testimonies }));
  } catch (error) {
    console.error("GET List Testimony Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list testimony")
    );
  }
}

export async function POST(request) {
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

    const testimony = await prisma.testimony.create({
      data: {
        name,
        description,
        institution,
        ...(imageUrl && { logo: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Testimony added successfully",
        data: testimony,
      })
    );
  } catch (error) {
    console.error("Add Testimony Error:", error);
    return NextResponse.json(generateResponseError("Failed to add testimony"), {
      status: 500,
    });
  }
}
