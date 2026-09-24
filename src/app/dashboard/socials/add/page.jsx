"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import SocialForm from "../_components/social-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddSocial() {
  useNavBreadcrumb([
    { name: "Social Media", url: URL.DASHBOARD_SOCIALS() },
    { name: "Add Social Media" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const payload = {
      type: values.type,
      value: values.value,
      link: values.link,
    };

    try {
      await api.post("/socials", payload);
      toast.success("Social added successfully");
      router.push(URL.DASHBOARD_SOCIALS());
    } catch (error) {
      toast.error("Failed to add social");
    }
  };

  return (
    <div>
      <SectionTitle>Social Media</SectionTitle>
      <SectionSubtitle>Add Social Media</SectionSubtitle>

      <SocialForm onSubmit={onSubmit} />
    </div>
  );
}
