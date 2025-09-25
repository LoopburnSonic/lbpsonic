'use client';

import { useState } from 'react';
import { Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CopyButtonProps {
  text: string;
}

export default function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
      toast({
        title: "Copy failed",
        description: "Failed to copy to clipboard. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <button
      onClick={copyToClipboard}
      className="p-1.5 sm:p-2 hover:bg-gray-700/20 rounded-full transition-colors"
      title="Copy contract address"
    >
      {copied ? (
        <Check className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
      ) : (
        <Copy className="h-4 w-4 sm:h-5 sm:w-5" />
      )}
    </button>
  );
}