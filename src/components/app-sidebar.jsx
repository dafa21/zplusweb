"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import useNavigation from "@/store/use-navigation";
import { usePathname } from "next/navigation";
import { MENUS } from "@/lib/menu";
import { NavUser } from "./nav-user";

export function AppSidebar({ ...props }) {
  const { menuActive, setMenuActive } = useNavigation((state) => state);
  const pathname = usePathname();

  const handleChangeMenuActive = (menu) => {
    setMenuActive(menu);
  };

  const getMenuActive = (url) => {
    for (const menu of MENUS) {
      if (url.includes(menu.url)) return menu;

      if (!menu.items) continue;
      for (const subMenu of menu.items) {
        if (url.includes(subMenu.url)) return subMenu;
      }
    }
  };

  React.useEffect(() => {
    if (!menuActive) {
      const menu = getMenuActive(pathname);
      setMenuActive(menu);
    }
  }, []);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="h-14 flex items-center px-2">
          <h1 className="font-semibold text-green-600 text-2xl">Zplus</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="gap-0 overflow-hidden">
        {MENUS.map((nav) =>
          nav.items?.length > 0 ? (
            <Collapsible
              key={nav.title}
              title={nav.title}
              defaultOpen
              className="group/collapsible"
            >
              <SidebarGroup>
                <SidebarGroupLabel
                  asChild
                  className="group/label text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground text-sm"
                >
                  <CollapsibleTrigger>
                    {nav.title}{" "}
                    <ChevronRight className="ml-auto transition-transform group-data-[state=open]/collapsible:rotate-90" />
                  </CollapsibleTrigger>
                </SidebarGroupLabel>
                <CollapsibleContent>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {nav.items.map((childNav) => (
                        <SidebarMenuItem key={childNav.title} className="ml-4">
                          <SidebarMenuButton
                            asChild
                            isActive={childNav.url === menuActive?.url}
                            onClick={() => handleChangeMenuActive(childNav)}
                          >
                            <a href={childNav.url}>{childNav.title}</a>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </CollapsibleContent>
              </SidebarGroup>
            </Collapsible>
          ) : (
            <div key={nav.title} className="mx-2">
              <SidebarMenuItem>
                <SidebarMenuButton
                  asChild
                  isActive={nav.url === menuActive?.url}
                  className="font-medium"
                  onClick={() => handleChangeMenuActive(nav)}
                >
                  <a href={nav.url}>{nav.title}</a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </div>
          )
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
