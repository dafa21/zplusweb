"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import SolutionForm from "../../_components/solution-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function EditSolution() {
  useNavBreadcrumb([
    { name: "Problem and Solution", url: URL.DASHBOARD_PROBLEMS() },
    { name: "Edit Solution" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [solution, setSolution] = React.useState({});

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("image", values.image[0]);

    try {
      await api.put(`/solutions/${params.id}`, formData);
      toast.success("Solution updated successfully");
      router.push(URL.DASHBOARD_PROBLEMS());
    } catch (error) {
      toast.error("Failed to update solution");
    }
  };

  const getSolutionDetail = async () => {
    try {
      const response = await api.get(`/solutions/${params.id}`);
      const detail = response.data.data;
      setSolution(detail);
    } catch (error) {
      console.error("GET Solution Error:", error);
    }
  };

  React.useEffect(() => {
    getSolutionDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Problem and Solution</SectionTitle>
      <SectionSubtitle>Edit Solution</SectionSubtitle>

      <SolutionForm onSubmit={onSubmit} defaultValues={solution} />
    </div>
  );
}
