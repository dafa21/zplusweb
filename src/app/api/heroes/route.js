import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const heroes = await prisma.hero.findMany();

    return NextResponse.json(generateResponseSuccess({ data: heroes }));
  } catch (error) {
    console.error("GET List Hero Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to fetch list hero")
    );
  }
}

export async function POST(request) {
  try {
    const formData = await request.formData();

    const title = formData.get("title");
    const description = formData.get("description");
    const fileImageDesktop = formData.get("imageDesktop");
    const fileImageMobile = formData.get("imageMobile");

    let imageDesktopUrl = null;
    let imageMobileUrl = null;

    if (fileImageDesktop && fileImageDesktop.size > 0) {
      const filename = await saveFile(fileImageDesktop, "/heroes");
      imageDesktopUrl = `${BASE_URL_UPLOAD}/heroes/${filename}`;
    }
    if (fileImageMobile && fileImageMobile.size > 0) {
      const filename = await saveFile(fileImageMobile, "/heroes");
      imageMobileUrl = `${BASE_URL_UPLOAD}/heroes/${filename}`;
    }

    const hero = await prisma.hero.create({
      data: {
        title,
        description,
        ...(imageDesktopUrl && { imageDesktop: imageDesktopUrl }),
        ...(imageMobileUrl && { imageMobile: imageMobileUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "Hero added successfully",
        data: hero,
      })
    );
  } catch (error) {
    console.error("Add Hero Error:", error);
    return NextResponse.json(generateResponseError("Failed to add hero"), {
      status: 500,
    });
  }
}
