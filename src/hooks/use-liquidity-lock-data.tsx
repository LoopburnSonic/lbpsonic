'use client';

import { useReadContracts } from 'wagmi';
import LiquidityLockABI from '@/abis/LiquidityLock.json';
import { FLD_CONTRACTS } from '@/constants/contracts';

export function useLiquidityLockData() {
  // Read multiple contract values at once
  const { data: contractData, isLoading, error, refetch } = useReadContracts({
    contracts: [
      {
        address: FLD_CONTRACTS.LIQUIDITY_LOCK,
        abi: LiquidityLockABI,
        functionName: 'POSITION_MANAGER',
      },
      {
        address: FLD_CONTRACTS.LIQUIDITY_LOCK,
        abi: LiquidityLockABI,
        functionName: 'nftId',
      },
      {
        address: FLD_CONTRACTS.LIQUIDITY_LOCK,
        abi: LiquidityLockABI,
        functionName: 'owner',
      },
    ],
    query: {
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  // Parse the contract data
  const [
    positionManagerResult,
    nftIdResult,
    ownerResult,
  ] = contractData || [];

  // Extract values with proper error handling
  const positionManagerAddress = positionManagerResult?.result as string || '';
  const nftId = nftIdResult?.result as bigint || 0n;
  const ownerAddress = ownerResult?.result as string || '';

  // Convert nftId to number for display
  const nftIdNumber = Number(nftId);

  return {
    // Contract data
    positionManagerAddress,
    nftId: nftIdNumber,
    nftIdRaw: nftId,
    ownerAddress,
    
    // Contract addresses
    liquidityLockAddress: FLD_CONTRACTS.LIQUIDITY_LOCK,
    
    // Query state
    isLoading,
    error,
    refetch,
    
    // Status indicators
    hasNFT: nftId > 0n,
    isLocked: nftId > 0n, // If there's an NFT ID, liquidity is locked
  };
}

// Hook to check if liquidity operations are available
export function useLiquidityLockStatus() {
  const { hasNFT, isLocked, nftId, ownerAddress, isLoading, error } = useLiquidityLockData();

  const status = {
    canCollect: hasNFT && !isLoading,
    canDecreaseLiquidity: hasNFT && !isLoading,
    canLockNFT: !hasNFT && !isLoading,
    isOperational: hasNFT,
  };

  return {
    ...status,
    hasNFT,
    isLocked,
    nftId,
    ownerAddress,
    isLoading,
    error,
  };
}
