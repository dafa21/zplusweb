"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import ClientForm from "../../_components/client-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function EditClient() {
  useNavBreadcrumb([
    { name: "Client", url: URL.DASHBOARD_CLIENTS() },
    { name: "Edit Client" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [client, setClient] = React.useState({});

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("image", values.image[0]);

    try {
      await api.put(`/clients/${params.id}`, formData);
      toast.success("Client updated successfully");
      router.push(URL.DASHBOARD_CLIENTS());
    } catch (error) {
      toast.error("Failed to update client");
    }
  };

  const getClientDetail = async () => {
    try {
      const response = await api.get(`/clients/${params.id}`);
      const detail = response.data.data;
      setClient(detail);
    } catch (error) {
      console.error("GET Client Error:", error);
    }
  };

  React.useEffect(() => {
    getClientDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Client</SectionTitle>
      <SectionSubtitle>Edit Client</SectionSubtitle>

      <ClientForm onSubmit={onSubmit} defaultValues={client} />
    </div>
  );
}
