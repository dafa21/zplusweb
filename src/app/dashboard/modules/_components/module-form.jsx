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
import { moduleSchema } from "../_utils/schema";
import usePreviewImage from "@/hooks/use-preview-image";

export default function ModuleForm({ defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(moduleSchema),
    defaultValues,
  });
  const { preview } = usePreviewImage(
    form.watch("image"),
    defaultValues?.image
  );

  useEffect(() => {
    form.reset({
      image: defaultValues?.image,
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
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Module Image</FormLabel>
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
                  <img src={preview} alt="Preview" className="max-h-96" />
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
          {defaultValues ? "Edit Module" : "Add Module"}
        </Button>
      </form>
    </Form>
  );
}
