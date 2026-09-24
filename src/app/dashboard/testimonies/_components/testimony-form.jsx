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
import { testimonySchema } from "../_utils/schema";
import usePreviewImage from "@/hooks/use-preview-image";

export default function TestimonyForm({ defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(testimonySchema),
    defaultValues,
  });
  const { preview } = usePreviewImage(
    form.watch("image"),
    defaultValues?.image
  );

  useEffect(() => {
    form.reset({
      image: defaultValues?.logo,
      name: defaultValues?.name,
      description: defaultValues?.description,
      institution: defaultValues?.institution,
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Testimony Image</FormLabel>
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
              {preview && (
                <div className="mt-1 space-y-1">
                  <p className="text-sm text-slate-600">Preview:</p>
                  <img src={preview} alt="Preview" className="max-w-lg" />
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
                <Input placeholder="Input description" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="institution"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Institution</FormLabel>
              <FormControl>
                <Input placeholder="Input institution" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto">
          {defaultValues ? "Edit Testimony" : "Add Testimony"}
        </Button>
      </form>
    </Form>
  );
}
