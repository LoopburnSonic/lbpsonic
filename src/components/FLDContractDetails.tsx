'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { useLFDTokenData } from "@/hooks/use-lfd-token-data";
import { useLiquidityLockData } from "@/hooks/use-liquidity-lock-data";
import { useFusionCoreData } from "@/hooks/use-fusion-core-data";
import { Coins, Lock, Zap, ExternalLink, Copy } from "lucide-react";
import { CONTRACT_URLS } from "@/constants/contracts";
import { useState } from "react";

export default function FLDContractDetails() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const {
    name: tokenName,
    symbol: tokenSymbol,
    tokenAddress,
    fusionCoreAddress: tokenFusionCore,
    ownerAddress: tokenOwner,
    isLoading: tokenLoading,
    error: tokenError,
  } = useLFDTokenData();

  const {
    liquidityLockAddress,
    positionManagerAddress,
    nftId,
    hasNFT,
    ownerAddress: lockOwner,
    isLoading: lockLoading,
    error: lockError,
  } = useLiquidityLockData();

  const {
    fusionCoreAddress,
    lfdAddress: coreLfdAddress,
    lbpAddress,
    mclbAddress,
    liquidityLockAddress: coreLiquidityLock,
    ownerAddress: coreOwner,
    isLoading: coreLoading,
    error: coreError,
  } = useFusionCoreData();

  const copyToClipboard = async (address: string) => {
    try {
      await navigator.clipboard.writeText(address);
      setCopiedAddress(address);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy address:', err);
    }
  };

  const AddressDisplay = ({ address, label, url }: { address: string; label: string; url: string }) => (
    <div className="space-y-2">
      <h4 className="font-semibold text-sm">{label}</h4>
      <div className="flex items-center gap-2">
        <code className="text-xs bg-gray-800 px-2 py-1 rounded flex-1 break-all">
          {address || 'Not available'}
        </code>
        {address && (
          <>
            <button
              onClick={() => copyToClipboard(address)}
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="Copy address"
            >
              <Copy className="h-3 w-3" />
            </button>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1 hover:bg-gray-700 rounded transition-colors"
              title="View on explorer"
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          </>
        )}
      </div>
      {copiedAddress === address && (
        <p className="text-xs text-green-400">Address copied!</p>
      )}
    </div>
  );

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* LFD Token Contract */}
      <Card className="bg-[#191e29] border border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Coins className="h-5 w-5 text-blue-500" />
            {tokenLoading ? <Skeleton className="h-5 w-32" /> : `${tokenName} Token`}
          </CardTitle>
          <CardDescription>
            ERC20 token with burn functionality
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {tokenError ? (
            <p className="text-red-400 text-sm">Failed to load token data</p>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/40">
                  {tokenLoading ? <Skeleton className="h-3 w-8" /> : tokenSymbol}
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  ERC20
                </Badge>
              </div>

              <AddressDisplay
                address={tokenAddress}
                label="Token Contract"
                url={CONTRACT_URLS.LFD_TOKEN}
              />

              <AddressDisplay
                address={tokenFusionCore}
                label="Fusion Core Reference"
                url={`https://sonicscan.org/address/${tokenFusionCore}`}
              />

              <AddressDisplay
                address={tokenOwner}
                label="Owner"
                url={`https://sonicscan.org/address/${tokenOwner}`}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Liquidity Lock Contract */}
      <Card className="bg-[#191e29] border border-purple-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Lock className="h-5 w-5 text-purple-500" />
            Liquidity Lock
          </CardTitle>
          <CardDescription>
            Protocol-owned liquidity management
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {lockError ? (
            <p className="text-red-400 text-sm">Failed to load lock data</p>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Badge 
                  variant="outline" 
                  className={`${
                    hasNFT 
                      ? 'bg-green-500/20 text-green-400 border-green-500/40' 
                      : 'bg-gray-500/20 text-gray-400 border-gray-500/40'
                  }`}
                >
                  {lockLoading ? <Skeleton className="h-3 w-12" /> : (hasNFT ? 'Locked' : 'Unlocked')}
                </Badge>
                {hasNFT && (
                  <Badge variant="secondary" className="text-xs">
                    NFT #{nftId}
                  </Badge>
                )}
              </div>

              <AddressDisplay
                address={liquidityLockAddress}
                label="Lock Contract"
                url={CONTRACT_URLS.LIQUIDITY_LOCK}
              />

              <AddressDisplay
                address={positionManagerAddress}
                label="Position Manager"
                url={`https://sonicscan.org/address/${positionManagerAddress}`}
              />

              <AddressDisplay
                address={lockOwner}
                label="Owner"
                url={`https://sonicscan.org/address/${lockOwner}`}
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Fusion Core Contract */}
      <Card className="bg-[#191e29] border border-orange-500/20">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Zap className="h-5 w-5 text-orange-500" />
            Fusion Core
          </CardTitle>
          <CardDescription>
            Automated burn and collection mechanism
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {coreError ? (
            <p className="text-red-400 text-sm">Failed to load core data</p>
          ) : (
            <>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="bg-orange-500/20 text-orange-400 border-orange-500/40">
                  Core
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Automated
                </Badge>
              </div>

              <AddressDisplay
                address={fusionCoreAddress}
                label="Fusion Core Contract"
                url={CONTRACT_URLS.FUSION_CORE}
              />

              <AddressDisplay
                address={coreLfdAddress}
                label="LFD Token Reference"
                url={`https://sonicscan.org/address/${coreLfdAddress}`}
              />

              <AddressDisplay
                address={lbpAddress}
                label="LBP Token"
                url={`https://sonicscan.org/address/${lbpAddress}`}
              />

              <AddressDisplay
                address={mclbAddress}
                label="MCLB Token"
                url={`https://sonicscan.org/address/${mclbAddress}`}
              />

              <AddressDisplay
                address={coreOwner}
                label="Owner"
                url={`https://sonicscan.org/address/${coreOwner}`}
              />
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
