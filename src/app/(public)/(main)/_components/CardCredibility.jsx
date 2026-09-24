"use client";

import useResponsive from "@/store/use-responsive";
import Count from "./Count";

export default function CardCredibility({ credibility, index }) {
  const { isMobile } = useResponsive();

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={isMobile ? 0 : index * 300}
      className="space-y-5"
    >
      <div className="flex items-end">
        <Count value={credibility.total} />
        <span className="text-primary-violet font-bold text-6xl">+</span>
      </div>
      <p className="text-base">{credibility.description}</p>
    </div>
  );
}
