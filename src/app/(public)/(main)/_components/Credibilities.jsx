import { BASE_URL } from "@/lib/axios";
import React from "react";
import CardCredibility from "./CardCredibility";

export default async function Credibilities() {
  const response = await fetch(`${BASE_URL}/api/web/home/credibility`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const credibility = data.data;

  return (
    <div className="relative">
      <img
        src="/web/background/line-2.svg"
        alt="Background"
        className="absolute -right-40 -bottom-8 -rotate-12 scale-y-75 h-72 z-0"
      />

      <div className="mt-10 mx-4 lg:mx-auto max-w-5xl">
        <h2
          data-aos="zoom-out-down"
          className="text-primary-cyan font-semibold text-3xl"
        >
          {credibility?.section.title}
        </h2>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-16 text-black mt-12 mb-8">
          {credibility.credibilities.map((credibility, index) => (
            <CardCredibility
              key={credibility.id}
              credibility={credibility}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
