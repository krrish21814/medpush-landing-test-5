'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { Instagram, Linkedin, Facebook, Twitter } from 'lucide-react';

const Footer = () => {
    const [email, setEmail] = useState('');
    const [isVisible, setIsVisible] = useState(false);
    const footerRef = useRef<HTMLDivElement>(null);

    const handleNewsletterSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Newsletter subscription:', email);
        setEmail('');
    };

    const quickLinks = [
        { name: 'Home', href: '/' },
        { name: 'About Us', href: '/about' },
        { name: 'Blog', href: '/insights' },
        { name: 'Partners', href: '/partners' },
    ];

    const services = [
        { name: 'Cordix Division Offerings', href: '/offerings/cordix' },
        { name: 'Virdix Division Offerings', href: '/offerings/virdix' },
    ];

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (footerRef.current) {
            observer.observe(footerRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style jsx>{`
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .footer-section {
                    opacity: 0;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 1s ease-out forwards;
                    opacity: 0;
                }

                .animate-delay-200 {
                    animation-delay: 0.2s;
                }

                .animate-delay-400 {
                    animation-delay: 0.4s;
                }
            `}</style>

            <footer ref={footerRef} className="bg-gradient-to-r from-white via-[#FFF0F1] to-[#FFD6DC]">
                <div className="max-w-[1400px] mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16 lg:py-20">
                    {/* Main Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-10 gap-8 md:gap-10 lg:gap-12 mb-8 md:mb-10">
                        {/* Left Section: Logo, Description */}
                        <div className={`lg:col-span-4 footer-section ${isVisible ? 'animate-fadeInUp' : ''}`}>
                            <div className="mb-6 md:mb-8">
                                <Image
                                    src="/images/logo.png"
                                    alt="MEDPUSH - Effectiveness in Every Action"
                                    width={180}
                                    height={60}
                                    className="h-12 w-auto"
                                />
                            </div>
                            <p className="text-gray-700 text-sm md:text-base leading-relaxed pr-0 md:pr-4 lg:pr-8">
                                We are an AI-powered media consultancy dedicated to helping brands optimize campaign performance and achieve measurable ROI through strategic, data-driven insights.
                            </p>
                        </div>

                        {/* Right Section: Quick Link, Offerings, Quick Contact */}
                        <div className={`lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-10 lg:gap-12 footer-section ${isVisible ? 'animate-fadeInUp animate-delay-200' : ''}`}>
                            {/* Quick Links */}
                            <div>
                                <h3 className="text-gray-900 font-bold text-base md:text-lg mb-4 md:mb-6">Quick Link</h3>
                                <ul className="space-y-3 md:space-y-4">
                                    {quickLinks.map((link) => (
                                        <li key={link.name}>
                                            <Link
                                                href={link.href}
                                                className="text-gray-700 hover:text-[#C11E2B] text-sm md:text-base transition-colors duration-200"
                                            >
                                                {link.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Offerings */}
                            <div>
                                <h3 className="text-gray-900 font-bold text-base md:text-lg mb-4 md:mb-6">Offerings</h3>
                                <ul className="space-y-3 md:space-y-4">
                                    {services.map((service) => (
                                        <li key={service.name}>
                                            <Link
                                                href={service.href}
                                                className="text-gray-700 hover:text-[#C11E2B] text-sm md:text-base transition-colors duration-200"
                                            >
                                                {service.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Contact */}
                            <div>
                                <h3 className="text-gray-900 font-bold text-base md:text-lg mb-4 md:mb-6">
                                    Quick Contact
                                </h3>
                                <div className="space-y-3 md:space-y-4">
                                    <a
                                        href="mailto:info@medpushmena.com"
                                        className="text-gray-700 hover:text-[#C11E2B] text-sm md:text-base transition-colors duration-200 block"
                                    >
                                        info@medpushmena.com
                                    </a>
                                    <a
                                        href="tel:+9.71441614432e+11"
                                        className="text-gray-700 hover:text-[#C11E2B] text-sm md:text-base transition-colors duration-200 block"
                                    >
                                        +971 44 161 4432
                                    </a>
                                    <p className="text-gray-700 text-sm md:text-base leading-relaxed">
                                        JLT, Cluster N, Dubai, UAE
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom Section: Social Media and Newsletter */}
                    <div className="grid grid-cols-1 lg:grid-cols-10 gap-8 md:gap-10 lg:gap-12">
                        {/* Social Media */}
                        <div className={`lg:col-span-4 border-t border-gray-300 pt-6 md:pt-8 lg:pt-10 footer-section ${isVisible ? 'animate-fadeInUp animate-delay-400' : ''}`}>
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                                <h3 className="text-gray-900 font-bold text-base md:text-lg whitespace-nowrap">
                                    Social Media:
                                </h3>
                                <div className="flex gap-3">
                                    {/* <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 hover:bg-[#C11E2B] text-white rounded-full flex items-center justify-center transition-all duration-200" aria-label="Instagram">
                                        <Instagram className="w-4 h-4 md:w-5 md:h-5" />
                                    </a> */}
                                    <a href="https://www.linkedin.com/company/medpush/" className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 hover:bg-[#C11E2B] text-white rounded-full flex items-center justify-center transition-all duration-200" aria-label="LinkedIn">
                                        <Linkedin className="w-4 h-4 md:w-5 md:h-5" />
                                    </a>
                                    {/* <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 hover:bg-[#C11E2B] text-white rounded-full flex items-center justify-center transition-all duration-200" aria-label="Facebook">
                                        <Facebook className="w-4 h-4 md:w-5 md:h-5" />
                                    </a> */}
                                    {/* <a href="#" className="w-10 h-10 md:w-12 md:h-12 bg-gray-900 hover:bg-[#C11E2B] text-white rounded-full flex items-center justify-center transition-all duration-200" aria-label="Twitter">
                                        <Twitter className="w-4 h-4 md:w-5 md:h-5" />
                                    </a> */}
                                </div>
                            </div>
                        </div>

                        {/* Newsletter */}
                        {/* <div className={`lg:col-span-6 footer-section ${isVisible ? 'animate-fadeInUp animate-delay-400' : ''}`}>
                            <div className="bg-white/60 backdrop-blur-sm rounded-2xl px-4 md:px-6 lg:px-8 py-6 md:py-8 border border-gray-200">
                                <div className="flex flex-col lg:flex-row items-start lg:items-start justify-between gap-4 lg:gap-6">
                                    <div className="w-full lg:w-[45%]">
                                        <h3 className="text-gray-900 font-bold text-lg md:text-xl mb-2">
                                            Subscribe :
                                        </h3>
                                        <p className="text-gray-700 text-sm md:text-base">
                                            Don&apos;t miss out on news and growth hacks.
                                        </p>
                                    </div>

                                    <form onSubmit={handleNewsletterSubmit} className="relative w-full lg:w-[55%]">
                                        <input
                                            type="email"
                                            placeholder="E-mail Address*"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            className="w-full pl-4 md:pl-6 pr-24 md:pr-32 py-3 md:py-3.5 bg-white text-gray-900 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500 text-sm md:text-base placeholder:text-gray-500"
                                        />
                                        <button
                                            type="submit"
                                            className="absolute right-0 top-1/2 -translate-y-1/2 px-4 md:px-7 py-2.5 md:py-3 bg-[#C11E2B] hover:bg-[#a01822] text-white rounded-full font-semibold transition-colors duration-200 text-sm md:text-base whitespace-nowrap"
                                        >
                                            Subscribe
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div> */}
                    </div>
                </div>

                {/* Copyright Section */}
                <div className="bg-gray-200 py-4 md:py-5">
                    <div className="max-w-[1400px] mx-auto px-4 md:px-8 lg:px-16">
                        <p className="text-gray-900 text-center text-sm md:text-base">
                            Copyright © 2025 All Rights Reserved.
                        </p>
                    </div>
                </div>
            </footer>
        </>
    );
};

export default Footer;
