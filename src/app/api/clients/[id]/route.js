import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const client = await prisma.client.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: client }));
  } catch (error) {
    console.error("GET Client Error:", error);
    return NextResponse.json(generateResponseError("Failed to fetch client"));
  }
}

export async function PUT(request, { params }) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const file = formData.get("image");

    let imageUrl = null;

    if (file && file.size > 0) {
      const filename = await saveFile(file, "/clients");
      imageUrl = `${BASE_URL_UPLOAD}/clients/${filename}`;
    }

    const client = await prisma.client.update({
      where: { id: Number(params.id) },
      data: {
        name,
        projectDescription: description,
        ...(imageUrl && { logo: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Client section updated",
        data: client,
      })
    );
  } catch (error) {
    console.error("Save Client Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save client section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const client = await prisma.client.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: client }));
  } catch (error) {
    console.error("GET Client Error:", error);
    return NextResponse.json(generateResponseError("Failed to delete client"));
  }
}
