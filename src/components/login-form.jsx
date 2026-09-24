"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import api from "@/lib/axios";
import toast from "react-hot-toast";
import { getToken, saveToken } from "@/lib/auth";
import { useEffect, useState } from "react";

const formSchema = z.object({
  username: z.string().min(2, "Username must have at least 2 characters"),
  password: z.string().min(2, "Password must have at least 2 characters"),
});

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const [isReady, setIsReady] = useState(false);

  async function onSubmit(values) {
    try {
      const response = await api.post("/login", values);

      saveToken(response.data.token);
      toast.success("Welcome Admin Dashboard!");
      router.push("/dashboard/welcome");
    } catch (error) {
      toast.error("Failed to login. Username or password is incorrect.");
    }
  }

  useEffect(() => {
    const token = getToken();
    if (token) {
      router.push("/dashboard/welcome");
      return;
    }

    setIsReady(true);
  }, []);

  if (!isReady) return <div className="bg-white fixed z-50 inset-0" />;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("flex flex-col gap-6", className)}
        {...props}
      >
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login Admin Dashboard</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your credentials below to login to your account
          </p>
        </div>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Input username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Input password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Login</Button>
      </form>
    </Form>
  );
}
