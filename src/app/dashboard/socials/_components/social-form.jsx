import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { socialSchema } from "../_utils/schema";
import InputSelect from "@/components/ui/input-select";
import { socialsType } from "../_utils/social";

export default function SocialForm({ defaultValues, onSubmit }) {
  const form = useForm({
    resolver: zodResolver(socialSchema),
    defaultValues,
  });

  useEffect(() => {
    form.reset({
      type: defaultValues?.type,
      value: defaultValues?.value,
      link: defaultValues?.link,
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
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Social Media</FormLabel>
              <FormControl>
                <InputSelect
                  placeholder="Input type"
                  options={socialsType}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Value</FormLabel>
              <FormControl>
                <Input placeholder="Input value" {...field} />
              </FormControl>
              <FormDescription>
                Example: 08123456789 (WhatsApp), Zplus Official (Youtube),
                @zplus_official (Instagram)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Input link" {...field} />
              </FormControl>
              <FormDescription>
                Example: https://wa.me/08123456789
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="ml-auto">
          {defaultValues ? "Edit Social Media" : "Add Social Media"}
        </Button>
      </form>
    </Form>
  );
}
