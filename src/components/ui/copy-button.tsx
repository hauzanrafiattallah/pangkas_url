"use client"

import { Copy } from "lucide-react";
import { Button } from "./button";

type Props = {
  className?: string;
  textToCopy: string;
  onCopied: VoidFunction;
};

export const CopyButton = ({ className, textToCopy, onCopied }: Props) => {
  const copy = () => {
    navigator.clipboard.writeText(textToCopy);
    onCopied();
  };
  return (
    <Button className={className} variant="ghost" size="icon-sm" onClick={copy}>
      <Copy />
    </Button>
  );
};
