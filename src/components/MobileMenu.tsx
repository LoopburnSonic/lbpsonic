'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(!isOpen)}
        className="relative z-50"
      >
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-md border border-orange-500/20">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-orange-500/5 animate-pulse"></div>
          <nav className="fixed inset-0 flex flex-col items-center justify-center space-y-8 relative z-10">
            <a
              href="/"
              className="text-2xl font-mono font-semibold tracking-wider text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.8)] transition-all duration-300 relative group px-6 py-3 border border-orange-500/30 rounded bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-400/60"
              onClick={() => setIsOpen(false)}
            >
              HOME
            </a>
            <a
              href="/explorer"
              className="text-2xl font-mono font-semibold tracking-wider text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.8)] transition-all duration-300 relative group px-6 py-3 border border-orange-500/30 rounded bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-400/60"
              onClick={() => setIsOpen(false)}
            >
              EXPLORER
            </a>
            <a
              href="/yield-reactor"
              className="text-2xl font-mono font-semibold tracking-wider text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.8)] transition-all duration-300 relative group px-6 py-3 border border-orange-500/30 rounded bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-400/60"
              onClick={() => setIsOpen(false)}
            >
              YIELD_REACTOR
            </a>
            <a
              href="/fusion-core"
              className="text-2xl font-mono font-semibold tracking-wider text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.8)] transition-all duration-300 relative group px-6 py-3 border border-orange-500/30 rounded bg-orange-500/10 hover:bg-orange-500/20 hover:border-orange-400/60"
              onClick={() => setIsOpen(false)}
            >
              FUSION_CORE
            </a>
          </nav>
        </div>
      )}
    </div>
  );
}
