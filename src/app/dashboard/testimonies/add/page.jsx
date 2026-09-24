"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import TestimonyForm from "../_components/testimony-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddTestimony() {
  useNavBreadcrumb([
    { name: "Testimony", url: URL.DASHBOARD_TESTIMONIES() },
    { name: "Add Testimony" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("institution", values.institution);

    try {
      await api.post("/testimonies", formData);
      toast.success("Testimony added successfully");
      router.push(URL.DASHBOARD_TESTIMONIES());
    } catch (error) {
      toast.error("Failed to add testimony");
    }
  };

  return (
    <div>
      <SectionTitle>Testimony</SectionTitle>
      <SectionSubtitle>Add Testimony</SectionSubtitle>

      <TestimonyForm onSubmit={onSubmit} />
    </div>
  );
}
