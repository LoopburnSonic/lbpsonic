import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXTwitter, faTelegram, faGithub } from '@fortawesome/free-brands-svg-icons';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full mt-8 sm:mt-10 md:mt-12 bg-black/60 backdrop-blur-sm border-t-2 border-orange-500/40 shadow-[0_0_20px_rgba(249,115,22,0.2)] relative overflow-hidden before:absolute before:inset-0 before:bg-gradient-to-r before:from-orange-500/5 before:via-transparent before:to-orange-500/5 before:animate-pulse">
      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8 text-center md:flex md:items-center md:justify-between relative z-10">
        <p className="text-xs sm:text-sm font-mono tracking-wide text-gray-300 mb-4 md:mb-0 drop-shadow-[0_0_6px_rgba(249,115,22,0.4)] leading-relaxed">
          <span className="text-orange-400">&copy;</span> {currentYear} <span className="text-orange-400">LOOPBURN</span>. ALL_RIGHTS_RESERVED.
          <span className="text-orange-400"> BUILT_ON_SONIC</span>.
        </p>
        <div className="flex justify-center space-x-4 sm:space-x-6">
          <Link
            href="https://x.com/LoopBurnSonic"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="X (formerly Twitter)"
            className="group relative p-1.5 sm:p-2 bg-orange-500/10 border border-orange-500/30 rounded hover:border-orange-400/60 hover:bg-orange-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
          >
            <FontAwesomeIcon
              icon={faXTwitter}
              className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-hover:text-orange-400 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300"
            />
          </Link>
          <Link
            href="https://t.me/LoopBurn"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Telegram"
            className="group relative p-1.5 sm:p-2 bg-orange-500/10 border border-orange-500/30 rounded hover:border-orange-400/60 hover:bg-orange-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
          >
            <FontAwesomeIcon
              icon={faTelegram}
              className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-hover:text-orange-400 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300"
            />
          </Link>
          <Link
            href="https://loopburn-sonic.gitbook.io/loopburn/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="group relative p-1.5 sm:p-2 bg-orange-500/10 border border-orange-500/30 rounded hover:border-orange-400/60 hover:bg-orange-500/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(249,115,22,0.4)]"
          >
            <FontAwesomeIcon
              icon={faGithub}
              className="h-4 w-4 sm:h-5 sm:w-5 text-gray-300 group-hover:text-orange-400 group-hover:drop-shadow-[0_0_8px_rgba(249,115,22,0.6)] transition-all duration-300"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
}