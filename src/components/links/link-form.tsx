import { isValidSlug, isValidUrl } from "@/lib/validator";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { LinkType } from "@/db/schema";
import { createLinkWithSlug, updateLinkById } from "@/services/links";

const LinkFormSchema = z.object({
  link: z
    .string()
    .min(2, { message: "Min. 2 character" })
    .refine((s) => isValidUrl(s), { message: "Invalid URL" }),
  slug: z
    .string()
    .optional()
    .refine((s) => isValidSlug(s), { message: "Invalid Slug" }),
});

type LinkFormType = z.infer<typeof LinkFormSchema>;
type Props = {
  link?: LinkType;
  onSuccess: VoidFunction;
};

export const LinkForm = ({ link, onSuccess }: Props) => {
  const form = useForm<LinkFormType>({
    resolver: zodResolver(LinkFormSchema),
    defaultValues: { link: link?.link ?? "", slug: link?.slug ?? "" },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: LinkFormType) => {
    setIsLoading(true);
    try {
      if (!link) {
        await createLinkWithSlug(values.link, values.slug ?? "");
      } else {
        await updateLinkById(link.id, values.link, values.slug ?? "");
      }
      toast.success("Link telah di submit");
      onSuccess();
    } catch (error) {
      toast.error("Link gagal di submit");
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col w-full gap-2"
      >
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">{field.name}</FormLabel>
              <FormControl>
                <Input placeholder="Cth: https://google.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="capitalize">
                {field.name} (Opsional)
              </FormLabel>
              <FormControl>
                <Input placeholder="Cth: my-link" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={isLoading} className="mt-3">
          {isLoading ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};
