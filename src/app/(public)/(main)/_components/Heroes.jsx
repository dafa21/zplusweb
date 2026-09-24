"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import useResponsive from "@/store/use-responsive";
import { useQuery } from "@tanstack/react-query";
import { LoaderCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

export default function Heroes() {
  const [apiCarosel, setApiCarosel] = useState(null);
  const [currentHero, setCurrentHero] = useState({});
  const { isMobile } = useResponsive();

  const getHeroes = async () => {
    const response = await api("/web/home/hero");
    return response.data.data;
  };

  const { data: heroes = [], isLoading } = useQuery({
    queryKey: ["heroes"],
    queryFn: getHeroes,
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!apiCarosel) return;

    if (heroes.length > 0) {
      setCurrentHero(heroes[0]);
    }

    apiCarosel.on("select", () => {
      setCurrentHero(heroes[apiCarosel.selectedScrollSnap()]);
    });
  }, [apiCarosel, heroes]);

  if (isLoading) {
    return (
      <>
        <div className="h-screen w-screen"></div>
        <div className="fixed inset-0 z-50 bg-white flex justify-center items-center">
          <LoaderCircle className="animate-spin scale-200 text-primary-cyan" />
        </div>
      </>
    );
  }

  return (
    <div className="w-screen relative">
      <Carousel
        setApi={setApiCarosel}
        opts={{
          loop: true,
          delay: 5000,
          watchDrag: false,
        }}
      >
        {/* desktop */}
        <div
          style={{
            gridTemplateColumns: `repeat(${heroes.length}, minmax(0, 1fr))`,
          }}
          className="hidden absolute z-20 bottom-20 mx-auto lg:grid items-center gap-8 left-[50%] translate-x-[-50%] max-w-5xl w-full"
        >
          {heroes.map((hero, index) => (
            <button
              key={hero.id}
              onClick={() => apiCarosel.scrollTo(index)}
              className="cursor-pointer"
            >
              <h5
                className={cn(
                  "text-center truncate text-shadow-lg hover:brightness-110 transition",
                  {
                    "text-primary-cyan font-semibold":
                      currentHero.id === hero.id,
                    "text-slate-200": currentHero.id !== hero.id,
                  }
                )}
              >
                {hero.title}
              </h5>
            </button>
          ))}
        </div>

        {/* mobile */}
        <div className="absolute left-4 bottom-28 z-20 lg:hidden">
          <h4 className="text-white text-lg font-semibold truncate w-[60vw]">
            {currentHero.title}
          </h4>
        </div>

        <div className="absolute right-[72px] bottom-32 z-20 lg:hidden">
          <CarouselPrevious />
          <CarouselNext />
        </div>
        <CarouselContent>
          {heroes.map((hero) => (
            <CarouselItem key={hero.id} className="pl-0">
              <div className="relative h-screen flex items-center">
                <img
                  src={isMobile ? hero.imageMobile : hero.imageDesktop}
                  alt="Hero"
                  className="absolute inset-0 z-10 w-full h-full object-cover"
                />
                <div className="mx-4 lg:mx-auto w-5xl z-20">
                  <div className="max-w-lg ml-4 lg:ml-0 mr-16 lg:mr-0 space-y-8">
                    <h3
                      data-aos="fade-up"
                      className="text-4xl text-shadow-accent font-semibold text-primary-cyan"
                    >
                      {hero.title}
                    </h3>
                    <p
                      data-aos="fade-up"
                      data-aos-delay="300"
                      className="text-base text-white mr-8"
                    >
                      {hero.description}
                    </p>
                  </div>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
