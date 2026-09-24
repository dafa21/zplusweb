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
import TableSolution from "./_components/table-solution";
import DeleteConfirm from "./_components/delete-confirm";
import { URL } from "@/lib/menu";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function Solution() {
  useNavBreadcrumb([{ name: "Problem and Solution" }]);

  const form = useForm({
    resolver: zodResolver(sectionSchema),
  });
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedSolution, setSelectedSolution] = React.useState(null);
  const [solutions, setSolutions] = React.useState([]);

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("title", values.title);

    try {
      await api.post("/solutions/section", formData);
      toast.success("Solution updated successfully");
    } catch (error) {
      toast.error("Failed to update solution");
    }
  };

  const handleDeleteButton = (solution) => {
    setSelectedSolution(solution);
    setOpenDelete(true);
  };

  const getSolutionDetail = async () => {
    try {
      const response = await api.get("/solutions/section");
      const detail = response.data.data;

      form.reset({
        title: detail.title,
      });
    } catch (error) {
      console.error("GET Solution Error:", error);
    }
  };

  const onDeleteSolution = async () => {
    try {
      await api.delete(`/solutions/${selectedSolution.id}`);
      toast.success("Solution deleted successfully");
      getSolutions();
    } catch (error) {
      toast.error("Failed to delete solution");
    }
  };

  const getSolutions = async () => {
    try {
      const response = await api.get("/solutions");
      const list = response.data.data;

      setSolutions(list);
    } catch (error) {
      setSolutions([]);
    }
  };

  useEffect(() => {
    getSolutionDetail();
    getSolutions();
  }, []);

  return (
    <div>
      <DeleteConfirm
        open={openDelete}
        setOpen={setOpenDelete}
        onDelete={onDeleteSolution}
      />

      <SectionTitle>Problem and Solution</SectionTitle>
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
        <SectionSubtitle className="mt-0">List of Solution</SectionSubtitle>
        <Button asChild>
          <Link href={URL.DASHBOARD_PROBLEMS_ADD()}>
            <Plus />
            Add Solution
          </Link>
        </Button>
      </div>

      <TableSolution
        solutions={solutions}
        onDeleteButtonClick={handleDeleteButton}
      />
    </div>
  );
}
