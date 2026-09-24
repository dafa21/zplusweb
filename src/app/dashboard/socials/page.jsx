"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { Plus } from "lucide-react";
import Link from "next/link";
import TableSocial from "./_components/table-social";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Social() {
  useNavBreadcrumb([{ name: "Social Media" }]);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedSocial, setSelectedSocial] = React.useState(null);
  const [socials, setSocials] = React.useState([]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);

    try {
      await api.post("/socials/section", formData);
      toast.success("Social updated successfully");
    } catch (error) {
      toast.error("Failed to update feature");
    }
  };

  const handleDeleteButton = (credibility) => {
    setSelectedSocial(credibility);
    setOpenDelete(true);
  };

  const onDeleteSocial = async () => {
    try {
      await api.delete(`/socials/${selectedSocial.id}`);
      toast.success("Social deleted successfully");
      getSocials();
    } catch (error) {
      toast.error("Failed to delete solution");
    }
  };

  const getSocials = async () => {
    try {
      const response = await api.get("/socials");
      const list = response.data.data;

      setSocials(list);
    } catch (error) {
      setSocials([]);
    }
  };

  useEffect(() => {
    getSocials();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteSocial}
      />

      <SectionTitle>Social Media</SectionTitle>

      <div className="flex justify-between mt-6">
        <SectionSubtitle className="mt-0">List of Social Media</SectionSubtitle>
        <Button asChild>
          <Link href={URL.DASHBOARD_SOCIALS_ADD()}>
            <Plus />
            Add Social Media
          </Link>
        </Button>
      </div>

      <TableSocial socials={socials} onDeleteButtonClick={handleDeleteButton} />
    </div>
  );
}
