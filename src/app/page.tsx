import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Zap, TrendingUp, ShieldCheck, Flame, Copy, Lock, Users, Target, Coins } from "lucide-react";
import Image from "next/image";
import Orb from '@/components/animations/Orb';
import CircleOrb from '@/components/animations/CircleOrb';
import CopyButton from "@/components/CopyButton";
import ActionButtons from "@/components/ActionButtons";




export default function Home() {
  return (
    <>
      {/* Background Image Container */}
      <div className="relative min-h-screen">
        {/* Background Image */}
        <div
          className="fixed inset-0 bg-cover bg-center bg-no-repeat opacity-5 -z-10"
          style={{
            backgroundImage: "url('/mainback.png')"
          }}
        />

        {/* Content */}
        <div className="relative z-0 flex flex-col gap-8 items-center max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <section className="text-center relative w-full flex flex-col md:flex-row md:items-center md:justify-between md:text-left md:gap-8">
        {/* Show Orb + LoopFuse animation at top on mobile, hidden on desktop */}
        <div className="relative min-h-[300px] md:hidden mb-8 flex items-center justify-center">
          {/* LoopFuse Circle Animation - Behind */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <CircleOrb hue={240} />
          </div>

          {/* LoopBurn Infinity Animation - In Front */}
          <div className="relative z-10 min-h-[220px] w-full">
            <Orb />
          </div>
        </div>
        
        <div className="flex-1 flex flex-col items-center">
          <h1 className="text-center text-4xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_15px_rgba(249,115,22,0.8)]">LOOPBURN_+_LOOPFUSE</h1>
          <p className="text-center text-xl font-mono tracking-wide text-gray-300 mb-4 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">DUAL_HYPER-DEFLATIONARY_ECOSYSTEM_FUELING_MAXIMUM_DEFLATION</p>

          {/* Dual Contract Address Display */}
          <div className="space-y-2 w-full max-w-2xl">
            {/* LBP Contract */}
            <div className="flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 rounded-lg w-full gap-3 border border-orange-500/30">
              <div className="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded border border-orange-400/40 text-sm font-mono font-semibold tracking-wide">
                LBP
              </div>
              <code className="font-mono text-sm text-orange-200 tracking-wider"> 0x001bFF4b6da770f445A740227224D3c8b48e6fb2 </code>
              <CopyButton text="0x001bFF4b6da770f445A740227224D3c8b48e6fb2" />
            </div>

            {/* LFD Contract */}
            <div className="flex items-center justify-center bg-black/40 backdrop-blur-sm p-3 rounded-lg w-full gap-3 border border-orange-500/30">
              <div className="px-3 py-1.5 bg-orange-500/20 text-orange-400 rounded border border-orange-400/40 text-sm font-mono font-semibold tracking-wide">
                LFD
              </div>
              <code className="font-mono text-sm text-orange-200 tracking-wider"> 0xdb6a2fc2bc6e77d9fdfdfc588befdbb9c055bede </code>
              <CopyButton text="0xdb6a2fc2bc6e77d9fdfdfc588befdbb9c055bede" />
            </div>
          </div>

          {/* Add Built on Sonic section */}
          <div className="flex items-center justify-center gap-3 w-full mt-6">
            <span className="text-2xl font-mono tracking-wider text-gray-300 drop-shadow-[0_0_8px_rgba(249,115,22,0.4)]">BUILT_ON</span>
            <div className="relative">
              <div className="absolute inset-0 blur-lg bg-orange-500/30 animate-pulse rounded-full"></div>
              <Image
                src="/sonic-logo.png"
                alt="Sonic Blockchain"
                width={250}
                height={85}
                className="object-contain relative z-10 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>

          <div className="max-w-[300px] md:max-w-[700px] text-center md:text-center mt-6">
            <p className="text-base md:text-lg font-mono tracking-wide leading-relaxed text-gray-300">
              <span className="text-orange-400">$LBP</span> and <span className="text-orange-400">$LFD</span> are dual hyper-deflationary tokens on the <span className="text-orange-400">Sonic network</span>.
              <span className="text-orange-400">LoopBurn ($LBP)</span> boosts trading volume and incentivizes liquidity without token taxes,
              while <span className="text-orange-400">LoopFuse ($LFD)</span> operates as a DAO with protocol-owned liquidity.
              Both tokens feature unique <span className="text-orange-400">burn mechanisms</span> that continuously reduce supply,
              creating maximum <span className="text-orange-400">scarcity</span> and <span className="text-orange-400">value appreciation</span>.
            </p>
          </div>

          <section className="mt-8 w-full flex flex-col items-center">
            <ActionButtons />
          </section>
        </div>

        {/* Desktop Orb + LoopFuse animation - hidden on mobile */}
        <div className="flex-1 relative min-h-[400px] hidden md:flex md:items-center md:justify-center">
          {/* LoopFuse Circle Animation - Behind */}
          <div className="absolute inset-0 flex items-center justify-center z-0">
            <CircleOrb hue={240} />
          </div>

          {/* LoopBurn Infinity Animation - In Front */}
          <div className="relative z-10 min-h-[250px] w-full">
            <Orb />
          </div>
        </div>
      </section>

        {/* LBP Features Section */}
        <Card className="border-none bg-transparent shadow-none">
          <CardContent>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-mono font-bold mb-4 tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
                LOOPBURN_($LBP)_FEATURES
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded border border-orange-400/40 text-sm font-mono font-semibold tracking-wide">
                  [YIELD_REACTOR_POWERED]
                </div>
              </div>
            </div>

            {/* LBP Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 justify-center text-base font-mono tracking-wider">
                    <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                      <Zap className="w-5 h-5 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    </div>
                    <span className="text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">NO_TAX</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="relative mb-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-orange-600/20 via-orange-400/60 to-orange-600/20"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-orange-400 animate-pulse"></div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono tracking-wide leading-relaxed">
                    <span className="text-orange-400">[</span>ZERO_FEE_PROTOCOL<span className="text-orange-400">]</span><br/>
                    No Tax on buys or sells
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 justify-center text-base font-mono tracking-wider">
                    <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                      <Flame className="w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    </div>
                    <span className="text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">DEFLATIONARY</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="relative mb-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-orange-600/20 via-orange-400/60 to-orange-600/20"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-orange-400 animate-pulse"></div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono tracking-wide leading-relaxed">
                    <span className="text-orange-400">[</span>BURN_MECHANISM<span className="text-orange-400">]</span><br/>
                    Reduces supply over time
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 justify-center text-base font-mono tracking-wider">
                    <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                      <TrendingUp className="w-5 h-5 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </div>
                    <span className="text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">VOL_ENGINEERED</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="relative mb-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-orange-600/20 via-orange-400/60 to-orange-600/20"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-orange-400 animate-pulse"></div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono tracking-wide leading-relaxed">
                    <span className="text-orange-400">[</span>VOLUME_BOOST<span className="text-orange-400">]</span><br/>
                    Attracts LP farmers
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 justify-center text-base font-mono tracking-wider">
                    <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                      <ShieldCheck className="w-5 h-5 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                    </div>
                    <span className="text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">SELF_REINFORCE</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="relative mb-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-orange-600/20 via-orange-400/60 to-orange-600/20"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-orange-400 animate-pulse"></div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono tracking-wide leading-relaxed">
                    <span className="text-orange-400">[</span>AUTO_COMPOUND<span className="text-orange-400">]</span><br/>
                    Converts fees to burns
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        {/* LFD Features Section */}
        <Card className="border-none bg-transparent shadow-none">
          <CardContent>
            <div className="text-center mb-8">
              <h2 className="text-3xl font-mono font-bold mb-4 tracking-wider text-orange-100 drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]">
                LOOPFUSE_($LFD)_FEATURES
              </h2>
              <div className="flex items-center justify-center gap-2 mb-4">
                <div className="px-4 py-2 bg-orange-500/20 text-orange-400 rounded border border-orange-400/40 text-sm font-mono font-semibold tracking-wide">
                  [FUSION_CORE_POWERED]
                </div>
              </div>
            </div>

            {/* LFD Features Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 justify-center text-base font-mono tracking-wider">
                    <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                      <Lock className="w-5 h-5 text-blue-400 drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]" />
                    </div>
                    <span className="text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">PROTOCOL_OWNED</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="relative mb-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-orange-600/20 via-orange-400/60 to-orange-600/20"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-orange-400 animate-pulse"></div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono tracking-wide leading-relaxed">
                    <span className="text-orange-400">[</span>POL_SYSTEM<span className="text-orange-400">]</span><br/>
                    100% protocol liquidity
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 justify-center text-base font-mono tracking-wider">
                    <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                      <Target className="w-5 h-5 text-purple-400 drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    </div>
                    <span className="text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">HYPER_DEFLATE</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="relative mb-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-orange-600/20 via-orange-400/60 to-orange-600/20"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-orange-400 animate-pulse"></div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono tracking-wide leading-relaxed">
                    <span className="text-orange-400">[</span>ADAPTIVE_BURN<span className="text-orange-400">]</span><br/>
                    4-hour burn cycles
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 justify-center text-base font-mono tracking-wider">
                    <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                      <Users className="w-5 h-5 text-green-400 drop-shadow-[0_0_8px_rgba(34,197,94,0.8)]" />
                    </div>
                    <span className="text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">DAO_GOVERNED</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="relative mb-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-orange-600/20 via-orange-400/60 to-orange-600/20"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-orange-400 animate-pulse"></div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono tracking-wide leading-relaxed">
                    <span className="text-orange-400">[</span>COMMUNITY_CTRL<span className="text-orange-400">]</span><br/>
                    Treasury decisions
                  </p>
                </CardContent>
              </Card>

              <Card className="group relative overflow-hidden bg-black/40 backdrop-blur-sm border-2 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.2)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6),0_0_80px_rgba(249,115,22,0.3),inset_0_1px_0_rgba(249,115,22,0.4)] transition-all duration-700 hover:scale-105 hover:border-orange-400/80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-orange-500/10 before:via-transparent before:to-orange-600/5 before:animate-pulse after:absolute after:top-0 after:left-0 after:right-0 after:h-[1px] after:bg-gradient-to-r after:from-transparent after:via-orange-400/60 after:to-transparent after:animate-pulse">
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-400 rounded-full animate-ping"></div>
                <div className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full"></div>
                <CardHeader className="relative z-10">
                  <CardTitle className="flex items-center gap-2 justify-center text-base font-mono tracking-wider">
                    <div className="p-1 bg-orange-500/20 rounded border border-orange-400/40">
                      <Coins className="w-5 h-5 text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]" />
                    </div>
                    <span className="text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">AUTO_COMPOUND</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center relative z-10">
                  <div className="relative mb-4">
                    <div className="h-[2px] w-full bg-gradient-to-r from-orange-600/20 via-orange-400/60 to-orange-600/20"></div>
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-8 h-[2px] bg-orange-400 animate-pulse"></div>
                  </div>
                  <p className="text-gray-300 text-sm font-mono tracking-wide leading-relaxed">
                    <span className="text-orange-400">[</span>YIELD_SYSTEM<span className="text-orange-400">]</span><br/>
                    Automated reinvestment
                  </p>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>
        
        </div>
      </div>
    </>
  )
}
