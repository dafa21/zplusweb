"use client";

import React, { useEffect, useState } from "react";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { URL } from "@/lib/menu";
import { useParams, useRouter } from "next/navigation";
import ModuleForm from "../../_components/module-form";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import TableFeature from "../../_components/table-feature";
import DeleteConfirmFeature from "../../_components/delete-confirm-feature";

export default function EditModule() {
  useNavBreadcrumb([
    { name: "Module", url: URL.DASHBOARD_MODULES() },
    { name: "Edit Module" },
  ]);

  const router = useRouter();
  const params = useParams();
  const [module, setModule] = useState({});
  const [features, setFeatures] = useState([]);
  const [selectedFeauture, setSelectedFeauture] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);

  const onDeleteFeature = async () => {
    try {
      await api.delete(`/modules/${selectedFeauture.id}`);
      toast.success("Feature deleted successfully");
      getModuleFeatures();
    } catch (error) {
      toast.error("Failed to delete feature");
    }
  };

  const handleDeleteButton = (module) => {
    setSelectedFeauture(module);
    setOpenDelete(true);
  };

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("image", values.image[0]);

    try {
      await api.put(`/modules/${params.id}`, formData);
      toast.success("Module updated successfully");
      router.push(URL.DASHBOARD_MODULES());
    } catch (error) {
      toast.error("Failed to update module");
    }
  };

  const getModuleDetail = async () => {
    try {
      const response = await api.get(`/modules/${params.id}`);
      const detail = response.data.data;
      setModule(detail);
    } catch (error) {
      console.error("GET Module Error:", error);
    }
  };

  const getModuleFeatures = async () => {
    try {
      const response = await api.get(`/modules/${params.id}/features`);
      const detail = response.data.data;
      setFeatures(detail);
    } catch (error) {
      console.error("GET Feature Error:", error);
    }
  };

  useEffect(() => {
    getModuleDetail();
    getModuleFeatures();
  }, []);

  return (
    <div>
      <DeleteConfirmFeature
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteFeature}
      />

      <SectionTitle>Module</SectionTitle>
      <div className="grid lg:grid-cols-2 gap-4">
        <div>
          <SectionSubtitle>Edit Module</SectionSubtitle>

          <ModuleForm onSubmit={onSubmit} defaultValues={module} />
        </div>

        <div className="lg:pl-4 lg:border-l border-slate-200">
          <div className="flex justify-between mt-6">
            <SectionSubtitle className="mt-0">List of Feature</SectionSubtitle>
            <Button asChild>
              <Link href={URL.DASHBOARD_MODULE_FEATURES_ADD(params.id)}>
                <Plus />
                Add Feature
              </Link>
            </Button>
          </div>

          <TableFeature
            id={params.id}
            features={features}
            onDeleteButtonClick={handleDeleteButton}
          />
        </div>
      </div>
    </div>
  );
}
