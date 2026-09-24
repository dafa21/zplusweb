"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import HeroForm from "../_components/hero-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddHero() {
  useNavBreadcrumb([
    { name: "Hero", url: URL.DASHBOARD_HEROES() },
    { name: "Add Hero" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("imageDesktop", values.imageDesktop[0]);
    formData.append("imageMobile", values.imageMobile[0]);
    formData.append("title", values.title);
    formData.append("description", values.description);

    try {
      await api.post("/heroes", formData);
      toast.success("Hero added successfully");
      router.push(URL.DASHBOARD_HEROES());
    } catch (error) {
      toast.error("Failed to add hero");
    }
  };

  return (
    <div>
      <SectionTitle>Hero</SectionTitle>
      <SectionSubtitle>Add Hero</SectionSubtitle>

      <HeroForm onSubmit={onSubmit} />
    </div>
  );
}
