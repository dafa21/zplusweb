import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const clients = await prisma.client.findMany();

    return NextResponse.json(generateResponseSuccess({ data: clients }));
  } catch (error) {
    console.error("GET List Client Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list client")
    );
  }
}
