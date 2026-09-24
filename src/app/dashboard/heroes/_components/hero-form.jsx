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
import { heroSchema } from "../_utils/schema";
import usePreviewImage from "@/hooks/use-preview-image";

export default function HeroForm({ defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(heroSchema),
    defaultValues,
  });
  const { preview: previewDesktop } = usePreviewImage(
    form.watch("imageDesktop"),
    defaultValues?.imageDesktop
  );
  const { preview: previewMobile } = usePreviewImage(
    form.watch("imageMobile"),
    defaultValues?.imageMobile
  );

  useEffect(() => {
    form.reset({
      imageDesktop: defaultValues?.imageDesktop,
      imageMobile: defaultValues?.imageMobile,
      title: defaultValues?.title,
      description: defaultValues?.description,
    });
  }, [defaultValues]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6 mt-4"
      >
        <FormField
          control={form.control}
          name="imageDesktop"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Image Desktop</FormLabel>
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
              {previewDesktop && (
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-slate-600">Preview:</p>
                  <img
                    src={previewDesktop}
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
          name="imageMobile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hero Image Mobile</FormLabel>
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
              {previewMobile && (
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-slate-600">Preview:</p>
                  <img
                    src={previewMobile}
                    alt="Preview"
                    className="max-w-2xs"
                  />
                </div>
              )}
            </FormItem>
          )}
        />
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
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="Input description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto">
          {defaultValues ? "Edit Hero" : "Add Hero"}
        </Button>
      </form>
    </Form>
  );
}
