"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import CredibilityForm from "../../_components/credibility-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function EditCredibility() {
  useNavBreadcrumb([
    { name: "Credibility", url: URL.DASHBOARD_CREDIBILITIES() },
    { name: "Edit Credibility" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [credibility, setCredibility] = React.useState({});

  const onSubmit = async (values) => {
    const payload = {
      description: values.description,
      total: values.total,
    };

    try {
      await api.put(`/credibilities/${params.id}`, payload);
      toast.success("Credibility updated successfully");
      router.push(URL.DASHBOARD_CREDIBILITIES());
    } catch (error) {
      toast.error("Failed to update credbility");
    }
  };

  const getCredibilityDetail = async () => {
    try {
      const response = await api.get(`/credibilities/${params.id}`);
      const detail = response.data.data;
      setCredibility(detail);
    } catch (error) {
      console.error("GET Credibility Error:", error);
    }
  };

  React.useEffect(() => {
    getCredibilityDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Credibility</SectionTitle>
      <SectionSubtitle>Edit Credibility</SectionSubtitle>

      <CredibilityForm onSubmit={onSubmit} defaultValues={credibility} />
    </div>
  );
}
