"use client";

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { formSchema } from "./_utils/schema";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import { Textarea } from "@/components/ui/textarea";
import api from "@/lib/axios";
import toast from "react-hot-toast";

export default function History() {
  useNavBreadcrumb([{ name: "History" }]);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    const payload = {
      history: values.history,
    };

    try {
      await api.post("/history/section", payload);
      toast.success("History updated successfully");
    } catch (error) {
      toast.error("Failed to update history");
    }
  };

  const getHistory = async () => {
    try {
      const response = await api.get("/history/section");
      const detail = response.data.data;

      form.reset({
        history: detail.history,
      });
    } catch (error) {
      console.error("GET History Error:", error);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);

  return (
    <div>
      <SectionTitle>History</SectionTitle>
      <SectionSubtitle>Section</SectionSubtitle>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-4"
        >
          <FormField
            control={form.control}
            name="history"
            render={({ field }) => (
              <FormItem>
                <FormLabel>History</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-40"
                    placeholder="Input history"
                    {...field}
                  />
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
    </div>
  );
}
