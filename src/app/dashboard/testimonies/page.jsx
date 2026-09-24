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
import TableTestimony from "./_components/table-testimony";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Testimony() {
  useNavBreadcrumb([{ name: "Testimony" }]);

  const form = useForm({
    resolver: zodResolver(sectionSchema),
  });
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedTestimony, setSelectedTestimony] = React.useState(null);
  const [testimonies, setTestimonies] = React.useState([]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);

    try {
      await api.post("/testimonies/section", formData);
      toast.success("Testimony updated successfully");
    } catch (error) {
      toast.error("Failed to update testimony");
    }
  };

  const handleDeleteButton = (testimony) => {
    setSelectedTestimony(testimony);
    setOpenDelete(true);
  };

  const getTestimonyDetail = async () => {
    try {
      const response = await api.get("/testimonies/section");
      const detail = response.data.data;

      form.reset({
        title: detail.title,
      });
    } catch (error) {
      console.error("GET Testimony Error:", error);
    }
  };

  const onDeleteTestimony = async () => {
    try {
      await api.delete(`/testimonies/${selectedTestimony.id}`);
      toast.success("Testimony deleted successfully");
      getTestimonies();
    } catch (error) {
      toast.error("Failed to delete testimony");
    }
  };

  const getTestimonies = async () => {
    try {
      const response = await api.get("/testimonies");
      const list = response.data.data;

      setTestimonies(list);
    } catch (error) {
      setTestimonies([]);
    }
  };

  useEffect(() => {
    getTestimonyDetail();
    getTestimonies();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteTestimony}
      />

      <SectionTitle>Testimony</SectionTitle>
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
        <SectionSubtitle className="mt-0">List of Testimony</SectionSubtitle>
        <Button asChild>
          <Link href={URL.DASHBOARD_TESTIMONIES_ADD()}>
            <Plus />
            Add Testimony
          </Link>
        </Button>
      </div>

      <TableTestimony
        testimonies={testimonies}
        onDeleteButtonClick={handleDeleteButton}
      />
    </div>
  );
}
