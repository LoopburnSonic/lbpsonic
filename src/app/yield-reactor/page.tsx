'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CoreMechanism from "@/components/CoreMechanism";

export default function YieldReactorPage() {
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
        <main className="relative z-0 flex flex-col gap-4 sm:gap-6 md:gap-12 items-center max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-2xl sm:text-3xl md:text-5xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] px-2">
              YIELD_REACTOR
            </h1>
            <div className="max-w-4xl mx-auto px-2">
              <p className="text-sm sm:text-base md:text-lg font-mono tracking-wide leading-relaxed text-gray-300 px-2 sm:px-4">
                The heart of <span className="text-orange-400">LoopBurn's</span> automated <span className="text-orange-400">deflationary engine</span>.
                Every <span className="text-orange-400">8 hours</span>, the <span className="text-orange-400">Yield Reactor</span> executes
                <span className="text-orange-400"> burn cycles</span> and <span className="text-orange-400">volume amplification</span> to create
                sustainable <span className="text-orange-400">yield</span> and <span className="text-orange-400">token scarcity</span>.
              </p>
            </div>
          </div>

          <div className="w-full space-y-6 sm:space-y-8">
            <Card className="border-0 bg-transparent shadow-none">
              <CardContent>
                <CoreMechanism />
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </>
  );
}