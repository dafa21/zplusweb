import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const credibility = await prisma.credibility.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: credibility }));
  } catch (error) {
    console.error("GET Credibility Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch credibility")
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const data = await request.json();
    const { total, description } = data;

    const credibility = await prisma.credibility.update({
      where: { id: Number(params.id) },
      data: { total, description },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "credibility section updated",
        data: credibility,
      })
    );
  } catch (error) {
    console.error("Save Credibility Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save credibility section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const credibility = await prisma.credibility.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: credibility }));
  } catch (error) {
    console.error("GET Credibility Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to delete credibility")
    );
  }
}
