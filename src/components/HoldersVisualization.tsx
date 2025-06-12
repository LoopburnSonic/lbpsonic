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
    <div className="flex flex-col items-center justify-center gap-2">
      <div className="flex items-center gap-2 text-orange-400 text-lg font-semibold">
        <Users className="h-5 w-5" />
        Top 100 Real Holders
      </div>
      <div className="text-center space-y-1">
        <p className="text-xs text-muted-foreground">
          {hasRealData
            ? 'Real SonicScan API data'
            : 'Loading real holder data from SonicScan...'
          }
        </p>
        <Button
          size="sm"
          className="w-auto border-2 border-orange-500/30 hover:bg-orange-500/10 text-foreground font-semibold shadow-lg hover:shadow-xl transition-all duration-300 px-3 py-2 text-sm rounded-lg bg-gradient-to-r from-orange-600/20 to-red-600/20 hover:from-orange-600/30 hover:to-red-600/30"
          onClick={() => window.open('https://sonicscan.org/token/tokenholderchart/0x001bFF4b6da770f445A740227224D3c8b48e6fb2', '_blank', 'noopener,noreferrer')}
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          View Complete Data
        </Button>
      </div>
    </div>
  )
}

export default HoldersVisualization
