"use client";

import { cn } from "@/lib/utils";
import useResponsive from "@/store/use-responsive";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import useScroll from "@/store/use-scroll";
import api from "@/lib/axios";

const Navigation = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = href === pathname;
  const { isTopScroll } = useScroll();

  const isMainPage = pathname === "/";

  return (
    <li className="group">
      <Link
        href={href}
        className={cn("text-base transition", {
          "text-primary-cyan": isActive,
          "group-hover:text-primary-cyan/80 text-slate-800": !isActive,
          "text-white text-shadow-lg/10":
            isTopScroll && !isActive && isMainPage,
        })}
      >
        {children}
      </Link>
      <div
        className={cn("mx-auto transition-all duration-500 mt-1", {
          "w-0 h-0 group-hover:border border-primary-cyan/60 group-hover:w-full":
            !isActive,
          "w-0 h-0": isActive,
        })}
      />
    </li>
  );
};

const DesktopNavigation = ({ identity }) => {
  return (
    <div className="h-20 mx-4 lg:mx-auto max-w-5xl flex items-center justify-between gap-16">
      {identity.logo && (
        <Link href="/">
          <img src={identity.logo} alt="Logo Zplus" className="w-24 h-auto" />
        </Link>
      )}
      <nav>
        <ul className="flex items-center gap-8">
          <Navigation href="/">Halaman Utama</Navigation>
          <Navigation href="/about-us">Tentang Kami</Navigation>
          <Navigation href="/modules">Fitur dan Modul</Navigation>
          <Navigation href="/portfolios">Klien Kami</Navigation>
        </ul>
      </nav>
    </div>
  );
};

const NavigationMobile = ({ href, children }) => {
  const pathname = usePathname();
  const isActive = href === pathname;

  return (
    <li className="group">
      <Link
        href={href}
        className={cn(
          "text-2xl transition pl-8 w-full block py-4 group-hover:bg-slate-50",
          {
            "text-primary-cyan": isActive,
            "group-hover:text-primary-cyan/70 text-slate-800": !isActive,
          }
        )}
      >
        {children}
      </Link>
    </li>
  );
};

const MobileDrawer = ({ identity }) => {
  const [open, setOpen] = useState(false);
  const { isTopScroll } = useScroll();
  const pathname = usePathname();

  const isMainPage = pathname === "/";

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      <Drawer onOpenChange={setOpen} open={open} direction="right">
        <DrawerContent className="!w-full">
          <div className="mb-12 mx-8 mt-6 flex items-center justify-between">
            {identity.logo && (
              <img
                src={identity.logo}
                alt="Logo Zplus"
                className="w-28 h-auto"
              />
            )}

            <Button variant="ghost" onClick={() => setOpen(false)}>
              <X className="scale-200 text-slate-500" />
            </Button>
          </div>
          <nav>
            <ul className="flex flex-col gap-4 h-screen pb-12">
              <NavigationMobile href="/">Halaman Utama</NavigationMobile>
              <NavigationMobile href="/about-us">Tentang Kami</NavigationMobile>
              <NavigationMobile href="/modules">
                Fitur dan Modul
              </NavigationMobile>
              <NavigationMobile href="/portfolios">Klien Kami</NavigationMobile>
            </ul>
          </nav>

          <div className="absolute bottom-0 right-0 scale-x-[-1]">
            <img src="/web/drawer.jpg" alt="Drawer" className="w-auto h-56" />
          </div>
        </DrawerContent>
      </Drawer>

      <div className="h-14 flex justify-between items-center mx-4">
        {identity.logo && (
          <Link href="/">
            <img src={identity.logo} alt="Logo Zplus" className="w-24 h-auto" />
          </Link>
        )}
        <button
          onClick={() => setOpen(true)}
          className={cn("transition p-2 rounded cursor-pointer", {
            "hover:bg-slate-100": !isTopScroll,
            "hover:bg-slate-100/10": isTopScroll,
          })}
        >
          <Menu
            className={cn({
              "text-white text-shadow-2xs/20": isTopScroll && isMainPage,
              "text-slate-800": !isTopScroll,
            })}
          />
        </button>
      </div>
    </>
  );
};

export default function Header() {
  const { isMobile, setResponsive } = useResponsive();
  const { isTopScroll, setTopScroll } = useScroll();
  const [identity, setIdentity] = useState({});

  const getIdentity = async () => {
    const response = await api.get("/web/about-us/identity");
    setIdentity(response.data.data);
  };

  useEffect(() => {
    getIdentity();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setResponsive(window.innerWidth < 660);
    };

    const handleScroll = () => {
      setTopScroll(window.scrollY < 20);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn("transition-all duration-300 fixed top-0 z-50 w-full", {
        "bg-transparent": isTopScroll,
        "bg-white shadow-lg": !isTopScroll,
      })}
    >
      {isMobile ? (
        <MobileDrawer identity={identity} />
      ) : (
        <DesktopNavigation identity={identity} />
      )}
    </header>
  );
}
