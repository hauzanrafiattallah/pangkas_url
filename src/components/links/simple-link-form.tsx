"use client";

import { isValidUrl } from "@/lib/validator";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Scissors } from "lucide-react";
import { createSimpleLink } from "@/services/links";
import { useState } from "react";
import { toast } from "sonner";

const SimpleLinkFormSchema = z.object({
  link: z
    .string()
    .min(2, "Link is too short")
    .max(2048, "Link is too long")
    .refine((URL) => isValidUrl(URL), { message: "Invalid URL" }),
});

type SimpleLinkFormType = z.infer<typeof SimpleLinkFormSchema>;

const SimpleLinkForm = () => {
  const form = useForm<SimpleLinkFormType>({
    resolver: zodResolver(SimpleLinkFormSchema),
    defaultValues: { link: "" },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: SimpleLinkFormType) => {
    setIsLoading(true);
    try {
      await createSimpleLink(values.link);
      toast.success("Link berhasil dipangkas");
    } catch (error) {
      toast.error("Gagal memangkas link");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex w-full mt-12 mx-auto px-4 justify-center gap-2"
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  className="flex-1 sm:w-96"
                  placeholder="Masukan Link di sini"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading}>
          <Scissors />
          {isLoading ? "Memangkas..." : "Pangkas"}
        </Button>
      </form>
    </Form>
  );
};

export default SimpleLinkForm;
