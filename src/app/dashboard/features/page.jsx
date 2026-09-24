"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import useNavBreadcrumb from "@/hooks/use-nav-breadcrumb";
import { sectionSchema } from "./_utils/schema";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import Link from "next/link";
import TableFeature from "./_components/table-feature";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Feature() {
  useNavBreadcrumb([{ name: "Featured Feature" }]);

  const form = useForm({
    resolver: zodResolver(sectionSchema),
  });
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedFeature, setSelectedFeature] = React.useState(null);
  const [features, setFeatures] = React.useState([]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);

    try {
      await api.post("/features/section", formData);
      toast.success("Feature updated successfully");
    } catch (error) {
      toast.error("Failed to update feature");
    }
  };

  const getFeatureDetail = async () => {
    try {
      const response = await api.get("/features/section");
      const detail = response.data.data;

      form.reset({
        title: detail.title,
      });
    } catch (error) {
      console.error("GET Feature Error:", error);
    }
  };

  const handleDeleteButton = (feature) => {
    setSelectedFeature(feature);
    setOpenDelete(true);
  };

  const onDeleteFeature = async () => {
    try {
      await api.delete(`/features/${selectedFeature.id}`);
      toast.success("Feature deleted successfully");
      getFeatures();
    } catch (error) {
      toast.error("Failed to delete solution");
    }
  };

  const getFeatures = async () => {
    try {
      const response = await api.get("/features");
      const list = response.data.data;

      setFeatures(list);
    } catch (error) {
      setFeatures([]);
    }
  };

  useEffect(() => {
    getFeatureDetail();
    getFeatures();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteFeature}
      />

      <SectionTitle>Featured Feature</SectionTitle>
      <SectionSubtitle>Section</SectionSubtitle>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-4 mb-6"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Input title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="ml-auto">
            Save
          </Button>
        </form>
      </Form>

      <Separator />

      <div className="flex justify-between mt-6">
        <SectionSubtitle className="mt-0">List of Feature</SectionSubtitle>
        <Button asChild>
          <Link href={URL.DASHBOARD_FEATURES_ADD()}>
            <Plus />
            Add Feature
          </Link>
        </Button>
      </div>

      <TableFeature
        features={features}
        onDeleteButtonClick={handleDeleteButton}
      />
    </div>
  );
}
