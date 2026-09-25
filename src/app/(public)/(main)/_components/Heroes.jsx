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
        <div className="w-full min-h-[250px] lg:h-screen"></div>
        <div className="fixed inset-0 z-50 bg-white flex justify-center items-center">
          <LoaderCircle className="animate-spin scale-200 text-primary-cyan" />
        </div>
      </>
    );
  }

  return (
    <div className="w-full relative overflow-hidden">
      <Carousel
        setApi={setApiCarosel}
        opts={{
          loop: true,
          delay: 5000,
          watchDrag: true,
        }}
      >
        {/* desktop navigation */}
        <div
          style={{
            gridTemplateColumns: `repeat(${heroes.length}, minmax(0, 1fr))`,
          }}
          className="hidden absolute z-20 bottom-20 mx-auto lg:grid items-center gap-8 left-[50%] translate-x-[-50%] max-w-5xl w-full"
        >
          {heroes.map((hero, index) => (
            <button
              key={hero.id}
              onClick={() => apiCarosel?.scrollTo(index)}
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

        {/* mobile title */}
        {currentHero?.title?.trim() ? (
          <div className="absolute left-4 bottom-3 z-20 lg:hidden pointer-events-none">
            <h4 className="text-white text-xs sm:text-sm font-semibold truncate max-w-[45vw] drop-shadow-md">
              {currentHero.title}
            </h4>
          </div>
        ) : null}

        {/* mobile dots indicator */}
        {heroes.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 lg:hidden">
            {heroes.map((hero, index) => (
              <button
                key={hero.id}
                onClick={() => apiCarosel?.scrollTo(index)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                  currentHero?.id === hero.id
                    ? "w-6 bg-primary-cyan"
                    : "w-1.5 bg-white/60 hover:bg-white"
                )}
                aria-label={`Slide ${index + 1}`}
              />
            ))}
          </div>
        )}

        {/* mobile prev/next buttons */}
        {heroes.length > 1 && (
          <div className="absolute right-12 bottom-4 z-20 lg:hidden scale-75">
            <CarouselPrevious />
            <CarouselNext />
          </div>
        )}

        <CarouselContent>
          {heroes.map((hero) => (
            <CarouselItem key={hero.id} className="pl-0">
              <div className="relative w-full lg:h-screen flex items-center justify-center">
                <picture className="w-full h-full block">
                  <source
                    media="(max-width: 1023px)"
                    srcSet={hero.imageMobile || hero.imageDesktop}
                  />
                  <source
                    media="(min-width: 1024px)"
                    srcSet={hero.imageDesktop || hero.imageMobile}
                  />
                  <img
                    src={isMobile ? hero.imageMobile : hero.imageDesktop}
                    alt={hero.title?.trim() || "Hero"}
                    className="w-full h-auto object-contain block lg:absolute lg:inset-0 lg:z-10 lg:w-full lg:h-full lg:object-cover"
                  />
                </picture>

                <div className="hidden lg:block mx-4 lg:mx-auto max-w-5xl w-full z-20">
                  <div className="max-w-lg ml-4 lg:ml-0 mr-16 lg:mr-0 space-y-8">
                    {hero.title?.trim() && (
                      <h3
                        data-aos="fade-up"
                        className="text-4xl text-shadow-accent font-semibold text-primary-cyan"
                      >
                        {hero.title}
                      </h3>
                    )}
                    {hero.description?.trim() && (
                      <p
                        data-aos="fade-up"
                        data-aos-delay="300"
                        className="text-base text-white mr-8"
                      >
                        {hero.description}
                      </p>
                    )}
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
