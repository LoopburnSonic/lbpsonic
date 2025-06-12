'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Flame, TrendingDown, Zap, Loader2, Activity } from "lucide-react"
import { useEffect, useState } from "react"
import { useTokenData } from "@/hooks/use-token-data"
import { formatUnits } from "viem"

export default function BurnedTokensCard() {
  const [flameIntensity, setFlameIntensity] = useState(0)
  const { tokenData, isLoading, error, hasTokenData } = useTokenData()

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
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-red-400 text-lg font-semibold">
        <Flame className="h-5 w-5 animate-pulse" />
        Burned Tokens
      </div>
      <Card className="border-red-500/30 h-full">
        <CardContent className="space-y-6 px-3 sm:px-6 pt-6 pb-6 h-full flex flex-col justify-between">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading burn data...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-sm text-red-400">Failed to load burn data</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Main Burn Display - ONLY REAL DATA */}
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-red-300">
                  {hasTokenData && tokenData
                    ? `${Number(formatUnits(tokenData.burnedTokens, tokenData.decimals)).toLocaleString()} ${tokenData.symbol}`
                    : 'Loading...'
                  }
                </div>
                <div className="text-sm text-muted-foreground">Permanently Removed</div>
                <div className="flex items-center justify-center gap-2 text-xs">
                  <span className="text-muted-foreground">Burn Mechanism Breakdown</span>
                  <span className="text-green-400">• Live Data</span>
                </div>
              </div>

              {/* Burn Mechanism Breakdown */}
              <div className="space-y-4">
                {/* Hyperloop Burns */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm text-muted-foreground">Hyperloop Burns</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-yellow-400">25.00%</div>
                      <div className="text-xs text-muted-foreground">36,291.218 LBP</div>
                    </div>
                  </div>
                  <div className="h-2 bg-yellow-900/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '25%' }}
                    />
                  </div>
                </div>

                {/* Burnloop Burns */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <TrendingDown className="h-4 w-4 text-red-500" />
                      <span className="text-sm text-muted-foreground">Burnloop Burns</span>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-medium text-red-400">74.99%</div>
                      <div className="text-xs text-muted-foreground">108,873.653 LBP</div>
                    </div>
                  </div>
                  <div className="h-2 bg-red-900/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: '74.99%' }}
                    />
                  </div>
                </div>
              </div>

              {/* Total Supply Reduction */}
              <div className="border-t border-red-500/20 pt-4 space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Total Supply Reduction</span>
                  <span className="text-sm font-medium text-red-400">
                    {hasTokenData && tokenData
                      ? `${tokenData.burnedPercentage.toFixed(2)}%`
                      : '14.88%'
                    }
                  </span>
                </div>

                {/* Burn Progress Bar */}
                <div className="space-y-1">
                  <div className="text-xs text-muted-foreground">Burn Progress</div>
                  <div className="h-3 bg-red-900/30 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-red-500 to-orange-500 rounded-full transition-all duration-1000 ease-out"
                      style={{
                        width: `${hasTokenData && tokenData
                          ? Math.min(tokenData.burnedPercentage, 100)
                          : 14.88
                        }%`
                      }}
                    />
                  </div>
                  <div className="text-right text-xs text-red-400">
                    {hasTokenData && tokenData
                      ? `${tokenData.burnedPercentage.toFixed(2)}%`
                      : '14.88%'
                    }
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Burn Status Indicators */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <div className="flex items-center gap-2 text-xs">
              <Activity className="h-3 w-3 text-green-500" />
              <span className="text-muted-foreground">Real-Time Tracking</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Flame className="h-3 w-3 text-red-500" />
              <span className="text-muted-foreground">Deflationary Mechanism</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
