import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const solutions = await prisma.solution.findMany();

    return NextResponse.json(generateResponseSuccess({ data: solutions }));
  } catch (error) {
    console.error("GET List Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list solution")
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
      const filename = await saveFile(file, "/solutions");
      imageUrl = `${BASE_URL_UPLOAD}/solutions/${filename}`;
    }

    const solution = await prisma.solution.create({
      data: {
        title,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Solution added successfully",
        data: solution,
      })
    );
  } catch (error) {
    console.error("Add Solution Error:", error);
    return NextResponse.json(generateResponseError("Failed to add solution"), {
      status: 500,
    });
  }
}
