"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import SocialForm from "../../_components/social-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function EditSocial() {
  useNavBreadcrumb([
    { name: "Social Media", url: URL.DASHBOARD_SOCIALS() },
    { name: "Edit Social Media" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [social, setSocial] = React.useState({});

  const onSubmit = async (values) => {
    const payload = {
      type: values.type,
      value: values.value,
      link: values.link,
    };

    try {
      await api.put(`/socials/${params.id}`, payload);
      toast.success("Social updated successfully");
      router.push(URL.DASHBOARD_SOCIALS());
    } catch (error) {
      toast.error("Failed to update social");
    }
  };

  const getSocialDetail = async () => {
    try {
      const response = await api.get(`/socials/${params.id}`);
      const detail = response.data.data;
      setSocial(detail);
    } catch (error) {
      console.error("GET Social Error:", error);
    }
  };

  React.useEffect(() => {
    getSocialDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Social Media</SectionTitle>
      <SectionSubtitle>Edit Social Media</SectionSubtitle>

      <SocialForm onSubmit={onSubmit} defaultValues={social} />
    </div>
  );
}
