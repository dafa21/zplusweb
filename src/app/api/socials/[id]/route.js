import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const social = await prisma.social.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: social }));
  } catch (error) {
    console.error("GET Social Error:", error);
    return NextResponse.json(generateResponseError("Failed to fetch social"));
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { type, value, link } = data;

    const social = await prisma.social.update({
      where: { id: Number(params.id) },
      data: {
        type,
        value,
        ...(link && { link }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "social section updated",
        data: social,
      })
    );
  } catch (error) {
    console.error("Save Social Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save social section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const social = await prisma.social.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: social }));
  } catch (error) {
    console.error("GET Social Error:", error);
    return NextResponse.json(generateResponseError("Failed to delete social"));
  }
}
