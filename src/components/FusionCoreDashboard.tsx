'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Progress } from "@/components/ui/progress";
import { useFusionCoreData, useFusionCoreCountdowns, useFusionCoreStrategy } from "@/hooks/use-fusion-core-data";
import { Flame, Clock, Settings, TrendingUp, AlertCircle, CheckCircle, Timer } from "lucide-react";
import { useEffect, useState } from "react";

export default function FusionCoreDashboard() {
  const {
    baseBurnIntervalHours,
    currentBurnIntervalHours,
    canBurnFuse,
    canFuseCollector,
    isLoading,
    error,
  } = useFusionCoreData();

  const { burnCountdown, collectCountdown } = useFusionCoreCountdowns();
  const { currentStrategy, currentPlan } = useFusionCoreStrategy();

  // State for real-time countdown updates
  const [, setTick] = useState(0);

  // Update countdown every second
  useEffect(() => {
    const interval = setInterval(() => {
      setTick(prev => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return (
      <Card className="bg-black/40 backdrop-blur-sm border-2 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.4)]">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <div className="p-1 bg-red-500/20 rounded border border-red-400/40">
              <AlertCircle className="h-5 w-5 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
            </div>
            <p className="font-mono tracking-wide text-red-400 text-sm">
              <span className="text-red-300">[</span>ERROR<span className="text-red-300">]</span> Failed to load Fusion Core data
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Main Functions Status */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8">
        {/* burnFuse() Function */}
        <Card className={`relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 transition-all duration-700 ${
          canBurnFuse
            ? 'border-green-500/60 shadow-[0_0_25px_rgba(34,197,94,0.4)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/10 before:via-transparent before:to-green-600/5 before:animate-pulse'
            : 'border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse'
        } after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse`}>
          <div className={`absolute top-2 right-2 w-3 h-3 rounded-full animate-ping ${canBurnFuse ? 'bg-green-400' : 'bg-orange-400'}`}></div>
          <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${canBurnFuse ? 'bg-green-500' : 'bg-orange-500'}`}></div>
          <CardHeader className="relative z-10 px-3 sm:px-6 pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl font-mono font-bold tracking-wider text-orange-100 flex items-center gap-2 sm:gap-3 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
              <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                <Flame className={`h-5 w-5 sm:h-6 sm:w-6 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] ${canBurnFuse ? 'text-green-400' : 'text-orange-400'}`} />
              </div>
              <span className="truncate">BURNFUSE()</span>
            </CardTitle>
            <CardDescription className="font-mono tracking-wide text-gray-300 text-sm sm:text-base">
              <span className="text-orange-400">[</span>ADAPTIVE_INTERVAL_BURN<span className="text-orange-400">]</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 relative z-10 px-3 sm:px-6">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-orange-500/20" />
                <Skeleton className="h-8 w-32 bg-orange-500/20" />
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono tracking-wide text-gray-300 text-sm">NEXT_BURN</span>
                    <Badge className={`font-mono font-semibold tracking-wide px-3 py-1 ${
                      canBurnFuse
                        ? 'bg-green-500/20 text-green-400 border-green-500/40 animate-pulse'
                        : 'bg-orange-500/20 text-orange-400 border-orange-500/40'
                    }`}>
                      {canBurnFuse ? '[READY]' : '[PENDING]'}
                    </Badge>
                  </div>
                  <div className={`text-3xl font-mono font-bold text-center drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] ${
                    canBurnFuse ? 'text-green-400' : 'text-orange-400'
                  }`}>
                    {burnCountdown.display}
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-mono tracking-wide">
                    <span className="text-gray-400">BASE_INTERVAL</span>
                    <span className="text-orange-400">{baseBurnIntervalHours}H</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono tracking-wide">
                    <span className="text-gray-400">CURRENT_INTERVAL</span>
                    <span className="text-orange-400">{currentBurnIntervalHours.toFixed(1)}H</span>
                  </div>
                  <Progress
                    value={currentBurnIntervalHours > baseBurnIntervalHours ? 100 : (currentBurnIntervalHours / baseBurnIntervalHours) * 100}
                    className="h-3 bg-black/60 border border-orange-500/40"
                  />
                  <p className="text-xs font-mono tracking-wide text-gray-400 text-center">
                    <span className="text-orange-400">[</span>+2H_PER_5%_SUPPLY_BURNED<span className="text-orange-400">]</span>
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>

        {/* fuseCollector() Function */}
        <Card className={`relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 transition-all duration-700 ${
          canFuseCollector
            ? 'border-blue-500/60 shadow-[0_0_25px_rgba(59,130,246,0.4)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:via-transparent before:to-blue-600/5 before:animate-pulse'
            : 'border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse'
        } after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse`}>
          <div className={`absolute top-2 right-2 w-3 h-3 rounded-full animate-ping ${canFuseCollector ? 'bg-blue-400' : 'bg-purple-400'}`}></div>
          <div className={`absolute top-2 right-2 w-3 h-3 rounded-full ${canFuseCollector ? 'bg-blue-500' : 'bg-purple-500'}`}></div>
          <CardHeader className="relative z-10 px-3 sm:px-6 pb-3 sm:pb-6">
            <CardTitle className="text-lg sm:text-xl font-mono font-bold tracking-wider text-orange-100 flex items-center gap-2 sm:gap-3 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
              <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                <TrendingUp className={`h-5 w-5 sm:h-6 sm:w-6 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)] ${canFuseCollector ? 'text-blue-400' : 'text-purple-400'}`} />
              </div>
              <span className="truncate">FUSECOLLECTOR()</span>
            </CardTitle>
            <CardDescription className="font-mono tracking-wide text-gray-300 text-sm sm:text-base">
              <span className="text-orange-400">[</span>CLAIMS_BURNS_SENDS_MCLB<span className="text-orange-400">]</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 relative z-10 px-3 sm:px-6">
            {isLoading ? (
              <div className="space-y-3">
                <Skeleton className="h-4 w-full bg-orange-500/20" />
                <Skeleton className="h-8 w-32 bg-orange-500/20" />
              </div>
            ) : (
              <>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="font-mono tracking-wide text-gray-300 text-sm">NEXT_COLLECTION</span>
                    <Badge className={`font-mono font-semibold tracking-wide px-3 py-1 ${
                      canFuseCollector
                        ? 'bg-blue-500/20 text-blue-400 border-blue-500/40 animate-pulse'
                        : 'bg-purple-500/20 text-purple-400 border-purple-500/40'
                    }`}>
                      {canFuseCollector ? '[READY]' : '[COOLDOWN]'}
                    </Badge>
                  </div>
                  <div className={`text-3xl font-mono font-bold text-center drop-shadow-[0_0_10px_rgba(249,115,22,0.8)] ${
                    canFuseCollector ? 'text-blue-400' : 'text-purple-400'
                  }`}>
                    {collectCountdown.display}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    {/* Step 1: Claims Fees */}
                    <div className="bg-black/40 border-2 border-purple-500/60 rounded-lg p-2 sm:p-3 hover:border-purple-500/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-400/40 flex-shrink-0">
                          <span className="text-purple-400 font-mono font-bold text-xs">1</span>
                        </div>
                        <span className="text-xs sm:text-sm font-mono tracking-wide text-purple-400 font-medium min-w-0">
                          <span className="text-orange-400">[</span>POL_FEES<span className="text-orange-400">]</span> Claims trading fees
                        </span>
                      </div>
                    </div>

                    {/* Step 2: Burns Tokens */}
                    <div className="bg-black/40 border-2 border-orange-500/60 rounded-lg p-2 sm:p-3 hover:border-orange-500/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-500/20 rounded-full flex items-center justify-center border border-orange-400/40 flex-shrink-0">
                          <span className="text-orange-400 font-mono font-bold text-xs">2</span>
                        </div>
                        <span className="text-xs sm:text-sm font-mono tracking-wide text-orange-400 font-medium min-w-0">
                          <span className="text-orange-400">[</span>TOKEN_BURN<span className="text-orange-400">]</span> Burns $LFD and $LBP
                        </span>
                      </div>
                    </div>

                    {/* Step 3: Sends MCLB */}
                    <div className="bg-black/40 border-2 border-blue-500/60 rounded-lg p-2 sm:p-3 hover:border-blue-500/80 transition-all duration-300 hover:shadow-[0_0_15px_rgba(59,130,246,0.4)]">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/40 flex-shrink-0">
                          <span className="text-blue-400 font-mono font-bold text-xs">3</span>
                        </div>
                        <span className="text-xs sm:text-sm font-mono tracking-wide text-blue-400 font-medium min-w-0">
                          <span className="text-orange-400">[</span>MCLB_SEND<span className="text-orange-400">]</span> To Fusion Core
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Function Details */}
                  <div className="bg-black/40 border-2 border-gray-500/60 rounded-lg p-2 sm:p-3">
                    <div className="flex items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm font-mono tracking-wide text-gray-300">
                      <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                        <Clock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                      </div>
                      <span className="font-medium text-center">
                        <span className="text-orange-400">[</span>1H_COOLDOWN<span className="text-orange-400">]</span> |
                        <span className="text-orange-400">[</span>MODIFIABLE<span className="text-orange-400">]</span>
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Strategy Information */}
      <Card className="relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
        <CardHeader className="relative z-10 px-3 sm:px-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
            <div className="min-w-0 flex-1">
              <CardTitle className="text-lg sm:text-xl font-mono font-bold tracking-wider text-orange-100 flex items-center gap-2 sm:gap-3 drop-shadow-[0_0_8px_rgba(249,115,22,0.6)]">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                  <Settings className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
                <span className="truncate">CHANGERATESTRATEGY()</span>
              </CardTitle>
              <CardDescription className="font-mono tracking-wide text-gray-300 text-xs sm:text-sm md:text-base">
                <span className="text-orange-400">[</span>MULTISIG_CONTROLLED_ALLOCATION<span className="text-orange-400">]</span>
              </CardDescription>
            </div>
            {!isLoading && (
              <Badge className="bg-green-500/20 text-green-400 border-2 border-green-500/60 px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(34,197,94,0.4)] animate-pulse self-start sm:self-auto">
                {currentPlan === 'Custom' ? '[CUSTOM_PLAN]' : `[PLAN_${currentPlan}]`}
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="relative z-10 px-3 sm:px-6">
          {isLoading ? (
            <div className="space-y-3">
              <Skeleton className="h-4 w-full bg-orange-500/20" />
              <Skeleton className="h-4 w-3/4 bg-orange-500/20" />
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6">

              <div className="grid grid-cols-3 gap-3 sm:gap-6">
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-orange-400 drop-shadow-[0_0_10px_rgba(249,115,22,0.8)]">{currentStrategy.lfd}%</div>
                  <div className="text-xs sm:text-sm font-mono tracking-wide text-gray-300 mt-1 sm:mt-2">
                    <span className="text-orange-400">[</span>BURN_$LFD<span className="text-orange-400">]</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-blue-400 drop-shadow-[0_0_10px_rgba(59,130,246,0.8)]">{currentStrategy.lbp}%</div>
                  <div className="text-xs sm:text-sm font-mono tracking-wide text-gray-300 mt-1 sm:mt-2">
                    <span className="text-orange-400">[</span>BURN_$LBP<span className="text-orange-400">]</span>
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xl sm:text-2xl md:text-3xl font-mono font-bold text-green-400 drop-shadow-[0_0_10px_rgba(34,197,94,0.8)]">{currentStrategy.dao}%</div>
                  <div className="text-xs sm:text-sm font-mono tracking-wide text-gray-300 mt-1 sm:mt-2">
                    <span className="text-orange-400">[</span>DAO_RESERVE<span className="text-orange-400">]</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                {/* Plan A */}
                <div className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-purple-500/60 rounded-lg p-3 sm:p-4 text-center hover:border-purple-500/80 transition-all duration-700 hover:scale-105 hover:shadow-[0_0_25px_rgba(168,85,247,0.4)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-purple-500/10 before:via-transparent before:to-purple-600/5 before:animate-pulse">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500/20 rounded-full flex items-center justify-center border border-purple-400/40">
                      <span className="text-purple-400 font-mono font-bold text-xs sm:text-sm">A</span>
                    </div>
                  </div>
                  <h5 className="font-mono font-semibold text-xs sm:text-sm text-purple-400 mb-2 sm:mb-3 tracking-wider drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">PLAN_A</h5>
                  <div className="space-y-1 sm:space-y-2 text-xs font-mono tracking-wide">
                    <div className="text-orange-400">45% BURN $LFD</div>
                    <div className="text-blue-400">5% BURN $LBP</div>
                    <div className="text-green-400">50% DAO RESERVE</div>
                  </div>
                </div>

                {/* Plan B */}
                <div className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-blue-500/60 rounded-lg p-3 sm:p-4 text-center hover:border-blue-500/80 transition-all duration-700 hover:scale-105 hover:shadow-[0_0_25px_rgba(59,130,246,0.4)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-500/10 before:via-transparent before:to-blue-600/5 before:animate-pulse">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500/20 rounded-full flex items-center justify-center border border-blue-400/40">
                      <span className="text-blue-400 font-mono font-bold text-xs sm:text-sm">B</span>
                    </div>
                  </div>
                  <h5 className="font-mono font-semibold text-xs sm:text-sm text-blue-400 mb-2 sm:mb-3 tracking-wider drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">PLAN_B</h5>
                  <div className="space-y-1 sm:space-y-2 text-xs font-mono tracking-wide">
                    <div className="text-orange-400">50% BURN $LFD</div>
                    <div className="text-blue-400">0% BURN $LBP</div>
                    <div className="text-green-400">50% DAO RESERVE</div>
                  </div>
                </div>

                {/* Plan C */}
                <div className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-green-500/60 rounded-lg p-3 sm:p-4 text-center hover:border-green-500/80 transition-all duration-700 hover:scale-105 hover:shadow-[0_0_25px_rgba(34,197,94,0.4)] before:absolute before:inset-0 before:bg-gradient-to-br before:from-green-500/10 before:via-transparent before:to-green-600/5 before:animate-pulse">
                  <div className="flex items-center justify-center mb-2 sm:mb-3">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500/20 rounded-full flex items-center justify-center border border-green-400/40">
                      <span className="text-green-400 font-mono font-bold text-xs sm:text-sm">C</span>
                    </div>
                  </div>
                  <h5 className="font-mono font-semibold text-xs sm:text-sm text-green-400 mb-2 sm:mb-3 tracking-wider drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]">PLAN_C</h5>
                  <div className="space-y-1 sm:space-y-2 text-xs font-mono tracking-wide">
                    <div className="text-orange-400">0% BURN $LFD</div>
                    <div className="text-blue-400">0% BURN $LBP</div>
                    <div className="text-green-400">100% DAO TREASURY</div>
                    <div className="text-gray-400 opacity-75">
                      <span className="text-orange-400">[</span>MANUAL_USE<span className="text-orange-400">]</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
