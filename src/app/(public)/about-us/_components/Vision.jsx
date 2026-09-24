import { Target } from "lucide-react";
import React from "react";

export default function Vision({ children }) {
  return (
    <div
      data-aos="fade-down"
      data-aos-duration="800"
      className="py-8 px-6 border-primary-cyan border-4 bg-cyan-300 rounded-3xl relative shadow-xl"
    >
      <div className="border-4 border-primary-cyan bg-primary-cyan p-6 rounded-full absolute -translate-x-[50%] left-[50%] -top-11">
        <Target className="scale-200 text-white" />
      </div>
      <h3 className="font-bold text-2xl text-black mt-8">Visi</h3>
      <p className="text-base text-slate-900 mt-6 px-8 leading-7">{children}</p>
    </div>
  );
}
