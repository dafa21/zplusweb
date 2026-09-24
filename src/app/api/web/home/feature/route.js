import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const featureFetch = prisma.section.findUnique({
      where: { sectionKey: "feature" },
      select: {
        image: true,
        title: true,
        description: true,
      },
    });

    const featuresFetch = prisma.feature.findMany({
      select: {
        id: true,
        image: true,
        title: true,
        description: true,
      },
    });

    const [feature, features] = await Promise.all([
      featureFetch,
      featuresFetch,
    ]);

    if (!feature) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    const data = {
      section: feature,
      features,
    };

    return NextResponse.json(generateResponseSuccess({ data }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch feature section")
    );
  }
}
