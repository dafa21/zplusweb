"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import TestimonyForm from "../../_components/testimony-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function EditTestimony() {
  useNavBreadcrumb([
    { name: "Testimony", url: URL.DASHBOARD_TESTIMONIES() },
    { name: "Edit Testimony" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [testimony, setTestimony] = React.useState({});

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("institution", values.institution);
    formData.append("image", values.image[0]);

    try {
      await api.put(`/testimonies/${params.id}`, formData);
      toast.success("Testimony updated successfully");
      router.push(URL.DASHBOARD_TESTIMONIES());
    } catch (error) {
      toast.error("Failed to update testimony");
    }
  };

  const getTestimonyDetail = async () => {
    try {
      const response = await api.get(`/testimonies/${params.id}`);
      const detail = response.data.data;
      setTestimony(detail);
    } catch (error) {
      console.error("GET Testimony Error:", error);
    }
  };

  React.useEffect(() => {
    getTestimonyDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Testimony</SectionTitle>
      <SectionSubtitle>Edit Testimony</SectionSubtitle>

      <TestimonyForm onSubmit={onSubmit} defaultValues={testimony} />
    </div>
  );
}
