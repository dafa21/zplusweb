"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import FeatureForm from "../_components/feature-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddFeature() {
  useNavBreadcrumb([
    { name: "Featured Feature", url: URL.DASHBOARD_FEATURES() },
    { name: "Add Feature" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("title", values.title);
    formData.append("description", values.description);

    try {
      await api.post("/features", formData);
      toast.success("Feature added successfully");
      router.push(URL.DASHBOARD_FEATURES());
    } catch (error) {
      toast.error("Failed to add feature");
    }
  };

  return (
    <div>
      <SectionTitle>Featured Feature</SectionTitle>
      <SectionSubtitle>Add Feature</SectionSubtitle>

      <FeatureForm onSubmit={onSubmit} />
    </div>
  );
}
