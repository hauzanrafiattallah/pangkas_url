"use client";

import { LinkType } from "@/db/schema";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LinkForm } from "./link-form";

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  link?: LinkType;
};

export const LinkFormDialog = ({ open, onOpenChange, link }: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{link ? "Edit Link" : "Create Link"}</DialogTitle>
        </DialogHeader>
        <LinkForm link={link} onSuccess={() => onOpenChange(false)} />
      </DialogContent>
    </Dialog>
  );
};
