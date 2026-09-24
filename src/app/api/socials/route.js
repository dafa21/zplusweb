import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const socials = await prisma.social.findMany();

    return NextResponse.json(generateResponseSuccess({ data: socials }));
  } catch (error) {
    console.error("GET List Social Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list socials")
    );
  }
}

export async function POST(request) {
  try {
    const data = await request.json();
    const { type, value, link } = data;

    const socials = await prisma.social.create({
      data: {
        type,
        value,
        ...(link && { link }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Social added successfully",
        data: socials,
      })
    );
  } catch (error) {
    console.error("Add Social Error:", error);
    return NextResponse.json(generateResponseError("Failed to add socials"), {
      status: 500,
    });
  }
}
