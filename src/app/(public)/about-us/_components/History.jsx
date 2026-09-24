import React from "react";

export default function History({ children }) {
  return (
    <div className="mx-4 lg:mx-auto max-w-5xl my-12 pt-10">
      <h3
        data-aos="zoom-out"
        className="text-2xl text-primary-cyan font-normal"
      >
        Sejarah Kami
      </h3>
      <div className="flex flex-col md:flex-row items-end gap-8 md:gap-0">
        <p
          data-aos="fade-up"
          className="text-base mt-4 text-slate-700 pr-8 md:w-[50%] leading-7 z-10"
          dangerouslySetInnerHTML={{ __html: children.replace(/\n/g, "<br>") }}
        />
        <div className="md:w-[50%]">
          <img
            src="/web/iceberg.webp"
            alt="Ice berg"
            className="w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}
