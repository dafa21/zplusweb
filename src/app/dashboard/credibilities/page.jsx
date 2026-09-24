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
import TableCredibility from "./_components/table-credibility";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Credibility() {
  useNavBreadcrumb([{ name: "Credibility" }]);

  const form = useForm({
    resolver: zodResolver(sectionSchema),
  });
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedCredibility, setSelectedCredibility] = React.useState(null);
  const [credibilities, setCredibilities] = React.useState([]);

  const onSubmit = async (values) => {
    const payload = {
      title: values.title,
    };

    try {
      await api.post("/credibilities/section", payload);
      toast.success("Credibility updated successfully");
    } catch (error) {
      toast.error("Failed to update credbility");
    }
  };

  const getCredibilityDetail = async () => {
    try {
      const response = await api.get("/credibilities/section");
      const detail = response.data.data;

      form.reset({
        title: detail.title,
      });
    } catch (error) {
      console.error("GET Credibility Error:", error);
    }
  };

  const handleDeleteButton = (credibility) => {
    setSelectedCredibility(credibility);
    setOpenDelete(true);
  };

  const onDeleteCredibility = async () => {
    try {
      await api.delete(`/credibilities/${selectedCredibility.id}`);
      toast.success("Credibility deleted successfully");
      getCredibilities();
    } catch (error) {
      toast.error("Failed to delete solution");
    }
  };

  const getCredibilities = async () => {
    try {
      const response = await api.get("/credibilities");
      const list = response.data.data;

      setCredibilities(list);
    } catch (error) {
      setCredibilities([]);
    }
  };

  useEffect(() => {
    getCredibilityDetail();
    getCredibilities();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteCredibility}
      />

      <SectionTitle>Credibility</SectionTitle>
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
        <SectionSubtitle className="mt-0">List of Credibility</SectionSubtitle>
        <Button asChild>
          <Link href={URL.DASHBOARD_CREDIBILITIES_ADD()}>
            <Plus />
            Add Credibility
          </Link>
        </Button>
      </div>

      <TableCredibility
        credibilities={credibilities}
        onDeleteButtonClick={handleDeleteButton}
      />
    </div>
  );
}
