"use client";

import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import React from "react";

export default function Welcome() {
  useNavBreadcrumb([{ name: "Welcome" }]);

  return (
    <div className="flex justify-center items-center h-full">
      <h1 className="text-green-600 font-semibold text-2xl">
        Welcome to Dashboard
      </h1>
    </div>
  );
}
