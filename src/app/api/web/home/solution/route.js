import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const solutionFetch = prisma.section.findUnique({
      where: { sectionKey: "solution" },
      select: {
        image: true,
        title: true,
        description: true,
      },
    });

    const solutionsFetch = prisma.solution.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        description: true,
      },
    });

    const [solution, solutions] = await Promise.all([
      solutionFetch,
      solutionsFetch,
    ]);

    if (!solution) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    const data = {
      section: solution,
      solutions,
    };

    return NextResponse.json(generateResponseSuccess({ data }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch solution section")
    );
  }
}
