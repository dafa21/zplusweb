import { BASE_URL } from "@/lib/axios";
import React from "react";
import CardSolution from "./CardSolution";

export default async function Solutions() {
  const response = await fetch(`${BASE_URL}/api/web/home/solution`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const solution = data.data;

  return (
    <div className="relative overflow-hidden">
      <img
        src="/web/background/line-1.svg"
        alt="Background"
        className="absolute -left-12 -top-24 rotate-0 scale-x-110 h-72 z-0"
      />

      <div className="mx-4 lg:mx-auto max-w-5xl my-12 ">
        <h2
          data-aos="zoom-out"
          className="text-center text-3xl font-semibold text-primary-cyan"
        >
          {solution?.section.title}
        </h2>
        <div className="flex flex-wrap gap-6 justify-center mt-10">
          {solution?.solutions.map((solution, index) => (
            <CardSolution key={solution.id} solution={solution} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}
