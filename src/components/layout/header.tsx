'use client';

import MobileMenu from '@/components/MobileMenu';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Header() {
  return (
    <header className="border-b-2 border-orange-500/40 bg-black/60 backdrop-blur-sm shadow-[0_0_20px_rgba(249,115,22,0.2)] relative before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-500/5 before:via-transparent before:to-orange-500/5 before:animate-pulse sticky top-0 z-[100]">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4 flex items-center justify-between relative z-10">
        <div className="flex items-center space-x-2 sm:space-x-3">
          <div className="relative">
            <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-sm animate-pulse"></div>
            <Image
              src="/loopburn-logo.png"
              alt="LoopBurn Logo"
              width={100}
              height={100}
              className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 relative z-10"
            />
          </div>
          <span className="text-base sm:text-lg md:text-xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] truncate">LOOPBURN</span>
        </div>

        {/* Desktop Navigation */}
        <TooltipProvider>
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-8">
            <a href="/" className="font-mono tracking-wide text-sm lg:text-base text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 relative group px-2 py-1 rounded">
              <span className="relative z-10">HOME</span>
              <div className="absolute inset-0 bg-orange-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="/explorer" className="font-mono tracking-wide text-sm lg:text-base text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 relative group px-2 py-1 rounded">
              <span className="relative z-10">EXPLORER</span>
              <div className="absolute inset-0 bg-orange-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="/yield-reactor" className="font-mono tracking-wide text-sm lg:text-base text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 relative group px-2 py-1 rounded">
              <span className="relative z-10">YIELD_REACTOR</span>
              <div className="absolute inset-0 bg-orange-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
            <a href="/fusion-core" className="font-mono tracking-wide text-sm lg:text-base text-gray-300 hover:text-orange-400 hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300 relative group px-2 py-1 rounded">
              <span className="relative z-10">FUSION_CORE</span>
              <div className="absolute inset-0 bg-orange-500/10 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </a>
          </nav>
        </TooltipProvider>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  )
}
