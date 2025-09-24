'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, TrendingDown, Zap, Loader2, Activity } from "lucide-react"
import { useEffect, useState } from "react"
import { useTokenData } from "@/hooks/use-token-data"
import { useLFDTokenData } from "@/hooks/use-lfd-token-data"
import { formatUnits } from "viem"

export default function BurnedTokensCard() {
  const [flameIntensity, setFlameIntensity] = useState(0)
  const { tokenData, isLoading, error, hasTokenData } = useTokenData()
  const {
    burnedSupply: lfdBurnedSupply,
    burnedPercentage: lfdBurnedPercentage,
    symbol: lfdSymbol,
    isLoading: lfdLoading,
    error: lfdError
  } = useLFDTokenData()

  useEffect(() => {
    const interval = setInterval(() => {
      setFlameIntensity(prev => (prev + 1) % 3)
    }, 800)

    return () => {
      clearInterval(interval)
    }
  }, [])

  const flameColors = [
    'from-red-500 to-orange-500',
    'from-orange-500 to-yellow-500',
    'from-yellow-500 to-red-500'
  ]

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="p-1.5 bg-orange-500/20 rounded border border-orange-400/40">
            <Flame className="h-5 w-5 text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)] animate-pulse" />
          </div>
          <h3 className="text-lg font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
            BURNED_TOKENS
          </h3>
        </div>
        <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
      </div>
      <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
        <CardContent className="space-y-6 px-4 pt-5 pb-5 relative z-10">
          {(isLoading || lfdLoading) ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Loader2 className="h-5 w-5 animate-spin text-red-400 drop-shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                </div>
                <span className="font-mono tracking-wide text-red-400">
                  <span className="text-orange-400">[</span>LOADING_BURN_DATA<span className="text-orange-400">]</span>
                </span>
              </div>
            </div>
          ) : (error && lfdError) ? (
            <div className="flex items-center justify-center h-full">
              <span className="font-mono tracking-wide text-red-400">
                <span className="text-red-300">[</span>ERROR<span className="text-red-300">]</span> Failed to load burn data
              </span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Dual Token Burn Display */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LBP Burns */}
                <div className="text-center space-y-3 p-4 bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="px-2 py-1 bg-orange-500/20 text-orange-400 border-2 border-orange-500/60 rounded-lg font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                      [LBP_BURNS]
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
                    {hasTokenData && tokenData
                      ? `${Number(formatUnits(tokenData.burnedTokens, tokenData.decimals)).toLocaleString()}`
                      : '[LOADING...]'
                    }
                  </div>
                  <div className="text-xs font-mono tracking-wide text-gray-300">
                    {hasTokenData && tokenData
                      ? `${tokenData.burnedPercentage.toFixed(2)}% BURNED`
                      : '[LOADING...]'
                    }
                  </div>
                </div>

                {/* LFD Burns */}
                <div className="text-center space-y-3 p-4 bg-black/40 backdrop-blur-sm border-2 border-blue-500/60 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <div className="px-2 py-1 bg-blue-500/20 text-blue-400 border-2 border-blue-500/60 rounded-lg font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                      [LFD_BURNS]
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                    {lfdBurnedSupply && lfdSymbol
                      ? `${Number(lfdBurnedSupply).toLocaleString()}`
                      : '[LOADING...]'
                    }
                  </div>
                  <div className="text-xs font-mono tracking-wide text-gray-300">
                    {lfdBurnedPercentage !== undefined
                      ? `${lfdBurnedPercentage.toFixed(2)}% BURNED`
                      : '[LOADING...]'
                    }
                  </div>
                </div>
              </div>

              <div className="text-center space-y-2">
                <div className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>PERMANENTLY_REMOVED_FROM_SUPPLY<span className="text-orange-400">]</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-xs font-mono tracking-wide text-gray-300">Real-time Blockchain Data</span>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-xs font-mono text-green-400">LIVE</span>
                  </div>
                </div>
              </div>

              {/* Total Supply Reduction - Dual Progress */}
              <div className="border-t-2 border-orange-500/40 pt-4 space-y-4">
                <div className="text-center">
                  <div className="text-xs font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
                    TOTAL_SUPPLY_REDUCTION_PROGRESS
                  </div>
                </div>

                {/* LBP Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-black/40 border border-orange-500/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 bg-orange-500/20 text-orange-400 border-2 border-orange-500/60 rounded-lg text-xs font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                        [LBP]
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">
                      {hasTokenData && tokenData
                        ? `${tokenData.burnedPercentage.toFixed(2)}%`
                        : '[LOADING...]'
                      }
                    </span>
                  </div>
                  <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-orange-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(249,115,22,0.4)]"
                      style={{
                        width: `${hasTokenData && tokenData
                          ? Math.min(tokenData.burnedPercentage, 100)
                          : 0
                        }%`
                      }}
                    />
                  </div>
                </div>

                {/* LFD Progress */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-black/40 border border-blue-500/40 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="px-2 py-1 bg-blue-500/20 text-blue-400 border-2 border-blue-500/60 rounded-lg text-xs font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                        [LFD]
                      </div>
                    </div>
                    <span className="text-xs font-mono font-semibold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                      {lfdBurnedPercentage !== undefined
                        ? `${lfdBurnedPercentage.toFixed(2)}%`
                        : '[LOADING...]'
                      }
                    </span>
                  </div>
                  <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-blue-500/30">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                      style={{
                        width: `${lfdBurnedPercentage !== undefined
                          ? Math.min(lfdBurnedPercentage, 100)
                          : 0
                        }%`
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Dual Token Status Indicators */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 pt-3 border-t-2 border-orange-500/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Activity className="h-3 w-3 text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                </div>
                <span className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>LBP_YIELD_REACTOR<span className="text-orange-400">]</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Flame className="h-3 w-3 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                </div>
                <span className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>LFD_FUSION_CORE<span className="text-orange-400">]</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs font-mono tracking-wide text-gray-300">
                <span className="text-orange-400">[</span>LIVE_DATA<span className="text-orange-400">]</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
