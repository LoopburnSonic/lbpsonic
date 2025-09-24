'use client'

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, Wallet, Loader2, ExternalLink } from 'lucide-react'
import { useTokenData } from '@/hooks/use-token-data'
import { useRealHolders } from '@/hooks/use-real-holders'
import { formatUnits } from 'viem'

interface Holder {
  name: string
  value: number
  category: string
  address: string
}

// Demo data generation function removed - now using only real blockchain data

const getColorByCategory = (category: string): string => {
  switch (category) {
    case 'whale':
      return '#fd7b0f'
    case 'medium':
      return '#2a4aff'
    case 'small':
      return '#607d8b'
    default:
      return '#6B7280'
  }
}

const getDarkerColorByCategory = (category: string): string => {
  switch (category) {
    case 'whale':
      return '#8a4008' // Much darker orange
    case 'medium':
      return '#162890' // Much darker blue
    case 'small':
      return '#37474f' // Much darker blue-grey
    default:
      return '#374151'
  }
}

const HoldersVisualization: React.FC = () => {
  const [holders, setHolders] = useState<Holder[]>([])
  const [hoveredHolder, setHoveredHolder] = useState<Holder | null>(null)
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 })

  const { tokenData, isLoading: tokenLoading, error: tokenError, hasTokenData } = useTokenData()
  const {
    holders: realHolders,
    isLoading: holdersLoading,
    error: holdersError,
    hasRealData,
    totalHolders
  } = useRealHolders()

  useEffect(() => {
    if (hasRealData && realHolders.length > 0) {
      // Convert real holder data to our format - ONLY real data, no demo
      const convertedHolders = realHolders.map((holder) => ({
        name: `Holder #${holder.rank}`,
        value: holder.percentage,
        category: holder.percentage > 2 ? 'whale' : holder.percentage > 1 ? 'medium' : 'small',
        address: holder.address
      }));

      setHolders(convertedHolders);
      console.log('✅ Using ONLY real holder data:', convertedHolders.length, 'holders');
    } else if (tokenData && hasTokenData) {
      // Use blockchain data from useTokenData hook
      console.log('⚠️ Using blockchain holder data from token hook');
      setHolders([]);
    } else {
      // If no real data, show empty state
      setHolders([]);
      console.log('⚠️ No real holder data available');
    }
  }, [realHolders, hasRealData, tokenData, hasTokenData])

  return (
    <div className="flex flex-col items-center justify-center gap-4 py-4">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2">
          <div className="p-1.5 bg-orange-500/20 rounded border border-orange-400/40">
            <Users className="h-5 w-5 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
          </div>
          <h3 className="text-xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
            TOP_100_REAL_HOLDERS
          </h3>
        </div>
        <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-orange-400/80 to-transparent animate-pulse"></div>
      </div>

      <div className="text-center space-y-3">
        <p className="text-xs font-mono tracking-wide text-gray-300">
          {hasRealData
            ? <><span className="text-orange-400">[</span>REAL_SONICSCAN_API_DATA<span className="text-orange-400">]</span></>
            : <><span className="text-orange-400">[</span>LOADING_HOLDER_DATA<span className="text-orange-400">]</span></>
          }
        </p>
        <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
          <Button
            size="sm"
            className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 font-mono font-bold tracking-wider px-4 py-2 before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse"
            onClick={() => window.open('https://sonicscan.org/token/tokenholderchart/0x001bFF4b6da770f445A740227224D3c8b48e6fb2', '_blank', 'noopener,noreferrer')}
          >
            <div className="flex items-center gap-2 relative z-10">
              <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                <ExternalLink className="h-4 w-4 text-orange-400 drop-shadow-[0_0_6px_rgba(249,115,22,0.8)]" />
              </div>
              <span className="text-xs text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">
                VIEW_LBP_DATA
              </span>
            </div>
          </Button>
          <Button
            size="sm"
            className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 font-mono font-bold tracking-wider px-4 py-2 before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse"
            onClick={() => window.open('https://sonicscan.org/token/tokenholderchart/0x01fd763618E555A7118F1d1144C88113A5C34e64', '_blank', 'noopener,noreferrer')}
          >
            <div className="flex items-center gap-2 relative z-10">
              <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                <ExternalLink className="h-4 w-4 text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.8)]" />
              </div>
              <span className="text-xs text-orange-100 drop-shadow-[0_0_6px_rgba(249,115,22,0.6)]">
                VIEW_LFD_DATA
              </span>
            </div>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default HoldersVisualization
