import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/lib/axios";
import React from "react";

export default async function ButtonWA() {
  const response = await fetch(`${BASE_URL}/api/web/home/call-to-action`, {
    cache: "no-cache",
  });
  const data = await response.json();
  const callToAction = data.data;

  return (
    <div className="fixed z-50 bottom-6 right-6 drop-shadow-2xl/40">
      <Button
        asChild
        size="icon-lg"
        className="h-14 w-14 rounded-full bg-green-500 hover:bg-green-600"
      >
        <a href={callToAction.link} target="_blank">
          <img src="/web/logo-wa.svg" alt="Logo WA" className="w-8 h-8" />
        </a>
      </Button>
    </div>
  );
}
