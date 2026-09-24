import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const credibility = await prisma.section.findUnique({
      where: { sectionKey: "credibility" },
    });

    if (!credibility) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: credibility }));
  } catch (error) {
    console.error("GET Feature Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch credibility section")
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { title } = data;

    const existingFeature = await prisma.section.findUnique({
      where: { sectionKey: "credibility" },
    });

    let credibility;

    if (existingFeature) {
      credibility = await prisma.section.update({
        where: { sectionKey: "credibility" },
        data: { title },
      });
    } else {
      credibility = await prisma.section.create({
        data: {
          sectionKey: "credibility",
          title,
        },
      });
    }

    return NextResponse.json(
      generateResponseSuccess({
        message: "Feature section updated",
        data: credibility,
      })
    );
  } catch (error) {
    console.error("Save credibility Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save credibility section"),
      { status: 500 }
    );
  }
}
