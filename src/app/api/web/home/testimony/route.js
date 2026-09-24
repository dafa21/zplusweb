import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const testimonyFetch = prisma.section.findUnique({
      where: { sectionKey: "testimony" },
      select: {
        image: true,
        title: true,
        description: true,
      },
    });

    const testimoniesFetch = prisma.testimony.findMany({
      select: {
        id: true,
        logo: true,
        name: true,
        description: true,
        institution: true,
      },
    });

    const [testimony, testimonies] = await Promise.all([
      testimonyFetch,
      testimoniesFetch,
    ]);

    if (!testimony) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    const data = {
      section: testimony,
      testimonies,
    };

    return NextResponse.json(generateResponseSuccess({ data }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch testimony section")
    );
  }
}
