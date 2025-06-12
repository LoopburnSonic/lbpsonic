'use client';

import TokenInformation from "@/components/TokenInformation";
import CoreMechanism from "@/components/CoreMechanism";

export default function ExplorerPage() {
  return (
    <>
      {/* Mobile-only top spacer */}
      <div className="h-8 sm:hidden"></div>

      <main className="flex flex-col gap-6 sm:gap-16 items-center max-w-7xl mx-auto px-4 sm:px-4 py-4 sm:py-8">
        <h1 className="text-2xl sm:text-4xl font-bold text-center">LoopBurn Explorer</h1>
      <div className="space-y-4">

                <p className="text-center text-muted-foreground text-sm sm:text-base px-2">
                  Track LoopBurn's deflationary mechanics in real-time. Monitor burns, supply reduction, <br className="hidden sm:block"></br>and the automated yield reactor's impact on token scarcity and value.
                </p>
              </div>
        <div className="w-full space-y-6 sm:space-y-8">
          <TokenInformation />
        </div>
      </main>
    </>
  );
}