'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLiquidityLockData, useLiquidityLockStatus } from "@/hooks/use-liquidity-lock-data";
import { Lock, Unlock, Shield, AlertCircle, CheckCircle, Settings } from "lucide-react";
import { CONTRACT_URLS } from "@/constants/contracts";

export default function LiquidityLockInfo() {
  const {
    hasNFT,
    isLocked,
    nftId,
    positionManagerAddress,
    ownerAddress,
    liquidityLockAddress,
    isLoading,
    error,
  } = useLiquidityLockData();

  const {
    canCollect,
    canDecreaseLiquidity,
    canLockNFT,
    isOperational,
  } = useLiquidityLockStatus();

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <p className="text-red-400 text-sm">Failed to load Liquidity Lock data</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Lock Status */}
      <Card className={`bg-[#191e29] border transition-colors ${
        isLocked 
          ? 'border-green-500/20 hover:border-green-500/40' 
          : 'border-orange-500/20 hover:border-orange-500/40'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {isLocked ? (
              <Lock className="h-6 w-6 text-green-500 flex-shrink-0" />
            ) : (
              <Unlock className="h-6 w-6 text-orange-500 flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">Lock Status</h4>
              {isLoading ? (
                <Skeleton className="h-4 w-16 mt-1" />
              ) : (
                <div className="flex items-center gap-2 mt-1">
                  <Badge 
                    variant={isLocked ? "default" : "secondary"}
                    className={`text-xs px-2 py-0 ${
                      isLocked ? 'bg-green-500/20 text-green-400' : 'bg-orange-500/20 text-orange-400'
                    }`}
                  >
                    {isLocked ? 'Locked' : 'Unlocked'}
                  </Badge>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* NFT ID */}
      <Card className="bg-[#191e29] border border-blue-500/20 hover:border-blue-500/40 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="h-6 w-6 text-blue-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">NFT Position</h4>
              {isLoading ? (
                <Skeleton className="h-4 w-12 mt-1" />
              ) : (
                <p className="text-xs text-muted-foreground">
                  {hasNFT ? `#${nftId}` : 'No NFT'}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operations Status */}
      <Card className="bg-[#191e29] border border-purple-500/20 hover:border-purple-500/40 transition-colors">
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            <Settings className="h-6 w-6 text-purple-500 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">Operations</h4>
              {isLoading ? (
                <Skeleton className="h-4 w-20 mt-1" />
              ) : (
                <div className="space-y-1">
                  <div className="flex items-center gap-1">
                    {canCollect ? (
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-gray-400" />
                    )}
                    <span className="text-xs text-muted-foreground">Collect</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {canDecreaseLiquidity ? (
                      <CheckCircle className="h-3 w-3 text-green-400" />
                    ) : (
                      <AlertCircle className="h-3 w-3 text-gray-400" />
                    )}
                    <span className="text-xs text-muted-foreground">Decrease</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operational Status */}
      <Card className={`bg-[#191e29] border transition-colors ${
        isOperational 
          ? 'border-green-500/20 hover:border-green-500/40' 
          : 'border-gray-500/20 hover:border-gray-500/40'
      }`}>
        <CardContent className="p-4">
          <div className="flex items-center gap-3">
            {isOperational ? (
              <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
            ) : (
              <AlertCircle className="h-6 w-6 text-gray-500 flex-shrink-0" />
            )}
            <div className="min-w-0 flex-1">
              <h4 className="font-semibold text-sm">System Status</h4>
              {isLoading ? (
                <Skeleton className="h-4 w-16 mt-1" />
              ) : (
                <Badge 
                  variant={isOperational ? "default" : "secondary"}
                  className={`text-xs px-2 py-0 mt-1 ${
                    isOperational ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                  }`}
                >
                  {isOperational ? 'Active' : 'Inactive'}
                </Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Detailed liquidity lock information component
export function LiquidityLockDetails() {
  const {
    positionManagerAddress,
    nftId,
    ownerAddress,
    liquidityLockAddress,
    hasNFT,
    isLoading,
    error,
  } = useLiquidityLockData();

  if (error) {
    return (
      <Card className="bg-red-900/20 border-red-500/20">
        <CardContent className="p-4">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <p className="text-red-400 text-sm">Failed to load contract details</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-[#191e29] border border-purple-500/20">
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Lock className="h-5 w-5 text-purple-500" />
          Liquidity Lock Contract
        </CardTitle>
        <CardDescription>
          Protocol-owned liquidity management
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contract Address */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Contract Address</h4>
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <a
              href={CONTRACT_URLS.LIQUIDITY_LOCK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-purple-400 hover:text-purple-300 transition-colors break-all"
            >
              {liquidityLockAddress}
            </a>
          )}
        </div>

        {/* Position Manager */}
        <div>
          <h4 className="font-semibold text-sm mb-2">Position Manager</h4>
          {isLoading ? (
            <Skeleton className="h-4 w-full" />
          ) : (
            <p className="text-xs text-muted-foreground break-all">
              {positionManagerAddress || 'Not available'}
            </p>
          )}
        </div>

        {/* NFT Position */}
        <div>
          <h4 className="font-semibold text-sm mb-2">NFT Position ID</h4>
          {isLoading ? (
            <Skeleton className="h-4 w-20" />
          ) : (
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                {hasNFT ? `#${nftId}` : 'No NFT locked'}
              </p>
              <Badge 
                variant={hasNFT ? "default" : "secondary"}
                className={`text-xs px-2 py-0 ${
                  hasNFT ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                }`}
              >
                {hasNFT ? 'Active' : 'Inactive'}
              </Badge>
            </div>
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
