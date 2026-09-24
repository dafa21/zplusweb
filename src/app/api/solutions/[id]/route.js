import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const solution = await prisma.solution.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: solution }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(generateResponseError("Failed to fetch solution"));
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
      const filename = await saveFile(file, "/solutions");
      imageUrl = `${BASE_URL_UPLOAD}/solutions/${filename}`;
    }

    const solution = await prisma.solution.update({
      where: { id: Number(params.id) },
      data: {
        title,
        description,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Solution section updated",
        data: solution,
      })
    );
  } catch (error) {
    console.error("Save Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save solution section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const solution = await prisma.solution.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: solution }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to delete solution")
    );
  }
}
