'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Lock, Loader2 } from "lucide-react"
import { useTokenData } from "@/hooks/use-token-data"
import Image from "next/image"

export default function ProtocolOwnedLiquidityCard() {
  const { liquidityData, isLoading, error, hasLiquidityData } = useTokenData();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-purple-400 text-lg font-semibold">
        <Lock className="h-5 w-5" />
        Protocol Owned Liquidity
      </div>
      <Card className="border-purple-500/30 h-full">
        <CardContent className="space-y-6 px-3 sm:px-6 pt-6 pb-6 h-full flex flex-col justify-between">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading liquidity data...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-sm text-red-400">Failed to load liquidity data</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header */}
              <div className="text-center">
                <p className="text-xs text-muted-foreground">Locked Forever • Shadow Exchange V3</p>
              </div>
              
              {/* Pool Information */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Pool Type</span>
                  <span className="text-sm font-medium text-purple-400">LBP/wS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Lock Status</span>
                  <span className="text-sm font-medium text-purple-400">Locked ∞</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">DEX</span>
                  <span className="text-sm font-medium">Shadow Exchange</span>
                </div>
              </div>

              {/* View on DeBank Button */}
              <div className="mt-4">
                <a
                  href="https://debank.com/profile/0xB20241DFD126E8Db352bF2e19f5f3402Dca265e9?chain="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-orange-500/20 to-purple-500/20 hover:from-orange-500/30 hover:to-purple-500/30 border border-orange-500/30 rounded-lg p-3 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src="/loopburn-logo.png"
                        alt="LoopBurn Logo"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <span className="text-orange-500 text-lg font-bold">+</span>
                    <div className="w-6 h-6 rounded-full overflow-hidden">
                      <Image
                        src="/debank-logo.png"
                        alt="DeBank Logo"
                        width={24}
                        height={24}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors">
                      View on DeBank
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Detailed Analytics
                    </span>
                  </div>
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-purple-300 transition-colors ml-auto"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* Status Indicators */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <div className="flex items-center gap-2 text-xs">
              <Lock className="h-3 w-3 text-purple-500" />
              <span className="text-muted-foreground">Permanently Locked</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-muted-foreground">Active Pool</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
