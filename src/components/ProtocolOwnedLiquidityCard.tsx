'use client';

import { Card, CardContent } from "@/components/ui/card"
import { Lock, Loader2, Users } from "lucide-react"
import { useTokenData } from "@/hooks/use-token-data"
import { useLFDTokenData } from "@/hooks/use-lfd-token-data"
import { useLiquidityLockData } from "@/hooks/use-liquidity-lock-data"
import Image from "next/image"

export default function ProtocolOwnedLiquidityCard() {
  const { liquidityData, isLoading, error, hasLiquidityData } = useTokenData();
  const {
    symbol: lfdSymbol,
    isLoading: lfdLoading,
    error: lfdError
  } = useLFDTokenData();
  const {
    hasNFT,
    isLocked,
    nftId,
    isLoading: lockLoading,
    error: lockError
  } = useLiquidityLockData();

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="p-1.5 bg-orange-500/20 rounded border border-orange-400/40">
            <Lock className="h-5 w-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
          </div>
          <h3 className="text-lg font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
            PROTOCOL_OWNED_LIQUIDITY
          </h3>
        </div>
        <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
      </div>
      <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
        <CardContent className="space-y-6 px-4 pt-5 pb-5 relative z-10">
          {(isLoading || lfdLoading || lockLoading) ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Loader2 className="h-5 w-5 animate-spin text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                </div>
                <span className="font-mono tracking-wide text-purple-400">
                  <span className="text-orange-400">[</span>LOADING_LIQUIDITY_DATA<span className="text-orange-400">]</span>
                </span>
              </div>
            </div>
          ) : (error && lfdError && lockError) ? (
            <div className="flex items-center justify-center h-full">
              <span className="font-mono tracking-wide text-red-400">
                <span className="text-red-300">[</span>ERROR<span className="text-red-300">]</span> Failed to load liquidity data
              </span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Dual Protocol Overview */}
              <div className="text-center space-y-2">
                <p className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>MULTI_PROTOCOL_LIQUIDITY_MANAGEMENT<span className="text-orange-400">]</span>
                </p>
                <div className="flex justify-center gap-2">
                  <div className="px-2 py-1 bg-orange-500/20 text-orange-400 border-2 border-orange-500/60 rounded-lg text-xs font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                    [LBP]
                  </div>
                  <div className="px-2 py-1 bg-blue-500/20 text-blue-400 border-2 border-blue-500/60 rounded-lg text-xs font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                    [LFD]
                  </div>
                </div>
              </div>

              {/* LBP Pool Information */}
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-2">
                  <div className="px-2 py-1 bg-orange-500/20 text-orange-400 border-2 border-orange-500/60 rounded-lg text-xs font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                    [LBP_PROTOCOL_LIQUIDITY]
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-black/40 border border-orange-500/40 rounded-lg">
                    <span className="text-xs font-mono tracking-wide text-gray-300">Pool Type</span>
                    <span className="text-xs font-mono font-semibold text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">LBP/wS</span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-black/40 border border-orange-500/40 rounded-lg">
                    <span className="text-xs font-mono tracking-wide text-gray-300">Lock Status</span>
                    <span className="text-xs font-mono font-semibold text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">
                      {hasLiquidityData ? 'Locked NFT #1' : '[LOADING...]'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-black/40 border border-orange-500/40 rounded-lg">
                    <span className="text-xs font-mono tracking-wide text-gray-300">DEX</span>
                    <span className="text-xs font-mono font-semibold text-gray-300">Shadow Exchange</span>
                  </div>
                </div>
              </div>

              {/* LFD Pool Information */}
              <div className="space-y-2 border-t-2 border-orange-500/40 pt-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="px-2 py-1 bg-blue-500/20 text-blue-400 border-2 border-blue-500/60 rounded-lg text-xs font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                    [LFD_PROTOCOL_LIQUIDITY]
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-black/40 border border-blue-500/40 rounded-lg">
                    <span className="text-xs font-mono tracking-wide text-gray-300">Pool Type</span>
                    <span className="text-xs font-mono font-semibold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                      {lfdSymbol ? `${lfdSymbol}/MCLB` : '[LOADING...]'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-black/40 border border-blue-500/40 rounded-lg">
                    <span className="text-xs font-mono tracking-wide text-gray-300">Lock Status</span>
                    <span className="text-xs font-mono font-semibold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                      {hasNFT ? `Locked NFT #${nftId}` : '[NOT_LOCKED]'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-black/40 border border-blue-500/40 rounded-lg">
                    <span className="text-xs font-mono tracking-wide text-gray-300">DEX</span>
                    <span className="text-xs font-mono font-semibold text-gray-300">Shadow Exchange</span>
                  </div>
                </div>
              </div>

              {/* Protocol Analytics */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 border-t-2 border-orange-500/40 pt-4">
                {/* LBP POL Link */}
                <a
                  href="https://debank.com/profile/0xB20241DFD126E8Db352bF2e19f5f3402Dca265e9?chain="
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-black/40 border-2 border-orange-500/60 rounded-lg p-3 shadow-[0_0_15px_rgba(249,115,22,0.3)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)] hover:scale-105 transition-all duration-500 group"
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-orange-400/40">
                    <Image
                      src="/loopburn-logo.png"
                      alt="LoopBurn Logo"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-orange-400 group-hover:text-orange-300 transition-colors drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">
                    LBP_POL
                  </span>
                </a>

                {/* LFD POL Link */}
                <a
                  href="https://debank.com/profile/0xDA75FE3f43933e10651Ef6BC57E6e64a6A10abd2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-black/40 border-2 border-blue-500/60 rounded-lg p-3 shadow-[0_0_15px_rgba(59,130,246,0.3)] hover:shadow-[0_0_25px_rgba(59,130,246,0.5)] hover:scale-105 transition-all duration-500 group"
                >
                  <div className="w-4 h-4 rounded-full overflow-hidden border border-blue-400/40">
                    <Image
                      src="/loopfuse.png"
                      alt="LoopFuse Logo"
                      width={16}
                      height={16}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-blue-400 group-hover:text-blue-300 transition-colors drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                    LFD_POL
                  </span>
                </a>

                {/* DAO Treasury Link */}
                <a
                  href="https://debank.com/profile/0x10aad399c59df12b1ae09735fe9efd8bd9f62fd6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-black/40 border-2 border-purple-500/60 rounded-lg p-3 shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:shadow-[0_0_25px_rgba(168,85,247,0.5)] hover:scale-105 transition-all duration-500 group"
                >
                  <div className="p-1 bg-purple-500/20 rounded border border-purple-400/40">
                    <Users className="h-3 w-3 text-purple-400 group-hover:text-purple-300 transition-colors drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
                  </div>
                  <span className="text-xs font-mono font-bold tracking-wider text-purple-400 group-hover:text-purple-300 transition-colors drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
                    DAO_TREASURY
                  </span>
                </a>
              </div>
            </div>
          )}

          {/* Dual Protocol Status Indicators */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 pt-3 border-t-2 border-orange-500/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Lock className="h-3 w-3 text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                </div>
                <span className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>LBP_LOCKED_∞<span className="text-orange-400">]</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Lock className="h-3 w-3 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                </div>
                <span className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>{hasNFT ? 'LFD_LOCKED' : 'LFD_UNLOCKED'}<span className="text-orange-400">]</span>
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
