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
import usePreviewImage from "@/hooks/use-preview-image";
import { formSchema } from "./_utils/schema";
import { SectionSubtitle, SectionTitle } from "@/components/ui/section";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";

export default function Identity() {
  useNavBreadcrumb([{ name: "Identity" }]);

  const form = useForm({
    resolver: zodResolver(formSchema),
  });
  const { preview: previewFavicon } = usePreviewImage(form.watch("favicon"));
  const { preview: previewLogo } = usePreviewImage(form.watch("logo"));

  const onSubmit = async (values) => {
    const formData = new FormData();
    formData.append("favicon", values.favicon[0]);
    formData.append("logo", values.logo[0]);
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("email", values.email);
    formData.append("address", values.address);
    formData.append("phone_number", values.phone_number);

    try {
      await api.post("/identity/section", formData);
      toast.success("Identity updated successfully");
    } catch (error) {
      toast.error("Failed to update identity");
    }
  };

  const getIdentityDetail = async () => {
    try {
      const response = await api.get("/identity/section");
      const detail = response.data.data;

      form.reset({
        favicon: detail.favicon,
        logo: detail.logo,
        name: detail.name,
        description: detail.description,
        email: detail.email,
        address: detail.address,
        phone_number: detail.phone_number,
      });
    } catch (error) {
      console.error("GET Identity Error:", error);
    }
  };

  useEffect(() => {
    getIdentityDetail();
  }, []);

  return (
    <div>
      <SectionTitle>Identity</SectionTitle>
      <SectionSubtitle>Section</SectionSubtitle>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col gap-6 mt-4"
        >
          <FormField
            control={form.control}
            name="favicon"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Favicon</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
                {previewFavicon && (
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-slate-600">Preview:</p>
                    <img
                      src={previewFavicon}
                      alt="Preview"
                      className="max-w-lg"
                    />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="logo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Logo</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                    }}
                  />
                </FormControl>
                <FormMessage />
                {previewLogo && (
                  <div className="mt-1 space-y-1">
                    <p className="text-sm text-slate-600">Preview:</p>
                    <img src={previewLogo} alt="Preview" className="max-w-lg" />
                  </div>
                )}
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Input name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Input description" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="Input email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input placeholder="Input phone number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address</FormLabel>
                <FormControl>
                  <Textarea placeholder="Input address" {...field} />
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
