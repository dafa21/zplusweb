"use client";

import useResponsive from "@/store/use-responsive";

export default function CardSolution({ solution, index }) {
  const { isMobile } = useResponsive();

  return (
    <div
      data-aos="fade-right"
      data-aos-delay={isMobile ? 0 : index * 200}
      className="group rounded-2xl p-8 h-80 border overflow-hidden border-slate-400 shadow-2xs w-full sm:w-80 relative bg-white z-10"
    >
      <div className="relative z-20 space-y-2">
        <h4 className="font-semibold text-xl">{solution.title}</h4>
        <p className="text-base mr-4">{solution.description}</p>
      </div>
      <img
        src={solution.image}
        alt={solution.title}
        className="absolute right-0 bottom-0 w-auto h-36 z-10 group-hover:scale-150 group-hover:blur-xs group-hover:opacity-75 group-active:scale-150 group-active:blur-xs group-active:opacity-75 transition-all duration-300"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-white to-primary-cyan/50" />
    </div>
  );
}
