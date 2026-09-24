"use client";

import useResponsive from "@/store/use-responsive";

export default function CardClient({ client, index }) {
  const { isMobile } = useResponsive();

  return (
    <div
      data-aos="fade-up"
      data-aos-delay={isMobile ? 0 : index * 300}
      className="border border-primary-violet z-10 bg-violet-50 transition rounded-md text-center px-6 py-8 min-h-max"
    >
      <img
        src={client.logo}
        alt={client.name}
        className="h-12 w-auto mx-auto"
      />
      <h4 className="font-semibold text-xl leading-7 mt-4">{client.name}</h4>
      <p className="text-sm text-slate-800 leading-6 mt-4">
        {client.projectDescription}
      </p>
    </div>
  );
}
