import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.client.findMany();

    return NextResponse.json(generateResponseSuccess({ data: clients }));
  } catch (error) {
    console.error("GET List Client Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list client")
    );
  }
}

export async function POST(request) {
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

    const client = await prisma.client.create({
      data: {
        name,
        projectDescription: description,
        ...(imageUrl && { logo: imageUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Client added successfully",
        data: client,
      })
    );
  } catch (error) {
    console.error("Add Client Error:", error);
    return NextResponse.json(generateResponseError("Failed to add client"), {
      status: 500,
    });
  }
}
