'use client';

import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';

const ComingSoonPage = () => {
    const [isHeroVisible, setIsHeroVisible] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);
    
    const heroRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsHeroVisible(true);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.target === contentRef.current && entry.isIntersecting) {
                        setIsContentVisible(true);
                    }
                });
            },
            { threshold: 0.1 }
        );

        if (contentRef.current) observer.observe(contentRef.current);

        return () => observer.disconnect();
    }, []);

    return (
        <>
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

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

                @keyframes pulse {
                    0%, 100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.5;
                    }
                }

                .animate-fadeIn {
                    animation: fadeIn 1s ease-out forwards;
                }

                .animate-slideUp {
                    animation: slideUp 0.8s ease-out forwards;
                    animation-delay: 0.3s;
                    opacity: 0;
                }

                .animate-fadeInUp {
                    animation: fadeInUp 0.6s ease-out forwards;
                }

                .animate-pulse {
                    animation: pulse 2s ease-in-out infinite;
                }
            `}</style>

            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section 
                    ref={heroRef} 
                    className={`relative w-full h-[180px] md:h-[240px] overflow-hidden mt-16 md:mt-24 ${isHeroVisible ? 'animate-fadeIn' : 'opacity-0'}`}
                >
                    <Image
                        src="/images/partners-page-hero.png"
                        alt="Coming Soon"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/40"></div>
                    <div className="relative z-10 h-full flex items-center justify-center px-4">
                        <h1 className={`text-white text-3xl md:text-5xl lg:text-6xl font-bold text-center ${isHeroVisible ? 'animate-slideUp' : 'opacity-0'}`}>
                            Coming Soon
                        </h1>
                    </div>
                </section>

                {/* Main Content Section */}
                <section className="max-w-[1400px] mx-auto px-4 md:px-8 py-16 md:py-24 lg:py-32">
                    <div 
                        ref={contentRef}
                        className={`flex flex-col items-center justify-center text-center space-y-6 md:space-y-8 ${isContentVisible ? 'animate-fadeInUp' : 'opacity-0'}`}
                    >
                        {/* Main Heading */}
                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#C11E2B]">
                            Something Exciting is Coming!
                        </h2>

                        {/* Subtitle */}
                        <p className="text-base md:text-lg lg:text-xl text-gray-600 max-w-2xl leading-relaxed">
                            We&apos;re working hard to bring you something amazing. Stay tuned for updates and exciting announcements.
                        </p>

                        {/* Animated Icon/Graphic */}
                        <div className="py-8 md:py-12">
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#C11E2B] flex items-center justify-center animate-pulse">
                                <svg 
                                    className="w-8 h-8 md:w-10 md:h-10 text-white" 
                                    fill="none" 
                                    stroke="currentColor" 
                                    viewBox="0 0 24 24"
                                >
                                    <path 
                                        strokeLinecap="round" 
                                        strokeLinejoin="round" 
                                        strokeWidth={2} 
                                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                                    />
                                </svg>
                            </div>
                        </div>

                        {/* Additional Message */}
                        <div className="bg-gray-50 rounded-2xl p-6 md:p-8 lg:p-10 max-w-3xl w-full">
                            <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                                What to Expect
                            </h3>
                            <ul className="space-y-3 text-left text-gray-600">
                                <li className="flex items-start">
                                    <svg 
                                        className="w-6 h-6 text-[#C11E2B] mr-3 flex-shrink-0 mt-0.5" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                    <span>Innovative solutions tailored to your needs</span>
                                </li>
                                <li className="flex items-start">
                                    <svg 
                                        className="w-6 h-6 text-[#C11E2B] mr-3 flex-shrink-0 mt-0.5" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                    <span>Enhanced features and improved user experience</span>
                                </li>
                                <li className="flex items-start">
                                    <svg 
                                        className="w-6 h-6 text-[#C11E2B] mr-3 flex-shrink-0 mt-0.5" 
                                        fill="currentColor" 
                                        viewBox="0 0 20 20"
                                    >
                                        <path 
                                            fillRule="evenodd" 
                                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                                            clipRule="evenodd" 
                                        />
                                    </svg>
                                    <span>Comprehensive support and resources</span>
                                </li>
                            </ul>
                        </div>

                        {/* Call to Action */}
                        <div className="pt-6 md:pt-8">
                            <p className="text-sm md:text-base text-gray-500">
                                Have questions? Feel free to{' '}
                                <a 
                                    href="/contact-us" 
                                    className="text-[#C11E2B] font-semibold hover:underline transition-all duration-200"
                                >
                                    contact us
                                </a>
                            </p>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};

export default ComingSoonPage;
