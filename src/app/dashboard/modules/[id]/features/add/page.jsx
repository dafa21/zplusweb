"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import FeatureForm from "@/app/dashboard/modules/_components/feature-form";

export default function AddFeature() {
  const router = useRouter();
  const params = useParams();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("description", values.description);

    try {
      await api.post(`/modules/${params.id}/features`, formData);
      toast.success("Feature added successfully");
      router.push(URL.DASHBOARD_MODULES_EDIT(params.id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to add feature");
    }
  };

  useNavBreadcrumb([
    { name: "Module", url: URL.DASHBOARD_MODULES() },
    { name: "Edit Module", url: URL.DASHBOARD_MODULES_EDIT(params.id) },
    { name: "Add Feature" },
  ]);

  return (
    <div>
      <SectionTitle>Feature</SectionTitle>
      <SectionSubtitle>Add Feature</SectionSubtitle>

      <FeatureForm onSubmit={onSubmit} />
    </div>
  );
}
