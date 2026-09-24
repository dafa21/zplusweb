import { BASE_URL_UPLOAD, saveFile } from "@/lib/api/file";
import {
  generateResponseError,
  generateResponseSuccess,
} from "@/lib/api/general";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(_, { params }) {
  try {
    const hero = await prisma.hero.findUnique({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: hero }));
  } catch (error) {
    console.error("GET hero Error:", error);
    return NextResponse.json(generateResponseError("Failed to fetch hero"));
  }
}

export async function PUT(request, { params }) {
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

    const hero = await prisma.hero.update({
      where: { id: Number(params.id) },
      data: {
        title,
        description,
        ...(imageDesktopUrl && { imageDesktop: imageDesktopUrl }),
        ...(imageMobileUrl && { imageMobile: imageMobileUrl }),
      },
    });

    return NextResponse.json(
      generateResponseSuccess({
        message: "hero section updated",
        data: hero,
      })
    );
  } catch (error) {
    console.error("Save hero Error:", error);
    return NextResponse.json(
      generateResponseError("Failed to save hero section"),
      { status: 500 }
    );
  }
}

export async function DELETE(_, { params }) {
  try {
    const hero = await prisma.hero.delete({
      where: { id: Number(params.id) },
    });

    return NextResponse.json(generateResponseSuccess({ data: hero }));
  } catch (error) {
    console.error("GET hero Error:", error);
    return NextResponse.json(generateResponseError("Failed to delete hero"));
  }
}
