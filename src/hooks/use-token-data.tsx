'use client';

import { useState, useEffect } from 'react';
import { useReadContract, usePublicClient } from 'wagmi';
import { formatUnits, getAddress } from 'viem';

// Contract addresses
const LPB_TOKEN_ADDRESS = '0x001bFF4b6da770f445A740227224D3c8b48e6fb2' as const;
const YIELD_REACTOR_ADDRESS = '0xdb6a2fc2bc6e77d9fdfdfc588befdbb9c055bede' as const;
const POSITION_MANAGER_ADDRESS = '0x12E66C8F215DdD5d48d150c8f46aD0c6fB0F4406' as const;

// Yield Reactor ABI (comprehensive)
const YIELD_REACTOR_ABI = [
  {
    "inputs": [],
    "name": "LBP",
    "outputs": [{"internalType": "contract LoopBurn", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "LIQUIDITY_POOL",
    "outputs": [{"internalType": "contract IRamsesV3Pool", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "burnInterval",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "hyperInterval",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextBurnTime",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextHyperTime",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Standard ERC20 ABI
const ERC20_ABI = [
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [{"internalType": "string", "name": "", "type": "string"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// LoopBurn Token ABI (for getting initial supply and burn data)
const LOOPBURN_ABI = [
  ...ERC20_ABI,
  {
    "inputs": [],
    "name": "MAX_TOTAL_SUPPLY",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "START_TIME",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pool",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "YIELD_REACTOR",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Ramses V3 Pool ABI (basic functions for liquidity data)
const RAMSES_V3_POOL_ABI = [
  {
    "inputs": [],
    "name": "token0",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token1",
    "outputs": [{"internalType": "address", "name": "", "type": "address"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "liquidity",
    "outputs": [{"internalType": "uint128", "name": "", "type": "uint128"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

// Position Manager ABI (for TVL data)
const POSITION_MANAGER_ABI = [
  {
    "inputs": [{"internalType": "uint256", "name": "tokenId", "type": "uint256"}],
    "name": "positions",
    "outputs": [
      {"internalType": "uint96", "name": "nonce", "type": "uint96"},
      {"internalType": "address", "name": "operator", "type": "address"},
      {"internalType": "address", "name": "token0", "type": "address"},
      {"internalType": "address", "name": "token1", "type": "address"},
      {"internalType": "uint24", "name": "fee", "type": "uint24"},
      {"internalType": "int24", "name": "tickLower", "type": "int24"},
      {"internalType": "int24", "name": "tickUpper", "type": "int24"},
      {"internalType": "uint128", "name": "liquidity", "type": "uint128"},
      {"internalType": "uint256", "name": "feeGrowthInside0LastX128", "type": "uint256"},
      {"internalType": "uint256", "name": "feeGrowthInside1LastX128", "type": "uint256"},
      {"internalType": "uint128", "name": "tokensOwed0", "type": "uint128"},
      {"internalType": "uint128", "name": "tokensOwed1", "type": "uint128"}
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}],
    "name": "balanceOf",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {"internalType": "uint256", "name": "index", "type": "uint256"}],
    "name": "tokenOfOwnerByIndex",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
] as const;

interface TokenData {
  maxTotalSupply: bigint;
  currentSupply: bigint;
  burnedTokens: bigint;
  burnedPercentage: number;
  name: string;
  symbol: string;
  decimals: number;
  startTime: bigint;
  yieldReactor: string;
  poolAddress: string;
}

interface LiquidityData {
  token0Address: string;
  token1Address: string;
  token0Balance: bigint;
  token1Balance: bigint;
  token0Symbol: string;
  token1Symbol: string;
  totalLiquidity: bigint;
  positionData?: PositionData;
}

interface PositionData {
  tokenId: bigint;
  liquidity: bigint;
  token0Amount: bigint;
  token1Amount: bigint;
  fee: number;
  tickLower: number;
  tickUpper: number;
}

interface HolderData {
  address: string;
  balance: bigint;
  percentage: number;
  rank: number;
}

interface HoldersData {
  holders: HolderData[];
  totalHolders: number;
  lastUpdated: number;
}

interface BurnData {
  totalBurned: bigint;
  burnedPercentage: number;
  nextBurnTime: bigint;
  nextHyperTime: bigint;
  burnInterval: bigint;
  hyperInterval: bigint;
}

export function useTokenData() {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [liquidityData, setLiquidityData] = useState<LiquidityData | null>(null);
  const [holdersData, setHoldersData] = useState<HoldersData | null>(null);
  const [burnData, setBurnData] = useState<BurnData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const publicClient = usePublicClient();

  console.log('🔍 useTokenData hook initialized - fetching ONLY real-time data');

  // Function to fetch real holder data from blockchain events (DISABLED - causes timeout)
  const fetchHoldersFromBlockchain = async (): Promise<HoldersData | null> => {
    console.log('⚠️ Blockchain holder fetching disabled to prevent timeout - use SonicScan API instead');
    return null;
  };

  // Get real token data from LoopBurn contract (no hardcoded values)
  const { data: maxTotalSupply } = useReadContract({
    address: LPB_TOKEN_ADDRESS,
    abi: LOOPBURN_ABI,
    functionName: 'MAX_TOTAL_SUPPLY',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: totalSupply } = useReadContract({
    address: LPB_TOKEN_ADDRESS,
    abi: LOOPBURN_ABI,
    functionName: 'totalSupply',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: startTime } = useReadContract({
    address: LPB_TOKEN_ADDRESS,
    abi: LOOPBURN_ABI,
    functionName: 'START_TIME',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: yieldReactor } = useReadContract({
    address: LPB_TOKEN_ADDRESS,
    abi: LOOPBURN_ABI,
    functionName: 'YIELD_REACTOR',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: poolAddress } = useReadContract({
    address: LPB_TOKEN_ADDRESS,
    abi: LOOPBURN_ABI,
    functionName: 'pool',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: tokenName } = useReadContract({
    address: LPB_TOKEN_ADDRESS,
    abi: LOOPBURN_ABI,
    functionName: 'name',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: tokenSymbol } = useReadContract({
    address: LPB_TOKEN_ADDRESS,
    abi: LOOPBURN_ABI,
    functionName: 'symbol',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: tokenDecimals } = useReadContract({
    address: LPB_TOKEN_ADDRESS,
    abi: LOOPBURN_ABI,
    functionName: 'decimals',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  // Get burn data from yield reactor
  const { data: nextBurnTime } = useReadContract({
    address: YIELD_REACTOR_ADDRESS,
    abi: YIELD_REACTOR_ABI,
    functionName: 'nextBurnTime',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: nextHyperTime } = useReadContract({
    address: YIELD_REACTOR_ADDRESS,
    abi: YIELD_REACTOR_ABI,
    functionName: 'nextHyperTime',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: burnInterval } = useReadContract({
    address: YIELD_REACTOR_ADDRESS,
    abi: YIELD_REACTOR_ABI,
    functionName: 'burnInterval',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: hyperInterval } = useReadContract({
    address: YIELD_REACTOR_ADDRESS,
    abi: YIELD_REACTOR_ABI,
    functionName: 'hyperInterval',
    query: {
      enabled: true,
      retry: 1,
      retryDelay: 2000,
    }
  });

  // Get pool token addresses
  const { data: token0Address } = useReadContract({
    address: poolAddress as `0x${string}`,
    abi: RAMSES_V3_POOL_ABI,
    functionName: 'token0',
    query: {
      enabled: !!poolAddress,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: token1Address } = useReadContract({
    address: poolAddress as `0x${string}`,
    abi: RAMSES_V3_POOL_ABI,
    functionName: 'token1',
    query: {
      enabled: !!poolAddress,
      retry: 1,
      retryDelay: 2000,
    }
  });

  // Get pool liquidity
  const { data: poolLiquidity } = useReadContract({
    address: poolAddress as `0x${string}`,
    abi: RAMSES_V3_POOL_ABI,
    functionName: 'liquidity',
    query: {
      enabled: !!poolAddress,
      retry: 1,
      retryDelay: 2000,
    }
  });

  // Get token balances in the pool
  const { data: token0Balance } = useReadContract({
    address: token0Address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [poolAddress as `0x${string}`],
    query: {
      enabled: !!(token0Address && poolAddress),
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: token1Balance } = useReadContract({
    address: token1Address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'balanceOf',
    args: [poolAddress as `0x${string}`],
    query: {
      enabled: !!(token1Address && poolAddress),
      retry: 1,
      retryDelay: 2000,
    }
  });

  // Get token symbols for the pool tokens
  const { data: token0Symbol } = useReadContract({
    address: token0Address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: {
      enabled: !!token0Address,
      retry: 1,
      retryDelay: 2000,
    }
  });

  const { data: token1Symbol } = useReadContract({
    address: token1Address as `0x${string}`,
    abi: ERC20_ABI,
    functionName: 'symbol',
    query: {
      enabled: !!token1Address,
      retry: 1,
      retryDelay: 2000,
    }
  });

  // Process token data when available - NO HARDCODED VALUES
  useEffect(() => {
    if (maxTotalSupply && totalSupply && tokenName && tokenSymbol && tokenDecimals !== undefined && startTime && yieldReactor && poolAddress) {
      console.log('✅ Real token data received from contract:', {
        maxTotalSupply: maxTotalSupply.toString(),
        currentSupply: totalSupply.toString(),
        name: tokenName,
        symbol: tokenSymbol,
        decimals: tokenDecimals,
        startTime: startTime.toString(),
        yieldReactor: yieldReactor,
        poolAddress: poolAddress
      });

      // Calculate burned tokens using REAL max supply from contract
      const maxSupply = maxTotalSupply as bigint;
      const currentSupply = totalSupply as bigint;
      const burnedTokens = maxSupply - currentSupply;
      const burnedPercentage = Number(burnedTokens * BigInt(10000) / maxSupply) / 100;

      setTokenData({
        maxTotalSupply: maxSupply,
        currentSupply,
        burnedTokens,
        burnedPercentage,
        name: tokenName as string,
        symbol: tokenSymbol as string,
        decimals: Number(tokenDecimals),
        startTime: startTime as bigint,
        yieldReactor: yieldReactor as string,
        poolAddress: poolAddress as string,
      });

      console.log('✅ Real token data processed:', {
        maxTotalSupply: maxSupply.toString(),
        currentSupply: currentSupply.toString(),
        burnedTokens: burnedTokens.toString(),
        burnedPercentage: burnedPercentage.toFixed(2) + '%'
      });
    }
  }, [maxTotalSupply, totalSupply, tokenName, tokenSymbol, tokenDecimals, startTime, yieldReactor, poolAddress]);

  // Process liquidity data when available
  useEffect(() => {
    if (token0Address && token1Address && token0Balance && token1Balance && token0Symbol && token1Symbol && poolLiquidity) {
      setLiquidityData({
        token0Address: token0Address as string,
        token1Address: token1Address as string,
        token0Balance: token0Balance as bigint,
        token1Balance: token1Balance as bigint,
        token0Symbol: token0Symbol as string,
        token1Symbol: token1Symbol as string,
        totalLiquidity: poolLiquidity as bigint,
      });
    }
  }, [token0Address, token1Address, token0Balance, token1Balance, token0Symbol, token1Symbol, poolLiquidity]);

  // Process burn data when available
  useEffect(() => {
    if (nextBurnTime && nextHyperTime && burnInterval && hyperInterval && maxTotalSupply && totalSupply) {
      const maxSupply = maxTotalSupply as bigint;
      const currentSupply = totalSupply as bigint;
      const totalBurned = maxSupply - currentSupply;
      const burnedPercentage = Number(totalBurned * BigInt(10000) / maxSupply) / 100;

      setBurnData({
        totalBurned,
        burnedPercentage,
        nextBurnTime: nextBurnTime as bigint,
        nextHyperTime: nextHyperTime as bigint,
        burnInterval: burnInterval as bigint,
        hyperInterval: hyperInterval as bigint,
      });
    }
  }, [nextBurnTime, nextHyperTime, burnInterval, hyperInterval, maxTotalSupply, totalSupply]);

  // Update loading state
  useEffect(() => {
    if (tokenData && liquidityData) {
      setIsLoading(false);
    }
  }, [tokenData, liquidityData]);

  // Fetch holders data on component mount
  useEffect(() => {
    const loadHoldersData = async () => {
      const holders = await fetchHoldersFromBlockchain();
      setHoldersData(holders);
    };

    loadHoldersData();
  }, [publicClient]);

  return {
    tokenData,
    liquidityData,
    holdersData,
    burnData,
    isLoading,
    error,
    poolAddress: poolAddress as string,
    hasTokenData: !!tokenData,
    hasLiquidityData: !!liquidityData,
    hasHoldersData: !!holdersData,
    hasBurnData: !!burnData,
  };
}
