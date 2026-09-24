import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const social = await prisma.social.findMany();

    if (!social) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: social }));
  } catch (error) {
    console.error("GET Identity Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch social section")
    );
  }
}
