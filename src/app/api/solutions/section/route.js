import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const solution = await prisma.section.findUnique({
      where: { sectionKey: "solution" },
    });

    if (!solution) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: solution }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch solution section")
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");

    const existingSolution = await prisma.section.findUnique({
      where: { sectionKey: "solution" },
    });

    let solution;

    if (existingSolution) {
      solution = await prisma.section.update({
        where: { sectionKey: "solution" },
        data: { title },
      });
    } else {
      solution = await prisma.section.create({
        data: {
          sectionKey: "solution",
          title,
        },
      });
    }

    return NextResponse.json(
      generateResponseSuccess({
        message: "Solution section updated",
        data: solution,
      })
    );
  } catch (error) {
    console.error("Save solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save solution section"),
      { status: 500 }
    );
  }
}
