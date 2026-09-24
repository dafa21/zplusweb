import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const credibilities = await prisma.credibility.findMany();

    return NextResponse.json(generateResponseSuccess({ data: credibilities }));
  } catch (error) {
    console.error("GET List Credibility Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list credibilities")
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { description, total } = data;

    const credibility = await prisma.credibility.create({
      data: { description, total },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Credibility added successfully",
        data: credibility,
      })
    );
  } catch (error) {
    console.error("Add Credibility Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to add credibility"),
      {
        status: 500,
      }
    );
  }
}
