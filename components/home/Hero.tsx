'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

const Hero = () => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [isAnimating, setIsAnimating] = useState(true);
    const totalSlides = 3;

    const slides = [
        {
            image: '/images/hero-bg.png',
            alt: 'Hero Background 1',
            text: (
                <>
                    Our mission is to deliver{' '}
                    <span className="font-bold">maximum effectiveness</span> and help{' '}
                    <span className="font-bold">improve the standards</span> of the industry.
                </>
            )
        },
        {
            image: '/images/hero-bg-2.png',
            alt: 'Hero Background 2',
            text: (
                <>
                    We provide{' '}
                    <span className="font-bold">practical solutions</span> to maximize effectiveness across the entire{' '}
                    <span className="font-bold">media value chain</span> while working closely with all relevant stakeholders.
                </>
            )
        },
        {
            image: '/images/hero-bg-3.png',
            alt: 'Hero Background 3',
            text: (
                <>
                    We provide{' '}
                    <span className="font-bold">tailor-made programs and workshops</span> that transform your knowledge into unparalleled{' '}
                    <span className="font-bold">communication planning and buying skills</span> with focus on digital.
                </>
            )
        }
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setIsAnimating(false);
            setTimeout(() => {
                setCurrentSlide((prev) => (prev + 1) % totalSlides);
                setIsAnimating(true);
            }, 100);
        }, 5000);

        return () => clearInterval(timer);
    }, []);

    return (
        <>
            <style jsx>{`
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

                .animate-slideUp {
                    animation: slideUp 0.6s ease-out;
                }
            `}</style>

            <section className="relative w-full h-[60vh] md:h-screen overflow-hidden">
                {/* Background Images with Transitions */}
                {slides.map((slide, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
                            index === currentSlide ? 'opacity-100' : 'opacity-0'
                        }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            className="object-cover pt-16 md:pt-24"
                            priority={index === 0}
                        />
                    </div>
                ))}

                {/* Red Gradient Overlay */}
                <div 
                    className="absolute inset-0 z-10" 
                    style={{
                        background: 'linear-gradient(to right, #C11E2B 0%, #E39BA1B0 30%, transparent 60%)'
                    }}
                />

                {/* Content Container */}
                <div className="relative z-20 max-w-[1400px] mx-auto px-4 md:px-8 h-full flex items-center">
                    <div className="max-w-sm md:max-w-xl">
                        <h1 
                            key={currentSlide}
                            className={`text-white text-lg sm:text-xl md:text-2xl lg:text-4xl font-light leading-tight pt-16 md:pt-24 ${
                                isAnimating ? 'animate-slideUp' : ''
                            }`}
                        >
                            {slides[currentSlide].text}
                        </h1>
                    </div>
                </div>

                {/* Carousel Dots */}
                <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-20">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                                index === currentSlide
                                    ? 'w-8 md:w-12 bg-white'
                                    : 'w-1.5 md:w-2 bg-white/50 hover:bg-white/75'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>
        </>
    );
};

export default Hero;
