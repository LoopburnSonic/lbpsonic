import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowDownToLine, ChartBarDecreasing, Flame, RefreshCcw, Timer, Clock, TrendingUp } from "lucide-react"
import BurnCountdown from "@/components/BurnCountdown"
import BurnloopCountdown from "@/components/BurnloopCountdown"
import BurnloopButton from "@/components/BurnloopButton"
import FusionCoreDashboard from "@/components/FusionCoreDashboard"

export default function FusionCoreMechanism() {
  return (
    <Card className="border-0 bg-transparent">
      <CardContent className="space-y-4 md:space-y-8 p-0 md:p-6">

        {/* Protocol Benefits & Active Processes Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <CardContent className="p-3 md:p-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Flame className="h-6 w-6 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-mono font-semibold text-base tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">ADAPTIVE_BURNING</h4>
                  <p className="text-sm font-mono tracking-wide text-gray-300">
                    <span className="text-orange-400">[</span>BURNFUSE_PROTOCOL<span className="text-orange-400">]</span><br/>
                    Adaptive intervals
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <CardContent className="p-3 md:p-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <ChartBarDecreasing className="h-6 w-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-mono font-semibold text-base tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">FEE_COLLECTION</h4>
                  <p className="text-sm font-mono tracking-wide text-gray-300">
                    <span className="text-orange-400">[</span>FUSECOLLECTOR<span className="text-orange-400">]</span><br/>
                    Claims POL fees
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <CardContent className="p-3 md:p-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <RefreshCcw className="h-6 w-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)] flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-mono font-semibold text-base tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">STRATEGY_CONTROL</h4>
                  <p className="text-sm font-mono tracking-wide text-gray-300">
                    <span className="text-orange-400">[</span>CHANGERATES<span className="text-orange-400">]</span><br/>
                    Multisig control
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
            <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
            <CardContent className="p-3 md:p-4 relative z-10">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Clock className="h-6 w-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)] flex-shrink-0" />
                </div>
                <div>
                  <h4 className="font-mono font-semibold text-base tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">ACTIVE_PROCESSES</h4>
                  <div className="text-sm font-mono tracking-wide text-gray-300 space-y-1">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                      <span className="text-xs text-orange-400">[ADAPTIVE_INT]</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                      <span className="text-xs text-blue-400">[1H_COOLDOWN]</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Fusion Core Dashboard */}
        <Card className="relative bg-black/60 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_40px_rgba(249,115,22,0.4),inset_0_2px_0_rgba(249,115,22,0.3)] overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/80 after:to-transparent after:animate-pulse">
          {/* Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-5"
            style={{
              backgroundImage: "url('/loopfuseback.png')"
            }}
          />
          <CardHeader className="relative text-center pb-6 z-10">
            <CardTitle className="text-3xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] mb-2">
              FUSION_CORE_DASHBOARD
            </CardTitle>
            <CardDescription className="font-mono tracking-wide text-gray-300 text-base">
              <span className="text-orange-400">[</span>REAL_TIME_HYPER_DEFLATIONARY_DAO<span className="text-orange-400">]</span><br/>
              Live blockchain data mechanism
            </CardDescription>
          </CardHeader>

          <CardContent className="relative z-10">
            <FusionCoreDashboard />
          </CardContent>
        </Card>



        {/* FuseCollector Process Flow */}
        <Card className="bg-transparent border-0">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-2xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)] mb-2">
              FUSECOLLECTOR()_PROCESS_FLOW
            </CardTitle>
            <CardDescription className="font-mono tracking-wide text-gray-300 text-base">
              <span className="text-orange-400">[</span>AUTOMATED_PROCESS_1H_COOLDOWN<span className="text-orange-400">]</span><br/>
              Modifiable function with 5-step execution
            </CardDescription>
            <div className="h-[2px] w-48 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse mt-4"></div>
          </CardHeader>

          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              {/* Step 1 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500 rounded-full"></div>
                <CardContent className="p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <Timer className="w-6 h-6 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-sm mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">CLAIMS_FEES</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>POL_HARVEST<span className="text-orange-400">]</span><br/>
                    Trading fee collection
                  </p>
                  <div className="mt-3 px-2 py-1 bg-purple-500/20 border border-purple-400/40 rounded text-xs font-mono font-semibold text-purple-400">
                    STEP_1
                  </div>
                </CardContent>
              </Card>

              {/* Step 2 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardContent className="p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <Flame className="w-6 h-6 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-sm mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">BURNS_$LFD</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>LFD_BURN<span className="text-orange-400">]</span><br/>
                    All collected tokens
                  </p>
                  <div className="mt-3 px-2 py-1 bg-orange-500/20 border border-orange-400/40 rounded text-xs font-mono font-semibold text-orange-400">
                    STEP_2
                  </div>
                </CardContent>
              </Card>

              {/* Step 3 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></div>
                <CardContent className="p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <Flame className="w-6 h-6 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-sm mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">BURNS_$LBP</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>LBP_BURN<span className="text-orange-400">]</span><br/>
                    All collected tokens
                  </p>
                  <div className="mt-3 px-2 py-1 bg-red-500/20 border border-red-400/40 rounded text-xs font-mono font-semibold text-red-400">
                    STEP_3
                  </div>
                </CardContent>
              </Card>

              {/* Step 4 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-green-500 rounded-full"></div>
                <CardContent className="p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <RefreshCcw className="w-6 h-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-sm mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">SENDS_50%_$MCLB</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>FUSION_BUYBACK<span className="text-orange-400">]</span><br/>
                    To Fusion Core
                  </p>
                  <div className="mt-3 px-2 py-1 bg-green-500/20 border border-green-400/40 rounded text-xs font-mono font-semibold text-green-400">
                    STEP_4
                  </div>
                </CardContent>
              </Card>

              {/* Step 5 */}
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"></div>
                <CardContent className="p-3 md:p-4 text-center relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <div className="p-2 bg-orange-500/20 rounded border border-orange-400/40">
                      <TrendingUp className="w-6 h-6 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </div>
                  </div>
                  <h4 className="font-mono font-semibold text-sm mb-2 tracking-wide text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">SENDS_50%_$MCLB</h4>
                  <p className="text-xs font-mono tracking-wide text-gray-300 leading-relaxed">
                    <span className="text-orange-400">[</span>MULTISIG_SEND<span className="text-orange-400">]</span><br/>
                    To treasury wallet
                  </p>
                  <div className="mt-3 px-2 py-1 bg-blue-500/20 border border-blue-400/40 rounded text-xs font-mono font-semibold text-blue-400">
                    STEP_5
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
