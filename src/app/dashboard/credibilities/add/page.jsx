"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import CredibilityForm from "../_components/credibility-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddCredibility() {
  useNavBreadcrumb([
    { name: "Credibility", url: URL.DASHBOARD_CREDIBILITIES() },
    { name: "Add Credibility" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const payload = {
      description: values.description,
      total: values.total,
    };

    try {
      await api.post("/credibilities", payload);
      toast.success("Credibility added successfully");
      router.push(URL.DASHBOARD_CREDIBILITIES());
    } catch (error) {
      toast.error("Failed to add credibility");
    }
  };

  return (
    <div>
      <SectionTitle>Credibility</SectionTitle>
      <SectionSubtitle>Add Credibility</SectionSubtitle>

      <CredibilityForm onSubmit={onSubmit} />
    </div>
  );
}
