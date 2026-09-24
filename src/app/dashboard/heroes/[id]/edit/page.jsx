"use client";

import React from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import HeroForm from "../../_components/hero-form";

export default function EditHero() {
  useNavBreadcrumb([
    { name: "Hero", url: URL.DASHBOARD_HEROES() },
    { name: "Edit Hero" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [hero, setHero] = React.useState({});

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("imageDesktop", values.imageDesktop[0]);
    formData.append("imageMobile", values.imageMobile[0]);

    try {
      await api.put(`/heroes/${params.id}`, formData);
      toast.success("Hero updated successfully");
      router.push(URL.DASHBOARD_HEROES());
    } catch (error) {
      toast.error("Failed to update hero");
    }
  };

  const getHeroDetail = async () => {
    try {
      const response = await api.get(`/heroes/${params.id}`);
      const detail = response.data.data;
      setHero(detail);
    } catch (error) {
      console.error("GET Hero Error:", error);
    }
  };

  React.useEffect(() => {
    getHeroDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Hero</SectionTitle>
      <SectionSubtitle>Edit Hero</SectionSubtitle>

      <HeroForm onSubmit={onSubmit} defaultValues={hero} />
    </div>
  );
}
