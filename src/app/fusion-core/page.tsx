'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import FusionCoreMechanism from "@/components/FusionCoreMechanism";

export default function FusionCorePage() {
  return (
    <>
      {/* Background Image Container */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 -z-10"
          style={{
            backgroundImage: "url('/mainback.png')"
          }}
        />

        {/* Content */}
        <main className="relative z-0 flex flex-col gap-6 md:gap-12 items-center max-w-7xl mx-auto px-4 md:px-6 py-6 md:py-12">
          <div className="text-center space-y-6">
            <h1 className="text-3xl md:text-5xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">
              FUSION_CORE
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-base md:text-lg font-mono tracking-wide leading-relaxed text-gray-300 px-4">
                The heart of <span className="text-orange-400">LoopFuse's</span> hyper-deflationary <span className="text-orange-400">DAO mechanism</span>.
                With <span className="text-orange-400">adaptive intervals</span> starting at <span className="text-orange-400">4 hours</span>,
                the <span className="text-orange-400">Fusion Core</span> executes automated <span className="text-orange-400">$LFD burns</span> and
                <span className="text-orange-400">strategic allocation plans</span> to maximize <span className="text-orange-400">token scarcity</span>.
              </p>
            </div>
          </div>

          <div className="w-full space-y-8">
            {/* Fusion Core Mechanism */}
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent>
                <FusionCoreMechanism />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}