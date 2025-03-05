import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

interface CopyableContentProps {
  content: string;
  className?: string;
  children: React.ReactNode;
}

export const CopyableContent = ({ content, className, children }: CopyableContentProps) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(content);
    setHasCopied(true);
    toast.info("Copied to clipboard", { duration: 2000 });

    // Reset the copied state after 2 seconds
    setTimeout(() => {
      setHasCopied(false);
    }, 2000);
  };

  return (
    <div
      onClick={handleCopy}
      className={cn(
        "group inline-flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer hover:bg-muted/60 transition-colors",
        className
      )}
    >
      <div className="flex-1">{children}</div>
      {hasCopied ? (
        <Check className="size-3 text-green-500 shrink-0" />
      ) : (
        <Copy className="size-3 text-muted-foreground group-hover:text-primary shrink-0" />
      )}
    </div>
  );
};
