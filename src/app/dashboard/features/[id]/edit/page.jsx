"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import FeatureForm from "../../_components/feature-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function EditFeature() {
  useNavBreadcrumb([
    { name: "Featured Feature", url: URL.DASHBOARD_FEATURES() },
    { name: "Edit Feature" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [feature, setFeature] = React.useState({});

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("image", values.image[0]);

    try {
      await api.put(`/features/${params.id}`, formData);
      toast.success("Feature updated successfully");
      router.push(URL.DASHBOARD_FEATURES());
    } catch (error) {
      toast.error("Failed to update feature");
    }
  };

  const getFeatureDetail = async () => {
    try {
      const response = await api.get(`/features/${params.id}`);
      const detail = response.data.data;
      setFeature(detail);
    } catch (error) {
      console.error("GET Feature Error:", error);
    }
  };

  React.useEffect(() => {
    getFeatureDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Featured Feature</SectionTitle>
      <SectionSubtitle>Edit Feature</SectionSubtitle>

      <FeatureForm onSubmit={onSubmit} defaultValues={feature} />
    </div>
  );
}
