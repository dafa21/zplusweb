import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const identity = await prisma.information.findUnique({
      where: { sectionKey: "information" },
    });

    if (!identity) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: identity }));
  } catch (error) {
    console.error("GET Identity Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch identity section")
    );
  }
}
