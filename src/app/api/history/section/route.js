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
    return NextResponse.json(generateResponseError("Failed to fetch history"));
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { history } = data;

    const existingInformation = await prisma.information.findUnique({
      where: { sectionKey: "information" },
    });

    let information;

    if (existingInformation) {
      information = await prisma.information.update({
        where: { sectionKey: "information" },
        data: { history },
      });
    } else {
      information = await prisma.information.create({
        data: {
          sectionKey: "information",
          history,
          vision: "",
          mission: "",
        },
      });
    }

    return NextResponse.json(
      generateResponseSuccess({
        message: "History section updated",
        data: information,
      })
    );
  } catch (error) {
    console.error("Save History Error:", error);
    return NextResponse.json(generateResponseError("Failed to save history"), {
      status: 500,
    });
  }
}
