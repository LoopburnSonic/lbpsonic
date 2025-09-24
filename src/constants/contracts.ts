// FLD (LoopFuse) Contract Addresses on Sonic Network
export const FLD_CONTRACTS = {
  // LFD Token Contract
  LFD_TOKEN: '0x01fd763618E555A7118F1d1144C88113A5C34e64' as const,
  
  // Liquidity Lock Contract
  LIQUIDITY_LOCK: '0x10aAd399c59df12b1aE09735FE9EFD8BD9F62Fd6' as const,
  
  // Fusion Core Contract
  FUSION_CORE: '0xfF97A100c4D731A533B0683AD1f957f55fd1a8e3' as const,
} as const;

// Network Configuration
export const SONIC_NETWORK = {
  chainId: 146,
  name: 'Sonic',
  rpcUrl: 'https://rpc.soniclabs.com',
  blockExplorer: 'https://sonicscan.org',
} as const;

// Contract Explorer URLs
export const CONTRACT_URLS = {
  LFD_TOKEN: `${SONIC_NETWORK.blockExplorer}/address/${FLD_CONTRACTS.LFD_TOKEN}`,
  LIQUIDITY_LOCK: `${SONIC_NETWORK.blockExplorer}/address/${FLD_CONTRACTS.LIQUIDITY_LOCK}`,
  FUSION_CORE: `${SONIC_NETWORK.blockExplorer}/address/${FLD_CONTRACTS.FUSION_CORE}`,
} as const;
