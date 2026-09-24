"use client";

import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { getToken } from "@/lib/auth";
import useBreadcrumb from "@/store/use-breadcrumb";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { breadcrumbs } = useBreadcrumb();
  const router = useRouter();

  useEffect(() => {
    const token = getToken();
    if (!token) {
      router.push("/login");
      return;
    }
  }, []);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="bg-background sticky top-0 flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              {breadcrumbs.map((breadcrumb) =>
                breadcrumb.url ? (
                  <div
                    className="flex flex-wrap items-center gap-1.5"
                    key={breadcrumb.name}
                  >
                    <BreadcrumbItem>
                      <BreadcrumbLink href={breadcrumb.url}>
                        {breadcrumb.name}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator className="hidden md:block" />
                  </div>
                ) : (
                  <BreadcrumbItem key={breadcrumb.name}>
                    <BreadcrumbPage>{breadcrumb.name}</BreadcrumbPage>
                  </BreadcrumbItem>
                )
              )}
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <main className="flex flex-1 flex-col gap-4 p-4 my-4">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
