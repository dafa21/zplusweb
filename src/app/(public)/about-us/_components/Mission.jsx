import { Telescope } from "lucide-react";
import React from "react";

export default function Mission({ children }) {
  return (
    <div
      data-aos="fade-up"
      data-aos-delay="200"
      data-aos-duration="800"
      className="py-8 px-6 border-primary-violet border-4 bg-violet-300 rounded-3xl relative shadow-xl"
    >
      <div className="border-4 border-primary-violet bg-primary-violet p-6 rounded-full absolute -translate-x-[50%] left-[50%] -top-11">
        <Telescope className="scale-200 text-white" />
      </div>
      <h3 className="font-bold text-2xl text-black mt-8">Misi</h3>
      <p className="text-base text-slate-900 mt-6 px-8 leading-7">{children}</p>
    </div>
  );
}
