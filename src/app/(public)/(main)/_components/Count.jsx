"use client";

import { useInView } from "react-intersection-observer";
import CountUp from "react-countup";

export default function AnimatedCounter({ value }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.3 });

  return (
    <div ref={ref} className="text-center text-4xl font-bold">
      {inView ? (
        <CountUp
          end={value}
          duration={2}
          separator="."
          className="font-normal text-6xl"
        />
      ) : (
        0
      )}
    </div>
  );
}
