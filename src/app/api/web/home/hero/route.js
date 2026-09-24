import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const heroes = await prisma.hero.findMany({
      select: {
        id: true,
        imageDesktop: true,
        imageMobile: true,
        title: true,
        description: true,
      },
    });

    if (!heroes) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: heroes }));
  } catch (error) {
    console.error("GET Hero Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch hero section")
    );
  }
}
