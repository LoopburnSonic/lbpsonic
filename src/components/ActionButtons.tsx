'use client';

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ExternalLink, Flame, Zap, Target } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ActionButtons() {
  const router = useRouter();

  const handleYieldReactorRedirect = () => {
    // Redirect to yield reactor page
    router.push('/yield-reactor');
  };

  const handleTradeRedirect = () => {
    // Redirect to Shadow DEX with LBP trading pair
    window.open('https://www.shadow.so/trade?inputCurrency=0x0000000000000000000000000000000000000000&outputCurrency=0x001bFF4b6da770f445A740227224D3c8b48e6fb2', '_blank', 'noopener,noreferrer');
  };

  const handleFusionCoreRedirect = () => {
    // Redirect to fusion core page
    router.push('/fusion-core');
  };

  const handleLFDTradeRedirect = () => {
    // Redirect to Shadow DEX with LFD trading pair
    window.open('https://www.shadow.so/trade?inputCurrency=0x0000000000000000000000000000000000000000&outputCurrency=0xdb6a2fc2bc6e77d9fdfdfc588befdbb9c055bede', '_blank', 'noopener,noreferrer');
  };

  return (
    <TooltipProvider>
      <div className="w-full">
        {/* Single Row of 4 Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                className="border border-orange-500/30 hover:bg-orange-500/10 text-foreground font-medium shadow-md hover:shadow-lg transition-all duration-300 px-3 py-2 text-xs sm:text-sm rounded-lg bg-gradient-to-r from-orange-600/20 to-red-600/20 hover:from-orange-600/30 hover:to-red-600/30"
                onClick={handleYieldReactorRedirect}
              >
                <Flame className="h-3 w-3 mr-1" />
                Hyper Loop
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to Yield Reactor to execute hyperloop and manage burn mechanisms</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border border-orange-500/30 hover:bg-orange-500/10 hover:text-white text-foreground font-medium shadow-md hover:shadow-lg transition-all duration-300 px-3 py-2 text-xs sm:text-sm rounded-lg"
                onClick={handleTradeRedirect}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Trade LBP
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Trade $LBP on Shadow DEX - Opens in new tab</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                className="border border-blue-500/30 hover:bg-blue-500/10 text-foreground font-medium shadow-md hover:shadow-lg transition-all duration-300 px-3 py-2 text-xs sm:text-sm rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 hover:from-blue-600/30 hover:to-purple-600/30"
                onClick={handleFusionCoreRedirect}
              >
                <Target className="h-3 w-3 mr-1" />
                Fusion Core
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Go to Fusion Core to execute burns and manage DAO strategies</p>
            </TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="border border-blue-500/30 hover:bg-blue-500/10 hover:text-white text-foreground font-medium shadow-md hover:shadow-lg transition-all duration-300 px-3 py-2 text-xs sm:text-sm rounded-lg"
                onClick={handleLFDTradeRedirect}
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                Trade LFD
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Trade $LFD on Shadow DEX - Opens in new tab</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}
