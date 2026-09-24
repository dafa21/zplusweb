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
import { memberSchema } from "../_utils/schema";
import usePreviewImage from "@/hooks/use-preview-image";

export default function MemberForm({ defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(memberSchema),
    defaultValues,
  });
  const { preview } = usePreviewImage(
    form.watch("image"),
    defaultValues?.image
  );

  useEffect(() => {
    form.reset({
      image: defaultValues?.image,
      name: defaultValues?.name,
      role: defaultValues?.role,
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
              <FormLabel>Member Image</FormLabel>
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
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role</FormLabel>
              <FormControl>
                <Input placeholder="Input role" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto">
          {defaultValues ? "Edit Member" : "Add Member"}
        </Button>
      </form>
    </Form>
  );
}
