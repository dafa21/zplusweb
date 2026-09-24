import { BASE_URL } from "@/lib/axios";
import React from "react";
import CardMember from "./CardMember";

export default async function Members() {
  const response = await fetch(`${BASE_URL}/api/web/about-us/member`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const members = data.data;

  return (
    <div className="relative">
      <img
        src="/web/background/line-4.svg"
        alt="Background"
        className="absolute -left-0 bottom-10 scale-200 -rotate-[10deg] h-56 z-0"
      />

      <div className="mx-4 lg:mx-auto max-w-5xl my-12 pt-6 pb-10">
        <h3
          data-aos="zoom-out"
          className="text-primary-cyan text-2xl font-normal text-center"
        >
          Tim Kami
        </h3>
        <div className="flex flex-wrap justify-center gap-8 mt-8">
          {members.map((member, index) => (
            <CardMember key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
