import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { BASE_URL } from "@/lib/axios";
import React from "react";

export default async function Modules() {
  const response = await fetch(`${BASE_URL}/api/web/modules`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const modules = data.data;
  console.log(modules);

  return (
    <div className="relative">
      <img
        src="/web/background/line-6.svg"
        alt="Background"
        className="absolute -right-40 top-80 -rotate-12 scale-y-100 h-80 z-0"
      />

      <div className="mx-4 lg:mx-auto max-w-5xl mt-12 mb-20">
        <h2
          data-aos="fade-down"
          className="text-primary-cyan text-3xl font-semibold text-center mb-8"
        >
          Modul Kami
        </h2>

        <div>
          <Carousel
            opts={{
              loop: true,
              delay: 5000,
              watchDrag: false,
            }}
          >
            <CarouselContent>
              {modules.map((module) => (
                <CarouselItem key={`module-${module.id}`}>
                  <section className="relative grid lg:grid-cols-[2fr_1fr] gap-8 lg:gap-24 items-center pb-8 lg:h-[660px]">
                    <img
                      src="/web/bg-border.svg"
                      alt="Background Border"
                      className="w-full h-full absolute"
                    />

                    <div className="space-y-6 lg:space-y-12 relative z-10">
                      <h2 className="text-3xl font-bold leading-tight text-violet-700">
                        {module.title}
                      </h2>

                      <div className="">
                        <img
                          src={module.image}
                          alt={module.title}
                          className="w-full h-auto lg:w-auto lg:h-[50%] object-contain drop-shadow-md"
                        />
                      </div>
                    </div>

                    <div className="relative z-10 bg-white p-6 rounded-lg border border-slate-200 shadow-lg lg:mr-8 space-y-4 lg:space-y-6">
                      <p className="text-gray-700 leading-relaxed text-base">
                        {module.description}
                      </p>

                      <div className="space-y-3">
                        <h4 className="text-base font-medium">Fitur</h4>
                        <div className="flex flex-wrap gap-2">
                          {module.moduleFeatures.map((feature) => (
                            <div
                              key={`feature-${feature.id}`}
                              className="flex items-center gap-2 px-2 py-1 rounded bg-violet-50 text-violet-700 text-sm border border-violet-200"
                            >
                              <img
                                src={feature.image}
                                alt={feature.description}
                                className="w-6 h-auto"
                              />
                              <p>{feature.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </section>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}
