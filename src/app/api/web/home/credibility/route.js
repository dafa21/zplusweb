import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const credibilityFetch = prisma.section.findUnique({
      where: { sectionKey: "credibility" },
      select: {
        image: true,
        title: true,
        description: true,
      },
    });

    const credibilitiesFetch = prisma.credibility.findMany({
      select: {
        id: true,
        total: true,
        description: true,
      },
    });

    const [credibility, credibilities] = await Promise.all([
      credibilityFetch,
      credibilitiesFetch,
    ]);

    if (!credibility) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    const data = {
      section: credibility,
      credibilities,
    };

    return NextResponse.json(generateResponseSuccess({ data }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch credibility section")
    );
  }
}
