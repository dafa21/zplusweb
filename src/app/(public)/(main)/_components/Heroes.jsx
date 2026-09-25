"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import api from "@/lib/axios";
import { cn } from "@/lib/utils";
import useResponsive from "@/store/use-responsive";
import { useQuery } from "@tanstack/react-query";
import { ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
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
        <div className="w-full h-[58vh] min-h-[480px] lg:h-screen"></div>
        <div className="fixed inset-0 z-50 bg-white flex justify-center items-center">
          <LoaderCircle className="animate-spin scale-200 text-primary-cyan" />
        </div>
      </>
    );
  }

  const currentIndex = currentHero?.id
    ? heroes.findIndex((h) => h.id === currentHero.id)
    : 0;

  return (
    <div className="w-full relative overflow-hidden bg-slate-950">
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

        {/* mobile navigation controls (frosted glass bar) */}
        {heroes.length > 1 && (
          <div className="absolute bottom-4 inset-x-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:hidden pointer-events-none">
            {/* Title / Counter on mobile */}
            <div className="pointer-events-auto max-w-[42vw]">
              {currentHero?.title?.trim() ? (
                <h4 className="text-white text-xs font-semibold truncate drop-shadow-md">
                  {currentHero.title}
                </h4>
              ) : (
                <span className="text-white/80 text-[11px] font-semibold tracking-wider px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 shadow">
                  {(currentIndex >= 0 ? currentIndex : 0) + 1} / {heroes.length}
                </span>
              )}
            </div>

            {/* Mobile Dots Indicator */}
            <div className="pointer-events-auto flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
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

            {/* Mobile Prev / Next Buttons */}
            <div className="pointer-events-auto flex items-center gap-1 bg-black/40 backdrop-blur-md p-1 rounded-full border border-white/10 shadow-lg">
              <button
                onClick={() => apiCarosel?.scrollPrev()}
                className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 active:scale-90 transition cursor-pointer"
                aria-label="Previous slide"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => apiCarosel?.scrollNext()}
                className="p-1.5 rounded-full text-white/90 hover:text-white hover:bg-white/20 active:scale-90 transition cursor-pointer"
                aria-label="Next slide"
              >
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}

        <CarouselContent>
          {heroes.map((hero) => (
            <CarouselItem key={hero.id} className="pl-0">
              <div className="relative w-full h-[58vh] min-h-[480px] max-h-[580px] lg:h-screen lg:max-h-none flex items-center justify-center overflow-hidden">
                {/* Ambient glow background for mobile */}
                <div className="absolute inset-0 z-0 overflow-hidden lg:hidden pointer-events-none">
                  <img
                    src={isMobile ? hero.imageMobile : hero.imageDesktop}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover blur-3xl opacity-40 scale-125 saturate-150 brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/45" />
                  <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-background to-transparent" />
                </div>

                {/* Foreground Banner Graphic */}
                <div className="relative z-10 w-full h-full flex flex-col justify-center items-center px-3 sm:px-6 pt-14 pb-14 lg:p-0">
                  <div className="w-full max-w-lg mx-auto flex items-center justify-center">
                    <picture className="w-full block">
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
                        alt={hero.title?.trim() || "Hero Banner"}
                        className="w-full h-auto max-h-[36vh] sm:max-h-[40vh] object-contain block drop-shadow-2xl rounded-xl sm:rounded-2xl border border-white/20 lg:border-none lg:shadow-none lg:rounded-none lg:max-h-none lg:absolute lg:inset-0 lg:z-10 lg:w-full lg:h-full lg:object-cover"
                      />
                    </picture>
                  </div>
                </div>

                {/* Desktop overlay text */}
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
