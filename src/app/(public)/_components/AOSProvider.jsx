"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css"; // Import AOS CSS

const AOSProvider = ({ children }) => {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      offset: 120,
      once: true,
    });
  }, []);

  return <>{children}</>;
};

export default AOSProvider;
