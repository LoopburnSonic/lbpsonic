'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLFDTokenData } from "@/hooks/use-lfd-token-data";
import { Flame, TrendingDown, Coins, Target } from "lucide-react";
import { CONTRACT_URLS } from "@/constants/contracts";

export default function LFDTokenInfo() {
  const {
    name,
    symbol,
    totalSupply,
    maxTotalSupply,
    burnedSupply,
    burnedPercentage,
    circulatingPercentage,
    tokenAddress,
    fusionCoreAddress,
    isLoading,
    error,
  } = useLFDTokenData();

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-500/20">
        <CardContent className="p-4">
          <p className="text-red-400 text-sm">Failed to load LFD token data</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Total Supply */}
      <Card className="bg-[#191e29] border border-blue-500/20 hover:border-blue-500/40 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Coins className="h-6 w-6 text-blue-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">Total Supply</h4>
              {isLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                <p className="text-xs text-muted-foreground truncate">
                  {parseFloat(totalSupply).toLocaleString()} {symbol}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Max Supply */}
      <Card className="bg-[#191e29] border border-purple-500/20 hover:border-purple-500/40 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Target className="h-6 w-6 text-purple-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">Max Supply</h4>
              {isLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                <p className="text-xs text-muted-foreground truncate">
                  {parseFloat(maxTotalSupply).toLocaleString()} {symbol}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Burned Supply */}
      <Card className="bg-[#191e29] border border-orange-500/20 hover:border-orange-500/40 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Flame className="h-6 w-6 text-orange-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">Burned Supply</h4>
              {isLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground truncate">
                    {parseFloat(burnedSupply).toLocaleString()} {symbol}
                  </p>
                  <Badge variant="destructive" className="text-xs px-1 py-0">
                    {burnedPercentage.toFixed(2)}%
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Circulating Percentage */}
      <Card className="bg-[#191e29] border border-green-500/20 hover:border-green-500/40 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <TrendingDown className="h-6 w-6 text-green-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">Circulating</h4>
              {isLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                <div className="space-y-1">
                  <p className="text-xs text-muted-foreground">
                    {circulatingPercentage.toFixed(2)}% of max
                  </p>
                  <Badge variant="secondary" className="text-xs px-1 py-0">
                    Active
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Detailed token information component
export function LFDTokenDetails() {
  const {
    name,
    symbol,
    tokenAddress,
    fusionCoreAddress,
    ownerAddress,
    isLoading,
    error,
  } = useLFDTokenData();

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-500/20">
        <CardContent className="p-4">
          <p className="text-red-400 text-sm">Failed to load contract details</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#191e29] border border-blue-500/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Coins className="h-5 w-5 text-blue-500" />
          {isLoading ? <Skeleton className="h-5 w-32" /> : `${name} (${symbol})`}
        </CardTitle>
        <CardDescription>
          Contract addresses and details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Token Contract */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Token Contract</h4>
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <a
              href={CONTRACT_URLS.LFD_TOKEN}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-blue-400 hover:text-blue-300 transition-colors break-all"
            >
              {tokenAddress}
            </a>
          )}
        </div>

        {/* Fusion Core */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Fusion Core</h4>
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <a
              href={CONTRACT_URLS.FUSION_CORE}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-orange-400 hover:text-orange-300 transition-colors break-all"
            >
              {fusionCoreAddress || 'Not set'}
            </a>
          )}
        </div>

        {/* Owner */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Owner</h4>
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <p className="text-xs text-muted-foreground break-all">
              {ownerAddress || 'Not available'}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
