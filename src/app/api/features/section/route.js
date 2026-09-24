import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const feature = await prisma.section.findUnique({
      where: { sectionKey: "feature" },
    });

    if (!feature) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: feature }));
  } catch (error) {
    console.error("GET Feature Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch feature section")
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");

    const existingFeature = await prisma.section.findUnique({
      where: { sectionKey: "feature" },
    });

    let feature;

    if (existingFeature) {
      feature = await prisma.section.update({
        where: { sectionKey: "feature" },
        data: { title },
      });
    } else {
      feature = await prisma.section.create({
        data: {
          sectionKey: "feature",
          title,
        },
      });
    }

    return NextResponse.json(
      generateResponseSuccess({
        message: "Feature section updated",
        data: feature,
      })
    );
  } catch (error) {
    console.error("Save feature Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save feature section"),
      { status: 500 }
    );
  }
}
