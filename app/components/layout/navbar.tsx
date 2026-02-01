'use client'

import Link from 'next/link'
import { useState } from 'react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

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
      <nav className='hidden lg:flex w-full justify-between items-center px-12 py-5 text-[1.2rem] absolute'>
        <span className='underline'>
          <Link href={"/merch"}>merch</Link>
        </span>

        <span className='underline'>
          <Link href={"/about"}>about</Link>
        </span>

        <span className='underline'>
          <Link href={"/press"}>press</Link>
        </span>

        <div className='w-[30%] px-1 py-1 flex justify-center items-center'>
          <Link href="/">
            <h1 className='font-fell text-[4rem] scale-y-150 scale-x-90 select-none font-light'>
              WIDEMOUTH
            </h1>
          </Link>
        </div>

        <span className='underline'>
          <Link href={"/music"}>music</Link>
        </span>

        <span className='underline'>
          <Link href={"/shows"}>shows</Link>
        </span>

        <span className='underline'>
          <Link href={"/contact"}>contact</Link>
        </span>
      </nav>

      {/* Mobile/Tablet Navigation */}
      <nav className='lg:hidden w-full flex justify-between items-center px-6 py-4 absolute z-50'>
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
