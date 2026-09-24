"use client";

import React, { useEffect, useState } from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import FeatureForm from "@/app/dashboard/modules/_components/feature-form";

export default function EditFeature() {
  const router = useRouter();
  const params = useParams();
  const [feature, setFeature] = useState({});

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("description", values.description);

    try {
      await api.put(
        `/modules/${params.id}/features/${params.idFeature}`,
        formData
      );
      toast.success("Feature edited successfully");
      router.push(URL.DASHBOARD_MODULES_EDIT(params.id));
    } catch (error) {
      console.error(error);
      toast.error("Failed to edit feature");
    }
  };

  const getFeatureDetail = async () => {
    try {
      const response = await api.get(
        `/modules/${params.id}/features/${params.idFeature}`
      );
      const detail = response.data.data;
      setFeature(detail);
    } catch (error) {
      console.error("GET Module Error:", error);
    }
  };

  useNavBreadcrumb([
    { name: "Module", url: URL.DASHBOARD_MODULES() },
    { name: "Edit Module", url: URL.DASHBOARD_MODULES_EDIT(params.id) },
    { name: "Edit Feature" },
  ]);

  useEffect(() => {
    getFeatureDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Feature</SectionTitle>
      <SectionSubtitle>Edit Feature</SectionSubtitle>

      <FeatureForm onSubmit={onSubmit} defaultValues={feature} />
    </div>
  );
}
