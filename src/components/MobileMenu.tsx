'use client';

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { X, Menu, Home, Search, Zap, Atom } from "lucide-react";
import Image from 'next/image';

export default function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentX, setCurrentX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [mounted, setMounted] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Ensure component is mounted before rendering portal
  useEffect(() => {
    setMounted(true);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
    if (menuRef.current) {
      menuRef.current.style.transform = '';
    }
    if (overlayRef.current) {
      overlayRef.current.style.backgroundColor = '';
    }
  }, []);

  // Handle swipe gestures for closing (swipe right to close from right side)
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (!isOpen) return;
    setStartX(e.touches[0].clientX);
    setCurrentX(e.touches[0].clientX);
    setIsDragging(true);
  }, [isOpen]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (!isDragging || !isOpen) return;

    const touchX = e.touches[0].clientX;
    setCurrentX(touchX);

    const deltaX = touchX - startX;

    // Allow swiping right (closing from right side)
    if (deltaX > 0 && menuRef.current) {
      const translateX = Math.min(deltaX, 280); // 280px is menu width
      menuRef.current.style.transform = `translateX(${translateX}px)`;

      // Adjust overlay opacity based on swipe distance
      if (overlayRef.current) {
        const opacity = Math.max(0.9 - deltaX / 280 * 0.9, 0);
        overlayRef.current.style.backgroundColor = `rgba(0, 0, 0, ${opacity})`;
      }
    }
  }, [isDragging, isOpen, startX]);

  const handleTouchEnd = useCallback(() => {
    if (!isDragging || !isOpen) return;

    const deltaX = currentX - startX;

    // Close menu if swiped more than 100px to the right
    if (deltaX > 100) {
      closeMenu();
    } else if (menuRef.current) {
      // Snap back to original position
      menuRef.current.style.transform = 'translateX(0)';
      if (overlayRef.current) {
        overlayRef.current.style.backgroundColor = 'rgba(0, 0, 0, 0.9)';
      }
    }

    setIsDragging(false);
    setStartX(0);
    setCurrentX(0);
  }, [isDragging, isOpen, currentX, startX, closeMenu]);

  // Handle swipe from edge to open menu
  const handleEdgeSwipe = useCallback((e: TouchEvent) => {
    if (isOpen) return;

    const touchX = e.touches[0].clientX;
    const screenWidth = window.innerWidth;

    // Detect swipe from right edge (within 20px of right edge)
    if (touchX > screenWidth - 20) {
      setStartX(touchX);
      setIsDragging(true);
    }
  }, [isOpen]);

  const handleEdgeSwipeMove = useCallback((e: TouchEvent) => {
    if (isOpen || !isDragging) return;

    const touchX = e.touches[0].clientX;
    const deltaX = startX - touchX; // Swipe left from right edge

    // Open menu if swiped left more than 50px from right edge
    if (deltaX > 50) {
      setIsOpen(true);
      setIsDragging(false);
    }
  }, [isOpen, isDragging, startX]);

  // Add touch event listeners
  useEffect(() => {
    if (isOpen) {
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden';

      // Add event listeners to the menu element for closing
      const menuElement = menuRef.current;
      if (menuElement) {
        menuElement.addEventListener('touchstart', handleTouchStart, { passive: true });
        menuElement.addEventListener('touchmove', handleTouchMove, { passive: true });
        menuElement.addEventListener('touchend', handleTouchEnd, { passive: true });
      }
    } else {
      // Restore body scroll
      document.body.style.overflow = 'unset';

      // Add edge swipe listeners when menu is closed
      document.addEventListener('touchstart', handleEdgeSwipe, { passive: true });
      document.addEventListener('touchmove', handleEdgeSwipeMove, { passive: true });
      document.addEventListener('touchend', handleTouchEnd, { passive: true });
    }

    return () => {
      const menuElement = menuRef.current;
      if (menuElement) {
        menuElement.removeEventListener('touchstart', handleTouchStart);
        menuElement.removeEventListener('touchmove', handleTouchMove);
        menuElement.removeEventListener('touchend', handleTouchEnd);
      }
      document.removeEventListener('touchstart', handleEdgeSwipe);
      document.removeEventListener('touchmove', handleEdgeSwipeMove);
      document.removeEventListener('touchend', handleTouchEnd);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, handleTouchStart, handleTouchMove, handleTouchEnd, handleEdgeSwipe, handleEdgeSwipeMove]);

  const menuItems = [
    { href: '/', label: 'HOME', icon: Home },
    { href: '/explorer', label: 'EXPLORER', icon: Search },
    { href: '/yield-reactor', label: 'YIELD_REACTOR', icon: Zap },
    { href: '/fusion-core', label: 'FUSION_CORE', icon: Atom },
  ];

  return (
    <>
      {/* Menu Button */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsOpen(!isOpen)}
          className="relative z-[9999] hover:bg-orange-500/20 hover:text-orange-400 transition-colors duration-300"
        >
          {isOpen ? (
            <X className="h-5 w-5 sm:h-6 sm:w-6 text-orange-400" />
          ) : (
            <Menu className="h-5 w-5 sm:h-6 sm:w-6 text-gray-300" />
          )}
        </Button>
      </div>

      {/* Portal Menu to Body */}
      {mounted && isOpen && createPortal(
        <>
          {/* Overlay */}
          <div
            ref={overlayRef}
            className="fixed inset-0 z-[9998] bg-black/90 backdrop-blur-md transition-all duration-300"
            onClick={closeMenu}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
          />

          {/* Full Screen Menu */}
          <div
            ref={menuRef}
            className={`fixed top-0 right-0 h-screen w-full z-[9999] bg-black/95 backdrop-blur-xl shadow-[0_0_30px_rgba(249,115,22,0.3)] transform transition-transform duration-300 ease-out ${
              isOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
            style={{ position: 'fixed', top: 0, right: 0, height: '100vh', width: '100vw' }}
          >
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-bl from-orange-500/10 via-transparent to-orange-500/5 animate-pulse" />

        {/* Close button inside menu - Top Right */}
        <div className="absolute top-4 right-4 z-20">
          <Button
            variant="ghost"
            size="icon"
            onClick={closeMenu}
            className="hover:bg-orange-500/20 hover:text-orange-400 transition-colors duration-300 bg-black/50 backdrop-blur-sm border border-orange-500/30"
          >
            <X className="h-6 w-6 text-orange-400" />
          </Button>
        </div>

        {/* Menu Header */}
        <div className="relative z-10 p-8 border-b border-orange-500/30 pt-20">
          <div className="flex items-center justify-center space-x-4">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500/30 rounded-full blur-sm animate-pulse"></div>
              <Image
                src="/loopburn-logo.png"
                alt="LoopBurn Logo"
                width={100}
                height={100}
                className="w-12 h-12 relative z-10"
              />
            </div>
            <span className="text-3xl font-mono font-bold tracking-wider text-orange-100 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]">
              LOOPBURN
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="relative z-10 p-8 space-y-4 flex flex-col justify-center flex-1">
          {menuItems.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center justify-start space-x-6 p-6 rounded-xl font-mono font-semibold tracking-wider text-gray-300 hover:text-orange-400 hover:bg-orange-500/20 hover:border-orange-400/60 border border-transparent transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.4)] group"
                onClick={closeMenu}
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: isOpen ? 'slideInFromRight 0.3s ease-out forwards' : 'none'
                }}
              >
                <div className="p-3 bg-orange-500/20 rounded-xl border border-orange-400/40 group-hover:bg-orange-500/30 transition-colors duration-300">
                  <IconComponent className="h-8 w-8 text-orange-400 drop-shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
                </div>
                <span className="text-2xl font-bold">{item.label}</span>
              </a>
            );
          })}
        </nav>

            {/* Swipe Indicator */}
            <div className="absolute bottom-6 left-6 right-6 text-center">
              <div className="flex items-center justify-center space-x-2 text-xs text-gray-500 font-mono">
                <div className="w-8 h-0.5 bg-gray-600 rounded"></div>
                <span>SWIPE RIGHT TO CLOSE</span>
                <div className="w-8 h-0.5 bg-gray-600 rounded"></div>
              </div>
            </div>
          </div>
        </>,
        document.body
      )}
    </>
  );
}
