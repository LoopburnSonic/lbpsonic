'use client';

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Droplets, TrendingUp, Lock, Loader2 } from "lucide-react"
import { useTokenData } from "@/hooks/use-token-data"
import { useLFDTokenData } from "@/hooks/use-lfd-token-data"
import { formatUnits } from "viem"
import { useState, useEffect } from "react"

interface TokenPrice {
  usd: number;
}

interface PriceData {
  lbpPrice: number;
  wsPrice: number;
  lfdPrice: number;
  mclbPrice: number;
  lastUpdated: number;
}

export default function LiquidityVisualization() {
  const { liquidityData, isLoading, error, hasLiquidityData } = useTokenData();
  const {
    totalSupply: lfdTotalSupply,
    symbol: lfdSymbol,
    isLoading: lfdLoading,
    error: lfdError
  } = useLFDTokenData();
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

        // Fetch LFD price from DexScreener (correct LFD token address)
        const lfdResponse = await fetch('https://api.dexscreener.com/latest/dex/tokens/0x01fd763618E555A7118F1d1144C88113A5C34e64');
        const lfdData = await lfdResponse.json();

        // Fetch MCLB price from DexScreener (correct MCLB token address)
        const mclbResponse = await fetch('https://api.dexscreener.com/latest/dex/tokens/0x44e23b1f3f4511b3a7e81077fd9f2858df1b7579');
        const mclbData = await mclbResponse.json();

        const lbpPrice = lbpData.pairs?.[0]?.priceUsd ? parseFloat(lbpData.pairs[0].priceUsd) : 0;
        const wsPrice = wsData.pairs?.[0]?.priceUsd ? parseFloat(wsData.pairs[0].priceUsd) : 0;
        const lfdPrice = lfdData.pairs?.[0]?.priceUsd ? parseFloat(lfdData.pairs[0].priceUsd) : 0;
        const mclbPrice = mclbData.pairs?.[0]?.priceUsd ? parseFloat(mclbData.pairs[0].priceUsd) : 0;

        console.log('API Responses:', {
          lbp: { pairs: lbpData.pairs?.length || 0, price: lbpPrice },
          ws: { pairs: wsData.pairs?.length || 0, price: wsPrice },
          lfd: { pairs: lfdData.pairs?.length || 0, price: lfdPrice },
          mclb: { pairs: mclbData.pairs?.length || 0, price: mclbPrice, address: '0x44e23b1f3f4511b3a7e81077fd9f2858df1b7579' }
        });

        setPriceData({
          lbpPrice,
          wsPrice,
          lfdPrice,
          mclbPrice,
          lastUpdated: Date.now()
        });

        console.log('✅ Fetched real prices on page load:', { lbpPrice, wsPrice, lfdPrice, mclbPrice });
      } catch (error) {
        console.error('❌ Error fetching prices:', error);
        // Set fallback data instead of null
        setPriceData({
          lbpPrice: 0,
          wsPrice: 0,
          lfdPrice: 0,
          mclbPrice: 0,
          lastUpdated: Date.now()
        });
      } finally {
        setPriceLoading(false);
      }
    };

    fetchPrices();
  }, []); // Fetch once on component mount

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
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="p-1.5 bg-orange-500/20 rounded border border-orange-400/40">
            <Droplets className="h-5 w-5 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
          </div>
          <h3 className="text-lg font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
            LIQUIDITY_POOLS
          </h3>
        </div>
        <div className="h-[1px] w-24 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
      </div>
      <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_25px_rgba(249,115,22,0.4),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
        <CardContent className="space-y-4 px-3 pt-4 pb-4 relative z-10">
          {(isLoading || lfdLoading) ? (
            <div className="flex items-center justify-center py-8">
              <div className="flex items-center gap-2">
                <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                  <Loader2 className="h-4 w-4 animate-spin text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                </div>
                <span className="text-sm font-mono tracking-wide text-orange-400">
                  <span className="text-orange-300">[</span>LOADING_LIQUIDITY_DATA<span className="text-orange-300">]</span>
                </span>
              </div>
            </div>
          ) : (error && lfdError) ? (
            <div className="flex items-center justify-center py-8">
              <span className="text-xs font-mono tracking-wide text-red-400">
                <span className="text-red-300">[</span>ERROR<span className="text-red-300">]</span> Failed to load liquidity data
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Dual Pool Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* LBP Pool */}
                <div className="text-center space-y-2 p-3 bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 rounded-lg shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="px-2 py-1 bg-orange-500/20 text-orange-400 border-2 border-orange-500/60 rounded-lg text-xs font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                      [LBP_POOL]
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-orange-400 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
                    {usdValues && !priceLoading
                      ? `$${usdValues.totalUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                      : priceLoading
                      ? '[LOADING...]'
                      : hasLiquidityData && liquidityData
                      ? '[PRICE_UNAVAILABLE]'
                      : '[LOADING...]'
                    }
                  </div>
                  <div className="text-xs font-mono tracking-wide text-gray-300">
                    <span className="text-orange-400">[</span>TOTAL_VALUE_LOCKED<span className="text-orange-400">]</span>
                  </div>
                </div>

                {/* LFD Pool */}
                <div className="text-center space-y-2 p-3 bg-black/40 backdrop-blur-sm border-2 border-blue-500/60 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] transition-all duration-500">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="px-2 py-1 bg-blue-500/20 text-blue-400 border-2 border-blue-500/60 rounded-lg text-xs font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                      [LFD_POOL]
                    </div>
                  </div>
                  <div className="text-xs font-mono font-bold text-blue-400 drop-shadow-[0_0_12px_rgba(59,130,246,0.8)]">
                    {lfdTotalSupply && lfdSymbol
                      ? `${Number(lfdTotalSupply).toLocaleString()}`
                      : '[LOADING...]'
                    }
                  </div>
                  <div className="text-xs font-mono tracking-wide text-gray-300">
                    <span className="text-orange-400">[</span>PROTOCOL_OWNED<span className="text-orange-400">]</span>
                  </div>
                </div>
              </div>

              {/* Detailed Liquidity Composition */}
              <div className="space-y-6">
                {/* LBP Pool Composition */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className="px-4 py-2 bg-orange-500/20 text-orange-400 border-2 border-orange-500/60 rounded-lg font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(249,115,22,0.4)]">
                      [LBP_POOL_COMPOSITION]
                    </div>
                  </div>

                  {hasLiquidityData && liquidityData && usdValues && !priceLoading ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-2 bg-black/40 border border-orange-500/40 rounded-lg">
                        <span className="text-xs font-mono tracking-wide text-gray-300">
                          {liquidityData.token0Symbol}
                        </span>
                        <div className="text-right">
                          <div className="text-xs font-mono font-semibold text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">
                            {usdValues.lbpAmount.toLocaleString(undefined, { maximumFractionDigits: 3 })} {liquidityData.token0Symbol}
                          </div>
                          <div className="font-mono text-xs text-gray-400">
                            ${usdValues.lbpUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-black/40 border border-orange-500/40 rounded-lg">
                        <span className="text-xs font-mono tracking-wide text-gray-300">
                          {liquidityData.token1Symbol}
                        </span>
                        <div className="text-right">
                          <div className="text-xs font-mono font-semibold text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">
                            {usdValues.wsAmount.toLocaleString(undefined, { maximumFractionDigits: 3 })} {liquidityData.token1Symbol}
                          </div>
                          <div className="font-mono text-xs text-gray-400">
                            ${usdValues.wsUsdValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-xs font-mono tracking-wide text-orange-400">
                      {priceLoading ? '[LOADING_PRICE_DATA...]' : '[LOADING_COMPOSITION...]'}
                    </div>
                  )}
                </div>

                {/* LFD Pool Composition */}
                <div className="space-y-4 border-t-2 border-orange-500/40 pt-6">
                  <div className="flex items-center justify-center gap-3">
                    <div className="px-4 py-2 bg-blue-500/20 text-blue-400 border-2 border-blue-500/60 rounded-lg font-mono font-bold tracking-wider shadow-[0_0_10px_rgba(59,130,246,0.4)]">
                      [LFD_POOL_COMPOSITION]
                    </div>
                  </div>

                  {priceData && !priceLoading ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-2 bg-black/40 border border-blue-500/40 rounded-lg">
                        <span className="text-xs font-mono tracking-wide text-gray-300">
                          LFD
                        </span>
                        <div className="text-right">
                          <div className="text-xs font-mono font-semibold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                            {lfdTotalSupply && lfdSymbol
                              ? `${(Number(lfdTotalSupply) * 0.15).toLocaleString(undefined, { maximumFractionDigits: 3 })} ${lfdSymbol}`
                              : '[LOADING...]'
                            }
                          </div>
                          <div className="font-mono text-xs text-gray-400">
                            {priceData.lfdPrice > 0 && lfdTotalSupply
                              ? `$${(Number(lfdTotalSupply) * 0.15 * priceData.lfdPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                              : '[PRICE_UNAVAILABLE]'
                            }
                          </div>
                        </div>
                      </div>
                      <div className="flex justify-between items-center p-2 bg-black/40 border border-blue-500/40 rounded-lg">
                        <span className="text-xs font-mono tracking-wide text-gray-300">
                          MCLB
                        </span>
                        <div className="text-right">
                          <div className="text-xs font-mono font-semibold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)]">
                            {priceData.mclbPrice > 0
                              ? `${(50000).toLocaleString(undefined, { maximumFractionDigits: 3 })} MCLB`
                              : '[LOADING...]'
                            }
                          </div>
                          <div className="font-mono text-xs text-gray-400">
                            {priceData.mclbPrice > 0
                              ? `$${(50000 * priceData.mclbPrice).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
                              : '[PRICE_UNAVAILABLE]'
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center text-xs font-mono tracking-wide text-blue-400">
                      {priceLoading ? '[LOADING_PRICE_DATA...]' : '[LOADING_COMPOSITION...]'}
                    </div>
                  )}
                </div>
              </div>

              {/* Price Information */}
              {priceData && !priceLoading && (
                <div className="space-y-3 border-t-2 border-orange-500/40 pt-4">
                  <div className="text-center">
                    <div className="text-xs font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
                      CURRENT_PRICES
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="text-center p-2 bg-black/40 border-2 border-orange-500/60 rounded-lg shadow-[0_0_15px_rgba(249,115,22,0.3)]">
                      <div className="text-xs font-mono font-bold text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)] mb-0.5">LBP</div>
                      <div className="text-xs font-mono text-gray-300">
                        {priceData.lbpPrice > 0 ? `$${priceData.lbpPrice.toFixed(6)}` : '[NO_DATA]'}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-black/40 border-2 border-gray-500/60 rounded-lg shadow-[0_0_15px_rgba(107,114,128,0.3)]">
                      <div className="text-xs font-mono font-bold text-gray-400 drop-shadow-[0_0_6px_rgba(107,114,128,0.6)] mb-0.5">wS</div>
                      <div className="text-xs font-mono text-gray-300">
                        {priceData.wsPrice > 0 ? `$${priceData.wsPrice.toFixed(6)}` : '[NO_DATA]'}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-black/40 border-2 border-blue-500/60 rounded-lg shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                      <div className="text-xs font-mono font-bold text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.6)] mb-0.5">LFD</div>
                      <div className="text-xs font-mono text-gray-300">
                        {priceData.lfdPrice > 0 ? `$${priceData.lfdPrice.toFixed(6)}` : '[NO_DATA]'}
                      </div>
                    </div>
                    <div className="text-center p-2 bg-black/40 border-2 border-purple-500/60 rounded-lg shadow-[0_0_15px_rgba(168,85,247,0.3)]">
                      <div className="text-xs font-mono font-bold text-purple-400 drop-shadow-[0_0_6px_rgba(168,85,247,0.6)] mb-0.5">MCLB</div>
                      <div className="text-xs font-mono text-gray-300">
                        {priceData.mclbPrice > 0 ? `$${priceData.mclbPrice.toFixed(6)}` : '[NO_DATA]'}
                      </div>
                    </div>
                  </div>
                </div>
              )}






            </div>
          )}

          {/* Dual Pool Status Indicators */}
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
                  <TrendingUp className="h-3 w-3 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
                </div>
                <span className="text-xs font-mono tracking-wide text-gray-300">
                  <span className="text-orange-400">[</span>LFD_PROTOCOL_OWNED<span className="text-orange-400">]</span>
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
