import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const testimony = await prisma.section.findUnique({
      where: { sectionKey: "testimony" },
    });

    if (!testimony) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: testimony }));
  } catch (error) {
    console.error("GET Testimony Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch testimony section")
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");

    const existingTestimony = await prisma.section.findUnique({
      where: { sectionKey: "testimony" },
    });

    let testimony;

    if (existingTestimony) {
      testimony = await prisma.section.update({
        where: { sectionKey: "testimony" },
        data: { title },
      });
    } else {
      testimony = await prisma.section.create({
        data: {
          sectionKey: "testimony",
          title,
        },
      });
    }

    return NextResponse.json(
      generateResponseSuccess({
        message: "Testimony section updated",
        data: testimony,
      })
    );
  } catch (error) {
    console.error("Save testimony Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save testimony section"),
      { status: 500 }
    );
  }
}
