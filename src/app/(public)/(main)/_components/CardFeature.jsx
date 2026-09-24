"use client";

import useResponsive from "@/store/use-responsive";

export default function CardFeature({ feature, index }) {
  const { isMobile } = useResponsive();

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={index * 300}
      className="rounded-2xl h-96 border overflow-hidden shadow-2xs min-w-40 w-full sm:w-80 relative group"
    >
      <div className="absolute px-4 pb-8 bottom-0 z-20">
        <h4 className="font-normal text-lg text-white text-center">
          {feature.title}
        </h4>
      </div>
      <img
        src={feature.image}
        alt={feature.title}
        className="absolute inset-0 w-full h-full object-cover group-hover:scale-125 group-active:scale-125 transition-all duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />

      <div className="absolute p-8 text-center z-20 -bottom-96 group-hover:bottom-0 group-active:bottom-0 group-focus:bottom-0 left-0 space-y-2 bg-gradient-to-b from-cyan-500 to-violet-700 transition-all duration-500">
        <h4 className="text-white font-semibold text-xl mb-4">
          {feature.title}
        </h4>
        <p className="text-white text-sm">{feature.description}</p>
      </div>
    </div>
  );
}
