import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";

export async function GET() {
  try {
    const members = await prisma.member.findMany({
      select: {
        id: true,
        image: true,
        name: true,
        role: true,
      },
    });

    if (!members) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: members }));
  } catch (error) {
    console.error("GET Solution Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch testimony section")
    );
  }
}
