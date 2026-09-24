import React from "react";
import Vision from "./_components/Vision";
import Mission from "./_components/Mission";
import History from "./_components/History";
import Members from "./_components/Members";
import { BASE_URL } from "@/lib/axios";

export default async function AboutUs() {
  const response = await fetch(`${BASE_URL}/api/web/about-us/information`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const information = data.data;

  return (
    <div className="overflow-hidden relative">
      <img
        src="/web/background/line-2.svg"
        alt="Background"
        className="absolute -right-40 top-20 -rotate-12 h-60 z-0"
      />

      <div className="mx-4 lg:mx-auto max-w-5xl mt-40 mb-12 text-center grid md:grid-cols-2 gap-16 md:gap-4">
        <Vision>{information.vision}</Vision>
        <Mission>{information.mission}</Mission>
      </div>
      <History>{information.history}</History>
      <Members />
    </div>
  );
}
