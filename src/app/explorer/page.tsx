'use client';

import TokenInformation from "@/components/TokenInformation";

export default function ExplorerPage() {
  return (
    <>
      {/* Mobile-only top spacer */}
      <div className="h-8 sm:hidden"></div>

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
        <main className="relative z-0 flex flex-col gap-4 sm:gap-8 md:gap-16 items-center max-w-7xl mx-auto px-3 sm:px-4 md:px-6 py-4 sm:py-6 md:py-12">
          <div className="text-center space-y-4 sm:space-y-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] px-2">
              LOOPBURN_+_LOOPFUSE_EXPLORER
            </h1>
            <div className="max-w-4xl mx-auto px-2">
              <p className="text-sm sm:text-base md:text-lg font-mono tracking-wide leading-relaxed text-gray-300 px-2 sm:px-4">
                Track both <span className="text-orange-400">LoopBurn ($LBP)</span> and <span className="text-orange-400">LoopFuse ($LFD)</span> deflationary mechanics in <span className="text-orange-400">real-time</span>.
                Monitor <span className="text-orange-400">burns</span>, <span className="text-orange-400">supply reduction</span>, automated <span className="text-orange-400">yield reactor operations</span>,
                and <span className="text-orange-400">fusion core strategies</span> that drive maximum <span className="text-orange-400">token scarcity</span> and <span className="text-orange-400">value</span>.
              </p>
            </div>
          </div>
          <div className="w-full space-y-4 sm:space-y-6 md:space-y-8">
            <TokenInformation />
          </div>
        </main>
      </div>
    </>
  );
}