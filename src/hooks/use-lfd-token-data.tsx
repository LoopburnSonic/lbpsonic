'use client';

import { useReadContract, useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import LFDTokenABI from '@/abis/LFDToken.json';
import { FLD_CONTRACTS } from '@/constants/contracts';

export function useLFDTokenData() {
  // Read multiple contract values at once
  const { data: contractData, isLoading, error, refetch } = useReadContracts({
    contracts: [
      {
        address: FLD_CONTRACTS.LFD_TOKEN,
        abi: LFDTokenABI,
        functionName: 'name',
      },
      {
        address: FLD_CONTRACTS.LFD_TOKEN,
        abi: LFDTokenABI,
        functionName: 'symbol',
      },
      {
        address: FLD_CONTRACTS.LFD_TOKEN,
        abi: LFDTokenABI,
        functionName: 'decimals',
      },
      {
        address: FLD_CONTRACTS.LFD_TOKEN,
        abi: LFDTokenABI,
        functionName: 'totalSupply',
      },
      {
        address: FLD_CONTRACTS.LFD_TOKEN,
        abi: LFDTokenABI,
        functionName: 'MAX_TOTAL_SUPPLY',
      },
      {
        address: FLD_CONTRACTS.LFD_TOKEN,
        abi: LFDTokenABI,
        functionName: 'FUSION_CORE',
      },
      {
        address: FLD_CONTRACTS.LFD_TOKEN,
        abi: LFDTokenABI,
        functionName: 'owner',
      },
    ],
    query: {
      refetchInterval: 30000, // Refetch every 30 seconds
    },
  });

  // Parse the contract data
  const [
    nameResult,
    symbolResult,
    decimalsResult,
    totalSupplyResult,
    maxTotalSupplyResult,
    fusionCoreResult,
    ownerResult,
  ] = contractData || [];

  // Extract values with proper error handling
  const name = nameResult?.result as string || 'LFD';
  const symbol = symbolResult?.result as string || 'LFD';
  const decimals = decimalsResult?.result as number || 18;
  const totalSupplyRaw = totalSupplyResult?.result as bigint || 0n;
  const maxTotalSupplyRaw = maxTotalSupplyResult?.result as bigint || 0n;
  const fusionCoreAddress = fusionCoreResult?.result as string || '';
  const ownerAddress = ownerResult?.result as string || '';

  // Format the supply values
  const totalSupply = formatUnits(totalSupplyRaw, decimals);
  const maxTotalSupply = formatUnits(maxTotalSupplyRaw, decimals);
  
  // Calculate burned supply
  const burnedSupply = formatUnits(maxTotalSupplyRaw - totalSupplyRaw, decimals);
  const burnedPercentage = maxTotalSupplyRaw > 0n
    ? (Number(maxTotalSupplyRaw - totalSupplyRaw) / Number(maxTotalSupplyRaw)) * 100
    : 0;

  // Calculate circulating supply percentage
  const circulatingPercentage = maxTotalSupplyRaw > 0n
    ? (totalSupplyRaw * 100n) / maxTotalSupplyRaw
    : 0n;

  return {
    // Token basic info
    name,
    symbol,
    decimals,
    
    // Supply data
    totalSupply,
    maxTotalSupply,
    burnedSupply,
    burnedPercentage: burnedPercentage,
    circulatingPercentage: Number(circulatingPercentage),
    
    // Contract addresses
    tokenAddress: FLD_CONTRACTS.LFD_TOKEN,
    fusionCoreAddress,
    ownerAddress,
    
    // Raw values for calculations
    totalSupplyRaw,
    maxTotalSupplyRaw,
    
    // Query state
    isLoading,
    error,
    refetch,
  };
}

// Hook to get balance of a specific address
export function useLFDBalance(address?: string) {
  const { data: balance, isLoading, error, refetch } = useReadContract({
    address: FLD_CONTRACTS.LFD_TOKEN,
    abi: LFDTokenABI,
    functionName: 'balanceOf',
    args: address ? [address] : undefined,
    query: {
      enabled: !!address,
      refetchInterval: 30000,
    },
  });

  const balanceRaw = balance as bigint || 0n;
  const formattedBalance = formatUnits(balanceRaw, 18);

  return {
    balance: formattedBalance,
    balanceRaw,
    isLoading,
    error,
    refetch,
  };
}
