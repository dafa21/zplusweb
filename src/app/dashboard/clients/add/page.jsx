"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import ClientForm from "../_components/client-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddClient() {
  useNavBreadcrumb([
    { name: "Client", url: URL.DASHBOARD_CLIENTS() },
    { name: "Add Client" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("name", values.name);
    formData.append("description", values.description);

    try {
      await api.post("/clients", formData);
      toast.success("Client added successfully");
      router.push(URL.DASHBOARD_CLIENTS());
    } catch (error) {
      toast.error("Failed to add member");
    }
  };

  return (
    <div>
      <SectionTitle>Client</SectionTitle>
      <SectionSubtitle>Add Client</SectionSubtitle>

      <ClientForm onSubmit={onSubmit} />
    </div>
  );
}
