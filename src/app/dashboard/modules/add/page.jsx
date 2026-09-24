"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import ModuleForm from "../_components/module-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddModule() {
  useNavBreadcrumb([
    { name: "Module", url: URL.DASHBOARD_MODULES() },
    { name: "Add Module" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("title", values.title);
    formData.append("description", values.description);

    try {
      await api.post("/modules", formData);
      toast.success("Module added successfully");
      router.push(URL.DASHBOARD_MODULES());
    } catch (error) {
      toast.error("Failed to add module");
    }
  };

  return (
    <div>
      <SectionTitle>Module</SectionTitle>
      <SectionSubtitle>Add Module</SectionSubtitle>

      <ModuleForm onSubmit={onSubmit} />
    </div>
  );
}
