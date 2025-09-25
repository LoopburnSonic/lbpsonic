'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Coins, Flame, Receipt, Lock, Loader2 } from "lucide-react"
import LiquidityVisualization from "@/components/LiquidityVisualization"
import BurnedTokensCard from "@/components/BurnedTokensCard"
import TokenDistributionCard from "@/components/TokenDistributionCard"
import ProtocolOwnedLiquidityCard from "@/components/ProtocolOwnedLiquidityCard"
import HoldersVisualization from "@/components/HoldersVisualization"
import { useTokenData } from "@/hooks/use-token-data"
import { useLFDTokenData } from "@/hooks/use-lfd-token-data"
import { formatUnits } from "viem"


export default function TokenInformation() {
  const { tokenData, isLoading, error, hasTokenData } = useTokenData();
  const {
    totalSupply: lfdTotalSupply,
    maxTotalSupply: lfdMaxSupply,
    burnedPercentage: lfdBurnedPercentage,
    symbol: lfdSymbol,
    isLoading: lfdLoading,
    error: lfdError
  } = useLFDTokenData();
  return (
    <Card className="w-full mx-auto bg-transparent border-0">
      <CardContent className="px-3 sm:px-4 md:px-6">
        <div className="space-y-6 sm:space-y-8">

          {/* ═══ REAL HOLDERS DATA ═══ */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] mb-2 px-2">
                ═══ REAL_HOLDERS_DATA ═══
              </h2>
              <div className="h-[2px] w-36 sm:w-44 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
            </div>
            <div>
              <HoldersVisualization />
            </div>
          </div>

          {/* ═══ TOKEN OVERVIEW ═══ */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] mb-2 px-2">
                ═══ TOKEN_OVERVIEW ═══
              </h2>
              <div className="h-[2px] w-40 sm:w-48 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
            {/* LBP Token Card */}
            <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-400 rounded-full animate-ping"></div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-orange-500 rounded-full"></div>
              <CardContent className="px-3 py-4 sm:px-4 sm:py-5 relative z-10">
                {isLoading ? (
                  <div className="flex items-center justify-center h-20 sm:h-24">
                    <div className="flex items-center gap-2 sm:gap-3">
                      <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                        <Loader2 className="h-4 w-4 sm:h-5 sm:w-5 animate-spin text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                      </div>
                      <span className="text-xs sm:text-sm font-mono tracking-wide text-orange-400">
                        <span className="text-orange-300">[</span>LOADING_LBP_DATA<span className="text-orange-300">]</span>
                      </span>
                    </div>
                  </div>
                ) : error ? (
                  <div className="flex items-center justify-center h-20 sm:h-24">
                    <span className="text-xs sm:text-sm font-mono tracking-wide text-red-400 text-center px-2">
                      <span className="text-red-300">[</span>ERROR<span className="text-red-300">]</span> Failed to load LBP data
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-orange-500/20 text-orange-400 border-2 border-orange-500/60 rounded-lg font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(249,115,22,0.4)] text-xs sm:text-sm">
                        [LBP_TOKEN]
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                            <Coins className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300 truncate">MAX_SUPPLY</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)] text-right flex-shrink-0">
                          {hasTokenData && tokenData
                            ? `${Number(formatUnits(tokenData.maxTotalSupply, tokenData.decimals)).toLocaleString()} ${tokenData.symbol}`
                            : '[LOADING...]'
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                            <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300 truncate">BURNED</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-red-400 drop-shadow-[0_0_6px_rgba(239,68,68,0.6)] text-right flex-shrink-0">
                          {hasTokenData && tokenData
                            ? `${tokenData.burnedPercentage.toFixed(2)}%`
                            : '[LOADING...]'
                          }
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                            <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300 truncate">LP_STATUS</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)] text-right flex-shrink-0">
                          <span className="text-orange-400">[</span>LOCKED_∞<span className="text-orange-400">]</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* LFD Token Card */}
            <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-400 rounded-full animate-ping"></div>
              <div className="absolute top-2 right-2 sm:top-3 sm:right-3 w-2.5 h-2.5 sm:w-3 sm:h-3 bg-blue-500 rounded-full"></div>
              <CardContent className="px-3 py-4 sm:px-4 sm:py-5 relative z-10">
                {lfdLoading ? (
                  <div className="flex items-center justify-center h-20 sm:h-24">
                    <div className="flex items-center gap-2">
                      <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                        <Loader2 className="h-3 w-3 sm:h-4 sm:w-4 animate-spin text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                      </div>
                      <span className="text-xs font-mono tracking-wide text-blue-400">
                        <span className="text-orange-400">[</span>LOADING_LFD_DATA<span className="text-orange-400">]</span>
                      </span>
                    </div>
                  </div>
                ) : lfdError ? (
                  <div className="flex items-center justify-center h-20 sm:h-24">
                    <span className="text-xs font-mono tracking-wide text-red-400 text-center px-2">
                      <span className="text-red-300">[</span>ERROR<span className="text-red-300">]</span> Failed to load LFD data
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3 sm:space-y-4">
                    <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
                      <div className="px-2 py-1 sm:px-3 sm:py-1.5 bg-blue-500/20 text-blue-400 border-2 border-blue-500/60 rounded-lg font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.4)] text-xs sm:text-sm">
                        [LFD_TOKEN]
                      </div>
                    </div>
                    <div className="space-y-2 sm:space-y-3">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                            <Coins className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300 truncate">MAX_SUPPLY</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)] text-right flex-shrink-0">
                          {lfdMaxSupply && lfdSymbol
                            ? `${Number(lfdMaxSupply).toLocaleString()} ${lfdSymbol}`
                            : '[LOADING...]'
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                            <Flame className="h-3 w-3 sm:h-4 sm:w-4 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300 truncate">BURNED</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] text-right flex-shrink-0">
                          {lfdBurnedPercentage !== undefined
                            ? `${lfdBurnedPercentage.toFixed(2)}%`
                            : '[LOADING...]'
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-1.5 sm:gap-2 min-w-0 flex-1">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40 flex-shrink-0">
                            <Lock className="h-3 w-3 sm:h-4 sm:w-4 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300 truncate">LP_STATUS</span>
                        </div>
                        <span className="text-xs font-mono font-semibold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)] text-right flex-shrink-0">
                          <span className="text-orange-400">[</span>LOCKED_∞<span className="text-orange-400">]</span>
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            </div>
          </div>

          {/* ═══ LIQUIDITY DATA ═══ */}
          <div className="space-y-3 sm:space-y-4">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] mb-2 px-2">
                ═══ LIQUIDITY_DATA ═══
              </h2>
              <div className="h-[2px] w-32 sm:w-40 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <LiquidityVisualization />
              <ProtocolOwnedLiquidityCard />
            </div>
          </div>

          {/* ═══ ANALYTICS ═══ */}
          <div className="space-y-3 sm:space-y-4 pt-8 sm:pt-12 mt-6 sm:mt-8">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl md:text-2xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)] mb-2 px-2">
                ═══ ANALYTICS ═══
              </h2>
              <div className="h-[2px] w-28 sm:w-32 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <TokenDistributionCard />
              <BurnedTokensCard />
            </div>
          </div>

        </div>
      </CardContent>
    </Card>
  )
}