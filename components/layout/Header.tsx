'use client';

import { useState, useEffect, useRef } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { ArrowUpRight, ChevronDown, Loader2 } from 'lucide-react';
import Link from 'next/link';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOfferingsOpen, setIsOfferingsOpen] = useState(false);
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('EN');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLanguageLoading, setIsLanguageLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOfferingsOpen(false);
      }
      if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
        setIsLanguageOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Check current language on mount
  useEffect(() => {
    const getCookie = (name: string) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    };

    const languageCookie = getCookie('googtrans');
    if (languageCookie) {
      const lang = languageCookie.split('/')[2];
      setCurrentLanguage(lang === 'ar' ? 'AR' : 'EN');
    }
  }, []);

  // Switch language function
  const switchLanguage = (lang: string) => {
    const langCode = lang === 'AR' ? 'ar' : 'en';

    setIsLanguageLoading(true);
    document.cookie = `googtrans=/auto/${langCode}; path=/`;

    if (langCode === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', 'en');
    }

    setCurrentLanguage(lang);
    setIsLanguageOpen(false);

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  };

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Offerings', href: '', hasDropdown: true },
    { name: 'Partners', href: '/partners' },
    { name: 'Team', href: '/team' },
    { name: 'Contact Us', href: '/contact-us' },
  ];

  const offeringsDropdown = [
    { name: 'Cordix Division Offerings', href: '/offerings/cordix' },
    { name: 'Virdix Division Offerings', href: '/offerings/virdix' },
  ];

  const languages = ['EN', 'AR'];

  return (
    <>
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-slideDown {
          animation: slideDown 1s ease-out;
        }
      `}</style>

      {/* Language Loading Overlay */}
      {isLanguageLoading && (
        <div className="fixed inset-0 z-[9999] bg-white flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="w-12 h-12 text-[#C11E2B] animate-spin mx-auto mb-4" />
            <p className="text-gray-900 text-lg font-semibold">
              {currentLanguage === 'AR' ? 'Loading Arabic...' : 'Loading English...'}
            </p>
            <p className="text-gray-500 text-sm mt-2">Please wait</p>
          </div>
        </div>
      )}

      {/* Gradient Background Container */}
      <div
        className={`${isScrolled ? 'fixed' : 'absolute'
          } top-0 left-0 right-0 z-50 bg-[#FFF0F1] px-4  md:px-0 transition-all duration-300 ${isScrolled ? 'py-2 md:py-3 shadow-xl' : 'py-3 md:py-4'
          } ${isLoaded ? 'animate-slideDown' : 'opacity-0'}`}
      >
        {/* White Rounded Card - Increased max-width */}
        <header
          className={`max-w-[1550px] mx-2 bg-white rounded-full shadow-lg px-4 md:px-8 transition-all duration-300 ${isScrolled ? 'py-2 md:py-2.5' : 'py-2.5 md:py-3'
            }`}
        >
          <div className="flex items-center justify-between relative">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/images/logo.png"
                alt="MEDPUSH"
                width={180}
                height={60}
                className={`h-8 md:h-10 ${isScrolled ? 'md:h-9' : 'md:h-12'
                  } w-auto transition-all duration-300`}
                priority
              />
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center gap-4 xl:gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) =>
                link.hasDropdown ? (
                  <div key={link.name} className="relative" ref={dropdownRef}>
                    <button
                      onClick={() => setIsOfferingsOpen(!isOfferingsOpen)}
                      className={`text-gray-900 hover:text-[#C11E2B] transition-colors duration-200 text-sm xl:text-base font-medium flex items-center gap-1 pb-1 ${pathname.startsWith('/offerings')
                        ? 'text-[#C11E2B] border-b-2 border-[#C11E2B]'
                        : ''
                        }`}
                    >
                      {link.name}
                      <ChevronDown
                        className={`w-4 h-4 transition-transform duration-200 ${isOfferingsOpen ? 'rotate-180' : ''
                          }`}
                      />
                    </button>

                    {/* Dropdown Menu */}
                    {isOfferingsOpen && (
                      <div className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl py-2 border border-gray-100 animate-fadeIn">
                        {offeringsDropdown.map((item) => (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="block px-4 py-3 text-sm text-gray-700 hover:bg-[#FFF0F1] hover:text-[#C11E2B] transition-colors duration-200"
                            onClick={() => setIsOfferingsOpen(false)}
                          >
                            {item.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-gray-900 hover:text-[#C11E2B] transition-colors duration-200 text-sm xl:text-base font-medium pb-1 ${pathname === link.href
                      ? 'text-[#C11E2B] border-b-2 border-[#C11E2B]'
                      : ''
                      }`}
                  >
                    {link.name}
                  </Link>
                )
              )}
            </nav>

            {/* Language Selector & Login Button */}
            <div className="hidden lg:flex items-center gap-2 xl:gap-4">
              {/* Language Dropdown */}
              <div className="relative notranslate" ref={langDropdownRef}>
                <div
                  onClick={() => setIsLanguageOpen(!isLanguageOpen)}
                  className="flex items-center gap-1 text-gray-900 font-medium cursor-pointer"
                >
                  <span className="text-sm font-bold">{currentLanguage}</span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${isLanguageOpen ? 'rotate-180' : ''
                      }`}
                  />
                </div>

                {/* Language Dropdown Menu */}
                {isLanguageOpen && (
                  <div className="absolute top-full right-0 mt-2 w-20 bg-white rounded-lg shadow-xl py-1 border border-gray-100 animate-fadeIn">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => switchLanguage(lang)}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors duration-200 ${currentLanguage === lang
                          ? 'text-[#C11E2B] bg-[#FFF0F1] font-semibold'
                          : 'text-gray-700 hover:bg-[#FFF0F1] hover:text-[#C11E2B]'
                          }`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Disabled Login Button */}
              <button
                disabled
                className={`px-4 xl:px-8 transition-all duration-300 bg-gray-400 text-gray-200 rounded-full font-semibold flex items-center gap-2 shadow-md text-sm xl:text-base cursor-not-allowed opacity-60 ${isScrolled ? 'py-2' : 'py-2.5'
                  }`}
              >
                Log in
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-9 h-9 md:w-10 md:h-10 bg-[#C11E2B] rounded-lg flex items-center justify-center"
            >
              <svg
                className="w-5 h-5 md:w-6 md:h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </header>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white rounded-3xl mt-4 mx-4 shadow-xl p-6">
            {navLinks.map((link) =>
              link.hasDropdown ? (
                <div key={link.name}>
                  {/* Offerings Header (not clickable) */}
                  <div className="py-3 text-gray-900 font-medium text-base">
                    {link.name}
                  </div>

                  {/* Dropdown always visible */}
                  <div className="pl-4 space-y-2">
                    <div
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push('/offerings/cordix');
                      }}
                      className="block py-2 text-sm text-gray-600 hover:text-[#C11E2B] transition-colors duration-200 cursor-pointer"
                    >
                      Cordix Division Offerings
                    </div>

                    <div
                      onClick={() => {
                        setIsMenuOpen(false);
                        router.push('/offerings/virdix');
                      }}
                      className="block py-2 text-sm text-gray-600 hover:text-[#C11E2B] transition-colors duration-200 cursor-pointer"
                    >
                      Virdix Division Offerings
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block py-3 text-gray-900 hover:text-[#C11E2B] transition-colors duration-200 font-medium text-base"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </Link>
              )
            )}

            {/* Mobile Language Switcher */}
            <div className="border-t border-gray-200 mt-4 pt-4 notranslate">
              <div className="text-sm font-semibold text-gray-700 mb-2">Language</div>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => switchLanguage(lang)}
                    disabled={isLanguageLoading}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${currentLanguage === lang
                        ? 'bg-[#C11E2B] text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-[#FFF0F1] hover:text-[#C11E2B]'
                      } ${isLanguageLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Disabled Mobile Login Button */}
            <button
              disabled
              className="block w-full mt-4 px-6 py-3 bg-gray-400 text-gray-200 rounded-full font-semibold text-center cursor-not-allowed opacity-60"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
