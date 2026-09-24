"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import SolutionForm from "../_components/solution-form";
import toast from "react-hot-toast";
import api from "@/lib/axios";

export default function AddSolution() {
  useNavBreadcrumb([
    { name: "Problem and Solution", url: URL.DASHBOARD_PROBLEMS() },
    { name: "Add Solution" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("title", values.title);
    formData.append("description", values.description);

    try {
      await api.post("/solutions", formData);
      toast.success("Solution added successfully");
      router.push(URL.DASHBOARD_PROBLEMS());
    } catch (error) {
      toast.error("Failed to add solution");
    }
  };

  return (
    <div>
      <SectionTitle>Problem and Solution</SectionTitle>
      <SectionSubtitle>Add Solution</SectionSubtitle>

      <SolutionForm onSubmit={onSubmit} />
    </div>
  );
}
