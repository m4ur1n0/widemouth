'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const pathname = usePathname()

  // Navbar is sticky on all pages except home
  const isSticky = pathname !== '/';

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  // Track scroll position
  useEffect(() => {
    if (!isSticky) return

    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isSticky])

  // Calculate blur based on scroll (0-400px scroll range)
  const getBlurClasses = () => {
    if (!isSticky) return ''

    const scrollProgress = Math.min(scrollY / 400, 1)

    if (scrollProgress === 0) {
      return 'bg-[#fbf7f0]/0'
    } else if (scrollProgress < 0.2) {
      return 'bg-[#fbf7f0]/20 backdrop-blur-[2px]'
    } else if (scrollProgress < 0.4) {
      return 'bg-[#fbf7f0]/30 backdrop-blur-[4px]'
    } else if (scrollProgress < 0.6) {
      return 'bg-[#fbf7f0]/40 backdrop-blur-[6px]'
    } else if (scrollProgress < 0.8) {
      return 'bg-[#fbf7f0]/50 backdrop-blur-[8px]'
    } else {
      return 'bg-[#fbf7f0]/60 backdrop-blur-[12px]'
    }
  }

  const navLinks = [
    { href: '/merch', label: 'merch' },
    { href: '/about', label: 'about' },
    { href: '/press', label: 'press' },
    { href: '/music', label: 'music' },
    { href: '/shows', label: 'shows' },
    { href: '/contact', label: 'contact' },
  ]

  return (
    <>
      {/* Desktop Navigation - hidden on mobile/tablet */}
      <nav className={`hidden lg:flex w-full justify-between items-center px-12 py-5 text-[1.4rem] z-50 transition-all duration-200 ${
        isSticky ? `sticky top-0 ${getBlurClasses()}` : 'absolute'
      } ${pathname.includes("/studio") && "hidden! pointer-events-none"} `}>
        <span className={`underline ${pathname === '/merch' && "font-bold"} transition-all duration-400`}>
          <Link href={"/merch"}>merch</Link>
        </span>

        <span className={`underline ${pathname === '/about' && "font-bold"} transition-all duration-400`}>
          <Link href={"/about"}>about</Link>
        </span>

        <span className={`underline ${pathname === '/press' && "font-bold"} transition-all duration-400`}>
          <Link href={"/press"}>press</Link>
        </span>

        <div className='w-[30%] px-1 py-1 flex justify-center items-center'>
          <Link href="/">
            <h1 className='font-family-fell! text-[4rem] scale-y-150 scale-x-90 lg:scale-x-90 select-none font-light'>
              WIDEMOUTH
            </h1>
          </Link>
        </div>

        <span className={`underline ${pathname === '/music' && "font-bold"} transition-all duration-400`}>
          <Link href={"/music"}>music</Link>
        </span>

        <span className={`underline ${pathname === '/shows' && "font-bold"} transition-all duration-400`}>
          <Link href={"/shows"}>shows</Link>
        </span>

        <span className={`underline ${pathname === '/contact' && "font-bold"} transition-all duration-400`}>
          <Link href={"/contact"}>contact</Link>
        </span>
      </nav>

      {/* Mobile/Tablet Navigation */}
      <nav className={`lg:hidden w-full flex justify-between items-center px-6 py-4 z-50 transition-all duration-200 ${
        isSticky ? `sticky top-0 ${getBlurClasses()}` : 'absolute'
      }`}>
        {/* Logo */}
        <div className='flex-1 flex justify-center'>
          <Link href="/" onClick={closeMenu}>
            <h1 className='font-fell text-[2.5rem] sm:text-[3rem] scale-y-150 scale-x-90 select-none font-light'>
              WIDEMOUTH
            </h1>
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          onClick={toggleMenu}
          className='relative z-50 w-10 h-10 flex flex-col justify-center items-center gap-1.5 group'
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-zinc-900 transition-transform duration-300 ${
              isMenuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-zinc-900 transition-opacity duration-300 ${
              isMenuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-zinc-900 transition-transform duration-300 ${
              isMenuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className='lg:hidden fixed inset-0 bg-zinc-900/20 backdrop-blur-sm z-40'
          onClick={closeMenu}
        />
      )}

      {/* Mobile Menu Slide-in */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-64 bg-zinc-50 border-l border-zinc-900/10 shadow-2xl z-40 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col pt-24 px-8 space-y-6'>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className='text-xl underline text-zinc-900 hover:text-zinc-600 transition-colors'
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}

export default Navbar
