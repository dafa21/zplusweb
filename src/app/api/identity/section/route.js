import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { generateDefaultSection } from "@/lib/api/section";
import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";

export async function GET() {
  try {
    const identity = await prisma.information.findUnique({
      where: { sectionKey: "information" },
    });

    if (!identity) {
      return NextResponse.json(
        generateResponseSuccess({ data: generateDefaultSection() })
      );
    }

    return NextResponse.json(generateResponseSuccess({ data: identity }));
  } catch (error) {
    console.error("GET Identity Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch identity section")
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const description = formData.get("description");
    const address = formData.get("address");
    const phone_number = formData.get("phone_number");
    const email = formData.get("email");
    const fileLogo = formData.get("logo");
    const fileFavicon = formData.get("favicon");

    let logoUrl = null;
    let faviconUrl = null;

    if (fileLogo && fileLogo.size > 0) {
      const filename = await saveFile(fileLogo, "/sections");
      logoUrl = `${BASE_URL_UPLOAD}/sections/${filename}`;
    }

    if (fileFavicon && fileFavicon.size > 0) {
      const filename = await saveFile(fileFavicon, "/sections");
      faviconUrl = `${BASE_URL_UPLOAD}/sections/${filename}`;
    }

    const existingIdentity = await prisma.information.findUnique({
      where: { sectionKey: "information" },
    });

    let identity;

    if (existingIdentity) {
      identity = await prisma.information.update({
        where: { sectionKey: "information" },
        data: {
          name,
          description,
          email,
          address,
          phone_number,
          ...(logoUrl && { logo: logoUrl }),
          ...(faviconUrl && { favicon: faviconUrl }),
        },
      });
    } else {
      identity = await prisma.information.create({
        data: {
          sectionKey: "information",
          name,
          description,
          email,
          address,
          phone_number,
          logo: logoUrl,
          favicon: faviconUrl,
        },
      });
    }

    return NextResponse.json(
      generateResponseSuccess({
        message: "Identity section updated",
        data: identity,
      })
    );
  } catch (error) {
    console.error("Save Identity Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save identity section"),
      { status: 500 }
    );
  }
}
