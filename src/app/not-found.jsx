import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export const metadata = {
  title: "404 - Page Not Found",
  description: "The page you are looking for does not exist.",
};

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <img src="/web/404.png" alt="Not Found" className="rounded-lg w-sm" />
      <h1 className="text-primary-cyan text-4xl mt-6">404 - Page Not Found</h1>
      <p className="text-lg mt-4 mb-8">
        The page you are looking for does not exist.
      </p>
      <Button asChild>
        <Link href="/">Go To Home Page</Link>
      </Button>
    </div>
  );
}
