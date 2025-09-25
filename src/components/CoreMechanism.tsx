import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownToLine, ChartBarDecreasing, Flame, RefreshCcw, Timer, Clock } from "lucide-react"
import BurnCountdown from "@/components/BurnCountdown"
import BurnloopCountdown from "@/components/BurnloopCountdown"
import BurnloopButton from "@/components/BurnloopButton"

export default function CoreMechanism() {
  return (
    <Card className="border-0 bg-transparent">
      <CardContent className="space-y-4 sm:space-y-6 md:space-y-8 p-0 sm:p-2 md:p-6">

        {/* Protocol Benefits & Active Processes Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <CardContent className="p-2 sm:p-3 md:p-4 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                  <Flame className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-mono font-semibold text-sm sm:text-base tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)] truncate">SUPPLY_REDUCTION</h4>
                  <p className="text-xs sm:text-sm font-mono tracking-wide text-gray-300">
                    <span className="text-orange-400">[</span>DEFLATION_PROTOCOL<span className="text-orange-400">]</span><br/>
                    Reduces $LBP supply
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <CardContent className="p-2 sm:p-3 md:p-4 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                  <ChartBarDecreasing className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-mono font-semibold text-sm sm:text-base tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)] truncate">VOLUME_GROWTH</h4>
                  <p className="text-xs sm:text-sm font-mono tracking-wide text-gray-300">
                    <span className="text-orange-400">[</span>AUTO_AMPLIFY<span className="text-orange-400">]</span><br/>
                    Trading automation
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <CardContent className="p-2 sm:p-3 md:p-4 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                  <RefreshCcw className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-mono font-semibold text-sm sm:text-base tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)] truncate">YIELD_INCENTIVES</h4>
                  <p className="text-xs sm:text-sm font-mono tracking-wide text-gray-300">
                    <span className="text-orange-400">[</span>APY_BOOST<span className="text-orange-400">]</span><br/>
                    Rising fee rewards
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <CardContent className="p-2 sm:p-3 md:p-4 relative z-10">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                  <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="font-mono font-semibold text-sm sm:text-base tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)] truncate">ACTIVE_PROCESSES</h4>
                  <div className="text-xs sm:text-sm font-mono tracking-wide text-gray-300 space-y-1">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full animate-ping flex-shrink-0"></div>
                      <span className="text-xs text-orange-400">[8H_CYCLES]</span>
                    </div>
                    <div className="flex items-center gap-1 sm:gap-2">
                      <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-ping flex-shrink-0"></div>
                      <span className="text-xs text-blue-400">[15MIN_LOOP]</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Unified Yield Reactor Dashboard */}
        <Card className="relative bg-black/60 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_40px_rgba(249,115,22,0.4),inset_0_2px_0_rgba(249,115,22,0.3)] overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/80 after:to-transparent after:animate-pulse">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
            style={{
              backgroundImage: "url('/reactor.png')"
            }}
          />
          <CardHeader className="relative text-center pb-4 sm:pb-6 z-10 px-3 sm:px-6">
            <CardTitle className="text-xl sm:text-2xl md:text-3xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] mb-2 px-2">
              YIELD_REACTOR_DASHBOARD
            </CardTitle>
            <CardDescription className="font-mono tracking-wide text-gray-300 text-xs sm:text-sm md:text-base px-2">
              <span className="text-orange-400">[</span>AUTOMATED_DEFLATIONARY_ENGINE<span className="text-orange-400">]</span><br/>
              Dual burn mechanisms with adaptive cycles
            </CardDescription>
          </CardHeader>

          <CardContent className="relative space-y-6 sm:space-y-8 z-10 px-3 sm:px-6">
            {/* Automation Controls Heading */}
            <div className="text-center">
              <h3 className="text-lg sm:text-xl font-mono font-semibold tracking-wider text-orange-100 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] mb-2">
                AUTOMATION_CONTROLS
              </h3>
              <div className="h-[2px] w-24 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
            </div>

            {/* Main Dashboard Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">

              {/* Left Panel - 8-Hour Cycle */}
              <div className="space-y-3 sm:space-y-4">
                {/* 8-Hour Burn Cycle */}
                <Card className="bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse">
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-ping"></div>
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
                  <CardHeader className="pb-3 sm:pb-4 relative z-10 px-3 sm:px-6">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-sm sm:text-lg font-mono font-semibold tracking-wide text-orange-100 flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                          <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                        </div>
                        <span className="truncate">8H_AUTOMATION_CYCLE</span>
                      </CardTitle>
                      <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-orange-500/20 border border-orange-400/40 rounded text-xs font-mono font-semibold text-orange-400 animate-pulse flex-shrink-0">
                        [LIVE]
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10 px-3 sm:px-6">
                    <BurnCountdown />
                  </CardContent>
                </Card>
              </div>

              {/* Right Panel - Hyperloop */}
              <div className="space-y-3 sm:space-y-4">
                {/* Hyperloop Mechanism */}
                <Card className="bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse">
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-ping"></div>
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
                  <CardHeader className="pb-3 sm:pb-4 relative z-10 px-3 sm:px-6">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-sm sm:text-lg font-mono font-semibold tracking-wide text-orange-100 flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                          <Flame className="h-4 w-4 sm:h-5 sm:w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                        </div>
                        <span className="truncate">HYPERLOOP_MECHANISM</span>
                      </CardTitle>
                      <div className="px-1.5 py-0.5 sm:px-2 sm:py-1 bg-orange-500/20 border border-orange-400/40 rounded text-xs font-mono font-semibold text-blue-400 animate-pulse flex-shrink-0">
                        [15MIN]
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0 relative z-10 px-3 sm:px-6">
                    <BurnloopCountdown />
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Token Mechanism Flow - Bottom Section */}
        <Card className="bg-transparent border-0">
          <CardHeader className="text-center pb-4 sm:pb-6 px-3 sm:px-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)] mb-2 px-2">
              TOKEN_MECHANISM_FLOW
            </CardTitle>
            <CardDescription className="font-mono tracking-wide text-gray-300 text-xs sm:text-sm md:text-base px-2">
              <span className="text-orange-400">[</span>AUTOMATED_4_STEP_PROCESS<span className="text-orange-400">]</span><br/>
              Executed during 8-hour cycles
            </CardDescription>
            <div className="h-[2px] w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse mt-3 sm:mt-4"></div>
          </CardHeader>

          <CardContent className="px-3 sm:px-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Step 1 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-purple-500 rounded-full"></div>
                <CardContent className="p-2 sm:p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <Timer className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-xs sm:text-sm mb-1 sm:mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">CLAIMS_FEES</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>POL_HARVEST<span className="text-orange-400">]</span><br/>
                    Protocol liquidity fees
                  </p>
                  <div className="mt-2 sm:mt-3 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-purple-500/20 border border-purple-400/40 rounded text-xs font-mono font-semibold text-purple-400">
                    STEP_1
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                <CardContent className="p-2 sm:p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <ArrowDownToLine className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-xs sm:text-sm mb-1 sm:mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">WITHDRAWS_1%_POL</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>LP_EXTRACT<span className="text-orange-400">]</span><br/>
                    Protocol owned tokens
                  </p>
                  <div className="mt-2 sm:mt-3 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-blue-500/20 border border-blue-400/40 rounded text-xs font-mono font-semibold text-blue-400">
                    STEP_2
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-orange-500 rounded-full"></div>
                <CardContent className="p-2 sm:p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <Flame className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-xs sm:text-sm mb-1 sm:mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">BURNS_$LBP</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>TOKEN_BURN<span className="text-orange-400">]</span><br/>
                    Withdrawn LP tokens
                  </p>
                  <div className="mt-2 sm:mt-3 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-orange-500/20 border border-orange-400/40 rounded text-xs font-mono font-semibold text-orange-400">
                    STEP_3
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full"></div>
                <CardContent className="p-2 sm:p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <div className="p-1.5 sm:p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-xs sm:text-sm mb-1 sm:mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">RECYCLES_$wS</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>BUYBACK_LOOP<span className="text-orange-400">]</span><br/>
                    Recycle $LBP tokens
                  </p>
                  <div className="mt-2 sm:mt-3 px-1.5 py-0.5 sm:px-2 sm:py-1 bg-green-500/20 border border-green-400/40 rounded text-xs font-mono font-semibold text-green-400">
                    STEP_4
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

      </CardContent>
    </Card>
  )
}