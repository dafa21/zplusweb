"use client";

import useResponsive from "@/store/use-responsive";

export default function CardMember({ member, index }) {
  const { isMobile } = useResponsive();

  return (
    <div
      data-aos="fade-right"
      data-aos-delay={isMobile ? 0 : index * 200}
      className="relative h-[500px] w-full sm:w-80 rounded-lg overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
      <img
        src={member.image}
        alt={member.name}
        className="relative inset-0 h-full w-full object-cover"
      />
      <div className="absolute bottom-8 left-8 z-10 space-y-2">
        <h4 className="text-white font-semibold text-xl">{member.name}</h4>
        <h6 className="text-white text-sm">{member.role}</h6>
      </div>
    </div>
  );
}
