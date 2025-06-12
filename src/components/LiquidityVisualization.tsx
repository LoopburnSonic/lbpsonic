'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, TrendingUp, Lock, Loader2 } from "lucide-react"
import { useTokenData } from "@/hooks/use-token-data"
import { formatUnits } from "viem"
import { useState, useEffect } from "react"

interface TokenPrice {
  usd: number;
}

interface PriceData {
  lbpPrice: number;
  wsPrice: number;
  lastUpdated: number;
}

export default function LiquidityVisualization() {
  const { liquidityData, isLoading, error, hasLiquidityData } = useTokenData();
  const [priceData, setPriceData] = useState<PriceData | null>(null);
  const [priceLoading, setPriceLoading] = useState(true);

  // Fetch token prices from DexScreener API on page load only
  useEffect(() => {
    const fetchPrices = async () => {
      try {
        setPriceLoading(true);

        // Fetch LBP price from DexScreener
        const lbpResponse = await fetch('https://api.dexscreener.com/latest/dex/tokens/0x001bFF4b6da770f445A740227224D3c8b48e6fb2');
        const lbpData = await lbpResponse.json();

        // Fetch wS price from DexScreener (Sonic native token)
        const wsResponse = await fetch('https://api.dexscreener.com/latest/dex/tokens/0x039e2fB66102314Ce7b64Ce5Ce3E5183bc94aD38');
        const wsData = await wsResponse.json();

        const lbpPrice = lbpData.pairs?.[0]?.priceUsd ? parseFloat(lbpData.pairs[0].priceUsd) : 0;
        const wsPrice = wsData.pairs?.[0]?.priceUsd ? parseFloat(wsData.pairs[0].priceUsd) : 0;

        setPriceData({
          lbpPrice,
          wsPrice,
          lastUpdated: Date.now()
        });

        console.log('✅ Fetched real prices on page load:', { lbpPrice, wsPrice });
      } catch (error) {
        console.error('❌ Error fetching prices:', error);
        setPriceData(null);
      } finally {
        setPriceLoading(false);
      }
    };

    fetchPrices();
  }, []);

  // Calculate real USD values
  const calculateUSDValues = () => {
    if (!hasLiquidityData || !liquidityData || !priceData) {
      return null;
    }

    const lbpAmount = Number(formatUnits(liquidityData.token0Balance, 18));
    const wsAmount = Number(formatUnits(liquidityData.token1Balance, 18));

    const lbpUsdValue = lbpAmount * priceData.lbpPrice;
    const wsUsdValue = wsAmount * priceData.wsPrice;
    const totalUsdValue = lbpUsdValue + wsUsdValue;

    return {
      lbpAmount,
      wsAmount,
      lbpUsdValue,
      wsUsdValue,
      totalUsdValue
    };
  };

  const usdValues = calculateUSDValues();

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-center gap-2 text-blue-400 text-lg font-semibold">
        <Droplets className="h-5 w-5" />
        Liquidity Pool
      </div>
      <Card className="border-blue-500/30 h-full">
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
              {/* Main USD Value Display - REAL CALCULATED USD */}
              <div className="text-center space-y-2">
                <div className="text-3xl font-bold text-blue-300">
                  {usdValues && !priceLoading
                    ? `$${usdValues.totalUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                    : priceLoading
                    ? 'Loading prices...'
                    : hasLiquidityData && liquidityData
                    ? 'Price data unavailable'
                    : 'Loading...'
                  }
                </div>
                <div className="text-sm text-muted-foreground">Total Value Locked (USD)</div>
              </div>

              {/* Liquidity Composition with USD Values - REAL DATA */}
              <div className="space-y-4">
                {hasLiquidityData && liquidityData && usdValues && !priceLoading ? (
                  <>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {liquidityData.token0Symbol}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {usdValues.lbpAmount.toLocaleString(undefined, { maximumFractionDigits: 3 })} {liquidityData.token0Symbol}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${usdValues.lbpUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-muted-foreground">
                        {liquidityData.token1Symbol}
                      </span>
                      <div className="text-right">
                        <div className="text-sm font-medium">
                          {usdValues.wsAmount.toLocaleString(undefined, { maximumFractionDigits: 3 })} {liquidityData.token1Symbol}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          ${usdValues.wsUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="text-center text-sm text-muted-foreground">
                    {priceLoading ? 'Loading price data...' : 'Loading liquidity composition...'}
                  </div>
                )}
              </div>

              {/* Price Information */}
              {priceData && !priceLoading && (
                <div className="space-y-2 border-t border-blue-500/20 pt-4">
                  <div className="text-xs text-center text-muted-foreground">
                    Current Prices
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">LBP: ${priceData.lbpPrice.toFixed(6)}</span>
                    <span className="text-muted-foreground">wS: ${priceData.wsPrice.toFixed(6)}</span>
                  </div>
                </div>
              )}



              {/* Pool Status */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Pool Status</span>
                  <span className="text-blue-400 font-medium">
                    {hasLiquidityData && priceData ? 'Active' : 'Loading...'}
                  </span>
                </div>
                <div className="h-3 bg-blue-900/30 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: hasLiquidityData && priceData ? '100%' : '0%' }}
                  />
                </div>
                <div className="text-xs text-muted-foreground text-center">
                  {hasLiquidityData && liquidityData
                    ? `${liquidityData.token0Symbol}/${liquidityData.token1Symbol} Pool`
                    : 'Loading pool information...'
                  }
                </div>
              </div>


            </div>
          )}

          {/* Status Indicators */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-2 sm:gap-0">
            <div className="flex items-center gap-2 text-xs">
              <Lock className="h-3 w-3 text-orange-500" />
              <span className="text-muted-foreground">Locked Forever</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <TrendingUp className="h-3 w-3 text-green-500" />
              <span className="text-muted-foreground">Auto-Compounding</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
