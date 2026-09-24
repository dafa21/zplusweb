"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { Plus } from "lucide-react";
import Link from "next/link";
import TableModule from "./_components/table-module";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Module() {
  useNavBreadcrumb([{ name: "Module" }]);

  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedModule, setSelectedModule] = React.useState(null);
  const [modules, setModules] = React.useState([]);

  const handleDeleteButton = (module) => {
    setSelectedModule(module);
    setOpenDelete(true);
  };

  const onDeleteModule = async () => {
    try {
      await api.delete(`/modules/${selectedModule.id}`);
      toast.success("Module deleted successfully");
      getModules();
    } catch (error) {
      toast.error("Failed to delete module");
    }
  };

  const getModules = async () => {
    try {
      const response = await api.get("/modules");
      const list = response.data.data;

      setModules(list);
    } catch (error) {
      setModules([]);
    }
  };

  useEffect(() => {
    getModules();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteModule}
      />

      <SectionTitle>Module</SectionTitle>

      <div className="flex justify-between mt-6">
        <SectionSubtitle className="mt-0">List of Module</SectionSubtitle>
        <Button asChild>
          <Link href={URL.DASHBOARD_MODULES_ADD()}>
            <Plus />
            Add Module
          </Link>
        </Button>
      </div>

      <TableModule modules={modules} onDeleteButtonClick={handleDeleteButton} />
    </div>
  );
}
