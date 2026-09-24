import { BASE_URL } from "@/lib/axios";
import React from "react";
import CardFeature from "./CardFeature";

export default async function Features() {
  const response = await fetch(`${BASE_URL}/api/web/home/feature`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const feature = data.data;

  return (
    <div className="mx-4 lg:mx-auto max-w-5xl my-16">
      <h2
        data-aos="zoom-in-up"
        className="text-center text-3xl font-semibold text-primary-cyan"
      >
        {feature?.section.title}
      </h2>
      <div className="flex flex-wrap gap-6 justify-center mt-8">
        {feature?.features.map((feature, index) => (
          <CardFeature key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </div>
  );
}
