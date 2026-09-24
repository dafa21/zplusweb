"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import MemberForm from "../../_components/member-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function EditMember() {
  useNavBreadcrumb([
    { name: "Team", url: URL.DASHBOARD_MEMBERS() },
    { name: "Edit Member" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [member, setMember] = React.useState({});

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("role", values.role);
    formData.append("image", values.image[0]);

    try {
      await api.put(`/members/${params.id}`, formData);
      toast.success("Member updated successfully");
      router.push(URL.DASHBOARD_MEMBERS());
    } catch (error) {
      toast.error("Failed to update member");
    }
  };

  const getMemberDetail = async () => {
    try {
      const response = await api.get(`/members/${params.id}`);
      const detail = response.data.data;
      setMember(detail);
    } catch (error) {
      console.error("GET Member Error:", error);
    }
  };

  React.useEffect(() => {
    getMemberDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Team</SectionTitle>
      <SectionSubtitle>Edit Member</SectionSubtitle>

      <MemberForm onSubmit={onSubmit} defaultValues={member} />
    </div>
  );
}
