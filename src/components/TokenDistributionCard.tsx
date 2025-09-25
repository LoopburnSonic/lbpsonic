'use client';

import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Users, Droplets, Loader2, TrendingUp } from "lucide-react"
import { useTokenData } from "@/hooks/use-token-data"
import { useLFDTokenData } from "@/hooks/use-lfd-token-data"
import { useReadContract } from 'wagmi'
import { formatUnits } from "viem"
import { FLD_CONTRACTS } from '@/constants/contracts'
import LFDTokenABI from '@/abis/LFDToken.json'

export default function TokenDistributionCard() {
  const { tokenData, liquidityData, isLoading, error, hasTokenData, hasLiquidityData } = useTokenData();
  const {
    totalSupply: lfdTotalSupply,
    maxTotalSupply: lfdMaxSupply,
    circulatingPercentage: lfdCirculatingPercentage,
    symbol: lfdSymbol,
    decimals: lfdDecimals,
    totalSupplyRaw: lfdTotalSupplyRaw,
    maxTotalSupplyRaw: lfdMaxSupplyRaw,
    isLoading: lfdLoading,
    error: lfdError
  } = useLFDTokenData();

  // Get real LP supply from contract
  const { data: lfdLpSupplyRaw } = useReadContract({
    address: FLD_CONTRACTS.LFD_TOKEN,
    abi: LFDTokenABI,
    functionName: 'balanceOf',
    args: ['0x7dac17a1d054668449bcf6a4d80af657f4b1bc3b'], // LP pool address
    query: {
      enabled: true,
    }
  });

  // Get protocol owned supply from contract
  const { data: lfdProtocolSupplyRaw } = useReadContract({
    address: FLD_CONTRACTS.LFD_TOKEN,
    abi: LFDTokenABI,
    functionName: 'balanceOf',
    args: ['0xDA75FE3f43933e10651Ef6BC57E6e64a6A10abd2'], // Protocol owner address
    query: {
      enabled: true,
    }
  });

  // Calculate real LFD distribution data
  const getLFDDistributionData = () => {
    if (!lfdMaxSupplyRaw || !lfdTotalSupplyRaw || !lfdLpSupplyRaw || !lfdProtocolSupplyRaw || !lfdDecimals) {
      return null;
    }

    const lpSupply = formatUnits(lfdLpSupplyRaw as bigint, lfdDecimals);
    const protocolSupply = formatUnits(lfdProtocolSupplyRaw as bigint, lfdDecimals);
    const holderSupplyRaw = lfdTotalSupplyRaw - (lfdLpSupplyRaw as bigint) - (lfdProtocolSupplyRaw as bigint);
    const holderSupply = formatUnits(holderSupplyRaw, lfdDecimals);

    const lpPercentage = (Number(lfdLpSupplyRaw as bigint) / Number(lfdMaxSupplyRaw)) * 100;
    const protocolPercentage = (Number(lfdProtocolSupplyRaw as bigint) / Number(lfdMaxSupplyRaw)) * 100;
    const holderPercentage = (Number(holderSupplyRaw) / Number(lfdMaxSupplyRaw)) * 100;

    return {
      lpSupply,
      lpPercentage,
      protocolSupply,
      protocolPercentage,
      holderSupply,
      holderPercentage
    };
  };

  const lfdDistribution = getLFDDistributionData();

  // Calculate supply distribution ONLY with real data - NO FALLBACKS
  const getSupplyData = () => {
    if (!hasTokenData || !tokenData || !hasLiquidityData || !liquidityData) {
      return null; // Return null instead of fallback data
    }

    // Calculate real percentages using ONLY real contract data
    const maxSupplyNum = Number(formatUnits(tokenData.maxTotalSupply, tokenData.decimals));
    const currentSupplyNum = Number(formatUnits(tokenData.currentSupply, tokenData.decimals));

    // Get real LP supply from liquidity data
    const lpSupplyNum = Number(formatUnits(liquidityData.token0Balance, 18)); // Assuming token0 is LBP
    const holderSupplyNum = currentSupplyNum - lpSupplyNum;

    const lpPercentage = (lpSupplyNum / maxSupplyNum) * 100;
    const holderPercentage = (holderSupplyNum / maxSupplyNum) * 100;
    const currentSupplyPercentage = (currentSupplyNum / maxSupplyNum) * 100;

    return [
      {
        label: "LP Supply",
        percentage: lpPercentage,
        value: `${lpSupplyNum.toLocaleString()} ${tokenData.symbol}`,
        color: "from-blue-500 to-cyan-500",
        bgColor: "bg-blue-900/30",
        icon: Droplets,
        iconColor: "text-blue-400"
      },
      {
        label: "Holder Supply",
        percentage: holderPercentage,
        value: `${holderSupplyNum.toLocaleString()} ${tokenData.symbol}`,
        color: "from-green-500 to-emerald-500",
        bgColor: "bg-green-900/30",
        icon: Users,
        iconColor: "text-green-400"
      },
      {
        label: "Current Supply",
        percentage: currentSupplyPercentage,
        value: `${currentSupplyNum.toLocaleString()} ${tokenData.symbol}`,
        color: "from-purple-500 to-pink-500",
        bgColor: "bg-purple-900/30",
        icon: TrendingUp,
        iconColor: "text-purple-400"
      }
    ];
  };

  const supplyData = getSupplyData();

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="p-1.5 bg-orange-500/20 rounded border border-orange-400/40">
            <PieChart className="h-5 w-5 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
          </div>
          <h3 className="text-lg font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
            TOKEN_DISTRIBUTION
          </h3>
        </div>
        <div className="h-[1px] w-28 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
      </div>
      <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
        <CardContent className="space-y-6 px-4 pt-5 pb-5 relative z-10">
          {(isLoading || lfdLoading) ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-3">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Loader2 className="h-5 w-5 animate-spin text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                </div>
                <span className="font-mono tracking-wide text-green-400">
                  <span className="text-orange-400">[</span>LOADING_DISTRIBUTION_DATA<span className="text-orange-400">]</span>
                </span>
              </div>
            </div>
          ) : (error && lfdError) ? (
            <div className="flex items-center justify-center h-full">
              <span className="font-mono tracking-wide text-red-400">
                <span className="text-red-300">[</span>ERROR<span className="text-red-300">]</span> Failed to load distribution data
              </span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* LBP Token Distribution */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <div className="px-3 py-1.5 bg-orange-500/20 text-orange-400 border-2 border-orange-500/60 rounded-lg font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                    [LBP_DISTRIBUTION]
                  </div>
                </div>

                {supplyData ? supplyData.map((item, index) => (
                  <div key={`lbp-${index}`} className="space-y-2">
                    <div className="flex justify-between items-center p-2 bg-black/40 border border-orange-500/40 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                          <item.icon className={`h-3 w-3 ${item.iconColor} drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]`} />
                        </div>
                        <span className="text-sm font-mono tracking-wide text-gray-300">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-xs font-mono font-semibold ${item.iconColor} drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]`}>
                          {item.percentage.toFixed(1)}%
                        </div>
                        <div className="font-mono text-xs text-gray-400">
                          {item.value}
                        </div>
                      </div>
                    </div>
                    <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-orange-500/30">
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.4)]`}
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-xs font-mono tracking-wide text-orange-400">
                    <span className="text-orange-300">[</span>LOADING_LBP_DISTRIBUTION<span className="text-orange-300">]</span>
                  </div>
                )}
              </div>

              {/* LFD Token Distribution */}
              <div className="space-y-6 border-t-2 border-orange-500/40 pt-6">
                <div className="flex items-center justify-center gap-3">
                  <div className="px-4 py-2 bg-blue-500/20 text-blue-400 border-2 border-blue-500/60 rounded-lg font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                    [LFD_DISTRIBUTION]
                  </div>
                </div>

                {lfdDistribution && lfdTotalSupply && lfdMaxSupply && lfdSymbol ? (
                  <>
                    {/* LP Supply */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-center p-2 bg-black/40 border border-blue-500/40 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                            <Droplets className="h-3 w-3 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300">LP Supply</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-semibold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                            {lfdDistribution.lpPercentage.toFixed(2)}%
                          </div>
                          <div className="font-mono text-xs text-gray-400">
                            {Number(lfdDistribution.lpSupply).toLocaleString()} {lfdSymbol}
                          </div>
                        </div>
                      </div>
                      <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-blue-500/30">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(59,130,246,0.4)]"
                          style={{ width: `${Math.min(lfdDistribution.lpPercentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Protocol Owned Supply */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-black/40 border border-purple-500/40 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                            <TrendingUp className="h-3 w-3 text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300">Protocol Owned</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-semibold text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
                            {lfdDistribution.protocolPercentage.toFixed(2)}%
                          </div>
                          <div className="font-mono text-xs text-gray-400">
                            {Number(lfdDistribution.protocolSupply).toLocaleString()} {lfdSymbol}
                          </div>
                        </div>
                      </div>
                      <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-purple-500/30">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                          style={{ width: `${Math.min(lfdDistribution.protocolPercentage, 100)}%` }}
                        />
                      </div>
                    </div>

                    {/* Holder Supply */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-black/40 border border-green-500/40 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                            <Users className="h-3 w-3 text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300">Holder Supply</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-semibold text-green-400 drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]">
                            {lfdDistribution.holderPercentage.toFixed(2)}%
                          </div>
                          <div className="font-mono text-xs text-gray-400">
                            {Number(lfdDistribution.holderSupply).toLocaleString()} {lfdSymbol}
                          </div>
                        </div>
                      </div>
                      <div className="h-3 bg-black/60 rounded-full overflow-hidden border border-green-500/30">
                        <div
                          className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                          style={{
                            width: `${Math.min(lfdDistribution.holderPercentage, 100)}%`
                          }}
                        />
                      </div>
                    </div>

                    {/* Current Supply */}
                    <div className="space-y-2">
                      <div className="flex justify-between items-center p-2 bg-black/40 border border-purple-500/40 rounded-lg">
                        <div className="flex items-center gap-2">
                          <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                            <TrendingUp className="h-3 w-3 text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]" />
                          </div>
                          <span className="text-xs font-mono tracking-wide text-gray-300">Current Supply</span>
                        </div>
                        <div className="text-right">
                          <div className="text-xs font-mono font-semibold text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)]">
                            {((Number(lfdTotalSupply) / Number(lfdMaxSupply)) * 100).toFixed(1)}%
                          </div>
                          <div className="font-mono text-xs text-gray-400">
                            {Number(lfdTotalSupply).toLocaleString()} / {Number(lfdMaxSupply).toLocaleString()}
                          </div>
                        </div>
                      </div>
                      <div className="h-4 bg-black/60 rounded-full overflow-hidden border border-purple-500/30">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(168,85,247,0.4)]"
                          style={{
                            width: `${Math.min((Number(lfdTotalSupply) / Number(lfdMaxSupply)) * 100, 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-xs font-mono tracking-wide text-blue-400">
                    <span className="text-orange-400">[</span>LOADING_LFD_DISTRIBUTION<span className="text-orange-400">]</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Dual Token Distribution Status */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 pt-3 border-t-2 border-orange-500/40">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <PieChart className="h-3 w-3 text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
                </div>
                <span className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>LBP_DISTRIBUTION<span className="text-orange-400">]</span>
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Users className="h-3 w-3 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                </div>
                <span className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>LFD_DISTRIBUTION<span className="text-orange-400">]</span>
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
