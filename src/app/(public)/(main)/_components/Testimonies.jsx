import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { BASE_URL } from "@/lib/axios";
import { Star } from "lucide-react";

export default async function Testimonies() {
  const response = await fetch(`${BASE_URL}/api/web/home/testimony`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const testimony = data.data;

  return (
    <div className="relative">
      <img
        src="/web/background/line-3.svg"
        alt="Background"
        className="absolute -right-8 bottom-8 -rotate-[20deg] scale-[-1.7] h-64 z-0"
      />

      <div className="my-12 mx-4 lg:mx-auto max-w-5xl relative">
        <h2
          data-aos="fade-right"
          className="text-3xl text-primary-cyan font-semibold"
        >
          {testimony?.section.title}
        </h2>
        <div className="mt-8 max-w-8xl mx-auto">
          <Carousel opts={{ loop: true, delay: 5000, watchDrag: false }}>
            <div className="absolute right-12 -top-10">
              <CarouselPrevious />
              <CarouselNext />
            </div>
            <CarouselContent>
              {testimony.testimonies.map((testimony, index) => (
                <CarouselItem key={`testimony-${index}`}>
                  <div
                    data-aos="fade-down"
                    data-aos-delay={index * 300}
                    className="shadow-lg overflow-hidden mb-6 bg-white z-10 border border-slate-200 sm:h-80 flex flex-col-reverse sm:grid sm:grid-cols-[6fr_4fr]"
                  >
                    <div className="p-8 sm:p-12">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className="fill-yellow-500"
                            color="#f0b100"
                          />
                        ))}
                      </div>
                      <p className="text-base italic mr-4 tracking-wide mt-6">
                        "{testimony.description}"
                      </p>
                      <h4 className="text-2xl font-medium text-primary-violet mt-4">
                        {testimony.name}
                      </h4>
                      <p className="text-lg mt-2">{testimony.institution}</p>
                    </div>
                    <div className="h-full">
                      <img
                        src={testimony.logo}
                        alt={`testimony-image-${index}`}
                        className="h-[300px] sm:h-full w-full sm:w-auto object-cover"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
