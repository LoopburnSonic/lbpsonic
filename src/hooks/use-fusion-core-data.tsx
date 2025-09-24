'use client';

import { useReadContracts } from 'wagmi';
import { formatUnits } from 'viem';
import FusionCoreABI from '@/abis/FusionCore.json';
import { FLD_CONTRACTS } from '@/constants/contracts';

export function useFusionCoreData() {
  // Read multiple contract values at once
  const { data: contractData, isLoading, error, refetch } = useReadContracts({
    contracts: [
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'BASE_BURN_INTERVAL',
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'burnInterval',
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'nextBurnTime',
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'nextCollectTime',
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'LFD',
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'LBP',
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'MCLB',
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'LIQUIDITY_LOCK',
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'owner',
      },
      // Strategy array - get first 3 elements (lfd, lbp, dao percentages)
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'strategy',
        args: [0], // LFD percentage
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'strategy',
        args: [1], // LBP percentage
      },
      {
        address: FLD_CONTRACTS.FUSION_CORE,
        abi: FusionCoreABI,
        functionName: 'strategy',
        args: [2], // DAO percentage
      },
    ],
    query: {
      refetchInterval: 5000, // Refetch every 5 seconds for real-time countdowns
    },
  });

  // Parse the contract data
  const [
    baseBurnIntervalResult,
    burnIntervalResult,
    nextBurnTimeResult,
    nextCollectTimeResult,
    lfdAddressResult,
    lbpAddressResult,
    mclbAddressResult,
    liquidityLockResult,
    ownerResult,
    strategyLfdResult,
    strategyLbpResult,
    strategyDaoResult,
  ] = contractData || [];

  // Extract values with proper error handling
  const baseBurnInterval = baseBurnIntervalResult?.result as bigint || 0n;
  const burnInterval = burnIntervalResult?.result as bigint || 0n;
  const nextBurnTime = nextBurnTimeResult?.result as bigint || 0n;
  const nextCollectTime = nextCollectTimeResult?.result as bigint || 0n;
  const lfdAddress = lfdAddressResult?.result as string || '';
  const lbpAddress = lbpAddressResult?.result as string || '';
  const mclbAddress = mclbAddressResult?.result as string || '';
  const liquidityLockAddress = liquidityLockResult?.result as string || '';
  const ownerAddress = ownerResult?.result as string || '';
  
  // Strategy percentages
  const strategyLfd = strategyLfdResult?.result as bigint || 0n;
  const strategyLbp = strategyLbpResult?.result as bigint || 0n;
  const strategyDao = strategyDaoResult?.result as bigint || 0n;

  // Convert timestamps to numbers and calculate time remaining
  const currentTime = Math.floor(Date.now() / 1000);
  const nextBurnTimeNumber = Number(nextBurnTime);
  const nextCollectTimeNumber = Number(nextCollectTime);
  
  const burnTimeRemaining = Math.max(0, nextBurnTimeNumber - currentTime);
  const collectTimeRemaining = Math.max(0, nextCollectTimeNumber - currentTime);

  // Convert intervals to hours for display
  const baseBurnIntervalHours = Number(baseBurnInterval) / 3600; // Convert seconds to hours
  const currentBurnIntervalHours = Number(burnInterval) / 3600;

  // Determine current strategy plan
  const getCurrentStrategyPlan = () => {
    const lfd = Number(strategyLfd);
    const lbp = Number(strategyLbp);
    const dao = Number(strategyDao);
    
    if (lfd === 45 && lbp === 5 && dao === 50) return 'A';
    if (lfd === 50 && lbp === 0 && dao === 50) return 'B';
    if (lfd === 0 && lbp === 0 && dao === 100) return 'C';
    return 'Custom';
  };

  return {
    // Timing data
    baseBurnInterval: Number(baseBurnInterval),
    burnInterval: Number(burnInterval),
    baseBurnIntervalHours,
    currentBurnIntervalHours,
    
    // Countdown data
    nextBurnTime: nextBurnTimeNumber,
    nextCollectTime: nextCollectTimeNumber,
    burnTimeRemaining,
    collectTimeRemaining,
    
    // Status flags
    canBurnFuse: burnTimeRemaining === 0,
    canFuseCollector: collectTimeRemaining === 0,
    
    // Contract addresses
    fusionCoreAddress: FLD_CONTRACTS.FUSION_CORE,
    lfdAddress,
    lbpAddress,
    mclbAddress,
    liquidityLockAddress,
    ownerAddress,
    
    // Strategy data
    strategyLfd: Number(strategyLfd),
    strategyLbp: Number(strategyLbp),
    strategyDao: Number(strategyDao),
    currentStrategyPlan: getCurrentStrategyPlan(),
    
    // Raw values
    baseBurnIntervalRaw: baseBurnInterval,
    burnIntervalRaw: burnInterval,
    nextBurnTimeRaw: nextBurnTime,
    nextCollectTimeRaw: nextCollectTime,
    
    // Query state
    isLoading,
    error,
    refetch,
  };
}

// Hook for countdown formatting
export function useFusionCoreCountdowns() {
  const { burnTimeRemaining, collectTimeRemaining, isLoading } = useFusionCoreData();

  const formatTime = (seconds: number) => {
    if (seconds <= 0) return { hours: 0, minutes: 0, seconds: 0, display: '00:00:00' };
    
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    return {
      hours,
      minutes,
      seconds: secs,
      display: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    };
  };

  return {
    burnCountdown: formatTime(burnTimeRemaining),
    collectCountdown: formatTime(collectTimeRemaining),
    isLoading,
  };
}

// Hook for strategy monitoring
export function useFusionCoreStrategy() {
  const {
    strategyLfd,
    strategyLbp,
    strategyDao,
    currentStrategyPlan,
    isLoading,
    error,
  } = useFusionCoreData();

  const strategyPlans = {
    A: { lfd: 45, lbp: 5, dao: 50, name: 'Plan A' },
    B: { lfd: 50, lbp: 0, dao: 50, name: 'Plan B' },
    C: { lfd: 0, lbp: 0, dao: 100, name: 'Plan C' },
  };

  return {
    currentStrategy: {
      lfd: strategyLfd,
      lbp: strategyLbp,
      dao: strategyDao,
    },
    currentPlan: currentStrategyPlan,
    availablePlans: strategyPlans,
    isLoading,
    error,
  };
}
