import { BASE_URL } from "@/lib/axios";
import React from "react";
import CardClient from "./CardClient";

export default async function Portfolios() {
  const response = await fetch(`${BASE_URL}/api/web/portfolios`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const portfolios = data.data;

  return (
    <div className="relative">
      <img
        src="/web/background/line-6.svg"
        alt="Background"
        className="absolute -left-40 -top-0 rotate-12 scale-y-100 h-80 z-0"
      />

      <div className="mx-4 lg:mx-auto max-w-5xl mt-12 mb-20">
        <h2
          data-aos="fade-down"
          className="text-primary-cyan text-2xl font-semibold text-center"
        >
          Partner Terbaik Kami
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {portfolios.map((client, index) => (
            <CardClient key={client.id} client={client} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
