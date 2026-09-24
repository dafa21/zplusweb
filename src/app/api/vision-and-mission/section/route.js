import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const information = await prisma.information.findUnique({
      where: { sectionKey: "information" },
    });

    if (!information) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: information }));
  } catch (error) {
    console.error("GET Information Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch vision and mission")
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { vision, mission } = data;

    const existingInformation = await prisma.information.findUnique({
      where: { sectionKey: "information" },
    });

    let information;

    if (existingInformation) {
      information = await prisma.information.update({
        where: { sectionKey: "information" },
        data: {
          vision,
          mission,
        },
      });
    } else {
      information = await prisma.information.create({
        data: {
          sectionKey: "information",
          vision,
          mission,
          history: "",
        },
      });
    }

    return NextResponse.json(
      generateResponseSuccess({
        message: "Vision and Mission section updated",
        data: information,
      })
    );
  } catch (error) {
    console.error("Save Vision and Mission Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save information section"),
      { status: 500 }
    );
  }
}
