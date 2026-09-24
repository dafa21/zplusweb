"use client";

import api from "@/lib/axios";
import useResponsive from "@/store/use-responsive";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import Marquee from "react-fast-marquee";

export default function OurClient() {
  const { isMobile } = useResponsive();

  const getClients = async () => {
    const response = await api.get(`/web/home/clients`);
    return response.data.data;
  };

  const { data: clients = [] } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
    keepPreviousData: true,
  });

  if (clients.length === 0) return null;

  return (
    <div className="lg:mx-auto max-w-5xl my-12">
      <h2
        data-aos="fade-left"
        className="text-center text-3xl font-semibold text-primary-cyan"
      >
        Our Clients
      </h2>
      <div className="mx-auto overflow-hidden md:max-w-3xl mt-10">
        <Marquee autoFill gradientWidth={200} gradient={!isMobile}>
          {clients.map((client) => (
            <div key={client.id} className="mr-8">
              <img src={client.logo} alt={client.name} className="h-16" />
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
}
