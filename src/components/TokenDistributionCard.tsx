'use client';

import { Card, CardContent } from "@/components/ui/card"
import { PieChart, Users, Droplets, Loader2, TrendingUp } from "lucide-react"
import { useTokenData } from "@/hooks/use-token-data"
import { formatUnits } from "viem"

export default function TokenDistributionCard() {
  const { tokenData, liquidityData, isLoading, error, hasTokenData, hasLiquidityData } = useTokenData();

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
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-green-400 text-lg font-semibold">
        <PieChart className="h-5 w-5" />
        Token Distribution
      </div>
      <Card className="border-green-500/30 h-full">
        <CardContent className="space-y-6 px-3 sm:px-6 pt-6 pb-6 h-full flex flex-col justify-between">
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Loading distribution data...</span>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-sm text-red-400">Failed to load distribution data</span>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Supply Distribution Bars - ONLY REAL DATA */}
              <div className="space-y-4">
                {supplyData ? supplyData.map((item, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <item.icon className={`h-4 w-4 ${item.iconColor}`} />
                        <span className="text-sm text-muted-foreground">{item.label}</span>
                      </div>
                      <div className="text-right">
                        <div className={`text-sm font-medium ${item.iconColor}`}>
                          {item.percentage.toFixed(1)}%
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {item.value}
                        </div>
                      </div>
                    </div>
                    <div className={`h-3 ${item.bgColor} rounded-full overflow-hidden`}>
                      <div
                        className={`h-full bg-gradient-to-r ${item.color} rounded-full transition-all duration-1000 ease-out`}
                        style={{ width: `${Math.min(item.percentage, 100)}%` }}
                      />
                    </div>
                  </div>
                )) : (
                  <div className="text-center text-sm text-muted-foreground">
                    Loading supply distribution...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Distribution Status */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <div className="flex items-center gap-2 text-xs">
              <PieChart className="h-3 w-3 text-green-500" />
              <span className="text-muted-foreground">Live Distribution</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <Users className="h-3 w-3 text-blue-500" />
              <span className="text-muted-foreground">Real-Time Data</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
