import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const clients = await prisma.client.findMany({
      select: {
        id: true,
        logo: true,
        name: true,
        projectDescription: true,
      },
    });

    if (!clients) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: clients }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch testimony section")
    );
  }
}
