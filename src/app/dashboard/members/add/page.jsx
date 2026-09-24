"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useRouter } from "next/navigation";
import MemberForm from "../_components/member-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function AddMember() {
  useNavBreadcrumb([
    { name: "Team", url: URL.DASHBOARD_MEMBERS() },
    { name: "Add Member" },
  ]);

  const router = useRouter();

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", values.image[0]);
    formData.append("name", values.name);
    formData.append("role", values.role);

    try {
      await api.post("/members", formData);
      toast.success("Member added successfully");
      router.push(URL.DASHBOARD_MEMBERS());
    } catch (error) {
      toast.error("Failed to add member");
    }
  };

  return (
    <div>
      <SectionTitle>Team</SectionTitle>
      <SectionSubtitle>Add Member</SectionSubtitle>

      <MemberForm onSubmit={onSubmit} />
    </div>
  );
}
