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

export default function VisionAndMission() {
  useNavBreadcrumb([{ name: "Vision And Mission" }]);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (values) => {
    const payload = {
      vision: values.vision,
      mission: values.mission,
    };

    try {
      await api.post("/vision-and-mission/section", payload);
      toast.success("Vission and mission updated successfully");
    } catch (error) {
      toast.error("Failed to update vision and mission");
    }
  };

  const getVissionMission = async () => {
    try {
      const response = await api.get("/vision-and-mission/section");
      const detail = response.data.data;

      form.reset({
        vision: detail.vision,
        mission: detail.mission,
      });
    } catch (error) {
      console.error("GET Vission And Mission Error:", error);
    }
  };

  useEffect(() => {
    getVissionMission();
  }, []);

  return (
    <div>
      <SectionTitle>Vision and Mission</SectionTitle>
      <SectionSubtitle>Section</SectionSubtitle>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-4"
        >
          <FormField
            control={form.control}
            name="vision"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vision</FormLabel>
                <FormControl>
                  <Textarea placeholder="Input vision" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mission"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mission</FormLabel>
                <FormControl>
                  <Textarea
                    className="h-24"
                    placeholder="Input mission"
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
